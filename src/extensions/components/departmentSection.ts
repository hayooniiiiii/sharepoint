import {
    DepartmentLink,
    DepartmentLinkSet,
    Locale,
    LocalizedText
} from '../models/types';


/**
 * =========================================================
 * Department Channel Section
 * =========================================================
 *
 * 메인 포털의 '부문 채널' 영역을 생성한다.
 *
 * 실제 부서별 데이터는
 *
 * data/departmentLinks.ts
 *
 * 에서 관리한다.
 *
 *
 * [역할 구분]
 *
 * departmentLinks.ts
 * → 부서명 / SharePoint URL / 사용 가능 여부 관리
 *
 * departmentSection.ts
 * → 위 데이터를 HTML로 변환하여 화면에 출력
 *
 *
 * [유지보수]
 *
 * 부서 추가 / 삭제 / URL 변경
 * → departmentLinks.ts 수정
 *
 * 부문 채널 화면 구조 변경
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
 * 우선순위
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
 * HTML 문자열 안에 들어가는 값을 Escape 처리한다.
 *
 * HTML 깨짐 및 XSS 문제를 방지한다.
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
 * 부문 채널 영역 제목
 */
const DEPARTMENT_LABELS: Record<
    Locale,
    {
        title: string;
    }
> = {

    ko: {
        title: '부문 채널'
    },

    en: {
        title: 'Department Channel'
    },

    ja: {
        title: '部門チャンネル'
    }
};


/* =========================================================
   4. Department Channel HTML
   ========================================================= */

/**
 * 부문 채널 영역 HTML을 생성한다.
 *
 * @param departmentLinks
 * data/departmentLinks.ts의 DEPARTMENT_LINKS 데이터
 *
 * @param locale
 * 현재 포털 화면 언어
 *
 * @returns
 * 부문 채널 영역 HTML 문자열
 */
export function getDepartmentSectionHtml(
    departmentLinks: DepartmentLinkSet,
    locale: Locale
): string {

    /**
     * 현재 언어의 Section 제목
     */
    const labels: {
        title: string;
    } =
        DEPARTMENT_LABELS[locale] ||
        DEPARTMENT_LABELS.ko;


    /**
     * 각각의 부서 버튼 HTML 생성
     */
    const departmentItemsHtml: string =
        departmentLinks
            .map(
                (item: DepartmentLink): string => {

                    /**
                     * disabled가 true이거나
                     * URL이 없으면 비활성 상태로 처리한다.
                     */
                    const isDisabled: boolean =
                        item.disabled === true ||
                        !item.url;


                    /**
                     * 화면에 표시할 다국어 부서명
                     */
                    const text: string =
                        escapeHtml(
                            getLocalizedText(
                                item.text,
                                locale
                            )
                        );


                    /**
                     * 비활성 부서
                     *
                     * 실제 URL을 연결하지 않고
                     * aria-disabled를 사용한다.
                     */
                    if (isDisabled) {

                        return `
                          <a
                            class="tdk-department-btn is-disabled"
                            aria-disabled="true"
                            tabindex="-1"
                          >
                            ${text}
                          </a>
                        `;
                    }


                    /**
                     * 활성 부서
                     *
                     * 새 탭으로 SharePoint 채널을 연다.
                     */
                    const url: string =
                        escapeHtml(
                            item.url || ''
                        );


                    return `
                      <a
                        class="tdk-department-btn"
                        href="${url}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ${text}
                      </a>
                    `;
                }
            )
            .join('');


    /**
     * 부문 채널 전체 Section HTML
     */
    return `
      <div class="tdk-department-section">

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
             Department Channel List
             =============================================== -->
        <div class="tdk-department-row">

          ${departmentItemsHtml}

        </div>

      </div>
    `;
}