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
  NOTICE_POPUP_IMAGE_URL
} from '../data/constants';

import { getTopBannerHtml } from '../components/topBanner';
import { getFooterHtml } from '../components/footer';
import { getHeroBannerHtml } from '../components/heroBanner';
import { getQuickLinksHtml } from '../components/quickLinksSection';
import { getTableauSectionHtml } from '../components/cardlist';
import { getDepartmentSectionHtml } from '../components/departmentSection';
import { renderDetailPanel } from '../components/detailPanel';

import {
  getNoticePopupHtml,
  NOTICE_POPUP_IDS,
  NOTICE_POPUP_STORAGE_KEY
} from '../components/noticePopup';

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
 * - 한국어, 영어, 일본어 변경
 * - 메인 배너 자동 슬라이드
 * - Tableau 카드 상세 메뉴
 * - Tableau 공용계정 팝업
 * - 메인 화면 공지 팝업
 * - 오늘 하루 보지 않음
 * - 사용자 권한에 따른 SharePoint 기본 UI 제어
 * - SharePoint 내부 페이지 이동 감지
 */
export default class TdkSharepointApplicationCustomizer
    extends BaseApplicationCustomizer<ITdkSharepointApplicationCustomizerProperties> {

  /* =========================
     1. PLACEHOLDER
  ========================= */

  /**
   * SharePoint 상단·하단 Placeholder
   */
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;


  /* =========================
     2. LANGUAGE
  ========================= */

  /**
   * 현재 화면에서 사용하는 언어
   */
  private _locale: Locale = 'ko';


  /* =========================
     3. OBSERVER
  ========================= */

  /**
   * SharePoint 기본 UI 변경 감지용 Observer
   */
  private _uiObserver: MutationObserver | undefined;

  /**
   * SharePoint 페이지 DOM 변경 감지용 Observer
   */
  private _pageObserver: MutationObserver | undefined;


  /* =========================
     4. TIMER
  ========================= */

  /**
   * URL 변경 확인 Timer
   */
  private _urlWatchTimer: number | undefined;

  /**
   * 페이지 화면 동기화 Timer
   */
  private _syncTimer: number | undefined;

  /**
   * 메인 배너 자동 슬라이드 Timer
   */
  private _heroBannerTimer: number | undefined;


  /* =========================
     5. PAGE STATE
  ========================= */

  /**
   * SharePoint 내부 페이지 이동을 확인하기 위해
   * 마지막으로 확인한 URL을 저장한다.
   */
  private _lastUrl: string = window.location.href;

  /**
   * 현재 메인 화면 방문 중 공지 팝업을
   * 이미 표시했거나 확인했는지 여부
   *
   * DOM Observer가 반복 실행되더라도
   * 공지 팝업이 계속 다시 열리는 것을 방지한다.
   */
  private _noticePopupHandledForCurrentVisit: boolean = false;


  /* =========================
     6. KEYBOARD EVENT
  ========================= */

  /**
   * Tableau 팝업 ESC 키 이벤트
   */
  private _tableauPopupEscHandler:
      ((event: KeyboardEvent) => void) | undefined;

  /**
   * 공지 팝업 ESC 키 이벤트
   */
  private _noticePopupEscHandler:
      ((event: KeyboardEvent) => void) | undefined;


  /* =========================
     7. INITIALIZE
  ========================= */

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
     * SharePoint 화면이 완전히 출력되기 전에도
     * 사용자 권한에 맞게 기본 UI 숨김 클래스를 적용한다.
     */
    this._applyPermissionUiImmediately();

    /**
     * SharePoint 상단·하단 Placeholder 변경 이벤트 등록
     */
    this.context.placeholderProvider.changedEvent.add(
        this,
        this._renderPlaceholders
    );

    /**
     * SharePoint 화면 출력 후
     * 포털 콘텐츠와 이벤트를 연결한다.
     */
    window.setTimeout((): void => {
      this._applyPermissionUi();
      this._syncPageUi();

      this._bindLanguageChange();
      this._bindNavEvents();
      this._bindTableauPopupEvents();
      this._bindNoticePopupEvents();

      this._showNoticePopupIfNeeded();

      this._watchUrlChange();
      this._startPageSyncObserver();
    }, 300);

    return Promise.resolve();
  }


  /* =========================
     8. LANGUAGE
  ========================= */

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


  /* =========================
     9. PLACEHOLDER
  ========================= */

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
              {
                onDispose: this._onDispose
              }
          );

      if (
          this._topPlaceholder &&
          this._topPlaceholder.domElement
      ) {
        const topText: string =
            this.properties.Top || 'TDK Korea';

        this._topPlaceholder.domElement.innerHTML =
            getTopBannerHtml(
                topText,
                this._locale
            );
      }
    }

    /**
     * 하단 푸터 출력
     */
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
          this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Bottom,
              {
                onDispose: this._onDispose
              }
          );

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
    }
  };


  /* =========================
     10. USER PERMISSION
  ========================= */

  /**
   * 현재 로그인 사용자의 이메일 또는 로그인 이름을 반환한다.
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
   * 현재 사용자가 SharePoint 편집 UI를
   * 볼 수 있는 사용자인지 확인한다.
   */
  private _isAllowedEditor(): boolean {
    const currentUser: string =
        this._getCurrentUserEmail();

    const allowedEmail: string =
        'hayoon.kang@tdk.com';

    return (
        currentUser === allowedEmail ||
        currentUser.indexOf(allowedEmail) > -1
    );
  }


  /* =========================
     11. PAGE CHECK
  ========================= */

  /**
   * 현재 페이지가 게시판 페이지인지 확인한다.
   *
   * 게시판에서는:
   * - SharePoint 기본 UI를 표시한다.
   * - 메인 포털 콘텐츠를 표시하지 않는다.
   * - 공지 팝업을 표시하지 않는다.
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
    if (this._isBoardPage()) {
      return false;
    }

    return !this._isAllowedEditor();
  }


  /* =========================
     12. SHAREPOINT UI
  ========================= */

  /**
   * 페이지가 완전히 출력되기 전에
   * SharePoint UI 숨김 클래스를 우선 적용한다.
   */
  private _applyPermissionUiImmediately(): void {
    if (this._shouldHideSharePointUi()) {
      document.documentElement.classList.add(
          'tdk-hide-sp-ui'
      );

      document.body.classList.add(
          'tdk-hide-sp-ui'
      );
    } else {
      document.documentElement.classList.remove(
          'tdk-hide-sp-ui'
      );

      document.body.classList.remove(
          'tdk-hide-sp-ui'
      );
    }
  }

  /**
   * 사용자 권한과 현재 페이지에 따라
   * SharePoint 기본 UI를 숨기거나 복원한다.
   */
  private _applyPermissionUi(): void {
    if (this._shouldHideSharePointUi()) {
      document.documentElement.classList.add(
          'tdk-hide-sp-ui'
      );

      document.body.classList.add(
          'tdk-hide-sp-ui'
      );

      this._hideNativeSharePointUi();
      this._observeAndHideNativeUi();
    } else {
      document.documentElement.classList.remove(
          'tdk-hide-sp-ui'
      );

      document.body.classList.remove(
          'tdk-hide-sp-ui'
      );

      this._restoreNativeSharePointUi();
      this._disconnectUiObserver();
    }
  }

  /**
   * SharePoint 기본 헤더, 명령 모음,
   * 좌측 메뉴 등을 숨긴다.
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
        const htmlEl: HTMLElement =
            el as HTMLElement;

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
   * 이전에 숨긴 SharePoint 기본 UI를 복원한다.
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
        const htmlEl: HTMLElement =
            el as HTMLElement;

        htmlEl.style.removeProperty('display');
        htmlEl.style.removeProperty('visibility');
      });
    }
  }

  /**
   * SharePoint가 화면 요소를 다시 생성하더라도
   * 숨긴 기본 UI가 다시 나타나지 않도록 DOM을 감시한다.
   */
  private _observeAndHideNativeUi(): void {
    if (this._uiObserver) {
      return;
    }

    this._uiObserver =
        new MutationObserver((): void => {
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


  /* =========================
     13. PAGE SYNCHRONIZATION
  ========================= */

  /**
   * 현재 페이지에 맞게 포털 화면을 동기화한다.
   */
  private _syncPageUi(): void {
    const isBoardPage: boolean =
        this._isBoardPage();

    const existingSection: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    /**
     * 게시판 페이지 처리
     */
    if (isBoardPage) {
      /**
       * 열려 있는 공지 팝업을 닫는다.
       *
       * 오늘 하루 보지 않음 설정은 저장하지 않는다.
       */
      this._closeNoticePopup(
          false,
          false
      );

      if (existingSection) {
        existingSection.remove();
      }

      this._clearHeroBannerTimer();
      this._setActiveNav();

      return;
    }

    /**
     * 메인 페이지 처리
     */
    this._ensureBodySectionRendered();

    this._setActiveNav();
    this._bindNavEvents();
    this._bindLanguageChange();
    this._bindTableauPopupEvents();
    this._bindNoticePopupEvents();

    const section: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    if (section) {
      this._bindHeroBannerEvents(section);
    }

    this._showNoticePopupIfNeeded();
  }

  /**
   * SharePoint 페이지 DOM 변경을 감지하여
   * 포털 화면과 이벤트를 다시 연결한다.
   */
  private _startPageSyncObserver(): void {
    if (this._pageObserver) {
      this._pageObserver.disconnect();
    }

    this._pageObserver =
        new MutationObserver((): void => {
          /**
           * DOM 변경이 연속으로 발생할 수 있으므로
           * 기존 Timer를 제거하고 다시 등록한다.
           */
          if (this._syncTimer) {
            window.clearTimeout(
                this._syncTimer
            );
          }

          this._syncTimer =
              window.setTimeout((): void => {
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
                  this._bindNoticePopupEvents();

                  const section: HTMLElement | null =
                      document.getElementById(
                          'tdk-product-section'
                      ) as HTMLElement | null;

                  if (section) {
                    this._bindHeroBannerEvents(
                        section
                    );
                  }

                  this._showNoticePopupIfNeeded();
                } else {
                  this._closeNoticePopup(
                      false,
                      false
                  );

                  this._clearHeroBannerTimer();
                }
              }, 250);
        });

    this._pageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }


  /* =========================
     14. MAIN BODY RENDER
  ========================= */

  /**
   * 메인 포털 콘텐츠가 없으면 새로 생성한다.
   *
   * SharePoint Canvas가 아직 만들어지지 않은 경우
   * 최대 40회까지 0.3초 간격으로 다시 시도한다.
   */
  private _ensureBodySectionRendered(
      retryCount: number = 0
  ): void {
    const existingSection: HTMLElement | null =
        document.getElementById(
            'tdk-product-section'
        ) as HTMLElement | null;

    /**
     * 포털 콘텐츠가 이미 존재하면
     * HTML을 다시 만들지 않고 이벤트만 연결한다.
     */
    if (existingSection) {
      this._bindHeroBannerEvents(
          existingSection
      );

      this._bindTableauPopupEvents();
      this._bindNoticePopupEvents();
      this._showNoticePopupIfNeeded();

      return;
    }

    /**
     * 메인 포털 콘텐츠를 추가할
     * SharePoint 영역을 찾는다.
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

    section.setAttribute(
        'data-tdk-custom',
        'true'
    );

    /**
     * 메인 포털 HTML 구성
     *
     * 구성:
     * 1. 메인 배너 슬라이드
     * 2. Tableau 대시보드 카드
     * 3. 어플리케이션 바로가기
     * 4. 부문 채널
     * 5. 메인 공지 팝업
     */
    section.innerHTML = `
      <div class="tdk-product-wrap">
        ${getHeroBannerHtml(
        BANNER_URLS,
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

        ${getNoticePopupHtml(
        NOTICE_POPUP_IMAGE_URL,
        this._locale
    )}
      </div>
    `;

    /**
     * SharePoint 콘텐츠 영역 가장 위쪽에
     * 포털 Section을 추가한다.
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
     * 생성된 화면에 이벤트를 연결한다.
     */
    this._bindCardEvents(section);
    this._bindHeroBannerEvents(section);
    this._bindTableauPopupEvents();
    this._bindNoticePopupEvents();

    /**
     * 오늘 하루 보지 않음 여부를 확인한 후
     * 필요한 경우 공지 팝업을 표시한다.
     */
    this._showNoticePopupIfNeeded();
  }


  /* =========================
     15. PRODUCT CARD
  ========================= */

  /**
   * 카드 ID로 PRODUCT_CARDS의 데이터를 찾는다.
   */
  private _getProductCardById(
      id: string
  ): ProductCard | undefined {
    let selected: ProductCard | undefined =
        undefined;

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
        section.querySelectorAll(
            '.tdk-main-card'
        );

    const cardRow: HTMLElement | null =
        section.querySelector(
            '.tdk-card-row'
        );

    const detailPanel: HTMLElement | null =
        section.querySelector(
            '#tdk-detail-panel'
        );

    let activeCardId: string | null = null;

    buttons.forEach(
        (btn: HTMLElement): void => {
          /**
           * 이벤트 중복 연결 방지
           */
          if (
              btn.dataset.tdkCardBound ===
              'true'
          ) {
            return;
          }

          btn.dataset.tdkCardBound = 'true';

          btn.addEventListener(
              'click',
              (): void => {
                const id: string | null =
                    btn.getAttribute(
                        'data-card-id'
                    );

                if (!id || !detailPanel) {
                  return;
                }

                /**
                 * 현재 열린 카드를 다시 클릭하면
                 * 상세 패널을 닫는다.
                 */
                if (activeCardId === id) {
                  buttons.forEach(
                      (el: HTMLElement): void => {
                        el.classList.remove(
                            'is-active'
                        );
                      }
                  );

                  if (cardRow) {
                    cardRow.classList.remove(
                        'has-active'
                    );
                  }

                  detailPanel.classList.remove(
                      'is-visible'
                  );

                  window.setTimeout(
                      (): void => {
                        if (
                            !detailPanel.classList.contains(
                                'is-visible'
                            )
                        ) {
                          detailPanel.innerHTML = '';
                        }
                      },
                      320
                  );

                  activeCardId = null;

                  return;
                }

                /**
                 * 클릭한 카드 데이터를 찾는다.
                 */
                const selected:
                    ProductCard | undefined =
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

                buttons.forEach(
                    (el: HTMLElement): void => {
                      el.classList.remove(
                          'is-active'
                      );
                    }
                );

                btn.classList.add(
                    'is-active'
                );

                if (cardRow) {
                  cardRow.classList.add(
                      'has-active'
                  );
                }

                window.requestAnimationFrame(
                    (): void => {
                      detailPanel.classList.add(
                          'is-visible'
                      );
                    }
                );

                activeCardId = id;
              }
          );
        }
    );
  }


  /* =========================
     16. HERO BANNER
  ========================= */

  /**
   * 메인 배너 슬라이드 이벤트를 연결한다.
   *
   * 기능:
   * - 이전 배너 이동
   * - 다음 배너 이동
   * - 3초마다 다음 배너 자동 표시
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
        banner.dataset.tdkBannerBound ===
        'true'
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
     * 배너 이미지가 1장 이하이면
     * 슬라이드 기능을 실행하지 않는다.
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
      images.forEach(
          (img: HTMLElement): void => {
            img.classList.remove(
                'is-active'
            );
          }
      );

      images[nextIndex].classList.add(
          'is-active'
      );

      currentIndex = nextIndex;
    };

    /**
     * 다음 순서의 배너 이미지를 표시한다.
     */
    const showNextImage = (): void => {
      const nextIndex: number =
          currentIndex === images.length - 1
              ? 0
              : currentIndex + 1;

      showImage(nextIndex);
    };

    /**
     * 이전 버튼 클릭 이벤트
     */
    if (prevBtn) {
      prevBtn.addEventListener(
          'click',
          (): void => {
            const nextIndex: number =
                currentIndex === 0
                    ? images.length - 1
                    : currentIndex - 1;

            showImage(nextIndex);
          }
      );
    }

    /**
     * 다음 버튼 클릭 이벤트
     */
    if (nextBtn) {
      nextBtn.addEventListener(
          'click',
          (): void => {
            showNextImage();
          }
      );
    }

    /**
     * 기존 Timer 제거 후
     * 3초 간격 자동 슬라이드를 시작한다.
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


  /* =========================
     17. NOTICE POPUP STORAGE
  ========================= */

  /**
   * localStorage에 저장된
   * 공지 팝업 숨김 종료 시간을 반환한다.
   */
  private _getNoticePopupHiddenUntil(): number {
    try {
      const storedValue: string | null =
          window.localStorage.getItem(
              NOTICE_POPUP_STORAGE_KEY
          );

      if (!storedValue) {
        return 0;
      }

      const hiddenUntil: number =
          Number(storedValue);

      /**
       * 저장된 값이 숫자가 아니면 삭제한다.
       */
      if (isNaN(hiddenUntil)) {
        window.localStorage.removeItem(
            NOTICE_POPUP_STORAGE_KEY
        );

        return 0;
      }

      return hiddenUntil;
    } catch (error) {
      /**
       * 브라우저 정책 등으로 localStorage 사용이
       * 불가능한 경우에는 숨김 설정을 적용하지 않는다.
       */
      console.warn(
          '[TDK Notice Popup] Failed to read localStorage.',
          error
      );

      return 0;
    }
  }

  /**
   * 다음 날 00시까지 공지 팝업을 숨기도록 저장한다.
   */
  private _hideNoticePopupUntilTomorrow(): void {
    try {
      const tomorrow: Date = new Date();

      /**
       * 현재 날짜의 다음 날 00:00:00으로 설정한다.
       */
      tomorrow.setHours(
          24,
          0,
          0,
          0
      );

      window.localStorage.setItem(
          NOTICE_POPUP_STORAGE_KEY,
          tomorrow.getTime().toString()
      );
    } catch (error) {
      console.warn(
          '[TDK Notice Popup] Failed to save localStorage.',
          error
      );
    }
  }


  /* =========================
     18. NOTICE POPUP OPEN/CLOSE
  ========================= */

  /**
   * 공지 팝업을 연다.
   */
  private _openNoticePopup(): void {
    const popup: HTMLElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.popup
        ) as HTMLElement | null;

    if (!popup) {
      return;
    }

    popup.classList.add('is-open');

    popup.setAttribute(
        'aria-hidden',
        'false'
    );

    document.body.classList.add(
        'tdk-notice-popup-open'
    );

    this._noticePopupHandledForCurrentVisit =
        true;

    /**
     * 팝업이 열린 후 닫기 버튼으로 포커스를 이동한다.
     */
    window.setTimeout((): void => {
      const closeButton: HTMLElement | null =
          document.getElementById(
              NOTICE_POPUP_IDS.closeIcon
          ) as HTMLElement | null;

      if (closeButton) {
        closeButton.focus();
      }
    }, 0);
  }

  /**
   * 오늘 하루 보지 않음 상태와 현재 방문 상태를 확인하여
   * 필요한 경우에만 공지 팝업을 표시한다.
   */
  private _showNoticePopupIfNeeded(): void {
    /**
     * 게시판에서는 공지 팝업을 표시하지 않는다.
     */
    if (this._isBoardPage()) {
      return;
    }

    /**
     * 현재 방문 중 이미 팝업을 처리했다면
     * 다시 표시하지 않는다.
     */
    if (
        this._noticePopupHandledForCurrentVisit
    ) {
      return;
    }

    const popup: HTMLElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.popup
        ) as HTMLElement | null;

    if (!popup) {
      return;
    }

    const hiddenUntil: number =
        this._getNoticePopupHiddenUntil();

    /**
     * 현재 시간이 숨김 종료 시간보다 이전이면
     * 오늘은 팝업을 표시하지 않는다.
     */
    if (
        hiddenUntil > 0 &&
        Date.now() < hiddenUntil
    ) {
      this._noticePopupHandledForCurrentVisit =
          true;

      return;
    }

    /**
     * 숨김 기간이 지났으면 기존 저장값을 제거한다.
     */
    if (
        hiddenUntil > 0 &&
        Date.now() >= hiddenUntil
    ) {
      try {
        window.localStorage.removeItem(
            NOTICE_POPUP_STORAGE_KEY
        );
      } catch (error) {
        console.warn(
            '[TDK Notice Popup] Failed to remove expired value.',
            error
        );
      }
    }

    this._openNoticePopup();
  }

  /**
   * 공지 팝업을 닫는다.
   *
   * @param saveTodayPreference
   * 체크박스가 선택된 경우 오늘 하루 숨김 상태를 저장할지 여부
   *
   * @param markHandled
   * 현재 방문에서 팝업을 이미 처리한 것으로 표시할지 여부
   */
  private _closeNoticePopup(
      saveTodayPreference: boolean = true,
      markHandled: boolean = true
  ): void {
    const popup: HTMLElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.popup
        ) as HTMLElement | null;

    const checkbox: HTMLInputElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.todayCheckbox
        ) as HTMLInputElement | null;

    /**
     * 사용자가 오늘 하루 보지 않음을 선택했다면
     * 다음 날 00시까지 숨김 상태를 저장한다.
     */
    if (
        saveTodayPreference &&
        checkbox &&
        checkbox.checked
    ) {
      this._hideNoticePopupUntilTomorrow();
    }

    if (popup) {
      popup.classList.remove('is-open');

      popup.setAttribute(
          'aria-hidden',
          'true'
      );
    }

    document.body.classList.remove(
        'tdk-notice-popup-open'
    );

    if (markHandled) {
      this._noticePopupHandledForCurrentVisit =
          true;
    }
  }


  /* =========================
     19. NOTICE POPUP EVENT
  ========================= */

  /**
   * 공지 팝업 닫기 이벤트를 연결한다.
   *
   * 닫기 대상:
   * - 우측 상단 X 버튼
   * - 하단 닫기 버튼
   * - 팝업 바깥 배경
   * - ESC 키
   */
  private _bindNoticePopupEvents(): void {
    const popup: HTMLElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.popup
        ) as HTMLElement | null;

    if (!popup) {
      return;
    }

    /**
     * data-notice-close="true"가 적용된 요소에
     * 닫기 이벤트를 연결한다.
     */
    const closeElements:
        NodeListOf<HTMLElement> =
        popup.querySelectorAll(
            '[data-notice-close="true"]'
        );

    closeElements.forEach(
        (element: HTMLElement): void => {
          /**
           * 이벤트 중복 연결 방지
           */
          if (
              element.dataset.tdkNoticeCloseBound ===
              'true'
          ) {
            return;
          }

          element.dataset.tdkNoticeCloseBound =
              'true';

          element.addEventListener(
              'click',
              (): void => {
                this._closeNoticePopup(
                    true,
                    true
                );
              }
          );
        }
    );

    /**
     * ESC 키 이벤트는 문서 전체에 한 번만 연결한다.
     */
    if (!this._noticePopupEscHandler) {
      this._noticePopupEscHandler =
          (event: KeyboardEvent): void => {
            if (event.key !== 'Escape') {
              return;
            }

            const currentPopup:
                HTMLElement | null =
                document.getElementById(
                    NOTICE_POPUP_IDS.popup
                ) as HTMLElement | null;

            if (
                !currentPopup ||
                !currentPopup.classList.contains(
                    'is-open'
                )
            ) {
              return;
            }

            this._closeNoticePopup(
                true,
                true
            );
          };

      document.addEventListener(
          'keydown',
          this._noticePopupEscHandler
      );
    }
  }


  /* =========================
     20. TABLEAU POPUP
  ========================= */

  /**
   * Tableau 공용계정 팝업 이벤트를 연결한다.
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
     * Tableau 팝업 열기
     */
    if (
        openBtn.dataset.tdkPopupBound !==
        'true'
    ) {
      openBtn.dataset.tdkPopupBound =
          'true';

      openBtn.addEventListener(
          'click',
          (): void => {
            popup.classList.add(
                'is-open'
            );

            document.body.classList.add(
                'tdk-tableau-popup-open'
            );
          }
      );
    }

    /**
     * Tableau 팝업 닫기
     */
    const closePopup = (): void => {
      popup.classList.remove('is-open');

      document.body.classList.remove(
          'tdk-tableau-popup-open'
      );
    };

    if (
        closeBtn &&
        closeBtn.dataset.tdkPopupBound !==
        'true'
    ) {
      closeBtn.dataset.tdkPopupBound =
          'true';

      closeBtn.addEventListener(
          'click',
          closePopup
      );
    }

    if (
        backdrop &&
        backdrop.dataset.tdkPopupBound !==
        'true'
    ) {
      backdrop.dataset.tdkPopupBound =
          'true';

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

            const currentPopup:
                HTMLElement | null =
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


  /* =========================
     21. LANGUAGE CHANGE
  ========================= */

  /**
   * 언어 선택 변경 이벤트를 연결한다.
   */
  private _bindLanguageChange(): void {
    const langSelect:
        HTMLSelectElement | null =
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
        langSelect.dataset.tdkBound ===
        'true'
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
           * 언어 변경을 일반 페이지 이동으로
           * 인식하지 않도록 현재 URL 값을 갱신한다.
           */
          this._lastUrl =
              currentUrl.toString();

          this._rerenderCustomUi();
        }
    );
  }


  /* =========================
     22. UI RERENDER
  ========================= */

  /**
   * 현재 언어에 맞게
   * 포털 사용자 정의 UI를 다시 출력한다.
   */
  private _rerenderCustomUi(): void {
    /**
     * 현재 선택된 Tableau 카드 ID 저장
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
     * 공지 팝업이 현재 열려 있는지 저장한다.
     */
    const currentNoticePopup:
        HTMLElement | null =
        document.getElementById(
            NOTICE_POPUP_IDS.popup
        ) as HTMLElement | null;

    const wasNoticePopupOpen: boolean =
        currentNoticePopup
            ? currentNoticePopup.classList.contains(
                'is-open'
            )
            : false;

    /**
     * 상단 헤더 다시 출력
     */
    if (
        this._topPlaceholder &&
        this._topPlaceholder.domElement
    ) {
      const topText: string =
          this.properties.Top ||
          'TDK KOREA';

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
     * 기존 배너 Timer 종료
     */
    this._clearHeroBannerTimer();

    /**
     * 기존 공지 팝업 상태 정리
     *
     * 오늘 하루 보지 않음은 저장하지 않고,
     * 방문 처리 상태도 변경하지 않는다.
     */
    this._closeNoticePopup(
        false,
        false
    );

    /**
     * 현재 언어를 기준으로 메인 콘텐츠 다시 생성
     */
    wrap.innerHTML = `
      ${getHeroBannerHtml(
        BANNER_URLS,
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

      ${getNoticePopupHtml(
        NOTICE_POPUP_IMAGE_URL,
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
    this._bindNoticePopupEvents();
    this._setActiveNav();

    /**
     * 언어 변경 전 공지 팝업이 열려 있었다면
     * 새 언어 화면에서도 다시 연다.
     */
    if (wasNoticePopupOpen) {
      this._openNoticePopup();
    } else {
      this._showNoticePopupIfNeeded();
    }

    /**
     * 언어 변경 전에 선택되어 있던
     * Tableau 카드 상태 복원
     */
    if (activeCardId && section) {
      const restoredButton:
          HTMLElement | null =
          section.querySelector(
              `.tdk-main-card[data-card-id="${activeCardId}"]`
          ) as HTMLElement | null;

      const restoredCard:
          ProductCard | undefined =
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


  /* =========================
     23. NAVIGATION
  ========================= */

  /**
   * 상단 내비게이션 메뉴 클릭 이벤트를 연결한다.
   */
  private _bindNavEvents(): void {
    const navButtons:
        NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll(
            '.tdk-nav-btn'
        );

    navButtons.forEach(
        (btn: HTMLAnchorElement): void => {
          if (
              btn.dataset.tdkNavBound ===
              'true'
          ) {
            return;
          }

          btn.dataset.tdkNavBound =
              'true';

          btn.addEventListener(
              'click',
              (): void => {
                navButtons.forEach(
                    (
                        el: HTMLAnchorElement
                    ): void => {
                      el.classList.remove(
                          'is-active'
                      );

                      el.removeAttribute(
                          'aria-current'
                      );
                    }
                );

                btn.classList.add(
                    'is-active'
                );

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
   * 현재 페이지에 맞는
   * 내비게이션 메뉴를 활성화한다.
   */
  private _setActiveNav(): void {
    const path: string =
        decodeURIComponent(
            window.location.pathname
        ).toLowerCase();

    const navButtons:
        NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll(
            '.tdk-nav-btn'
        );

    const isBoardPage: boolean =
        this._isBoardPage();

    navButtons.forEach(
        (btn: HTMLAnchorElement): void => {
          btn.classList.remove(
              'is-active'
          );

          btn.removeAttribute(
              'aria-current'
          );

          const href: string =
              decodeURIComponent(
                  btn.href
              ).toLowerCase();

          if (isBoardPage) {
            if (
                href.indexOf(
                    '게시판.aspx'
                ) > -1 ||
                href.indexOf(
                    'noticeboard.aspx'
                ) > -1
            ) {
              btn.classList.add(
                  'is-active'
              );

              btn.setAttribute(
                  'aria-current',
                  'page'
              );
            }
          } else {
            if (
                href.indexOf(
                    '/sitepages/home.aspx'
                ) > -1 ||
                path.indexOf(
                    '/sitepages/home.aspx'
                ) > -1
            ) {
              btn.classList.add(
                  'is-active'
              );

              btn.setAttribute(
                  'aria-current',
                  'page'
              );
            }
          }
        }
    );
  }


  /* =========================
     24. URL WATCH
  ========================= */

  /**
   * SharePoint 내부 페이지 이동으로
   * URL이 변경되는지 주기적으로 확인한다.
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

            /**
             * 새로운 페이지 방문으로 처리하여
             * 메인으로 돌아왔을 때 공지 팝업을 다시 확인한다.
             */
            this._noticePopupHandledForCurrentVisit =
                false;

            this._applyPermissionUiImmediately();

            /**
             * 첫 번째 화면 동기화
             */
            window.setTimeout(
                (): void => {
                  this._applyPermissionUi();
                  this._syncPageUi();
                  this._bindLanguageChange();
                  this._bindNavEvents();
                  this._bindTableauPopupEvents();
                  this._bindNoticePopupEvents();
                  this._showNoticePopupIfNeeded();
                },
                150
            );

            /**
             * SharePoint DOM 출력 지연을 고려한
             * 두 번째 화면 동기화
             */
            window.setTimeout(
                (): void => {
                  this._applyPermissionUi();
                  this._syncPageUi();
                  this._bindTableauPopupEvents();
                  this._bindNoticePopupEvents();
                  this._showNoticePopupIfNeeded();
                },
                500
            );
          }
        }, 200);
  }


  /* =========================
     25. STYLE
  ========================= */

  /**
   * 사용자 정의 CSS를 문서 HEAD에 추가한다.
   */
  private _injectStyles(): void {
    const existingStyle:
        HTMLElement | null =
        document.getElementById(
            'tdk-custom-style'
        );

    /**
     * 기존 Style이 있으면 제거하여
     * CSS가 중복 적용되는 것을 방지한다.
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


  /* =========================
     26. DISPOSE
  ========================= */

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

      this._tableauPopupEscHandler =
          undefined;
    }

    /**
     * 공지 팝업 ESC 이벤트 제거
     */
    if (this._noticePopupEscHandler) {
      document.removeEventListener(
          'keydown',
          this._noticePopupEscHandler
      );

      this._noticePopupEscHandler =
          undefined;
    }

    /**
     * BODY에 남아 있을 수 있는
     * 팝업 상태 클래스를 제거한다.
     */
    document.body.classList.remove(
        'tdk-tableau-popup-open'
    );

    document.body.classList.remove(
        'tdk-notice-popup-open'
    );

    console.log(
        '[TdkSharepointApplicationCustomizer] Disposed placeholders.'
    );
  };
}