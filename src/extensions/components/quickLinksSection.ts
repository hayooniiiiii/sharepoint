import {
    Locale,
    LocalizedText,
    QuickLink
} from '../models/types';


/**
 * =========================================================
 * Quick Links Section
 * =========================================================
 *
 * 메인 포털의 '어플리케이션' 바로가기 영역을 생성한다.
 *
 * 실제 어플리케이션 데이터는
 *
 * data/quickLinks.ts
 *
 * 에서 관리한다.
 *
 *
 * [역할 구분]
 *
 * quickLinks.ts
 * → 어플리케이션 이름 / URL / 아이콘 관리
 *
 * quickLinksSection.ts
 * → 위 데이터를 HTML로 변환하여 화면에 출력
 *
 *
 * [유지보수]
 *
 * 어플리케이션 추가 / 삭제 / URL 변경
 * → quickLinks.ts 수정
 *
 * Quick Links 화면 구조 변경
 * → 이 파일 수정
 *
 * 디자인 변경
 * → customStyles.ts 수정
 */


/* =========================================================
   1. 다국어 처리
   ========================================================= */

/**
 * 현재 언어에 해당하는 텍스트를 반환한다.
 *
 * 우선순위:
 *
 * 1. 현재 locale
 * 2. 한국어
 * 3. 영어
 * 4. 일본어
 */
function getLocalizedText(
    text: LocalizedText,
    locale: Locale
): string {

    return (
        text[locale] ||
        text.ko ||
        text.en ||
        text.ja ||
        ''
    );
}


/* =========================================================
   2. HTML Escape
   ========================================================= */

/**
 * HTML 특수문자를 Escape 처리한다.
 *
 * 사용자 또는 데이터 값이 HTML 문자열에
 * 직접 삽입될 때 발생할 수 있는
 * HTML 깨짐 및 XSS 문제를 방지한다.
 *
 * text뿐만 아니라 URL / 이미지 URL에도 사용한다.
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
   3. 다국어 Section Label
   ========================================================= */

/**
 * Quick Links 영역 제목
 */
const QUICK_LINK_LABELS: Record<
    Locale,
    {
        title: string;
    }
> = {

    ko: {
        title: '어플리케이션'
    },

    en: {
        title: 'Application'
    },

    ja: {
        title: 'アプリケーション'
    }
};


/* =========================================================
   4. Quick Links HTML
   ========================================================= */

/**
 * 어플리케이션 바로가기 영역 HTML을 생성한다.
 *
 * @param links
 * data/quickLinks.ts의 QUICK_LINKS 데이터
 *
 * @param locale
 * 현재 포털 화면 언어
 *
 * @returns
 * Quick Links 영역 HTML 문자열
 */
export function getQuickLinksHtml(
    links: QuickLink[],
    locale: Locale
): string {

    /**
     * 현재 언어의 Section 제목
     */
    const labels: {
        title: string;
    } =
        QUICK_LINK_LABELS[locale] ||
        QUICK_LINK_LABELS.ko;


    /**
     * 각각의 Application Link HTML 생성
     */
    const linkItemsHtml: string =
        links
            .map(
                (link: QuickLink): string => {

                    /**
                     * 화면에 표시할 다국어 이름
                     */
                    const text: string =
                        escapeHtml(
                            getLocalizedText(
                                link.text,
                                locale
                            )
                        );


                    /**
                     * 이동 URL
                     *
                     * QuickLink 타입에서 url은 optional이므로
                     * 값이 없는 경우 #을 사용한다.
                     */
                    const url: string =
                        escapeHtml(
                            link.url || '#'
                        );


                    /**
                     * Application Icon URL
                     */
                    const icon: string =
                        escapeHtml(
                            link.icon
                        );


                    return `
                      <a
                        class="tdk-quick-scroll-item"
                        href="${url}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div class="tdk-quick-scroll__icon">
                          <img
                            src="${icon}"
                            alt="${text}"
                          />
                        </div>

                        <div class="tdk-quick-scroll__text">
                          ${text}
                        </div>
                      </a>
                    `;
                }
            )
            .join('');


    /**
     * Quick Links 전체 Section HTML
     */
    return `
      <div class="tdk-quick-links">

        <!-- ===============================================
             Section Header
             =============================================== -->
        <div class="tdk-section-header">
          <div>
            <div class="tdk-section-header__title">
              ${escapeHtml(labels.title)}
            </div>
          </div>
        </div>


        <!-- ===============================================
             Application Link List
             =============================================== -->
        <div class="tdk-quick-scroll">

          ${linkItemsHtml}

        </div>

      </div>
    `;
}