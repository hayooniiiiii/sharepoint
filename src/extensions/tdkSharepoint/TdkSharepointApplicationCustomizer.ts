import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'TdkSharepointApplicationCustomizerStrings';

import {
  LOG_SOURCE,
  BANNER_URLS,
  POSTER_URL
} from '../data/constants';

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

/**
 * Application Customizer에서 사용하는 설정값
 */
export interface ITdkSharepointApplicationCustomizerProperties {
  Top?: string;
  Bottom?: string;
}

/**
 * TDK Korea SharePoint 포털 Application Customizer
 *
 * 주요 기능:
 * - 상단 헤더 및 하단 푸터 출력
 * - 메인 포털 콘텐츠 출력
 * - 다국어 변경
 * - Tableau 카드 상세 메뉴
 * - Tableau 계정 팝업
 * - 메인 배너 자동 슬라이드
 * - MX 포스터 확대 모달
 * - 사용자 권한에 따른 SharePoint 기본 UI 제어
 */
export default class TdkSharepointApplicationCustomizer
    extends BaseApplicationCustomizer<ITdkSharepointApplicationCustomizerProperties> {

  /**
   * SharePoint 상단·하단 Placeholder
   */
  private _bottomPlaceholder: PlaceholderContent | undefined;
  private _topPlaceholder: PlaceholderContent | undefined;

  /**
   * 현재 화면 언어
   */
  private _locale: Locale = 'ko';

  /**
   * SharePoint 기본 UI와 페이지 변경 감지용 Observer
   */
  private _uiObserver: MutationObserver | undefined;
  private _pageObserver: MutationObserver | undefined;

  /**
   * URL 및 화면 동기화용 Timer
   */
  private _urlWatchTimer: number | undefined;
  private _syncTimer: number | undefined;

  /**
   * 메인 배너 자동 슬라이드 Timer
   */
  private _heroBannerTimer: number | undefined;

  /**
   * 현재 URL
   *
   * SharePoint는 페이지 이동 시 전체 새로고침 없이
   * URL만 변경될 수 있으므로 이전 URL을 저장한다.
   */
  private _lastUrl: string = window.location.href;

  /**
   * Tableau 팝업 ESC 키 이벤트
   */
  private _tableauPopupEscHandler:
      ((event: KeyboardEvent) => void) | undefined;

  /**
   * 포스터 모달 ESC 키 이벤트
   */
  private _posterModalEscHandler:
      ((event: KeyboardEvent) => void) | undefined;

  /**
   * Application Customizer 초기 실행
   */
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    /**
     * 현재 언어 확인
     */
    this._locale = this._getLocale();

    /**
     * 사용자 정의 CSS 적용
     */
    this._injectStyles();

    /**
     * 페이지가 완전히 출력되기 전에도
     * 권한에 따라 SharePoint 기본 UI를 우선 숨긴다.
     */
    this._applyPermissionUiImmediately();

    /**
     * SharePoint Placeholder 변경 이벤트 등록
     */
    this.context.placeholderProvider.changedEvent.add(
        this,
        this._renderPlaceholders
    );

    /**
     * SharePoint 화면 출력 후 필요한 기능 연결
     */
    window.setTimeout((): void => {
      this._applyPermissionUi();
      this._syncPageUi();

      this._bindLanguageChange();
      this._bindNavEvents();
      this._bindTableauPopupEvents();
      this._bindPosterModalEvents();

      this._watchUrlChange();
      this._startPageSyncObserver();
    }, 300);

    return Promise.resolve();
  }

  /**
   * 현재 사용할 언어를 확인한다.
   *
   * 확인 순서:
   * 1. URL의 lang 파라미터
   * 2. SharePoint 사용자 UI 언어
   * 3. 기본값 한국어
   */
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

  /**
   * SharePoint 상단과 하단 Placeholder를 출력한다.
   */
  private _renderPlaceholders = (): void => {
    /**
     * 상단 헤더 출력
     */
    if (!this._topPlaceholder) {
      this._topPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Top,
              { onDispose: this._onDispose }
          );

      if (
          this._topPlaceholder &&
          this._topPlaceholder.domElement
      ) {
        const topText: string =
            this.properties.Top || 'TDK Korea';

        this._topPlaceholder.domElement.innerHTML =
            getTopBannerHtml(topText, this._locale);
      }
    }

    /**
     * 하단 푸터 출력
     */
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Bottom,
              { onDispose: this._onDispose }
          );

      if (
          this._bottomPlaceholder &&
          this._bottomPlaceholder.domElement
      ) {
        const bottomText: string =
            this.properties.Bottom || '© TDK Korea Portal';

        this._bottomPlaceholder.domElement.innerHTML =
            getFooterHtml(bottomText, this._locale);
      }
    }
  };

  /**
   * 현재 로그인한 사용자의 이메일 또는 로그인 이름을 반환한다.
   */
  private _getCurrentUserEmail(): string {
    const userEmail: string = (
        this.context.pageContext.user.email || ''
    ).toLowerCase().trim();

    const loginName: string = (
        this.context.pageContext.user.loginName || ''
    ).toLowerCase().trim();

    return userEmail || loginName;
  }

  /**
   * 현재 사용자가 SharePoint 편집 UI를 볼 수 있는 사용자인지 확인한다.
   */
  private _isAllowedEditor(): boolean {
    const currentUser: string = this._getCurrentUserEmail();
    const allowedEmail: string = 'hayoon.kang@tdk.com';

    return (
        currentUser === allowedEmail ||
        currentUser.indexOf(allowedEmail) > -1
    );
  }

  /**
   * 현재 페이지가 게시판 페이지인지 확인한다.
   *
   * 게시판에서는 SharePoint 기본 UI를 숨기지 않고,
   * 메인 포털 콘텐츠도 출력하지 않는다.
   */
  private _isBoardPage(): boolean {
    const currentPath: string =
        decodeURIComponent(
            window.location.pathname
        ).toLowerCase();

    const fullUrl: string =
        decodeURIComponent(
            window.location.href
        ).toLowerCase();

    return (
        currentPath.indexOf('게시판.aspx') > -1 ||
        currentPath.indexOf('noticeboard.aspx') > -1 ||
        currentPath.indexOf('/lists/') > -1 ||
        fullUrl.indexOf('게시판') > -1 ||
        fullUrl.indexOf('noticeboard') > -1
    );
  }

  /**
   * SharePoint 기본 UI를 숨겨야 하는지 확인한다.
   */
  private _shouldHideSharePointUi(): boolean {
    /**
     * 게시판 페이지에서는 기본 UI를 표시한다.
     */
    if (this._isBoardPage()) {
      return false;
    }

    /**
     * 허용된 편집자가 아닌 경우 기본 UI를 숨긴다.
     */
    return !this._isAllowedEditor();
  }

  /**
   * 초기 화면이 출력되기 전에
   * HTML과 BODY에 UI 숨김 클래스를 즉시 적용한다.
   */
  private _applyPermissionUiImmediately(): void {
    if (this._shouldHideSharePointUi()) {
      document.documentElement.classList.add('tdk-hide-sp-ui');
      document.body.classList.add('tdk-hide-sp-ui');
    } else {
      document.documentElement.classList.remove('tdk-hide-sp-ui');
      document.body.classList.remove('tdk-hide-sp-ui');
    }
  }

  /**
   * 사용자 권한과 현재 페이지에 따라
   * SharePoint 기본 UI를 숨기거나 복원한다.
   */
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

  /**
   * SharePoint 기본 헤더, 명령 모음, 좌측 메뉴 등을 숨긴다.
   */
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
      const elements: NodeListOf<Element> =
          document.querySelectorAll(selector);

      elements.forEach((el: Element): void => {
        const htmlEl: HTMLElement = el as HTMLElement;

        htmlEl.style.setProperty(
            'display',
            'none',
            'important'
        );

        htmlEl.style.setProperty(
            'visibility',
            'hidden',
            'important'
        );
      });
    }
  }

  /**
   * 이전에 숨겼던 SharePoint 기본 UI를 복원한다.
   */
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
      const elements: NodeListOf<Element> =
          document.querySelectorAll(selector);

      elements.forEach((el: Element): void => {
        const htmlEl: HTMLElement = el as HTMLElement;

        htmlEl.style.removeProperty('display');
        htmlEl.style.removeProperty('visibility');
      });
    }
  }

  /**
   * SharePoint가 화면 요소를 다시 생성하는 경우에도
   * 기본 UI가 다시 나타나지 않도록 DOM 변경을 감시한다.
   */
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

  /**
   * SharePoint 기본 UI 감시 Observer를 종료한다.
   */
  private _disconnectUiObserver(): void {
    if (this._uiObserver) {
      this._uiObserver.disconnect();
      this._uiObserver = undefined;
    }
  }

  /**
   * 현재 페이지에 맞게 포털 화면을 동기화한다.
   */
  private _syncPageUi(): void {
    const isBoardPage: boolean = this._isBoardPage();

    const existingSection: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    /**
     * 게시판 페이지인 경우
     *
     * - 메인 포털 콘텐츠 제거
     * - 포스터 모달 닫기
     * - 배너 자동 슬라이드 종료
     */
    if (isBoardPage) {
      this._closePosterModal();

      if (existingSection) {
        existingSection.remove();
      }

      this._clearHeroBannerTimer();
      this._setActiveNav();

      return;
    }

    /**
     * 메인 페이지인 경우 포털 콘텐츠와 이벤트 연결
     */
    this._ensureBodySectionRendered();
    this._setActiveNav();
    this._bindNavEvents();
    this._bindLanguageChange();
    this._bindTableauPopupEvents();
    this._bindPosterModalEvents();

    const section: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    if (section) {
      this._bindHeroBannerEvents(section);
    }
  }

  /**
   * SharePoint 페이지 DOM 변경을 감지하여
   * 포털 화면과 이벤트를 다시 연결한다.
   */
  private _startPageSyncObserver(): void {
    if (this._pageObserver) {
      this._pageObserver.disconnect();
    }

    this._pageObserver = new MutationObserver((): void => {
      /**
       * DOM 변경이 연속으로 발생할 수 있으므로
       * 기존 Timer를 제거한 후 다시 실행한다.
       */
      if (this._syncTimer) {
        window.clearTimeout(this._syncTimer);
      }

      this._syncTimer = window.setTimeout((): void => {
        this._applyPermissionUi();

        if (!this._isBoardPage()) {
          if (
              !document.getElementById(
                  'tdk-product-section'
              )
          ) {
            this._ensureBodySectionRendered();
          }

          this._bindNavEvents();
          this._bindLanguageChange();
          this._setActiveNav();
          this._bindTableauPopupEvents();
          this._bindPosterModalEvents();

          const section: HTMLElement | null =
              document.getElementById(
                  'tdk-product-section'
              ) as HTMLElement | null;

          if (section) {
            this._bindHeroBannerEvents(section);
          }
        } else {
          this._closePosterModal();
          this._clearHeroBannerTimer();
        }
      }, 250);
    });

    this._pageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * 메인 포털 콘텐츠가 없으면 생성한다.
   *
   * SharePoint Canvas가 아직 생성되지 않은 경우
   * 최대 40회까지 다시 시도한다.
   */
  private _ensureBodySectionRendered(
      retryCount: number = 0
  ): void {
    const existingSection: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    /**
     * 포털 콘텐츠가 이미 있으면
     * HTML을 다시 만들지 않고 이벤트만 연결한다.
     */
    if (existingSection) {
      this._bindHeroBannerEvents(existingSection);
      this._bindTableauPopupEvents();
      this._bindPosterModalEvents();

      return;
    }

    /**
     * 메인 콘텐츠를 추가할 SharePoint 영역 확인
     */
    const target: HTMLElement | null =
        document.querySelector(
            '[data-automation-id="CanvasZone"]'
        ) as HTMLElement ||
        document.querySelector(
            '[data-automation-id="Canvas"]'
        ) as HTMLElement ||
        document.querySelector(
            '[role="main"]'
        ) as HTMLElement ||
        document.querySelector(
            'main'
        ) as HTMLElement ||
        document.querySelector(
            '#spPageCanvasContent'
        ) as HTMLElement;

    /**
     * 대상 영역이 아직 없으면 잠시 후 다시 시도한다.
     */
    if (!target) {
      if (retryCount < 40) {
        window.setTimeout((): void => {
          this._ensureBodySectionRendered(
              retryCount + 1
          );
        }, 300);
      }

      return;
    }

    /**
     * 메인 포털 Section 생성
     */
    const section: HTMLElement =
        document.createElement('section');

    section.id = 'tdk-product-section';
    section.className = 'tdk-product-section';
    section.setAttribute('data-tdk-custom', 'true');

    /**
     * 메인 포털 HTML 구성
     *
     * 구성:
     * 1. 배너 슬라이드와 MX 포스터
     * 2. Tableau 대시보드 카드
     * 3. 어플리케이션 바로가기
     * 4. 부문 채널
     */
    section.innerHTML = `
      <div class="tdk-product-wrap">
        ${getHeroBannerHtml(
        BANNER_URLS,
        POSTER_URL,
        this._locale
    )}

        ${getTableauSectionHtml(
        PRODUCT_CARDS,
        this._locale
    )}

        ${getQuickLinksHtml(
        QUICK_LINKS,
        this._locale
    )}

        ${getDepartmentSectionHtml(
        DEPARTMENT_LINKS,
        this._locale
    )}
      </div>
    `;

    /**
     * SharePoint 콘텐츠의 가장 위쪽에 포털 Section 추가
     */
    if (target.firstChild) {
      target.insertBefore(
          section,
          target.firstChild
      );
    } else {
      target.appendChild(section);
    }

    /**
     * 생성된 화면에 이벤트 연결
     */
    this._bindCardEvents(section);
    this._bindHeroBannerEvents(section);
    this._bindTableauPopupEvents();
    this._bindPosterModalEvents();
  }

  /**
   * 카드 ID로 PRODUCT_CARDS의 데이터를 찾는다.
   */
  private _getProductCardById(
      id: string
  ): ProductCard | undefined {
    let selected: ProductCard | undefined = undefined;

    for (const card of PRODUCT_CARDS) {
      if (card.id === id) {
        selected = card;
        break;
      }
    }

    return selected;
  }

  /**
   * Tableau 메인 카드 클릭 이벤트를 연결한다.
   */
  private _bindCardEvents(
      section: HTMLElement
  ): void {
    const buttons: NodeListOf<HTMLElement> =
        section.querySelectorAll('.tdk-main-card');

    const cardRow: HTMLElement | null =
        section.querySelector('.tdk-card-row');

    const detailPanel: HTMLElement | null =
        section.querySelector('#tdk-detail-panel');

    let activeCardId: string | null = null;

    buttons.forEach((btn: HTMLElement): void => {
      /**
       * 동일한 버튼에 이벤트가 중복으로 연결되는 것을 방지한다.
       */
      if (btn.dataset.tdkCardBound === 'true') {
        return;
      }

      btn.dataset.tdkCardBound = 'true';

      btn.addEventListener('click', (): void => {
        const id: string | null =
            btn.getAttribute('data-card-id');

        if (!id || !detailPanel) {
          return;
        }

        /**
         * 현재 열린 카드를 다시 클릭한 경우 상세 패널을 닫는다.
         */
        if (activeCardId === id) {
          buttons.forEach((el: HTMLElement): void => {
            el.classList.remove('is-active');
          });

          if (cardRow) {
            cardRow.classList.remove('has-active');
          }

          detailPanel.classList.remove('is-visible');

          window.setTimeout((): void => {
            if (
                !detailPanel.classList.contains(
                    'is-visible'
                )
            ) {
              detailPanel.innerHTML = '';
            }
          }, 320);

          activeCardId = null;

          return;
        }

        /**
         * 클릭한 카드의 데이터를 찾는다.
         */
        const selected: ProductCard | undefined =
            this._getProductCardById(id);

        if (!selected) {
          return;
        }

        /**
         * 선택한 카드의 상세 메뉴를 출력한다.
         */
        renderDetailPanel(
            selected,
            this._locale
        );

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

  /**
   * 메인 배너 슬라이드 이벤트를 연결한다.
   *
   * 기능:
   * - 이전 배너 이동
   * - 다음 배너 이동
   * - 3초마다 자동 이동
   */
  private _bindHeroBannerEvents(
      section: HTMLElement
  ): void {
    const banner: HTMLElement | null =
        section.querySelector(
            '#tdk-hero-banner'
        ) as HTMLElement | null;

    /**
     * 배너가 없거나 이미 이벤트가 연결된 경우 종료한다.
     */
    if (
        !banner ||
        banner.dataset.tdkBannerBound === 'true'
    ) {
      return;
    }

    banner.dataset.tdkBannerBound = 'true';

    const images: NodeListOf<HTMLElement> =
        banner.querySelectorAll(
            '.tdk-hero-banner__image'
        );

    const prevBtn: HTMLElement | null =
        banner.querySelector(
            '.tdk-hero-banner__arrow--prev'
        ) as HTMLElement | null;

    const nextBtn: HTMLElement | null =
        banner.querySelector(
            '.tdk-hero-banner__arrow--next'
        ) as HTMLElement | null;

    /**
     * 배너 이미지가 1장 이하이면 슬라이드를 실행하지 않는다.
     */
    if (images.length <= 1) {
      return;
    }

    let currentIndex: number = 0;

    /**
     * 지정한 순서의 배너 이미지를 표시한다.
     */
    const showImage = (
        nextIndex: number
    ): void => {
      images.forEach((img: HTMLElement): void => {
        img.classList.remove('is-active');
      });

      images[nextIndex].classList.add('is-active');
      currentIndex = nextIndex;
    };

    /**
     * 다음 배너 이미지를 표시한다.
     */
    const showNextImage = (): void => {
      const nextIndex: number =
          currentIndex === images.length - 1
              ? 0
              : currentIndex + 1;

      showImage(nextIndex);
    };

    /**
     * 이전 버튼 클릭
     */
    if (prevBtn) {
      prevBtn.addEventListener('click', (): void => {
        const nextIndex: number =
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1;

        showImage(nextIndex);
      });
    }

    /**
     * 다음 버튼 클릭
     */
    if (nextBtn) {
      nextBtn.addEventListener('click', (): void => {
        showNextImage();
      });
    }

    /**
     * 기존 자동 슬라이드 Timer 제거 후 다시 시작
     */
    this._clearHeroBannerTimer();

    this._heroBannerTimer =
        window.setInterval((): void => {
          showNextImage();
        }, 3000);
  }

  /**
   * 메인 배너 자동 슬라이드 Timer를 종료한다.
   */
  private _clearHeroBannerTimer(): void {
    if (this._heroBannerTimer) {
      window.clearInterval(
          this._heroBannerTimer
      );

      this._heroBannerTimer = undefined;
    }
  }

  /**
   * 포스터 모달을 닫는다.
   *
   * 처리 내용:
   * - 모달의 is-open 클래스 제거
   * - 접근성 상태 변경
   * - BODY 스크롤 잠금 해제
   */
  private _closePosterModal(): void {
    const modal: HTMLElement | null =
        document.getElementById(
            'tdk-poster-modal'
        ) as HTMLElement | null;

    const openBtn: HTMLElement | null =
        document.getElementById(
            'tdk-poster-open'
        ) as HTMLElement | null;

    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute(
          'aria-hidden',
          'true'
      );
    }

    if (openBtn) {
      openBtn.setAttribute(
          'aria-expanded',
          'false'
      );
    }

    document.body.classList.remove(
        'tdk-poster-modal-open'
    );
  }

  /**
   * MX 포스터 모달 이벤트를 연결한다.
   *
   * 기능:
   * - 포스터 카드 클릭 시 모달 열기
   * - 닫기 버튼 클릭 시 닫기
   * - 배경 클릭 시 닫기
   * - ESC 키 입력 시 닫기
   */
  private _bindPosterModalEvents(): void {
    const openBtn: HTMLElement | null =
        document.getElementById(
            'tdk-poster-open'
        ) as HTMLElement | null;

    const modal: HTMLElement | null =
        document.getElementById(
            'tdk-poster-modal'
        ) as HTMLElement | null;

    /**
     * 포스터 카드 또는 모달이 없으면 이벤트를 연결하지 않는다.
     */
    if (!openBtn || !modal) {
      return;
    }

    /**
     * 포스터 카드 클릭 이벤트
     */
    if (
        openBtn.dataset.tdkPosterBound !== 'true'
    ) {
      openBtn.dataset.tdkPosterBound = 'true';

      openBtn.addEventListener(
          'click',
          (): void => {
            modal.classList.add('is-open');

            modal.setAttribute(
                'aria-hidden',
                'false'
            );

            openBtn.setAttribute(
                'aria-expanded',
                'true'
            );

            /**
             * 모달이 열렸을 때 배경 화면의 스크롤을 막는다.
             */
            document.body.classList.add(
                'tdk-poster-modal-open'
            );

            /**
             * 모달이 열린 후 닫기 버튼으로 포커스를 이동한다.
             */
            window.setTimeout((): void => {
              const closeButton: HTMLElement | null =
                  modal.querySelector(
                      '.tdk-poster-modal__close'
                  ) as HTMLElement | null;

              if (closeButton) {
                closeButton.focus();
              }
            }, 0);
          }
      );
    }

    /**
     * data-poster-close="true"가 있는 요소에
     * 모달 닫기 이벤트를 연결한다.
     *
     * 적용 대상:
     * - 닫기 버튼
     * - 모달 뒤쪽 배경
     */
    const closeElements: NodeListOf<HTMLElement> =
        modal.querySelectorAll(
            '[data-poster-close="true"]'
        );

    closeElements.forEach(
        (element: HTMLElement): void => {
          if (
              element.dataset.tdkPosterCloseBound ===
              'true'
          ) {
            return;
          }

          element.dataset.tdkPosterCloseBound = 'true';

          element.addEventListener(
              'click',
              (): void => {
                this._closePosterModal();

                /**
                 * 모달을 닫은 후 포스터 카드로 포커스를 돌린다.
                 */
                const currentOpenBtn: HTMLElement | null =
                    document.getElementById(
                        'tdk-poster-open'
                    ) as HTMLElement | null;

                if (currentOpenBtn) {
                  currentOpenBtn.focus();
                }
              }
          );
        }
    );

    /**
     * ESC 키 이벤트는 문서 전체에 한 번만 연결한다.
     */
    if (!this._posterModalEscHandler) {
      this._posterModalEscHandler =
          (event: KeyboardEvent): void => {
            if (event.key !== 'Escape') {
              return;
            }

            const currentModal: HTMLElement | null =
                document.getElementById(
                    'tdk-poster-modal'
                ) as HTMLElement | null;

            /**
             * 모달이 없거나 열려 있지 않으면 아무 작업도 하지 않는다.
             */
            if (
                !currentModal ||
                !currentModal.classList.contains(
                    'is-open'
                )
            ) {
              return;
            }

            this._closePosterModal();

            /**
             * ESC로 닫은 후 포스터 카드에 포커스를 돌린다.
             */
            const currentOpenBtn: HTMLElement | null =
                document.getElementById(
                    'tdk-poster-open'
                ) as HTMLElement | null;

            if (currentOpenBtn) {
              currentOpenBtn.focus();
            }
          };

      document.addEventListener(
          'keydown',
          this._posterModalEscHandler
      );
    }
  }

  /**
   * Tableau 계정 팝업 이벤트를 연결한다.
   */
  private _bindTableauPopupEvents(): void {
    const openBtn: HTMLElement | null =
        document.getElementById(
            'tdk-tableau-account-btn'
        ) as HTMLElement | null;

    const popup: HTMLElement | null =
        document.getElementById(
            'tdk-tableau-popup'
        ) as HTMLElement | null;

    const closeBtn: HTMLElement | null =
        document.getElementById(
            'tdk-tableau-popup-close'
        ) as HTMLElement | null;

    const backdrop: HTMLElement | null =
        document.getElementById(
            'tdk-tableau-popup-backdrop'
        ) as HTMLElement | null;

    if (!openBtn || !popup) {
      return;
    }

    /**
     * Tableau 계정 팝업 열기
     */
    if (
        openBtn.dataset.tdkPopupBound !== 'true'
    ) {
      openBtn.dataset.tdkPopupBound = 'true';

      openBtn.addEventListener('click', (): void => {
        popup.classList.add('is-open');

        document.body.classList.add(
            'tdk-tableau-popup-open'
        );
      });
    }

    /**
     * Tableau 계정 팝업 닫기
     */
    const closePopup = (): void => {
      popup.classList.remove('is-open');

      document.body.classList.remove(
          'tdk-tableau-popup-open'
      );
    };

    if (
        closeBtn &&
        closeBtn.dataset.tdkPopupBound !== 'true'
    ) {
      closeBtn.dataset.tdkPopupBound = 'true';
      closeBtn.addEventListener(
          'click',
          closePopup
      );
    }

    if (
        backdrop &&
        backdrop.dataset.tdkPopupBound !== 'true'
    ) {
      backdrop.dataset.tdkPopupBound = 'true';
      backdrop.addEventListener(
          'click',
          closePopup
      );
    }

    /**
     * ESC 키로 Tableau 팝업 닫기
     */
    if (!this._tableauPopupEscHandler) {
      this._tableauPopupEscHandler =
          (event: KeyboardEvent): void => {
            if (event.key !== 'Escape') {
              return;
            }

            const currentPopup: HTMLElement | null =
                document.getElementById(
                    'tdk-tableau-popup'
                ) as HTMLElement | null;

            if (currentPopup) {
              currentPopup.classList.remove(
                  'is-open'
              );

              document.body.classList.remove(
                  'tdk-tableau-popup-open'
              );
            }
          };

      document.addEventListener(
          'keydown',
          this._tableauPopupEscHandler
      );
    }
  }

  /**
   * 언어 선택 변경 이벤트를 연결한다.
   */
  private _bindLanguageChange(): void {
    const langSelect: HTMLSelectElement | null =
        document.getElementById(
            'tdk-lang-select'
        ) as HTMLSelectElement | null;

    if (!langSelect) {
      return;
    }

    /**
     * 현재 언어를 Select에 반영한다.
     */
    langSelect.value = this._locale;

    /**
     * 이벤트 중복 연결 방지
     */
    if (
        langSelect.dataset.tdkBound === 'true'
    ) {
      return;
    }

    langSelect.dataset.tdkBound = 'true';

    langSelect.addEventListener(
        'change',
        (): void => {
          const value: Locale =
              langSelect.value as Locale;

          this._locale = value;

          /**
           * URL의 lang 파라미터를 변경한다.
           */
          const currentUrl: URL =
              new URL(window.location.href);

          currentUrl.searchParams.set(
              'lang',
              value
          );

          window.history.replaceState(
              {},
              '',
              currentUrl.toString()
          );

          /**
           * 선택한 언어로 포털 화면을 다시 출력한다.
           */
          this._rerenderCustomUi();
        }
    );
  }

  /**
   * 현재 언어에 맞춰 포털 사용자 정의 UI를 다시 출력한다.
   */
  private _rerenderCustomUi(): void {
    /**
     * 현재 선택된 Tableau 카드 ID를 저장한다.
     *
     * 언어 변경 후에도 선택 상태를 복원하기 위해 사용한다.
     */
    const activeCard: HTMLElement | null =
        document.querySelector(
            '.tdk-main-card.is-active'
        ) as HTMLElement | null;

    const activeCardId: string | null =
        activeCard
            ? activeCard.getAttribute(
                'data-card-id'
            )
            : null;

    /**
     * 상단 헤더 다시 출력
     */
    if (
        this._topPlaceholder &&
        this._topPlaceholder.domElement
    ) {
      const topText: string =
          this.properties.Top || 'TDK KOREA';

      this._topPlaceholder.domElement.innerHTML =
          getTopBannerHtml(
              topText,
              this._locale
          );
    }

    /**
     * 하단 푸터 다시 출력
     */
    if (
        this._bottomPlaceholder &&
        this._bottomPlaceholder.domElement
    ) {
      const bottomText: string =
          this.properties.Bottom ||
          '© TDK Korea Portal';

      this._bottomPlaceholder.domElement.innerHTML =
          getFooterHtml(
              bottomText,
              this._locale
          );
    }

    const wrap: HTMLElement | null =
        document.querySelector(
            '.tdk-product-wrap'
        ) as HTMLElement | null;

    if (!wrap) {
      this._ensureBodySectionRendered();
      return;
    }

    /**
     * 기존 배너 Timer와 포스터 모달 상태를 초기화한다.
     */
    this._clearHeroBannerTimer();
    this._closePosterModal();

    /**
     * 현재 언어 기준으로 메인 콘텐츠를 다시 생성한다.
     */
    wrap.innerHTML = `
      ${getHeroBannerHtml(
        BANNER_URLS,
        POSTER_URL,
        this._locale
    )}

      ${getTableauSectionHtml(
        PRODUCT_CARDS,
        this._locale
    )}

      ${getQuickLinksHtml(
        QUICK_LINKS,
        this._locale
    )}

      ${getDepartmentSectionHtml(
        DEPARTMENT_LINKS,
        this._locale
    )}
    `;

    const section: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    /**
     * 새로 생성된 HTML에 이벤트 다시 연결
     */
    if (section) {
      this._bindCardEvents(section);
      this._bindHeroBannerEvents(section);
    }

    this._bindLanguageChange();
    this._bindNavEvents();
    this._bindTableauPopupEvents();
    this._bindPosterModalEvents();
    this._setActiveNav();

    /**
     * 언어 변경 전에 선택되어 있던 Tableau 카드 복원
     */
    if (activeCardId && section) {
      const restoredButton: HTMLElement | null =
          section.querySelector(
              `.tdk-main-card[data-card-id="${activeCardId}"]`
          ) as HTMLElement | null;

      const restoredCard: ProductCard | undefined =
          this._getProductCardById(
              activeCardId
          );

      if (
          restoredButton &&
          restoredCard
      ) {
        const cardRow: HTMLElement | null =
            section.querySelector(
                '.tdk-card-row'
            ) as HTMLElement | null;

        restoredButton.classList.add(
            'is-active'
        );

        if (cardRow) {
          cardRow.classList.add(
              'has-active'
          );
        }

        renderDetailPanel(
            restoredCard,
            this._locale
        );
      }
    }
  }

  /**
   * 상단 내비게이션 클릭 이벤트를 연결한다.
   */
  private _bindNavEvents(): void {
    const navButtons: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll(
            '.tdk-nav-btn'
        );

    navButtons.forEach(
        (btn: HTMLAnchorElement): void => {
          /**
           * 이벤트 중복 연결 방지
           */
          if (
              btn.dataset.tdkNavBound === 'true'
          ) {
            return;
          }

          btn.dataset.tdkNavBound = 'true';

          btn.addEventListener(
              'click',
              (): void => {
                navButtons.forEach(
                    (el: HTMLAnchorElement): void => {
                      el.classList.remove(
                          'is-active'
                      );

                      el.removeAttribute(
                          'aria-current'
                      );
                    }
                );

                btn.classList.add('is-active');
                btn.setAttribute(
                    'aria-current',
                    'page'
                );
              }
          );
        }
    );
  }

  /**
   * SharePoint 내부 페이지 이동으로 URL이 변경되는지 감시한다.
   */
  private _watchUrlChange(): void {
    if (this._urlWatchTimer) {
      window.clearInterval(
          this._urlWatchTimer
      );
    }

    this._urlWatchTimer =
        window.setInterval((): void => {
          if (
              this._lastUrl !==
              window.location.href
          ) {
            this._lastUrl =
                window.location.href;

            this._locale =
                this._getLocale();

            this._applyPermissionUiImmediately();

            /**
             * 첫 번째 화면 동기화
             */
            window.setTimeout((): void => {
              this._applyPermissionUi();
              this._syncPageUi();
              this._bindLanguageChange();
              this._bindNavEvents();
              this._bindTableauPopupEvents();
              this._bindPosterModalEvents();
            }, 150);

            /**
             * SharePoint DOM 출력 지연을 고려한 두 번째 동기화
             */
            window.setTimeout((): void => {
              this._applyPermissionUi();
              this._syncPageUi();
              this._bindTableauPopupEvents();
              this._bindPosterModalEvents();
            }, 500);
          }
        }, 200);
  }

  /**
   * 현재 페이지에 맞는 내비게이션 메뉴를 활성화한다.
   */
  private _setActiveNav(): void {
    const path: string =
        decodeURIComponent(
            window.location.pathname
        ).toLowerCase();

    const navButtons: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll(
            '.tdk-nav-btn'
        );

    const isBoardPage: boolean =
        this._isBoardPage();

    navButtons.forEach(
        (btn: HTMLAnchorElement): void => {
          btn.classList.remove('is-active');
          btn.removeAttribute('aria-current');

          const href: string =
              decodeURIComponent(
                  btn.href
              ).toLowerCase();

          /**
           * 게시판 페이지 활성화
           */
          if (isBoardPage) {
            if (
                href.indexOf('게시판.aspx') > -1 ||
                href.indexOf('noticeboard.aspx') > -1
            ) {
              btn.classList.add('is-active');

              btn.setAttribute(
                  'aria-current',
                  'page'
              );
            }
          } else {
            /**
             * 메인 페이지 활성화
             */
            if (
                href.indexOf(
                    '/sitepages/home.aspx'
                ) > -1 ||
                path.indexOf(
                    '/sitepages/home.aspx'
                ) > -1
            ) {
              btn.classList.add('is-active');

              btn.setAttribute(
                  'aria-current',
                  'page'
              );
            }
          }
        }
    );
  }

  /**
   * 사용자 정의 CSS를 문서 HEAD에 추가한다.
   */
  private _injectStyles(): void {
    const existingStyle: HTMLElement | null =
        document.getElementById(
            'tdk-custom-style'
        );

    /**
     * 기존 Style이 있으면 제거하여 중복 적용을 방지한다.
     */
    if (existingStyle) {
      existingStyle.remove();
    }

    const style: HTMLStyleElement =
        document.createElement('style');

    style.id = 'tdk-custom-style';
    style.innerHTML = CUSTOM_STYLES;

    document.head.appendChild(style);
  }

  /**
   * Application Customizer 종료 시
   * Observer, Timer, 이벤트를 정리한다.
   */
  private _onDispose = (): void => {
    /**
     * SharePoint UI Observer 종료
     */
    this._disconnectUiObserver();

    /**
     * 페이지 DOM Observer 종료
     */
    if (this._pageObserver) {
      this._pageObserver.disconnect();
      this._pageObserver = undefined;
    }

    /**
     * URL 감시 Timer 종료
     */
    if (this._urlWatchTimer) {
      window.clearInterval(
          this._urlWatchTimer
      );

      this._urlWatchTimer = undefined;
    }

    /**
     * 화면 동기화 Timer 종료
     */
    if (this._syncTimer) {
      window.clearTimeout(
          this._syncTimer
      );

      this._syncTimer = undefined;
    }

    /**
     * 배너 자동 슬라이드 Timer 종료
     */
    this._clearHeroBannerTimer();

    /**
     * Tableau 팝업 ESC 이벤트 제거
     */
    if (this._tableauPopupEscHandler) {
      document.removeEventListener(
          'keydown',
          this._tableauPopupEscHandler
      );

      this._tableauPopupEscHandler = undefined;
    }

    /**
     * 포스터 모달 ESC 이벤트 제거
     */
    if (this._posterModalEscHandler) {
      document.removeEventListener(
          'keydown',
          this._posterModalEscHandler
      );

      this._posterModalEscHandler = undefined;
    }

    /**
     * BODY에 남아 있을 수 있는 모달 상태 클래스 제거
     */
    document.body.classList.remove(
        'tdk-tableau-popup-open'
    );

    document.body.classList.remove(
        'tdk-poster-modal-open'
    );

    console.log(
        '[TdkSharepointApplicationCustomizer] Disposed placeholders.'
    );
  };
}