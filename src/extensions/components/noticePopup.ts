import { Locale } from '../models/types';

/**
 * 공지 팝업에서 사용하는 HTML 요소 ID
 *
 * Application Customizer에서 팝업 요소를 찾고
 * 열기·닫기 이벤트를 연결할 때 사용한다.
 */
export const NOTICE_POPUP_IDS = {
    popup: 'tdk-notice-popup',
    backdrop: 'tdk-notice-popup-backdrop',
    closeIcon: 'tdk-notice-popup-close-icon',
    closeButton: 'tdk-notice-popup-close-button',
    todayCheckbox: 'tdk-notice-popup-today-checkbox'
};

/**
 * '오늘 하루 보지 않음' 상태를 저장하는 localStorage 키
 */
export const NOTICE_POPUP_STORAGE_KEY: string =
    'tdk-notice-popup-hidden-until';

/**
 * 언어별 공지 팝업 문구
 */
const NOTICE_POPUP_LABELS: Record<Locale, {
    title: string;
    close: string;
    closeLabel: string;
    hideToday: string;
    imageAlt: string;
}> = {
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

/**
 * HTML 특수문자를 안전한 문자열로 변환한다.
 *
 * 이미지 URL이나 제목에 특수문자가 포함되어도
 * HTML 구조가 깨지지 않도록 처리한다.
 */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * 메인 화면 진입 시 표시할 공지 팝업 HTML을 생성한다.
 *
 * 구성:
 * - 팝업 뒤쪽 어두운 배경
 * - 팝업 제목
 * - 우측 상단 X 버튼
 * - PNG 포스터 이미지
 * - 오늘 하루 보지 않음
 * - 하단 닫기 버튼
 *
 * @param imageUrl 팝업에 표시할 PNG 이미지 URL
 * @param locale 현재 선택된 언어
 * @param customTitle 별도로 표시할 팝업 제목
 *
 * @returns 공지 팝업 HTML 문자열
 */
export function getNoticePopupHtml(
    imageUrl: string,
    locale: Locale,
    customTitle?: string
): string {
    /**
     * 이미지 URL이 없으면 팝업을 생성하지 않는다.
     */
    if (!imageUrl || !imageUrl.trim()) {
        return '';
    }

    /**
     * 현재 언어에 맞는 문구를 가져온다.
     *
     * 현재 언어 정보가 없으면
     * 한국어 문구를 기본값으로 사용한다.
     */
    const labels =
        NOTICE_POPUP_LABELS[locale] ||
        NOTICE_POPUP_LABELS.ko;

    /**
     * 별도 제목이 전달되면 해당 제목을 사용하고,
     * 없으면 언어별 기본 제목을 사용한다.
     */
    const popupTitle: string =
        customTitle && customTitle.trim()
            ? customTitle.trim()
            : labels.title;

    /**
     * HTML 속성에 들어가는 값들을 안전하게 변환한다.
     */
    const safeImageUrl: string =
        escapeHtml(imageUrl.trim());

    const safeTitle: string =
        escapeHtml(popupTitle);

    const safeImageAlt: string =
        escapeHtml(labels.imageAlt);

    const safeCloseLabel: string =
        escapeHtml(labels.closeLabel);

    const safeHideToday: string =
        escapeHtml(labels.hideToday);

    const safeCloseText: string =
        escapeHtml(labels.close);

    return `
  <div
    id="${NOTICE_POPUP_IDS.popup}"
    class="tdk-notice-popup"
    aria-hidden="true"
  >
    <!-- 포털 화면 위의 투명한 클릭 영역 -->
    <div
      id="${NOTICE_POPUP_IDS.backdrop}"
      class="tdk-notice-popup__backdrop"
      data-notice-close="true"
    ></div>

    <!-- 포스터 이미지 자체가 팝업창 -->
    <div
      class="tdk-notice-popup__dialog"
      role="dialog"
      aria-modal="true"
      aria-label="${safeTitle}"
    >
      <img
        class="tdk-notice-popup__image"
        src="${safeImageUrl}"
        alt="${safeImageAlt}"
      />

      <!-- 포스터 위에 겹치는 X 버튼 -->
      <button
        id="${NOTICE_POPUP_IDS.closeIcon}"
        class="tdk-notice-popup__close"
        type="button"
        aria-label="${safeCloseLabel}"
        data-notice-close="true"
      >
        ×
      </button>

      <!-- 포스터 하단 제어 영역 -->
      <div class="tdk-notice-popup__footer">
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