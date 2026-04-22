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
import { Locale } from '../models/types';

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

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this._locale = this._getLocale();

    this._injectStyles();

    // 최초 진입 깜빡임 최소화
    this._applyPermissionUiImmediately();

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);

    window.setTimeout((): void => {
      this._applyPermissionUi();
      this._syncPageUi();
      this._bindLanguageChange();
      this._bindNavEvents();
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
        const topText: string = this.properties.Top || 'TDK Korea Portal';
        this._topPlaceholder.domElement.innerHTML = getTopBannerHtml(topText, this._locale);
      }
    }

    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose }
      );

      if (this._bottomPlaceholder && this._bottomPlaceholder.domElement) {
        const bottomText: string = this.properties.Bottom || '© TDK Korea Portal';
        this._bottomPlaceholder.domElement.innerHTML = getFooterHtml(bottomText);
      }
    }
  };

  private _getCurrentUserEmail(): string {
    const userEmail: string = (this.context.pageContext.user.email || '').toLowerCase().trim();
    const loginName: string = (this.context.pageContext.user.loginName || '').toLowerCase().trim();

    if (userEmail) {
      return userEmail;
    }

    return loginName;
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
    // 게시판에서는 누구든 편집탭 보여야 함
    if (this._isBoardPage()) {
      return false;
    }

    // 게시판이 아닌 페이지에서만 일반 사용자 숨김
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

        if (!this._isBoardPage() && !document.getElementById('tdk-product-section')) {
          this._ensureBodySectionRendered();
          this._bindNavEvents();
          this._setActiveNav();
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
        ${getHeroBannerHtml(BANNER_URL)}
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
  }

  private _bindCardEvents(section: HTMLElement): void {
    const buttons: NodeListOf<HTMLElement> = section.querySelectorAll('.tdk-main-card');
    const cardRow: HTMLElement | null = section.querySelector('.tdk-card-row');
    const detailPanel: HTMLElement | null = section.querySelector('#tdk-detail-panel');

    let activeCardId: string | null = null;

    buttons.forEach((btn: HTMLElement): void => {
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

        let selected = undefined;

        for (const card of PRODUCT_CARDS) {
          if (card.id === id) {
            selected = card;
            break;
          }
        }

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
      const value: string = langSelect.value;
      const currentUrl: URL = new URL(window.location.href);

      currentUrl.searchParams.set('lang', value);
      window.location.assign(currentUrl.toString());
    });
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
        }, 150);

        window.setTimeout((): void => {
          this._applyPermissionUi();
          this._syncPageUi();
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
            href === path ||
            href.indexOf(path) > -1 ||
            path.indexOf(href) > -1 ||
            href.indexOf('/sitepages/home.aspx') > -1
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

    console.log('[TdkSharepointApplicationCustomizer] Disposed placeholders.');
  };
}