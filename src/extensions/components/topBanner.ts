import { Locale } from '../models/types';


/**
 * =========================================================
 * Top Banner
 * =========================================================
 *
 * 포털 상단 Header와 Navigation HTML을 생성한다.
 *
 *
 * [주요 기능]
 *
 * - TDK Logo / Portal Title
 * - Worldwide Link
 * - TDK Korea Products Link
 * - 한국어 / 영어 / 일본어 선택
 * - Main Navigation
 * - 게시판 Navigation
 *
 *
 * [역할 구분]
 *
 * topBanner.ts
 * → 상단 Header / Navigation HTML 생성
 *
 * TdkSharepointApplicationCustomizer.ts
 * → 언어 변경 Event
 * → Navigation 활성화 처리
 *
 * customStyles.ts
 * → Header / Navigation 디자인
 */


/* =========================================================
   1. Navigation 표시 설정
   ========================================================= */

/**
 * 게시판 메뉴 표시 여부
 *
 * false
 * → 현재 화면에서 게시판 메뉴 숨김
 *
 * true
 * → 게시판 메뉴 표시
 *
 * 게시판 기능 자체는 삭제하지 않고
 * 향후 다시 사용할 수 있도록 유지한다.
 */
const SHOW_NOTICE_BOARD: boolean = false;


/* =========================================================
   2. URL
   ========================================================= */

/**
 * 포털 Home
 */
const PORTAL_HOME_URL: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/Home.aspx';


/**
 * 게시판
 */
const NOTICE_BOARD_URL: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/%EA%B2%8C%EC%8B%9C%ED%8C%90.aspx';


/**
 * TDK Worldwide
 */
const TDK_WORLDWIDE_URL: string =
    'https://www.tdk.com/';


/**
 * TDK Korea 생산제품
 */
const TDK_KOREA_PRODUCTS_URL: string =
    'https://www.tdk.com/en/tdk_korea/index.html#:~:text=Main%20production%20products';


/**
 * Top Banner Logo
 */
const TDK_LOGO_URL: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/Tdk_icon4.png?csf=1&web=1&e=vC9zS1';


/* =========================================================
   3. 다국어 Label Type
   ========================================================= */

/**
 * Top Banner에서 사용하는
 * 언어별 문구 구조
 */
type TopBannerLabels = {
    worldWide: string;
    koreaProduct: string;
    main: string;
    noticeBoard: string;
};


/* =========================================================
   4. 다국어 Label
   ========================================================= */

/**
 * Top Banner 언어별 문구
 */
const TOP_BANNER_LABELS:
    Record<Locale, TopBannerLabels> = {

    ko: {
        worldWide: 'Worldwide',
        koreaProduct: '생산제품',
        main: 'Main',
        noticeBoard: '게시판'
    },

    en: {
        worldWide: 'Worldwide',
        koreaProduct: 'TDK KOREA Products',
        main: 'Main',
        noticeBoard: 'Notice Board'
    },

    ja: {
        worldWide: 'Worldwide',
        koreaProduct: 'TDK KOREA 生産製品',
        main: 'Main',
        noticeBoard: '掲示板'
    }
};


/* =========================================================
   5. HTML Escape
   ========================================================= */

/**
 * HTML 문자열에 삽입되는 값을 Escape 처리한다.
 *
 * Portal Title이나 Label에 특수문자가 포함되어도
 * HTML 구조가 깨지지 않도록 처리한다.
 */
