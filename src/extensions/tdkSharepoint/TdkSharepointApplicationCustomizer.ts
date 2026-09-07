import { Log } from '@microsoft/sp-core-library';

import {
    BaseApplicationCustomizer,
    PlaceholderContent,
    PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'TdkSharepointApplicationCustomizerStrings';


/* =========================================================
   DATA / CONFIG
   ========================================================= */

import {
    LOG_SOURCE
} from '../data/constants';

import {
    BANNER_URLS,
    NOTICE_POPUP_IMAGE_URL
} from '../data/portalAssets';

import {
    PRODUCT_CARDS
} from '../data/productCards';

import {
    QUICK_LINKS
} from '../data/quickLinks';

import {
    DEPARTMENT_LINKS
} from '../data/departmentLinks';


/* =========================================================
   COMPONENTS
   ========================================================= */

import {
    getTopBannerHtml
} from '../components/topBanner';

import {
    getFooterHtml
} from '../components/footer';

import {
    getHeroBannerHtml
} from '../components/heroBanner';

import {
    getQuickLinksHtml
} from '../components/quickLinksSection';

import {
    getTableauSectionHtml
} from '../components/cardlist';

import {
    getDepartmentSectionHtml
} from '../components/departmentSection';

import {
    hideDetailPanel,
    renderDetailPanel
} from '../components/detailPanel';

import {
    getNoticePopupHtml,
    NOTICE_POPUP_IDS,
    NOTICE_POPUP_STORAGE_KEY
} from '../components/noticePopup';


/* =========================================================
   STYLE / TYPE
   ========================================================= */

import {
    CUSTOM_STYLES
} from '../styles/customStyles';

import {
    Locale,
    ProductCard
} from '../models/types';


/**
 * =========================================================
 * TDK Korea SharePoint Portal Application Customizer
 * =========================================================
 *
 * SharePoint 포털의 전체 화면 상태와 이벤트를 관리한다.
 *
 *
 * [주요 역할]
 *
 * - Top Banner / Footer Placeholder
 * - 메인 포털 화면 생성
 * - 다국어 변경
 * - Hero Banner 자동 슬라이드
 * - Dashboard Card
 * - Detail Panel
 * - 공용 계정 Popup
 * - MX Notice Popup
 * - 오늘 하루 보지 않음
 * - SharePoint 기본 UI 숨김 / 복원
 * - SharePoint SPA Navigation 감지
 *
 *
 * [페이지 구분]
 *
 * Home.aspx
 * → 메인 포털 콘텐츠 표시
 * → MX Notice Popup 표시
 *
 * 게시판
 * → SharePoint 기본 화면 사용
 * → 메인 포털 콘텐츠 표시하지 않음
 *
 * 기타 SharePoint 페이지
 * → Site Contents / 설정 / List / Library 등
 * → SharePoint 기본 화면 사용
 */


/* =========================================================
   1. PORTAL CONFIG
   ========================================================= */

/**
 * 메인 포털 페이지 경로
 */
const HOME_PAGE_PATH: string =
    '/sitepages/home.aspx';


/**
 * SharePoint 편집 UI를 볼 수 있는 사용자
 *
 * 추가 사용자가 필요한 경우
 * 아래 배열에 Email을 추가한다.
 */
const ALLOWED_EDITOR_EMAILS: string[] = [
    'hayoon.kang@tdk.com'
];


/**
 * SharePoint 기본 UI Selector
 *
 * hide / restore에서 동일한 목록을 사용한다.
 *
 * SharePoint DOM 구조가 변경된 경우
 * 이 배열만 수정하면 된다.
 */
const SHAREPOINT_UI_SELECTORS: string[] = [

    /* Site Header */
    '[data-automationid="SiteHeader"]',
    '[data-automation-id="SiteHeader"]',
    '#spSiteHeader',

    /* Page Command Bar */
    '[data-automation-id="pageCommandBar"]',
    '[data-automationid="pageCommandBar"]',
    '#spCommandBar',

    /* Page Header */
    '[data-automation-id="pageHeader"]',
    '[data-automationid="pageHeader"]',

    /* Microsoft Suite Navigation */
    '#SuiteNavWrapper',
    '#SuiteNavPlaceHolder',

    /* SharePoint App Bar / Left Navigation */
    '#sp-appBar',
    '#spLeftNav'
];


/**
 * Tableau 공용계정 Popup Element ID
 *
 * 현재 공용계정 UI가 Hidden 상태여도
 * 향후 재사용을 위해 이벤트 로직은 유지한다.
 */
const TABLEAU_POPUP_IDS = {
    openButton: 'tdk-tableau-account-btn',
    popup: 'tdk-tableau-popup',
    closeButton: 'tdk-tableau-popup-close',
    backdrop: 'tdk-tableau-popup-backdrop'
} as const;


/* =========================================================
   2. TIMING CONFIG
   ========================================================= */

/**
 * SharePoint DOM 생성 이후 초기화 대기
 */
const INITIALIZE_DELAY_MS: number =
    300;


/**
 * Page MutationObserver Debounce
 */
const PAGE_SYNC_DEBOUNCE_MS: number =
    250;


/**
 * 메인 Body 영역 검색 재시도
 */
const BODY_RENDER_RETRY_DELAY_MS: number =
    300;


/**
 * 최대 Body 검색 횟수
 */
const BODY_RENDER_MAX_RETRY: number =
    40;


/**
 * Hero Banner 자동 전환 간격
 */
const HERO_BANNER_INTERVAL_MS: number =
    3000;


/**
 * SharePoint SPA URL 확인 주기
 */
const URL_WATCH_INTERVAL_MS: number =
    200;


/**
 * URL 변경 후 첫 번째 화면 동기화
 */
const URL_SYNC_DELAY_MS: number =
    150;


/**
 * SharePoint DOM 생성 지연 대응
 */
const URL_SYNC_RETRY_DELAY_MS: number =
    500;


/* =========================================================
   3. APPLICATION CUSTOMIZER PROPERTY
   ========================================================= */

/**
 * Application Customizer 설정값
 */
export interface ITdkSharepointApplicationCustomizerProperties {

    /**
     * Header Title
     */
    Top?: string;

    /**
     * Footer Text
     */
    Bottom?: string;
}


/* =========================================================
   4. APPLICATION CUSTOMIZER
   ========================================================= */

export default class TdkSharepointApplicationCustomizer
    extends BaseApplicationCustomizer<
        ITdkSharepointApplicationCustomizerProperties
    > {


    /* =======================================================
       PLACEHOLDER
       ======================================================= */

    /**
     * SharePoint Top Placeholder
     */
    private _topPlaceholder:
        PlaceholderContent | undefined;


    /**
     * SharePoint Bottom Placeholder
     */
    private _bottomPlaceholder:
        PlaceholderContent | undefined;


    /* =======================================================
       LANGUAGE
       ======================================================= */

    /**
     * 현재 Portal 언어
     */
    private _locale:
        Locale = 'ko';


    /* =======================================================
       OBSERVER
       ======================================================= */

    /**
     * SharePoint 기본 UI 변경 감지
     */
    private _uiObserver:
        MutationObserver | undefined;


    /**
     * SharePoint Page DOM 변경 감지
     */
    private _pageObserver:
        MutationObserver | undefined;


    /* =======================================================
       TIMER
       ======================================================= */

    /**
     * URL 변경 감지 Timer
     */
    private _urlWatchTimer:
        number | undefined;


    /**
     * Page Synchronization Debounce Timer
     */
    private _syncTimer:
        number | undefined;


    /**
     * Hero Banner 자동 슬라이드 Timer
     */
    private _heroBannerTimer:
        number | undefined;


    /* =======================================================
       PAGE STATE
       ======================================================= */

    /**
     * SPA Navigation 감지를 위한 마지막 URL
     */
    private _lastUrl:
        string = window.location.href;


    /**
     * 현재 페이지 방문에서
     * Notice Popup을 이미 처리했는지 여부
     */
    private _noticePopupHandledForCurrentVisit:
        boolean = false;


    /* =======================================================
       KEYBOARD EVENT
       ======================================================= */

    /**
     * Tableau Popup ESC Handler
     */
    private _tableauPopupEscHandler:
        ((event: KeyboardEvent) => void) | undefined;


    /**
     * Notice Popup ESC Handler
     */
    private _noticePopupEscHandler:
        ((event: KeyboardEvent) => void) | undefined;


    /* =========================================================
       5. INITIALIZE
       ========================================================= */

    /**
     * Application Customizer 최초 실행
     */
    public onInit(): Promise<void> {

        Log.info(
            LOG_SOURCE,
            `Initialized ${strings.Title}`
        );


        /**
         * 현재 언어 확인
         */
        this._locale =
            this._getLocale();


        /**
         * Portal CSS 삽입
         */
        this._injectStyles();


        /**
         * SharePoint 화면이 완전히 만들어지기 전에
         * 기본 UI 숨김 Class를 먼저 적용한다.
         */
        this._applyPermissionUiImmediately();


        /**
         * SharePoint Top / Bottom Placeholder 감지
         */
        this.context
            .placeholderProvider
            .changedEvent
            .add(
                this,
                this._renderPlaceholders
            );


        /**
         * SharePoint DOM 생성 이후
         * Portal 기능 초기화
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

                this._watchUrlChange();

                this._startPageSyncObserver();

            },
            INITIALIZE_DELAY_MS
        );


        return Promise.resolve();
    }


    /* =========================================================
       6. LANGUAGE
       ========================================================= */

    /**
     * 현재 사용할 언어를 확인한다.
     *
     * 우선순위
     *
     * 1. URL ?lang=
     * 2. SharePoint UI Culture
     * 3. 한국어
     */
    private _getLocale(): Locale {

        const langFromUrl: string =
            (
                new URL(
                    window.location.href
                )
                    .searchParams
                    .get('lang') || ''
            )
                .toLowerCase();


        if (
            langFromUrl === 'ko' ||
            langFromUrl === 'en' ||
            langFromUrl === 'ja'
        ) {

            return langFromUrl;
        }


        const cultureName: string =
            (
                this.context
                    .pageContext
                    .cultureInfo
                    .currentUICultureName ||

                this.context
                    .pageContext
                    .cultureInfo
                    .currentCultureName ||

                'ko-KR'
            )
                .toLowerCase();


        if (
            cultureName.indexOf(
                'ja'
            ) === 0
        ) {

            return 'ja';
        }


        if (
            cultureName.indexOf(
                'en'
            ) === 0
        ) {

            return 'en';
        }


        return 'ko';
    }


    /* =========================================================
       7. PLACEHOLDER
       ========================================================= */

    /**
     * Top / Bottom Placeholder 출력
     */
    private _renderPlaceholders = (): void => {

        this._renderTopPlaceholder();

        this._renderBottomPlaceholder();
    };


    /**
     * Top Banner 출력
     */
    private _renderTopPlaceholder(): void {

        if (!this._topPlaceholder) {

            this._topPlaceholder =
                this.context
                    .placeholderProvider
                    .tryCreateContent(
                        PlaceholderName.Top,
                        {
                            onDispose:
                            this._onDispose
                        }
                    );
        }


        if (
            !this._topPlaceholder ||
            !this._topPlaceholder.domElement
        ) {

            return;
        }


        const topText: string =
            this.properties.Top ||
            'TDK Korea';


        this._topPlaceholder
            .domElement
            .innerHTML =
            getTopBannerHtml(
                topText,
                this._locale
            );
    }


    /**
     * Footer 출력
     */
    private _renderBottomPlaceholder(): void {

        if (!this._bottomPlaceholder) {

            this._bottomPlaceholder =
                this.context
                    .placeholderProvider
                    .tryCreateContent(
                        PlaceholderName.Bottom,
                        {
                            onDispose:
                            this._onDispose
                        }
                    );
        }


        if (
            !this._bottomPlaceholder ||
            !this._bottomPlaceholder.domElement
        ) {

            return;
        }


        const bottomText: string =
            this.properties.Bottom ||
            '© TDK Korea Portal';


        this._bottomPlaceholder
            .domElement
            .innerHTML =
            getFooterHtml(
                bottomText,
                this._locale
            );
    }


    /* =========================================================
       8. USER PERMISSION
       ========================================================= */

    /**
     * 현재 로그인 사용자 Email / LoginName 조회
     */
    private _getCurrentUserEmail(): string {

        const userEmail: string =
            (
                this.context
                    .pageContext
                    .user.email ||
                ''
            )
                .toLowerCase()
                .trim();


        const loginName: string =
            (
                this.context
                    .pageContext
                    .user.loginName ||
                ''
            )
                .toLowerCase()
                .trim();


        return (
            userEmail ||
            loginName
        );
    }


    /**
     * SharePoint 편집 UI 허용 사용자 확인
     */
    private _isAllowedEditor(): boolean {

        const currentUser: string =
            this._getCurrentUserEmail();


        return ALLOWED_EDITOR_EMAILS.some(
            (allowedEmail: string): boolean => {

                const normalizedEmail: string =
                    allowedEmail
                        .toLowerCase()
                        .trim();


                return (
                    currentUser === normalizedEmail ||

                    currentUser.indexOf(
                        normalizedEmail
                    ) > -1
                );
            }
        );
    }


    /* =========================================================
       9. PAGE CHECK
       ========================================================= */

    /**
     * 현재 페이지가 메인 Home인지 확인한다.
     *
     * 메인 Portal Body는 Home.aspx에서만 표시한다.
     */
    private _isHomePage(): boolean {

        const currentPath: string =
            decodeURIComponent(
                window.location.pathname
            )
                .toLowerCase();


        return (
            currentPath.indexOf(
                HOME_PAGE_PATH
            ) > -1
        );
    }


    /**
     * 현재 페이지가 게시판인지 확인한다.
     *
     * 중요:
     * 일반 SharePoint List까지 게시판으로 처리하지 않는다.
     */
    private _isBoardPage(): boolean {

        const currentPath: string =
            decodeURIComponent(
                window.location.pathname
            )
                .toLowerCase();


        const fullUrl: string =
            decodeURIComponent(
                window.location.href
            )
                .toLowerCase();


        return (
            currentPath.indexOf(
                '게시판.aspx'
            ) > -1 ||

            currentPath.indexOf(
                'noticeboard.aspx'
            ) > -1 ||

            fullUrl.indexOf(
                '게시판'
            ) > -1 ||

            fullUrl.indexOf(
                'noticeboard'
            ) > -1
        );
    }


    /**
     * SharePoint 기본 UI 숨김 여부
     *
     * Home
     * → 허용된 Editor가 아니면 숨김
     *
     * 기타 페이지
     * → 항상 기본 SharePoint UI 표시
     */
    private _shouldHideSharePointUi(): boolean {

        if (!this._isHomePage()) {

            return false;
        }


        return !this._isAllowedEditor();
    }


    /* =========================================================
       10. SHAREPOINT UI
       ========================================================= */

    /**
     * HTML / BODY의
     * tdk-hide-sp-ui Class 상태를 변경한다.
     */
    private _setSharePointUiHiddenClass(
        hidden: boolean
    ): void {

        document.documentElement
            .classList
            .toggle(
                'tdk-hide-sp-ui',
                hidden
            );


        document.body
            .classList
            .toggle(
                'tdk-hide-sp-ui',
                hidden
            );
    }


    /**
     * SharePoint 화면 출력 전에
     * UI 숨김 Class를 먼저 적용한다.
     */
    private _applyPermissionUiImmediately(): void {

        this._setSharePointUiHiddenClass(
            this._shouldHideSharePointUi()
        );
    }


    /**
     * 현재 페이지 / 사용자에 따라
     * SharePoint 기본 UI를 숨기거나 복원한다.
     */
    private _applyPermissionUi(): void {

        const shouldHide:
            boolean =
            this._shouldHideSharePointUi();


        this._setSharePointUiHiddenClass(
            shouldHide
        );


        if (shouldHide) {

            this._hideNativeSharePointUi();

            this._observeAndHideNativeUi();

            return;
        }


        this._restoreNativeSharePointUi();

        this._disconnectUiObserver();
    }


    /**
     * SharePoint 기본 Header / Command Bar /
     * Navigation 등을 숨긴다.
     */
    private _hideNativeSharePointUi(): void {

        SHAREPOINT_UI_SELECTORS.forEach(
            (selector: string): void => {

                const elements:
                    NodeListOf<Element> =
                    document.querySelectorAll(
                        selector
                    );


                elements.forEach(
                    (element: Element): void => {

                        const htmlElement:
                            HTMLElement =
                            element as HTMLElement;


                        htmlElement.style.setProperty(
                            'display',
                            'none',
                            'important'
                        );


                        htmlElement.style.setProperty(
                            'visibility',
                            'hidden',
                            'important'
                        );
                    }
                );
            }
        );
    }


    /**
     * Application Customizer에서 숨긴
     * SharePoint 기본 UI를 복원한다.
     */
    private _restoreNativeSharePointUi(): void {

        SHAREPOINT_UI_SELECTORS.forEach(
            (selector: string): void => {

                const elements:
                    NodeListOf<Element> =
                    document.querySelectorAll(
                        selector
                    );


                elements.forEach(
                    (element: Element): void => {

                        const htmlElement:
                            HTMLElement =
                            element as HTMLElement;


                        htmlElement.style.removeProperty(
                            'display'
                        );


                        htmlElement.style.removeProperty(
                            'visibility'
                        );
                    }
                );
            }
        );
    }


    /**
     * SharePoint가 DOM을 다시 생성해도
     * 숨겨야 하는 UI가 다시 나타나지 않도록 감시한다.
     */
    private _observeAndHideNativeUi(): void {

        if (this._uiObserver) {

            return;
        }


        this._uiObserver =
            new MutationObserver(
                (): void => {

                    if (
                        this._shouldHideSharePointUi()
                    ) {

                        this._hideNativeSharePointUi();
                    }
                }
            );


        this._uiObserver.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /**
     * SharePoint UI Observer 종료
     */
    private _disconnectUiObserver(): void {

        if (!this._uiObserver) {

            return;
        }


        this._uiObserver.disconnect();

        this._uiObserver =
            undefined;
    }


    /* =========================================================
       11. PORTAL HTML
       ========================================================= */

    /**
     * 메인 포털 내부 콘텐츠 HTML 생성
     *
     * 최초 생성과 언어 변경 재생성에서
     * 같은 함수를 사용한다.
     */
    private _getPortalContentHtml(): string {

        return `
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
    }


    /* =========================================================
       12. PAGE SYNCHRONIZATION
       ========================================================= */

    /**
     * 현재 페이지에 맞게
     * Portal UI 상태를 동기화한다.
     */
    private _syncPageUi(): void {

        const existingSection:
            HTMLElement | null =
            document.getElementById(
                'tdk-product-section'
            );


        /**
         * =====================================================
         * Home이 아닌 페이지
         * =====================================================
         */
        if (!this._isHomePage()) {

            /**
             * 열린 Notice Popup 닫기
             *
             * 오늘 하루 숨김 설정은 저장하지 않는다.
             */
            this._closeNoticePopup(
                false,
                false
            );


            /**
             * Home에서 생성한 Portal Section 제거
             */
            if (existingSection) {

                existingSection.remove();
            }


            /**
             * Hero 자동 슬라이드 종료
             */
            this._clearHeroBannerTimer();


            this._setActiveNav();


            return;
        }


        /**
         * =====================================================
         * Home
         * =====================================================
         */

        this._ensureBodySectionRendered();


        this._setActiveNav();

        this._bindNavEvents();

        this._bindLanguageChange();

        this._bindTableauPopupEvents();

        this._bindNoticePopupEvents();


        const section:
            HTMLElement | null =
            document.getElementById(
                'tdk-product-section'
            );


        if (section) {

            this._bindHeroBannerEvents(
                section
            );
        }


        this._showNoticePopupIfNeeded();
    }


    /**
     * SharePoint DOM 변경 감지
     *
     * SharePoint는 SPA 방식으로 화면 일부를
     * 다시 생성하므로 MutationObserver를 사용한다.
     */
    private _startPageSyncObserver(): void {

        if (this._pageObserver) {

            this._pageObserver.disconnect();
        }


        this._pageObserver =
            new MutationObserver(
                (): void => {

                    /**
                     * SharePoint는 한 번의 변경에서도
                     * 많은 Mutation을 발생시키므로 Debounce 처리한다.
                     */
                    if (this._syncTimer) {

                        window.clearTimeout(
                            this._syncTimer
                        );
                    }


                    this._syncTimer =
                        window.setTimeout(
                            (): void => {

                                this._applyPermissionUi();

                                this._syncPageUi();

                            },
                            PAGE_SYNC_DEBOUNCE_MS
                        );
                }
            );


        this._pageObserver.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /* =========================================================
       13. MAIN BODY RENDER
       ========================================================= */

    /**
     * Home Portal Body 생성
     *
     * 중요:
     * Home.aspx에서만 실행한다.
     */
    private _ensureBodySectionRendered(
        retryCount: number = 0
    ): void {

        if (!this._isHomePage()) {

            return;
        }


        const existingSection:
            HTMLElement | null =
            document.getElementById(
                'tdk-product-section'
            );


        /**
         * 이미 생성된 경우
         * HTML은 만들지 않고 Event만 확인한다.
         */
        if (existingSection) {

            this._bindCardEvents(
                existingSection
            );

            this._bindHeroBannerEvents(
                existingSection
            );

            this._bindTableauPopupEvents();

            this._bindNoticePopupEvents();

            this._showNoticePopupIfNeeded();


            return;
        }


        /**
         * Portal Section을 삽입할
         * SharePoint Content 영역 검색
         */
        const target:
            HTMLElement | null =

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
         * SharePoint Canvas가 아직 없으면
         * 일정 횟수까지 다시 시도한다.
         */
        if (!target) {

            if (
                retryCount <
                BODY_RENDER_MAX_RETRY
            ) {

                window.setTimeout(
                    (): void => {

                        this._ensureBodySectionRendered(
                            retryCount + 1
                        );

                    },
                    BODY_RENDER_RETRY_DELAY_MS
                );
            }


            return;
        }


        /**
         * Portal Section 생성
         */
        const section:
            HTMLElement =
            document.createElement(
                'section'
            );


        section.id =
            'tdk-product-section';


        section.className =
            'tdk-product-section';


        section.setAttribute(
            'data-tdk-custom',
            'true'
        );


        /**
         * Portal 화면 구성
         */
        section.innerHTML = `
      <div class="tdk-product-wrap">

        ${this._getPortalContentHtml()}

      </div>
    `;


        /**
         * SharePoint 콘텐츠 가장 위에 삽입
         */
        if (target.firstChild) {

            target.insertBefore(
                section,
                target.firstChild
            );

        } else {

            target.appendChild(
                section
            );
        }


        /**
         * Portal Event 연결
         */
        this._bindCardEvents(
            section
        );

        this._bindHeroBannerEvents(
            section
        );

        this._bindTableauPopupEvents();

        this._bindNoticePopupEvents();


        /**
         * Notice Popup 표시 여부 확인
         */
        this._showNoticePopupIfNeeded();
    }


    /* =========================================================
       14. PRODUCT CARD
       ========================================================= */

    /**
     * Card ID로 ProductCard 조회
     */
    private _getProductCardById(
        id: string
    ): ProductCard | undefined {

        for (
            const card of PRODUCT_CARDS
            ) {

            if (
                card.id === id
            ) {

                return card;
            }
        }


        return undefined;
    }

    /**
     * Dashboard Card 클릭 Event
     */
    private _bindCardEvents(
        section: HTMLElement
    ): void {

        const buttons:
            NodeListOf<HTMLElement> =
            section.querySelectorAll(
                '.tdk-main-card'
            );


        const cardRow:
            HTMLElement | null =
            section.querySelector(
                '.tdk-card-row'
            );


        const detailPanel:
            HTMLElement | null =
            section.querySelector(
                '#tdk-detail-panel'
            );


        let activeCardId:
            string | null =
            null;


        buttons.forEach(
            (
                button: HTMLElement
            ): void => {

                /**
                 * 중복 Event 등록 방지
                 */
                if (
                    button.dataset.tdkCardBound ===
                    'true'
                ) {

                    return;
                }


                button.dataset.tdkCardBound =
                    'true';


                button.addEventListener(
                    'click',
                    (): void => {

                        const cardId:
                            string | null =
                            button.getAttribute(
                                'data-card-id'
                            );


                        if (
                            !cardId ||
                            !detailPanel
                        ) {

                            return;
                        }


                        /**
                         * =========================================
                         * 같은 Card 재클릭
                         * =========================================
                         *
                         * Detail Panel 닫기
                         */
                        if (
                            activeCardId === cardId
                        ) {

                            buttons.forEach(
                                (
                                    item: HTMLElement
                                ): void => {

                                    item.classList.remove(
                                        'is-active'
                                    );
                                }
                            );


                            if (cardRow) {

                                cardRow.classList.remove(
                                    'has-active'
                                );
                            }


                            hideDetailPanel();


                            activeCardId =
                                null;


                            return;
                        }


                        /**
                         * Card 데이터 조회
                         */
                        const selectedCard:
                            ProductCard | undefined =
                            this._getProductCardById(
                                cardId
                            );


                        if (!selectedCard) {

                            return;
                        }


                        /**
                         * Detail Panel 생성
                         */
                        renderDetailPanel(
                            selectedCard,
                            this._locale
                        );


                        /**
                         * 기존 Active Card 제거
                         */
                        buttons.forEach(
                            (
                                item: HTMLElement
                            ): void => {

                                item.classList.remove(
                                    'is-active'
                                );
                            }
                        );


                        /**
                         * 현재 Card 활성화
                         */
                        button.classList.add(
                            'is-active'
                        );


                        if (cardRow) {

                            cardRow.classList.add(
                                'has-active'
                            );
                        }


                        activeCardId =
                            cardId;
                    }
                );
            }
        );
    }


    /* =========================================================
       15. HERO BANNER
       ========================================================= */

    /**
     * Hero Banner Event
     *
     * - 이전
     * - 다음
     * - 자동 슬라이드
     */
    private _bindHeroBannerEvents(
        section: HTMLElement
    ): void {

        const banner:
            HTMLElement | null =
            section.querySelector(
                '#tdk-hero-banner'
            );


        if (
            !banner ||
            banner.dataset.tdkBannerBound ===
            'true'
        ) {

            return;
        }


        banner.dataset.tdkBannerBound =
            'true';


        const images:
            NodeListOf<HTMLElement> =
            banner.querySelectorAll(
                '.tdk-hero-banner__image'
            );


        const prevButton:
            HTMLElement | null =
            banner.querySelector(
                '.tdk-hero-banner__arrow--prev'
            );


        const nextButton:
            HTMLElement | null =
            banner.querySelector(
                '.tdk-hero-banner__arrow--next'
            );


        /**
         * 이미지가 한 장 이하이면
         * 자동 슬라이드 불필요
         */
        if (
            images.length <= 1
        ) {

            return;
        }


        let currentIndex:
            number = 0;


        /**
         * 지정 Banner 표시
         */
        const showImage = (
            nextIndex: number
        ): void => {

            images.forEach(
                (
                    image: HTMLElement
                ): void => {

                    image.classList.remove(
                        'is-active'
                    );
                }
            );


            images[nextIndex]
                .classList
                .add(
                    'is-active'
                );


            currentIndex =
                nextIndex;
        };


        /**
         * 다음 Banner
         */
        const showNextImage =
            (): void => {

                const nextIndex:
                    number =
                    currentIndex ===
                    images.length - 1

                        ? 0

                        : currentIndex + 1;


                showImage(
                    nextIndex
                );
            };


        /**
         * 이전 Button
         */
        if (prevButton) {

            prevButton.addEventListener(
                'click',
                (): void => {

                    const previousIndex:
                        number =
                        currentIndex === 0

                            ? images.length - 1

                            : currentIndex - 1;


                    showImage(
                        previousIndex
                    );
                }
            );
        }


        /**
         * 다음 Button
         */
        if (nextButton) {

            nextButton.addEventListener(
                'click',
                (): void => {

                    showNextImage();
                }
            );
        }


        /**
         * 기존 Timer 제거
         */
        this._clearHeroBannerTimer();


        /**
         * 자동 Slide 시작
         */
        this._heroBannerTimer =
            window.setInterval(
                (): void => {

                    showNextImage();

                },
                HERO_BANNER_INTERVAL_MS
            );
    }


    /**
     * Hero Banner Timer 종료
     */
    private _clearHeroBannerTimer(): void {

        if (
            this._heroBannerTimer ===
            undefined
        ) {

            return;
        }


        window.clearInterval(
            this._heroBannerTimer
        );


        this._heroBannerTimer =
            undefined;
    }


    /* =========================================================
       16. NOTICE POPUP STORAGE
       ========================================================= */

    /**
     * Notice Popup 숨김 종료 시간 조회
     */
    private _getNoticePopupHiddenUntil(): number {

        try {

            const storedValue:
                string | null =
                window.localStorage
                    .getItem(
                        NOTICE_POPUP_STORAGE_KEY
                    );


            if (!storedValue) {

                return 0;
            }


            const hiddenUntil:
                number =
                Number(
                    storedValue
                );


            /**
             * 저장값이 올바른 숫자가 아니면 제거
             */
            if (
                isNaN(
                    hiddenUntil
                )
            ) {

                window.localStorage
                    .removeItem(
                        NOTICE_POPUP_STORAGE_KEY
                    );


                return 0;
            }


            return hiddenUntil;

        } catch (error) {

            console.warn(
                '[TDK Notice Popup] Failed to read localStorage.',
                error
            );


            return 0;
        }
    }


    /**
     * 다음 날 00:00까지
     * Notice Popup 숨김
     */
    private _hideNoticePopupUntilTomorrow(): void {

        try {

            const tomorrow:
                Date =
                new Date();


            tomorrow.setHours(
                24,
                0,
                0,
                0
            );


            window.localStorage
                .setItem(
                    NOTICE_POPUP_STORAGE_KEY,
                    tomorrow
                        .getTime()
                        .toString()
                );

        } catch (error) {

            console.warn(
                '[TDK Notice Popup] Failed to save localStorage.',
                error
            );
        }
    }


    /* =========================================================
       17. NOTICE POPUP
       ========================================================= */

    /**
     * Notice Popup 열기
     */
    private _openNoticePopup(): void {

        /**
         * Home에서만 Popup 표시
         */
        if (!this._isHomePage()) {

            return;
        }


        const popup:
            HTMLElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.popup
            );


        if (!popup) {

            return;
        }


        popup.classList.add(
            'is-open'
        );


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
         * X 버튼에 Focus
         */
        window.setTimeout(
            (): void => {

                const closeButton:
                    HTMLElement | null =
                    document.getElementById(
                        NOTICE_POPUP_IDS.closeIcon
                    );


                if (closeButton) {

                    closeButton.focus();
                }

            },
            0
        );
    }


    /**
     * Notice Popup 표시 여부 확인
     */
    private _showNoticePopupIfNeeded(): void {

        if (!this._isHomePage()) {

            return;
        }


        /**
         * 현재 방문에서 이미 처리
         */
        if (
            this._noticePopupHandledForCurrentVisit
        ) {

            return;
        }


        const popup:
            HTMLElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.popup
            );


        if (!popup) {

            return;
        }


        const hiddenUntil:
            number =
            this._getNoticePopupHiddenUntil();


        /**
         * 아직 숨김 기간
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
         * 기존 숨김 기간이 만료된 경우
         * localStorage 값 제거
         */
        if (
            hiddenUntil > 0 &&
            Date.now() >= hiddenUntil
        ) {

            try {

                window.localStorage
                    .removeItem(
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
     * Notice Popup 닫기
     *
     * @param saveTodayPreference
     * Checkbox가 선택되어 있다면
     * 오늘 하루 숨김 상태 저장 여부
     *
     * @param markHandled
     * 현재 방문에서 이미 처리한 Popup으로
     * 표시할지 여부
     */
    private _closeNoticePopup(
        saveTodayPreference: boolean = true,
        markHandled: boolean = true
    ): void {

        const popup:
            HTMLElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.popup
            );


        const checkbox:
            HTMLInputElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.todayCheckbox
            ) as HTMLInputElement | null;


        /**
         * 오늘 하루 보지 않음
         */
        if (
            saveTodayPreference &&
            checkbox &&
            checkbox.checked
        ) {

            this._hideNoticePopupUntilTomorrow();
        }


        if (popup) {

            popup.classList.remove(
                'is-open'
            );


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


    /**
     * Notice Popup Event
     *
     * - X
     * - 닫기 버튼
     * - Popup 외부
     * - ESC
     */
    private _bindNoticePopupEvents(): void {

        const popup:
            HTMLElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.popup
            );


        if (!popup) {

            return;
        }


        const closeElements:
            NodeListOf<HTMLElement> =
            popup.querySelectorAll(
                '[data-notice-close="true"]'
            );


        closeElements.forEach(
            (
                element: HTMLElement
            ): void => {

                if (
                    element.dataset
                        .tdkNoticeCloseBound ===
                    'true'
                ) {

                    return;
                }


                element.dataset
                    .tdkNoticeCloseBound =
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
         * ESC Event는 document에 한 번만 등록
         */
        if (
            this._noticePopupEscHandler
        ) {

            return;
        }


        this._noticePopupEscHandler =
            (
                event: KeyboardEvent
            ): void => {

                if (
                    event.key !==
                    'Escape'
                ) {

                    return;
                }


                const currentPopup:
                    HTMLElement | null =
                    document.getElementById(
                        NOTICE_POPUP_IDS.popup
                    );


                if (
                    !currentPopup ||
                    !currentPopup
                        .classList
                        .contains(
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


    /* =========================================================
       18. TABLEAU PUBLIC ACCOUNT POPUP
       ========================================================= */

    /**
     * Tableau / SCADA 공용계정 Popup Event
     *
     * 현재 버튼이 hidden 상태여도
     * 향후 재사용을 위해 기능은 유지한다.
     */
    private _bindTableauPopupEvents(): void {

        const openButton:
            HTMLElement | null =
            document.getElementById(
                TABLEAU_POPUP_IDS.openButton
            );


        const popup:
            HTMLElement | null =
            document.getElementById(
                TABLEAU_POPUP_IDS.popup
            );


        const closeButton:
            HTMLElement | null =
            document.getElementById(
                TABLEAU_POPUP_IDS.closeButton
            );


        const backdrop:
            HTMLElement | null =
            document.getElementById(
                TABLEAU_POPUP_IDS.backdrop
            );


        if (
            !openButton ||
            !popup
        ) {

            return;
        }


        /**
         * Popup Open
         */
        if (
            openButton.dataset.tdkPopupBound !==
            'true'
        ) {

            openButton.dataset.tdkPopupBound =
                'true';


            openButton.addEventListener(
                'click',
                (): void => {

                    popup.classList.add(
                        'is-open'
                    );


                    popup.setAttribute(
                        'aria-hidden',
                        'false'
                    );


                    document.body.classList.add(
                        'tdk-tableau-popup-open'
                    );
                }
            );
        }


        /**
         * Popup Close
         */
        const closePopup =
            (): void => {

                popup.classList.remove(
                    'is-open'
                );


                popup.setAttribute(
                    'aria-hidden',
                    'true'
                );


                document.body.classList.remove(
                    'tdk-tableau-popup-open'
                );
            };


        if (
            closeButton &&
            closeButton.dataset.tdkPopupBound !==
            'true'
        ) {

            closeButton.dataset.tdkPopupBound =
                'true';


            closeButton.addEventListener(
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
         * ESC Event
         */
        if (
            this._tableauPopupEscHandler
        ) {

            return;
        }


        this._tableauPopupEscHandler =
            (
                event: KeyboardEvent
            ): void => {

                if (
                    event.key !==
                    'Escape'
                ) {

                    return;
                }


                const currentPopup:
                    HTMLElement | null =
                    document.getElementById(
                        TABLEAU_POPUP_IDS.popup
                    );


                if (
                    !currentPopup ||
                    !currentPopup
                        .classList
                        .contains(
                            'is-open'
                        )
                ) {

                    return;
                }


                currentPopup.classList.remove(
                    'is-open'
                );


                currentPopup.setAttribute(
                    'aria-hidden',
                    'true'
                );


                document.body.classList.remove(
                    'tdk-tableau-popup-open'
                );
            };


        document.addEventListener(
            'keydown',
            this._tableauPopupEscHandler
        );
    }


    /* =========================================================
       19. LANGUAGE CHANGE
       ========================================================= */

    /**
     * Language Select Event
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


        langSelect.value =
            this._locale;


        /**
         * 중복 Event 등록 방지
         */
        if (
            langSelect.dataset.tdkBound ===
            'true'
        ) {

            return;
        }


        langSelect.dataset.tdkBound =
            'true';


        langSelect.addEventListener(
            'change',
            (): void => {

                const value:
                    Locale =
                    langSelect.value as Locale;


                this._locale =
                    value;


                const currentUrl:
                    URL =
                    new URL(
                        window.location.href
                    );


                currentUrl
                    .searchParams
                    .set(
                        'lang',
                        value
                    );


                /**
                 * 페이지 Reload 없이 URL만 변경
                 */
                window.history.replaceState(
                    {},
                    '',
                    currentUrl.toString()
                );


                /**
                 * URL Watch가 Navigation으로 오인하지 않게
                 * 마지막 URL도 같이 갱신
                 */
                this._lastUrl =
                    currentUrl.toString();


                this._rerenderCustomUi();
            }
        );
    }


    /* =========================================================
       20. UI RERENDER
       ========================================================= */

    /**
     * 언어 변경 시 Custom UI 재생성
     */
    private _rerenderCustomUi(): void {

        /**
         * 현재 선택 Card 보관
         */
        const activeCard:
            HTMLElement | null =
            document.querySelector(
                '.tdk-main-card.is-active'
            );


        const activeCardId:
            string | null =
            activeCard

                ? activeCard.getAttribute(
                    'data-card-id'
                )

                : null;


        /**
         * Notice Popup 열림 상태 보관
         */
        const currentNoticePopup:
            HTMLElement | null =
            document.getElementById(
                NOTICE_POPUP_IDS.popup
            );


        const wasNoticePopupOpen:
            boolean =
            !!currentNoticePopup &&
            currentNoticePopup
                .classList
                .contains(
                    'is-open'
                );


        /**
         * Header / Footer 다국어 재생성
         */
        this._renderTopPlaceholder();

        this._renderBottomPlaceholder();


        /**
         * Home이 아니면
         * Header / Footer만 재생성
         */
        if (!this._isHomePage()) {

            this._bindLanguageChange();

            this._bindNavEvents();

            this._setActiveNav();


            return;
        }


        const wrap:
            HTMLElement | null =
            document.querySelector(
                '.tdk-product-wrap'
            );


        /**
         * Portal Body가 없으면
         * 새로 생성
         */
        if (!wrap) {

            this._ensureBodySectionRendered();

            return;
        }


        this._clearHeroBannerTimer();


        /**
         * 기존 Popup은 Preference 저장 없이 닫는다.
         */
        this._closeNoticePopup(
            false,
            false
        );


        /**
         * 현재 언어 기준으로
         * Portal 내부 콘텐츠 전체 재생성
         */
        wrap.innerHTML =
            this._getPortalContentHtml();


        const section:
            HTMLElement | null =
            document.getElementById(
                'tdk-product-section'
            );


        /**
         * 새 DOM에 Event 재연결
         */
        if (section) {

            this._bindCardEvents(
                section
            );


            this._bindHeroBannerEvents(
                section
            );
        }


        this._bindLanguageChange();

        this._bindNavEvents();

        this._bindTableauPopupEvents();

        this._bindNoticePopupEvents();

        this._setActiveNav();


        /**
         * Notice Popup 상태 복원
         */
        if (wasNoticePopupOpen) {

            this._openNoticePopup();

        } else {

            this._showNoticePopupIfNeeded();
        }


        /**
         * 선택 Card 상태 복원
         */
        if (
            activeCardId &&
            section
        ) {

            const restoredButton:
                HTMLElement | null =
                section.querySelector(
                    `.tdk-main-card[data-card-id="${activeCardId}"]`
                );


            const restoredCard:
                ProductCard | undefined =
                this._getProductCardById(
                    activeCardId
                );


            if (
                restoredButton &&
                restoredCard
            ) {

                const cardRow:
                    HTMLElement | null =
                    section.querySelector(
                        '.tdk-card-row'
                    );


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


    /* =========================================================
       21. NAVIGATION
       ========================================================= */

    /**
     * Portal Navigation 클릭 Event
     */
    private _bindNavEvents(): void {

        const navButtons:
            NodeListOf<HTMLAnchorElement> =
            document.querySelectorAll(
                '.tdk-nav-btn'
            );


        navButtons.forEach(
            (
                button: HTMLAnchorElement
            ): void => {

                if (
                    button.dataset.tdkNavBound ===
                    'true'
                ) {

                    return;
                }


                button.dataset.tdkNavBound =
                    'true';


                button.addEventListener(
                    'click',
                    (): void => {

                        navButtons.forEach(
                            (
                                item: HTMLAnchorElement
                            ): void => {

                                item.classList.remove(
                                    'is-active'
                                );


                                item.removeAttribute(
                                    'aria-current'
                                );
                            }
                        );


                        button.classList.add(
                            'is-active'
                        );


                        button.setAttribute(
                            'aria-current',
                            'page'
                        );
                    }
                );
            }
        );
    }


    /**
     * 현재 페이지 Navigation 활성 상태 갱신
     */
    private _setActiveNav(): void {

        const navButtons:
            NodeListOf<HTMLAnchorElement> =
            document.querySelectorAll(
                '.tdk-nav-btn'
            );


        const isHomePage:
            boolean =
            this._isHomePage();


        const isBoardPage:
            boolean =
            this._isBoardPage();


        navButtons.forEach(
            (
                button: HTMLAnchorElement
            ): void => {

                button.classList.remove(
                    'is-active'
                );


                button.removeAttribute(
                    'aria-current'
                );


                const href:
                    string =
                    decodeURIComponent(
                        button.href
                    )
                        .toLowerCase();


                /**
                 * 게시판
                 */
                if (isBoardPage) {

                    if (
                        href.indexOf(
                            '게시판.aspx'
                        ) > -1 ||

                        href.indexOf(
                            'noticeboard.aspx'
                        ) > -1
                    ) {

                        button.classList.add(
                            'is-active'
                        );


                        button.setAttribute(
                            'aria-current',
                            'page'
                        );
                    }


                    return;
                }


                /**
                 * Home
                 */
                if (
                    isHomePage &&
                    href.indexOf(
                        HOME_PAGE_PATH
                    ) > -1
                ) {

                    button.classList.add(
                        'is-active'
                    );


                    button.setAttribute(
                        'aria-current',
                        'page'
                    );
                }
            }
        );
    }


    /* =========================================================
       22. URL WATCH
       ========================================================= */

    /**
     * SharePoint SPA Navigation에 의한
     * URL 변경 감지
     */
    private _watchUrlChange(): void {

        if (
            this._urlWatchTimer !==
            undefined
        ) {

            window.clearInterval(
                this._urlWatchTimer
            );
        }


        this._urlWatchTimer =
            window.setInterval(
                (): void => {

                    if (
                        this._lastUrl ===
                        window.location.href
                    ) {

                        return;
                    }


                    this._lastUrl =
                        window.location.href;


                    /**
                     * 이동한 페이지 기준 언어 재확인
                     */
                    this._locale =
                        this._getLocale();


                    /**
                     * 새 페이지 방문이므로
                     * Notice Popup 방문 처리 초기화
                     */
                    this._noticePopupHandledForCurrentVisit =
                        false;


                    /**
                     * DOM 생성 전 Class 상태 적용
                     */
                    this._applyPermissionUiImmediately();


                    /**
                     * 1차 동기화
                     */
                    window.setTimeout(
                        (): void => {

                            this._applyPermissionUi();

                            this._syncPageUi();

                        },
                        URL_SYNC_DELAY_MS
                    );


                    /**
                     * SharePoint DOM 생성 지연 대응
                     */
                    window.setTimeout(
                        (): void => {

                            this._applyPermissionUi();

                            this._syncPageUi();

                        },
                        URL_SYNC_RETRY_DELAY_MS
                    );
                },
                URL_WATCH_INTERVAL_MS
            );
    }


    /* =========================================================
       23. STYLE
       ========================================================= */

    /**
     * Portal Custom CSS를
     * document HEAD에 삽입한다.
     */
    private _injectStyles(): void {

        const existingStyle:
            HTMLElement | null =
            document.getElementById(
                'tdk-custom-style'
            );


        if (existingStyle) {

            existingStyle.remove();
        }


        const style:
            HTMLStyleElement =
            document.createElement(
                'style'
            );


        style.id =
            'tdk-custom-style';


        style.innerHTML =
            CUSTOM_STYLES;


        document.head.appendChild(
            style
        );
    }


    /* =========================================================
       24. DISPOSE
       ========================================================= */

    /**
     * Application Customizer 종료 시
     * Observer / Timer / Keyboard Event를 정리한다.
     */
    private _onDispose = (): void => {

        /**
         * SharePoint UI Observer
         */
        this._disconnectUiObserver();


        /**
         * Page Observer
         */
        if (this._pageObserver) {

            this._pageObserver.disconnect();

            this._pageObserver =
                undefined;
        }


        /**
         * URL Watch Timer
         */
        if (
            this._urlWatchTimer !==
            undefined
        ) {

            window.clearInterval(
                this._urlWatchTimer
            );


            this._urlWatchTimer =
                undefined;
        }


        /**
         * Page Sync Timer
         */
        if (
            this._syncTimer !==
            undefined
        ) {

            window.clearTimeout(
                this._syncTimer
            );


            this._syncTimer =
                undefined;
        }


        /**
         * Hero Banner Timer
         */
        this._clearHeroBannerTimer();


        /**
         * Tableau ESC
         */
        if (
            this._tableauPopupEscHandler
        ) {

            document.removeEventListener(
                'keydown',
                this._tableauPopupEscHandler
            );


            this._tableauPopupEscHandler =
                undefined;
        }


        /**
         * Notice Popup ESC
         */
        if (
            this._noticePopupEscHandler
        ) {

            document.removeEventListener(
                'keydown',
                this._noticePopupEscHandler
            );


            this._noticePopupEscHandler =
                undefined;
        }


        /**
         * Popup Body Class 정리
         */
        document.body.classList.remove(
            'tdk-tableau-popup-open'
        );


        document.body.classList.remove(
            'tdk-notice-popup-open'
        );


        /**
         * SharePoint 기본 UI Class도 정리
         */
        document.documentElement
            .classList
            .remove(
                'tdk-hide-sp-ui'
            );


        document.body
            .classList
            .remove(
                'tdk-hide-sp-ui'
            );


        console.log(
            '[TdkSharepointApplicationCustomizer] Disposed.'
        );
    };
}