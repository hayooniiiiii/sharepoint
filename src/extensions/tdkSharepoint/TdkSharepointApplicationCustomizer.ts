import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'TdkSharepointApplicationCustomizerStrings';

import { LOG_SOURCE, BANNER_URL } from '../data/constants';
import { getTopBannerHtml } from '../components/topBanner';
import { getFooterHtml } from '../components/footer';
import { getHeroBannerHtml } from '../components/heroBanner';
import { getQuickLinksHtml } from '../components/quickLinksSection';
import { getTableauSectionHtml } from '../components/cardlist';
import { getDepartmentSectionHtml } from '../components/departmentSection';
import { renderDetailPanel } from '../components/detailPanel';

import { PRODUCT_CARDS } from '../data/productCards';
import { QUICK_LINKS } from '../data/quickLinks';
import { DEPARTMENT_LINKS } from '../data/departmentLinks';
import { CUSTOM_STYLES } from '../styles/customStyles';
import { Locale, ProductCard } from '../models/types';

export interface ITdkSharepointApplicationCustomizerProperties {
  Top?: string;
  Bottom?: string;
}

export default class TdkSharepointApplicationCustomizer
    extends BaseApplicationCustomizer<ITdkSharepointApplicationCustomizerProperties> {

  private _bottomPlaceholder: PlaceholderContent | undefined;
  private _topPlaceholder: PlaceholderContent | undefined;
  private _locale: Locale = 'ko';

  private _uiObserver: MutationObserver | undefined;
  private _pageObserver: MutationObserver | undefined;
  private _urlWatchTimer: number | undefined;
  private _syncTimer: number | undefined;

  private _lastUrl: string = window.location.href;
  private _tableauPopupEscHandler: ((event: KeyboardEvent) => void) | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this._locale = this._getLocale();

    this._injectStyles();
    this._applyPermissionUiImmediately();

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);

    window.setTimeout((): void => {
      this._applyPermissionUi();
      this._syncPageUi();
      this._bindLanguageChange();
      this._bindNavEvents();
      this._bindTableauPopupEvents();
      this._watchUrlChange();
      this._startPageSyncObserver();
    }, 300);

    return Promise.resolve();
  }

  private _getLocale(): Locale {
    const langFromUrl: string = (
        new URL(window.location.href).searchParams.get('lang') || ''
    ).toLowerCase();

    if (langFromUrl === 'ja') {
      return 'ja';
    }

    if (langFromUrl === 'en') {
      return 'en';
    }

    if (langFromUrl === 'ko') {
      return 'ko';
    }

    const cultureName: string = (
        this.context.pageContext.cultureInfo.currentUICultureName ||
        this.context.pageContext.cultureInfo.currentCultureName ||
        'ko-KR'
    ).toLowerCase();

    if (cultureName.indexOf('ja') === 0) {
      return 'ja';
    }

    if (cultureName.indexOf('en') === 0) {
      return 'en';
    }

    return 'ko';
  }

  private _renderPlaceholders = (): void => {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose }
      );

      if (this._topPlaceholder && this._topPlaceholder.domElement) {
        const topText: string = this.properties.Top || 'TDK KOREA';
        this._topPlaceholder.domElement.innerHTML =
            getTopBannerHtml(topText, this._locale);
      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
      );

      if (this._bottomPlaceholder && this._bottomPlaceholder.domElement) {
        const bottomText: string = this.properties.Bottom || '© TDK Korea Portal';
        this._bottomPlaceholder.domElement.innerHTML =
            getFooterHtml(bottomText, this._locale);
      }
    }
  };

  private _getCurrentUserEmail(): string {
    const userEmail: string = (this.context.pageContext.user.email || '').toLowerCase().trim();
    const loginName: string = (this.context.pageContext.user.loginName || '').toLowerCase().trim();

    return userEmail || loginName;
  }

  private _isAllowedEditor(): boolean {
    const currentUser: string = this._getCurrentUserEmail();
    const allowedEmail: string = 'hayoon.kang@tdk.com';

    return currentUser === allowedEmail || currentUser.indexOf(allowedEmail) > -1;
  }

  private _isBoardPage(): boolean {
    const currentPath: string = decodeURIComponent(window.location.pathname).toLowerCase();
    const fullUrl: string = decodeURIComponent(window.location.href).toLowerCase();

    return (
        currentPath.indexOf('게시판.aspx') > -1 ||
        currentPath.indexOf('noticeboard.aspx') > -1 ||
        currentPath.indexOf('/lists/') > -1 ||
        fullUrl.indexOf('게시판') > -1 ||
        fullUrl.indexOf('noticeboard') > -1
    );
  }

  private _shouldHideSharePointUi(): boolean {
    if (this._isBoardPage()) {
      return false;
    }

    return !this._isAllowedEditor();
  }

  private _applyPermissionUiImmediately(): void {
    if (this._shouldHideSharePointUi()) {
      document.documentElement.classList.add('tdk-hide-sp-ui');
      document.body.classList.add('tdk-hide-sp-ui');
    } else {
      document.documentElement.classList.remove('tdk-hide-sp-ui');
      document.body.classList.remove('tdk-hide-sp-ui');
    }
  }

  private _applyPermissionUi(): void {
    if (this._shouldHideSharePointUi()) {
      document.documentElement.classList.add('tdk-hide-sp-ui');
      document.body.classList.add('tdk-hide-sp-ui');
      this._hideNativeSharePointUi();
      this._observeAndHideNativeUi();
    } else {
      document.documentElement.classList.remove('tdk-hide-sp-ui');
      document.body.classList.remove('tdk-hide-sp-ui');
      this._restoreNativeSharePointUi();
      this._disconnectUiObserver();
    }
  }

  private _hideNativeSharePointUi(): void {
    const selectors: string[] = [
      '[data-automationid="SiteHeader"]',
      '[data-automation-id="SiteHeader"]',
      '#spSiteHeader',
      '[data-automation-id="pageCommandBar"]',
      '[data-automationid="pageCommandBar"]',
      '#spCommandBar',
      '[data-automation-id="pageHeader"]',
      '[data-automationid="pageHeader"]',
      '#SuiteNavWrapper',
      '#SuiteNavPlaceHolder',
      '#sp-appBar',
      '#spLeftNav'
    ];

    for (const selector of selectors) {
      const elements: NodeListOf<Element> = document.querySelectorAll(selector);

      elements.forEach((el: Element): void => {
        const htmlEl: HTMLElement = el as HTMLElement;
        htmlEl.style.setProperty('display', 'none', 'important');
        htmlEl.style.setProperty('visibility', 'hidden', 'important');
      });
    }
  }

  private _restoreNativeSharePointUi(): void {
    const selectors: string[] = [
      '[data-automationid="SiteHeader"]',
      '[data-automation-id="SiteHeader"]',
      '#spSiteHeader',
      '[data-automation-id="pageCommandBar"]',
      '[data-automationid="pageCommandBar"]',
      '#spCommandBar',
      '[data-automation-id="pageHeader"]',
      '[data-automationid="pageHeader"]',
      '#SuiteNavWrapper',
      '#SuiteNavPlaceHolder',
      '#sp-appBar',
      '#spLeftNav'
    ];

    for (const selector of selectors) {
      const elements: NodeListOf<Element> = document.querySelectorAll(selector);

      elements.forEach((el: Element): void => {
        const htmlEl: HTMLElement = el as HTMLElement;
        htmlEl.style.removeProperty('display');
        htmlEl.style.removeProperty('visibility');
      });
    }
  }

  private _observeAndHideNativeUi(): void {
    if (this._uiObserver) {
      return;
    }

    this._uiObserver = new MutationObserver((): void => {
      if (this._shouldHideSharePointUi()) {
        this._hideNativeSharePointUi();
      }
    });

    this._uiObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private _disconnectUiObserver(): void {
    if (this._uiObserver) {
      this._uiObserver.disconnect();
      this._uiObserver = undefined;
    }
  }

  private _syncPageUi(): void {
    const isBoardPage: boolean = this._isBoardPage();
    const existingSection: HTMLElement | null =
        document.getElementById('tdk-product-section') as HTMLElement | null;

    if (isBoardPage) {
      if (existingSection) {
        existingSection.remove();
      }

      this._setActiveNav();
      return;
    }

    this._ensureBodySectionRendered();
    this._setActiveNav();
    this._bindNavEvents();
    this._bindLanguageChange();
    this._bindTableauPopupEvents();
  }

  private _startPageSyncObserver(): void {
    if (this._pageObserver) {
      this._pageObserver.disconnect();
    }

    this._pageObserver = new MutationObserver((): void => {
      if (this._syncTimer) {
        window.clearTimeout(this._syncTimer);
      }

      this._syncTimer = window.setTimeout((): void => {
        this._applyPermissionUi();

        if (!this._isBoardPage()) {
          if (!document.getElementById('tdk-product-section')) {
            this._ensureBodySectionRendered();
          }

          this._bindNavEvents();
          this._bindLanguageChange();
          this._setActiveNav();
          this._bindTableauPopupEvents();
        }
      }, 250);
    });

    this._pageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private _ensureBodySectionRendered(retryCount: number = 0): void {
    if (document.getElementById('tdk-product-section')) {
      this._bindTableauPopupEvents();
      return;
    }

    const target: HTMLElement | null =
        document.querySelector('[data-automation-id="CanvasZone"]') as HTMLElement ||
        document.querySelector('[data-automation-id="Canvas"]') as HTMLElement ||
        document.querySelector('[role="main"]') as HTMLElement ||
        document.querySelector('main') as HTMLElement ||
        document.querySelector('#spPageCanvasContent') as HTMLElement;

    if (!target) {
      if (retryCount < 40) {
        window.setTimeout((): void => {
          this._ensureBodySectionRendered(retryCount + 1);
        }, 300);
      }

      return;
    }

    const section: HTMLElement = document.createElement('section');
    section.id = 'tdk-product-section';
    section.className = 'tdk-product-section';
    section.setAttribute('data-tdk-custom', 'true');

    section.innerHTML = `
      <div class="tdk-product-wrap">
        ${getHeroBannerHtml(BANNER_URL, this._locale)}
        ${getTableauSectionHtml(PRODUCT_CARDS, this._locale)}
        ${getQuickLinksHtml(QUICK_LINKS, this._locale)}
        ${getDepartmentSectionHtml(DEPARTMENT_LINKS, this._locale)}
      </div>
    `;

    if (target.firstChild) {
      target.insertBefore(section, target.firstChild);
    } else {
      target.appendChild(section);
    }

    this._bindCardEvents(section);
    this._bindTableauPopupEvents();
  }

  private _getProductCardById(id: string): ProductCard | undefined {
    let selected: ProductCard | undefined = undefined;

    for (const card of PRODUCT_CARDS) {
      if (card.id === id) {
        selected = card;
        break;
      }
    }

    return selected;
  }

  private _bindCardEvents(section: HTMLElement): void {
    const buttons: NodeListOf<HTMLElement> = section.querySelectorAll('.tdk-main-card');
    const cardRow: HTMLElement | null = section.querySelector('.tdk-card-row');
    const detailPanel: HTMLElement | null = section.querySelector('#tdk-detail-panel');

    let activeCardId: string | null = null;

    buttons.forEach((btn: HTMLElement): void => {
      if (btn.dataset.tdkCardBound === 'true') {
        return;
      }

      btn.dataset.tdkCardBound = 'true';

      btn.addEventListener('click', (): void => {
        const id: string | null = btn.getAttribute('data-card-id');

        if (!id || !detailPanel) {
          return;
        }

        if (activeCardId === id) {
          buttons.forEach((el: HTMLElement): void => {
            el.classList.remove('is-active');
          });

          if (cardRow) {
            cardRow.classList.remove('has-active');
          }

          detailPanel.classList.remove('is-visible');

          window.setTimeout((): void => {
            if (!detailPanel.classList.contains('is-visible')) {
              detailPanel.innerHTML = '';
            }
          }, 320);

          activeCardId = null;
          return;
        }

        const selected: ProductCard | undefined = this._getProductCardById(id);

        if (!selected) {
          return;
        }

        renderDetailPanel(selected, this._locale);

        buttons.forEach((el: HTMLElement): void => {
          el.classList.remove('is-active');
        });

        btn.classList.add('is-active');

        if (cardRow) {
          cardRow.classList.add('has-active');
        }

        window.requestAnimationFrame((): void => {
          detailPanel.classList.add('is-visible');
        });

        activeCardId = id;
      });
    });
  }

  private _bindTableauPopupEvents(): void {
    const openBtn: HTMLElement | null =
        document.getElementById('tdk-tableau-account-btn') as HTMLElement | null;
    const popup: HTMLElement | null =
        document.getElementById('tdk-tableau-popup') as HTMLElement | null;
    const closeBtn: HTMLElement | null =
        document.getElementById('tdk-tableau-popup-close') as HTMLElement | null;
    const backdrop: HTMLElement | null =
        document.getElementById('tdk-tableau-popup-backdrop') as HTMLElement | null;

    if (!openBtn || !popup) {
      return;
    }

    if (openBtn.dataset.tdkPopupBound !== 'true') {
      openBtn.dataset.tdkPopupBound = 'true';

      openBtn.addEventListener('click', (): void => {
        popup.classList.add('is-open');
        document.body.classList.add('tdk-tableau-popup-open');
      });
    }

    const closePopup = (): void => {
      popup.classList.remove('is-open');
      document.body.classList.remove('tdk-tableau-popup-open');
    };

    if (closeBtn && closeBtn.dataset.tdkPopupBound !== 'true') {
      closeBtn.dataset.tdkPopupBound = 'true';
      closeBtn.addEventListener('click', closePopup);
    }

    if (backdrop && backdrop.dataset.tdkPopupBound !== 'true') {
      backdrop.dataset.tdkPopupBound = 'true';
      backdrop.addEventListener('click', closePopup);
    }

    if (!this._tableauPopupEscHandler) {
      this._tableauPopupEscHandler = (event: KeyboardEvent): void => {
        if (event.key !== 'Escape') {
          return;
        }

        const currentPopup: HTMLElement | null =
            document.getElementById('tdk-tableau-popup') as HTMLElement | null;

        if (currentPopup) {
          currentPopup.classList.remove('is-open');
          document.body.classList.remove('tdk-tableau-popup-open');
        }
      };

      document.addEventListener('keydown', this._tableauPopupEscHandler);
    }
  }

  private _bindLanguageChange(): void {
    const langSelect: HTMLSelectElement | null =
        document.getElementById('tdk-lang-select') as HTMLSelectElement | null;

    if (!langSelect) {
      return;
    }

    langSelect.value = this._locale;

    if (langSelect.dataset.tdkBound === 'true') {
      return;
    }

    langSelect.dataset.tdkBound = 'true';

    langSelect.addEventListener('change', (): void => {
      const value: Locale = langSelect.value as Locale;

      this._locale = value;

      const currentUrl: URL = new URL(window.location.href);
      currentUrl.searchParams.set('lang', value);
      window.history.replaceState({}, '', currentUrl.toString());

      this._rerenderCustomUi();
    });
  }

  private _rerenderCustomUi(): void {
    const activeCard: HTMLElement | null =
        document.querySelector('.tdk-main-card.is-active') as HTMLElement | null;

    const activeCardId: string | null = activeCard
        ? activeCard.getAttribute('data-card-id')
        : null;

    if (this._topPlaceholder && this._topPlaceholder.domElement) {
      const topText: string = this.properties.Top || 'TDK KOREA';
      this._topPlaceholder.domElement.innerHTML =
          getTopBannerHtml(topText, this._locale);
    }

    if (this._bottomPlaceholder && this._bottomPlaceholder.domElement) {
      const bottomText: string = this.properties.Bottom || '© TDK Korea Portal';
      this._bottomPlaceholder.domElement.innerHTML =
          getFooterHtml(bottomText, this._locale);
    }

    const wrap: HTMLElement | null =
        document.querySelector('.tdk-product-wrap') as HTMLElement | null;

    if (!wrap) {
      this._ensureBodySectionRendered();
      return;
    }

    wrap.innerHTML = `
      ${getHeroBannerHtml(BANNER_URL, this._locale)}
      ${getTableauSectionHtml(PRODUCT_CARDS, this._locale)}
      ${getQuickLinksHtml(QUICK_LINKS, this._locale)}
      ${getDepartmentSectionHtml(DEPARTMENT_LINKS, this._locale)}
    `;

    const section: HTMLElement | null =
        document.getElementById('tdk-product-section') as HTMLElement | null;

    if (section) {
      this._bindCardEvents(section);
    }

    this._bindLanguageChange();
    this._bindNavEvents();
    this._bindTableauPopupEvents();
    this._setActiveNav();

    if (activeCardId && section) {
      const restoredButton: HTMLElement | null =
          section.querySelector(`.tdk-main-card[data-card-id="${activeCardId}"]`) as HTMLElement | null;

      const restoredCard: ProductCard | undefined = this._getProductCardById(activeCardId);

      if (restoredButton && restoredCard) {
        const cardRow: HTMLElement | null =
            section.querySelector('.tdk-card-row') as HTMLElement | null;

        restoredButton.classList.add('is-active');

        if (cardRow) {
          cardRow.classList.add('has-active');
        }

        renderDetailPanel(restoredCard, this._locale);
      }
    }
  }

  private _bindNavEvents(): void {
    const navButtons: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll('.tdk-nav-btn');

    navButtons.forEach((btn: HTMLAnchorElement): void => {
      if (btn.dataset.tdkNavBound === 'true') {
        return;
      }

      btn.dataset.tdkNavBound = 'true';

      btn.addEventListener('click', (): void => {
        navButtons.forEach((el: HTMLAnchorElement): void => {
          el.classList.remove('is-active');
          el.removeAttribute('aria-current');
        });

        btn.classList.add('is-active');
        btn.setAttribute('aria-current', 'page');
      });
    });
  }

  private _watchUrlChange(): void {
    if (this._urlWatchTimer) {
      window.clearInterval(this._urlWatchTimer);
    }

    this._urlWatchTimer = window.setInterval((): void => {
      if (this._lastUrl !== window.location.href) {
        this._lastUrl = window.location.href;
        this._locale = this._getLocale();

        this._applyPermissionUiImmediately();

        window.setTimeout((): void => {
          this._applyPermissionUi();
          this._syncPageUi();
          this._bindLanguageChange();
          this._bindNavEvents();
          this._bindTableauPopupEvents();
        }, 150);

        window.setTimeout((): void => {
          this._applyPermissionUi();
          this._syncPageUi();
          this._bindTableauPopupEvents();
        }, 500);
      }
    }, 200);
  }

  private _setActiveNav(): void {
    const path: string = decodeURIComponent(window.location.pathname).toLowerCase();
    const navButtons: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll('.tdk-nav-btn');

    const isBoardPage: boolean = this._isBoardPage();

    navButtons.forEach((btn: HTMLAnchorElement): void => {
      btn.classList.remove('is-active');
      btn.removeAttribute('aria-current');

      const href: string = decodeURIComponent(btn.href).toLowerCase();

      if (isBoardPage) {
        if (
            href.indexOf('게시판.aspx') > -1 ||
            href.indexOf('noticeboard.aspx') > -1
        ) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-current', 'page');
        }
      } else {
        if (
            href.indexOf('/sitepages/home.aspx') > -1 ||
            path.indexOf('/sitepages/home.aspx') > -1
        ) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  private _injectStyles(): void {
    const existingStyle: HTMLElement | null = document.getElementById('tdk-custom-style');

    if (existingStyle) {
      existingStyle.remove();
    }

    const style: HTMLStyleElement = document.createElement('style');
    style.id = 'tdk-custom-style';
    style.innerHTML = CUSTOM_STYLES;

    document.head.appendChild(style);
  }

  private _onDispose = (): void => {
    this._disconnectUiObserver();

    if (this._pageObserver) {
      this._pageObserver.disconnect();
      this._pageObserver = undefined;
    }

    if (this._urlWatchTimer) {
      window.clearInterval(this._urlWatchTimer);
      this._urlWatchTimer = undefined;
    }

    if (this._syncTimer) {
      window.clearTimeout(this._syncTimer);
      this._syncTimer = undefined;
    }

    if (this._tableauPopupEscHandler) {
      document.removeEventListener('keydown', this._tableauPopupEscHandler);
      this._tableauPopupEscHandler = undefined;
    }

    console.log('[TdkSharepointApplicationCustomizer] Disposed placeholders.');
  };
}