function escapeHtml(
    value: string
): string {

    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


/* =========================================================
   6. 게시판 Navigation
   ========================================================= */

/**
 * 게시판 Navigation HTML 생성
 *
 * SHOW_NOTICE_BOARD = false
 * → 빈 문자열 반환
 *
 * SHOW_NOTICE_BOARD = true
 * → 게시판 메뉴 표시
 */
function getNoticeBoardNavHtml(
    labels: TopBannerLabels
): string {

    if (!SHOW_NOTICE_BOARD) {
        return '';
    }


    return `
      <a
        class="tdk-nav-btn"
        href="${NOTICE_BOARD_URL}"
        target="_self"
      >
        ${escapeHtml(
        labels.noticeBoard
    )}
      </a>
    `;
}


/* =========================================================
   7. Top Banner HTML
   ========================================================= */

/**
 * 포털 Top Banner 전체 HTML 생성
 *
 *
 * [구성]
 *
 * Top Banner
 * ├ Brand
 * │  ├ Logo
 * │  └ Portal Title
 * │
 * ├ Action
 * │  ├ Worldwide
 * │  ├ TDK Korea Products
 * │  └ Language Select
 * │
 * └ Navigation
 *    ├ Main
 *    └ Notice Board
 *
 *
 * @param title
 * 포털 상단에 표시할 제목
 *
 * @param locale
 * 현재 포털 언어
 *
 * @returns
 * Top Banner HTML 문자열
 */
export function getTopBannerHtml(
    title: string,
    locale: Locale
): string {

    /**
     * 현재 언어 Label
     */
    const currentLabels: TopBannerLabels =
        TOP_BANNER_LABELS[locale] ||
        TOP_BANNER_LABELS.ko;


    /**
     * HTML 표시용 안전한 제목
     */
    const safeTitle: string =
        escapeHtml(
            title
        );


    /**
     * 게시판 Navigation
     */
    const noticeBoardNavHtml: string =
        getNoticeBoardNavHtml(
            currentLabels
        );


    return `
      <div class="tdk-top-banner">


        <!-- ===============================================
             Header
             =============================================== -->
        <div class="tdk-top-banner__inner">

          <div class="tdk-top-banner__row">


            <!-- =============================================
                 Portal Brand
                 ============================================= -->
            <a
              class="tdk-top-banner__brand"
              href="${PORTAL_HOME_URL}"
              target="_self"
              aria-label="TDK Korea Portal Home"
            >

              <img
                class="tdk-top-banner__logo"
                src="${TDK_LOGO_URL}"
                alt="TDK Logo"
              />

              <span class="tdk-top-banner__title">
                ${safeTitle}
              </span>

            </a>


            <!-- =============================================
                 Header Action
                 ============================================= -->
            <div class="tdk-top-banner__actions">


              <!-- TDK Worldwide -->
              <a
                href="${TDK_WORLDWIDE_URL}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${escapeHtml(
        currentLabels.worldWide
    )}
              </a>


              <!-- TDK Korea 생산제품 -->
              <a
                href="${TDK_KOREA_PRODUCTS_URL}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${escapeHtml(
        currentLabels.koreaProduct
    )}
              </a>


              <!-- ===========================================
                   Language Select

                   실제 언어 변경 Event는
                   TdkSharepointApplicationCustomizer.ts의
                   _bindLanguageChange()에서 처리한다.
                   =========================================== -->
              <select
                id="tdk-lang-select"
                class="tdk-lang-select"
                aria-label="Language Select"
              >

                <option
                  value="ko"
                  ${locale === 'ko'
        ? 'selected'
        : ''
    }
                >
                  한국어
                </option>

                <option
                  value="en"
                  ${locale === 'en'
        ? 'selected'
        : ''
    }
                >
                  English
                </option>

                <option
                  value="ja"
                  ${locale === 'ja'
        ? 'selected'
        : ''
    }
                >
                  日本語
                </option>

              </select>

            </div>

          </div>

        </div>


        <!-- ===============================================
             Navigation
             =============================================== -->
        <nav
          class="tdk-nav"
          id="tdk-nav"
          aria-label="Portal navigation"
        >

          <div class="tdk-nav__inner">


            <!-- Main -->
            <a
              class="tdk-nav-btn"
              href="${PORTAL_HOME_URL}"
              target="_self"
            >
              ${escapeHtml(
        currentLabels.main
    )}
            </a>


            <!--
              Notice Board

              현재 SHOW_NOTICE_BOARD = false
              → 화면에서 숨김

              향후 true로 변경하면 다시 표시
            -->
            ${noticeBoardNavHtml}


          </div>

        </nav>

      </div>
    `;
}