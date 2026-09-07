import { Locale } from '../models/types';


/**
 * =========================================================
 * Footer
 * =========================================================
 *
 * 포털 하단 Footer HTML을 생성한다.
 *
 *
 * [역할 구분]
 *
 * footer.ts
 * → Footer HTML 구조 생성
 *
 * TdkSharepointApplicationCustomizer.ts
 * → Footer에 전달할 bottomText 설정
 *
 * customStyles.ts
 * → Footer 디자인
 */


/* =========================================================
   1. Footer Logo
   ========================================================= */

/**
 * Footer에 표시되는 TDK Logo
 */
const FOOTER_LOGO_URL: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/Tdk_icon3.png?csf=1&web=1&e=xP4hBV';


/* =========================================================
   2. 다국어 Label Type
   ========================================================= */

/**
 * Footer에서 사용하는
 * 언어별 고정 문구 구조
 */
type FooterLabels = {
    title: string;
};


/* =========================================================
   3. 다국어 Label
   ========================================================= */

/**
 * Footer Title
 *
 * 현재는 모든 언어에서
 * 동일한 제목을 사용한다.
 *
 * 추후 언어별 문구가 달라질 경우
 * 아래 값만 수정한다.
 */
const FOOTER_LABELS:
    Record<Locale, FooterLabels> = {

    ko: {
        title: 'TDK Korea Portal'
    },

    en: {
        title: 'TDK Korea Portal'
    },

    ja: {
        title: 'TDK Korea Portal'
    }
};


/* =========================================================
   4. HTML Escape
   ========================================================= */

/**
 * HTML 문자열에 삽입되는 값을 Escape 처리한다.
 *
 * Footer 문구에 특수문자가 포함되어도
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
   5. Footer HTML
   ========================================================= */

/**
 * Footer 전체 HTML을 생성한다.
 *
 *
 * [구성]
 *
 * Footer
 * ├ Left
 * │  ├ Logo
 * │  └ Portal Title
 * │
 * └ Right
 *    └ bottomText
 *
 *
 * @param bottomText
 * Footer 우측에 표시할 문구
 *
 * TdkSharepointApplicationCustomizer.ts에서 전달된다.
 *
 * 기본값 예)
 *
 * © TDK Korea Portal
 *
 *
 * @param locale
 * 현재 포털 언어
 *
 * @returns
 * Footer HTML 문자열
 */
export function getFooterHtml(
    bottomText: string,
    locale: Locale
): string {

    /**
     * 현재 언어 Label
     */
    const labels: FooterLabels =
        FOOTER_LABELS[locale] ||
        FOOTER_LABELS.ko;


    /**
     * HTML 표시용 안전한 문자열
     */
    const safeTitle: string =
        escapeHtml(
            labels.title
        );


    const safeBottomText: string =
        escapeHtml(
            bottomText
        );


    /**
     * Footer 전체 HTML
     */
    return `
      <footer class="tdk-footer">

        <div class="tdk-footer__inner">


          <!-- =============================================
               Footer Left
               ============================================= -->
          <div class="tdk-footer__left">

            <img
              class="tdk-footer__logo"
              src="${FOOTER_LOGO_URL}"
              alt="TDK Logo"
            />

            <span class="tdk-footer__text">
              ${safeTitle}
            </span>

          </div>


          <!-- =============================================
               Footer Right
               ============================================= -->
          <div class="tdk-footer__right">
            ${safeBottomText}
          </div>


        </div>

      </footer>
    `;
}