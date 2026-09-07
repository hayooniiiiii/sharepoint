import { Locale } from '../models/types';


/**
 * =========================================================
 * Hero Banner
 * =========================================================
 *
 * 메인 포털 상단 Hero Banner HTML을 생성한다.
 *
 *
 * [역할 구분]
 *
 * portalAssets.ts
 * → 실제 Banner 이미지 URL 관리
 *
 * heroBanner.ts
 * → Banner HTML 구조 생성
 *
 * TdkSharepointApplicationCustomizer.ts
 * → 이전 / 다음 버튼 이벤트
 * → 자동 슬라이드
 *
 * customStyles.ts
 * → Banner 크기 / 위치 / Overlay / Animation 디자인
 *
 *
 * [배너 이미지 변경]
 *
 * 이 파일이 아니라
 *
 * data/portalAssets.ts
 *
 * 의 BANNER_URLS를 수정한다.
 */


/* =========================================================
   1. 다국어 Label
   ========================================================= */

/**
 * Hero Banner 하단 제목
 *
 * 현재는 모든 언어에서 동일한 제목을 사용한다.
 *
 * 추후 언어별 제목이 달라질 경우
 * 아래 값만 수정하면 된다.
 */
const HERO_LABELS: Record<Locale, string> = {

    ko: 'TDK Korea Portal',

    en: 'TDK Korea Portal',

    ja: 'TDK Korea Portal'
};


/* =========================================================
   2. HTML Escape
   ========================================================= */

/**
 * HTML 문자열에 삽입되는 값을 Escape 처리한다.
 *
 * Banner URL이나 제목에 특수문자가 포함되어도
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
   3. Hero Banner HTML
   ========================================================= */

/**
 * 메인 Hero Banner HTML을 생성한다.
 *
 *
 * [구성]
 *
 * Hero Banner
 * ├ Banner Image
 * ├ Overlay
 * ├ 이전 버튼
 * ├ 다음 버튼
 * └ 제목
 *
 *
 * 첫 번째 Banner Image에만
 * is-active Class를 적용한다.
 *
 * 이후 Banner 전환은
 * TdkSharepointApplicationCustomizer.ts의
 * _bindHeroBannerEvents()에서 처리한다.
 *
 *
 * @param bannerUrls
 * portalAssets.ts의 BANNER_URLS
 *
 * @param locale
 * 현재 포털 언어
 *
 * @returns
 * Hero Banner HTML 문자열
 */
export function getHeroBannerHtml(
    bannerUrls: string[],
    locale: Locale
): string {

    /**
     * Banner 이미지가 하나도 없으면
     * Hero Banner 자체를 생성하지 않는다.
     */
    if (
        !bannerUrls ||
        bannerUrls.length === 0
    ) {
        return '';
    }


    /**
     * 현재 언어 제목
     */
    const title: string =
        escapeHtml(
            HERO_LABELS[locale] ||
            HERO_LABELS.ko
        );


    /**
     * Banner Image 목록 HTML
     *
     * 첫 번째 이미지
     * → is-active
     *
     * 나머지 이미지
     * → 자동 슬라이드 이벤트에서 순차 활성화
     */
    const bannerImagesHtml: string =
        bannerUrls
            .map(
                (
                    url: string,
                    index: number
                ): string => {

                    const safeUrl: string =
                        escapeHtml(
                            url
                        );


                    return `
                      <img
                        class="
                          tdk-hero-banner__image
                          ${index === 0
                        ? 'is-active'
                        : ''
                    }
                        "
                        src="${safeUrl}"
                        alt="TDK Company Banner ${index + 1}"
                        data-banner-index="${index}"
                      />
                    `;
                }
            )
            .join('');


    /**
     * Hero Banner 전체 HTML
     */
    return `
      <div
        class="tdk-hero-banner"
        id="tdk-hero-banner"
      >

        <!-- ===============================================
             Banner Images
             =============================================== -->
        ${bannerImagesHtml}


        <!-- ===============================================
             Overlay

             Banner Image 위에 Gradient 효과를 적용하여
             하단 제목 가독성을 높인다.
             =============================================== -->
        <div class="tdk-hero-banner__overlay"></div>


        <!-- ===============================================
             Previous Banner
             =============================================== -->
        <button
          class="
            tdk-hero-banner__arrow
            tdk-hero-banner__arrow--prev
          "
          type="button"
          aria-label="Previous banner"
        >
          ‹
        </button>


        <!-- ===============================================
             Next Banner
             =============================================== -->
        <button
          class="
            tdk-hero-banner__arrow
            tdk-hero-banner__arrow--next
          "
          type="button"
          aria-label="Next banner"
        >
          ›
        </button>


        <!-- ===============================================
             Banner Title
             =============================================== -->
        <div class="tdk-hero-banner__content">

          <div class="tdk-hero-banner__headline">
            ${title}
          </div>

        </div>

      </div>
    `;
}