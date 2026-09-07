import { Locale } from '../models/types';


/**
 * =========================================================
 * Notice Popup
 * =========================================================
 *
 * 메인 포털에 표시되는 공지 팝업의
 * HTML 구조와 다국어 문구를 관리한다.
 *
 *
 * [역할 구분]
 *
 * noticePopup.ts
 * → 팝업 HTML 구조
 * → HTML Element ID
 * → 다국어 문구
 *
 * portalAssets.ts
 * → 공지 포스터 이미지 URL
 *
 * TdkSharepointApplicationCustomizer.ts
 * → 팝업 열기 / 닫기
 * → 오늘 하루 보지 않음
 * → localStorage
 * → ESC 이벤트
 *
 * customStyles.ts
 * → 팝업 크기 / 위치 / 디자인
 *
 *
 * [공지 이미지 변경]
 *
 * 이 파일이 아니라
 *
 * data/portalAssets.ts
 *
 * 의 NOTICE_POPUP_IMAGE_URL을 수정한다.
 */


/* =========================================================
   1. Popup Element ID
   ========================================================= */

/**
 * 공지 팝업에서 사용하는 HTML Element ID
 *
 * TdkSharepointApplicationCustomizer.ts에서
 * 팝업 요소를 찾고 이벤트를 연결할 때 사용한다.
 *
 * ID를 변경할 경우 Application Customizer에서도
 * 이 값을 사용하므로 직접 문자열을 중복 작성하지 않는다.
 */
export const NOTICE_POPUP_IDS = {

    /**
     * Popup 전체 영역
     */
    popup:
        'tdk-notice-popup',

    /**
     * Popup 외부 클릭 영역
     */
    backdrop:
        'tdk-notice-popup-backdrop',

    /**
     * 우측 상단 X 버튼
     */
    closeIcon:
        'tdk-notice-popup-close-icon',

    /**
     * 하단 닫기 버튼
     */
    closeButton:
        'tdk-notice-popup-close-button',

    /**
     * 오늘 하루 보지 않음 Checkbox
     */
    todayCheckbox:
        'tdk-notice-popup-today-checkbox'

} as const;


/* =========================================================
   2. LocalStorage Key
   ========================================================= */

/**
 * '오늘 하루 보지 않음' 상태를 저장하는
 * 브라우저 localStorage Key
 *
 * 실제 저장 / 조회 로직은
 * TdkSharepointApplicationCustomizer.ts에서 처리한다.
 */
export const NOTICE_POPUP_STORAGE_KEY: string =
    'tdk-notice-popup-hidden-until';


/* =========================================================
   3. 다국어 Label Type
   ========================================================= */

/**
 * 공지 팝업에서 사용하는
 * 언어별 고정 문구 구조
 */
type NoticePopupLabels = {

    /**
     * Popup 접근성 제목
     */
    title: string;

    /**
     * 하단 닫기 버튼
     */
    close: string;

    /**
     * X 버튼 aria-label
     */
    closeLabel: string;

    /**
     * 오늘 하루 보지 않음
     */
    hideToday: string;

    /**
     * Poster 이미지 alt
     */
    imageAlt: string;
};


/* =========================================================
   4. 다국어 Label
   ========================================================= */

/**
 * 공지 팝업 언어별 문구
 */
const NOTICE_POPUP_LABELS:
    Record<Locale, NoticePopupLabels> = {

    ko: {
        title: 'MX 안내',
        close: '닫기',
        closeLabel: '공지 팝업 닫기',
        hideToday: '오늘 하루 보지 않음',
        imageAlt: 'MX 안내 포스터'
    },

    en: {
        title: 'MX Notice',
        close: 'Close',
        closeLabel: 'Close notice popup',
        hideToday: 'Do not show again today',
        imageAlt: 'MX notice poster'
    },

    ja: {
        title: 'MX お知らせ',
        close: '閉じる',
        closeLabel: 'お知らせを閉じる',
        hideToday: '今日は表示しない',
        imageAlt: 'MXお知らせポスター'
    }
};


/* =========================================================
   5. HTML Escape
   ========================================================= */

/**
 * HTML 문자열에 들어가는 값을 Escape 처리한다.
 *
 * 이미지 URL / 제목 / 문구 등에 특수문자가 포함되어도
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
   6. Notice Popup HTML
   ========================================================= */

