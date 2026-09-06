import { Locale } from '../models/types';

/**
 * 언어별 메인 배너 제목
 *
 * 현재는 모든 언어에서 동일한 제목을 사용한다.
 * 추후 언어별 제목이 달라질 경우 여기에서 수정하면 된다.
 */
const HERO_LABELS: Record<Locale, string> = {
    ko: 'TDK Korea Portal',
    en: 'TDK Korea Portal',
    ja: 'TDK Korea Portal'
};

/**
 * 메인 배너 슬라이드 HTML을 생성한다.
 *
 * @param bannerUrls 배너로 표시할 이미지 URL 목록
 * @param locale 현재 선택된 언어
 *
 * @returns 배너 이미지, 이전·다음 버튼, 제목이 포함된 HTML 문자열
 */
export function getHeroBannerHtml(
    bannerUrls: string[],
    locale: Locale
): string {

    /**
     * 현재 언어에 맞는 배너 제목을 가져온다.
     *
     * locale에 해당하는 제목이 없을 경우
     * 한국어 제목을 기본값으로 사용한다.
     */
    const title: string =
        HERO_LABELS[locale] || HERO_LABELS.ko;

    return `
      <div
        class="tdk-hero-banner"
        id="tdk-hero-banner"
      >
        <!--
          배너 이미지 목록

          첫 번째 이미지에만 is-active 클래스를 적용하여
          화면에 처음 표시되도록 한다.

          나머지 이미지는 배너 슬라이드 이벤트에서
          is-active 클래스가 순서대로 변경된다.
        -->
        ${bannerUrls.map((url: string, index: number): string => `
          <img
            class="tdk-hero-banner__image ${index === 0 ? 'is-active' : ''}"
            src="${url}"
            alt="TDK Company Banner ${index + 1}"
            data-banner-index="${index}"
          />
        `).join('')}

        <!--
          배너 이미지 위에 표시하는 그라데이션 영역

          배너 하단의 제목이 이미지 위에서도
          선명하게 보이도록 한다.
        -->
        <div class="tdk-hero-banner__overlay"></div>

        <!-- 이전 배너 이동 버튼 -->
        <button
          class="tdk-hero-banner__arrow tdk-hero-banner__arrow--prev"
          type="button"
          aria-label="Previous banner"
        >
          ‹
        </button>

        <!-- 다음 배너 이동 버튼 -->
        <button
          class="tdk-hero-banner__arrow tdk-hero-banner__arrow--next"
          type="button"
          aria-label="Next banner"
        >
          ›
        </button>

        <!-- 배너 하단 제목 영역 -->
        <div class="tdk-hero-banner__content">
          <div class="tdk-hero-banner__headline">
            ${title}
          </div>
        </div>
      </div>
    `;
}