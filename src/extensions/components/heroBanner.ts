import { Locale } from '../models/types';

/**
 * 언어별 메인 배너 제목
 */
const HERO_LABELS: Record<Locale, string> = {
    ko: 'TDK Korea Portal',
    en: 'TDK Korea Portal',
    ja: 'TDK Korea Portal'
};

/**
 * 언어별 포스터 문구
 *
 * title       : 포스터 제목
 * description : 포스터 카드에 표시할 안내 문구
 * openLabel   : 포스터 열기 버튼의 접근성 문구
 * closeLabel  : 포스터 닫기 버튼의 접근성 문구
 */
const POSTER_LABELS: Record<Locale, {
    title: string;
    description: string;
    openLabel: string;
    closeLabel: string;
}> = {
    ko: {
        title: '',
        description: '',
        openLabel: '',
        closeLabel: ''
    },
    en: {
        title: '',
        description: '',
        openLabel: '',
        closeLabel: ''
    },
    ja: {
        title: '',
        description: '',
        openLabel: '',
        closeLabel: ''
    }
};

/**
 * 메인 배너와 MX 포스터 영역의 HTML을 생성한다.
 *
 * @param bannerUrls 슬라이드에 표시할 배너 이미지 URL 목록
 * @param posterUrl 오른쪽에 표시할 MX 포스터 이미지 URL
 * @param locale 현재 선택된 언어
 *
 * @returns 배너, 포스터 카드, 포스터 모달이 포함된 HTML 문자열
 */
export function getHeroBannerHtml(
    bannerUrls: string[],
    posterUrl: string,
    locale: Locale
): string {

    /**
     * 현재 언어에 맞는 배너 제목을 가져온다.
     * 일치하는 언어가 없으면 한국어를 기본값으로 사용한다.
     */
    const title: string =
        HERO_LABELS[locale] || HERO_LABELS.ko;

    /**
     * 현재 언어에 맞는 포스터 문구를 가져온다.
     * 일치하는 언어가 없으면 한국어를 기본값으로 사용한다.
     */
    const posterLabel =
        POSTER_LABELS[locale] || POSTER_LABELS.ko;

    /**
     * 배너 URL 배열에서 빈 값을 제거한다.
     *
     * bannerUrls가 배열이 아닌 경우에는
     * 오류 방지를 위해 빈 배열을 사용한다.
     */
    const safeBannerUrls: string[] =
        Array.isArray(bannerUrls)
            ? bannerUrls.filter((url: string): boolean => Boolean(url))
            : [];

    /**
     * 오른쪽에 표시할 포스터 카드 HTML
     *
     * posterUrl이 있을 때만 포스터 카드를 생성한다.
     * 사용자가 포스터를 클릭하면 모달을 열 때 사용한다.
     */
    const posterCardHtml: string = posterUrl
        ? `
          <button
            id="tdk-poster-open"
            class="tdk-poster-card"
            type="button"
            aria-label="${posterLabel.openLabel}"
            aria-controls="tdk-poster-modal"
            aria-expanded="false"
          >
            <img
              class="tdk-poster-card__image"
              src="${posterUrl}"
              alt="${posterLabel.title}"
            />

            <div class="tdk-poster-card__overlay">
              <div class="tdk-poster-card__content">
                <span class="tdk-poster-card__title">
                  ${posterLabel.title}
                </span>

                <span class="tdk-poster-card__description">
                  ${posterLabel.description}
                </span>
              </div>

              <span
                class="tdk-poster-card__icon"
                aria-hidden="true"
              >
                ＋
              </span>
            </div>
          </button>
        `
        : '';

    /**
     * 포스터 확대 모달 HTML
     *
     * posterUrl이 있을 때만 모달을 생성한다.
     * 처음에는 숨겨진 상태이며,
     * 포스터 클릭 이벤트에서 화면에 표시한다.
     */
    const posterModalHtml: string = posterUrl
        ? `
          <div
            id="tdk-poster-modal"
            class="tdk-poster-modal"
            aria-hidden="true"
          >
            <!-- 모달 뒤쪽의 어두운 배경 -->
            <div
              class="tdk-poster-modal__backdrop"
              data-poster-close="true"
            ></div>

            <!-- 실제 포스터를 표시하는 모달 창 -->
            <div
              class="tdk-poster-modal__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tdk-poster-modal-title"
            >
              <div class="tdk-poster-modal__header">
                <div
                  id="tdk-poster-modal-title"
                  class="tdk-poster-modal__title"
                >
                  ${posterLabel.title}
                </div>

                <!-- 포스터 모달 닫기 버튼 -->
                <button
                  class="tdk-poster-modal__close"
                  type="button"
                  aria-label="${posterLabel.closeLabel}"
                  data-poster-close="true"
                >
                  ×
                </button>
              </div>

              <!-- 포스터 원본 이미지 영역 -->
              <div class="tdk-poster-modal__body">
                <img
                  class="tdk-poster-modal__image"
                  src="${posterUrl}"
                  alt="${posterLabel.title}"
                />
              </div>
            </div>
          </div>
        `
        : '';

    /**
     * 전체 히어로 영역 HTML 반환
     *
     * 구성:
     * 1. 왼쪽 배너 슬라이드
     * 2. 오른쪽 MX 포스터 카드
     * 3. 포스터 확대 모달
     */
    return `
      <div class="tdk-hero-layout">

        <!-- 메인 배너 슬라이드 영역 -->
        <div
          class="tdk-hero-banner"
          id="tdk-hero-banner"
        >
          ${safeBannerUrls.map((url: string, index: number): string => `
            <img
              class="tdk-hero-banner__image ${index === 0 ? 'is-active' : ''}"
              src="${url}"
              alt="TDK Company Banner ${index + 1}"
              data-banner-index="${index}"
            />
          `).join('')}

          <!-- 배너 이미지 위의 어두운 그라데이션 -->
          <div class="tdk-hero-banner__overlay"></div>

          <!-- 배너가 2장 이상일 때만 이전·다음 버튼 표시 -->
          ${
        safeBannerUrls.length > 1
            ? `
                    <button
                      class="tdk-hero-banner__arrow tdk-hero-banner__arrow--prev"
                      type="button"
                      aria-label="Previous banner"
                    >
                      ‹
                    </button>

                    <button
                      class="tdk-hero-banner__arrow tdk-hero-banner__arrow--next"
                      type="button"
                      aria-label="Next banner"
                    >
                      ›
                    </button>
                  `
            : ''
    }

          <!-- 배너 하단 제목 -->
          <div class="tdk-hero-banner__content">
            <div class="tdk-hero-banner__headline">
              ${title}
            </div>
          </div>
        </div>

        <!-- 오른쪽 MX 포스터 카드 -->
        ${posterCardHtml}

      </div>

      <!-- 포스터 확대 모달 -->
      ${posterModalHtml}
    `;
}