/**
 * 메인 포털 공지 팝업 HTML을 생성한다.
 *
 *
 * [구성]
 *
 * Popup
 * ├ Backdrop
 * └ Dialog
 *    ├ Poster Image
 *    ├ X Button
 *    └ Footer
 *       ├ 오늘 하루 보지 않음
 *       └ 닫기 버튼
 *
 *
 * @param imageUrl
 * portalAssets.ts의 NOTICE_POPUP_IMAGE_URL
 *
 * @param locale
 * 현재 포털 언어
 *
 * @param customTitle
 * 기본 언어별 제목 대신 사용할 별도 제목
 *
 * @returns
 * 공지 팝업 HTML 문자열
 */
export function getNoticePopupHtml(
    imageUrl: string,
    locale: Locale,
    customTitle?: string
): string {

    /**
     * 이미지가 설정되어 있지 않으면
     * Popup을 생성하지 않는다.
     */
    if (
        !imageUrl ||
        !imageUrl.trim()
    ) {
        return '';
    }


    /**
     * 현재 언어 Label
     */
    const labels: NoticePopupLabels =
        NOTICE_POPUP_LABELS[locale] ||
        NOTICE_POPUP_LABELS.ko;


    /**
     * Popup 제목
     *
     * customTitle이 전달된 경우 우선 사용하고
     * 없으면 언어별 기본 제목을 사용한다.
     *
     * 현재 디자인에서는 화면에 제목을 직접 표시하지 않고
     * Dialog의 aria-label로 사용한다.
     */
    const popupTitle: string =
        customTitle &&
        customTitle.trim()

            ? customTitle.trim()

            : labels.title;


    /**
     * HTML에 들어가는 값 Escape
     */
    const safeImageUrl: string =
        escapeHtml(
            imageUrl.trim()
        );


    const safeTitle: string =
        escapeHtml(
            popupTitle
        );


    const safeImageAlt: string =
        escapeHtml(
            labels.imageAlt
        );


    const safeCloseLabel: string =
        escapeHtml(
            labels.closeLabel
        );


    const safeHideToday: string =
        escapeHtml(
            labels.hideToday
        );


    const safeCloseText: string =
        escapeHtml(
            labels.close
        );


    /**
     * Notice Popup 전체 HTML
     */
    return `
      <div
        id="${NOTICE_POPUP_IDS.popup}"
        class="tdk-notice-popup"
        aria-hidden="true"
      >

        <!-- ===============================================
             Backdrop

             Popup 외부 영역을 클릭하면 닫기 위해 사용한다.

             실제 배경 색상 / 투명도는
             customStyles.ts에서 관리한다.
             =============================================== -->
        <div
          id="${NOTICE_POPUP_IDS.backdrop}"
          class="tdk-notice-popup__backdrop"
          data-notice-close="true"
        ></div>


        <!-- ===============================================
             Popup Dialog

             현재 디자인에서는
             Poster 이미지 자체가 Popup 본체 역할을 한다.
             =============================================== -->
        <div
          class="tdk-notice-popup__dialog"
          role="dialog"
          aria-modal="true"
          aria-label="${safeTitle}"
        >


          <!-- =============================================
               Notice Poster
               ============================================= -->
          <img
            class="tdk-notice-popup__image"
            src="${safeImageUrl}"
            alt="${safeImageAlt}"
          />


          <!-- =============================================
               우측 상단 X 버튼
               ============================================= -->
          <button
            id="${NOTICE_POPUP_IDS.closeIcon}"
            class="tdk-notice-popup__close"
            type="button"
            aria-label="${safeCloseLabel}"
            data-notice-close="true"
          >
            ×
          </button>


          <!-- =============================================
               Popup Footer
               ============================================= -->
          <div class="tdk-notice-popup__footer">


            <!-- 오늘 하루 보지 않음 -->
            <label class="tdk-notice-popup__today-label">

              <input
                id="${NOTICE_POPUP_IDS.todayCheckbox}"
                class="tdk-notice-popup__today-checkbox"
                type="checkbox"
              />

              <span class="tdk-notice-popup__today-text">
                ${safeHideToday}
              </span>

            </label>


            <!-- 닫기 -->
            <button
              id="${NOTICE_POPUP_IDS.closeButton}"
              class="tdk-notice-popup__confirm"
              type="button"
              data-notice-close="true"
            >
              ${safeCloseText}
            </button>

          </div>

        </div>

      </div>
    `;
}