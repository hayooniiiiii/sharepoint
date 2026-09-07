import {
    Locale,
    LocalizedText,
    ProductCard,
    ProductGroup,
    ProductItem,
    ProductLink
} from '../models/types';


/**
 * =========================================================
 * Dashboard Detail Panel
 * =========================================================
 *
 * 메인 Dashboard Card를 클릭했을 때 표시되는
 * 상세 메뉴 영역을 생성하고 동작을 관리한다.
 *
 *
 * [역할 구분]
 *
 * productCards.ts
 * → 카드 / 제품 / 상세 메뉴 데이터 관리
 *
 * detailPanel.ts
 * → productCards.ts 데이터를 상세 메뉴 HTML로 변환
 * → 제품 그룹 열기 / 닫기 처리
 * → 하위 메뉴(Flyout) 처리
 * → 준비중 메뉴 처리
 * → 복사 버튼 처리
 *
 * customStyles.ts
 * → 상세 패널 디자인
 *
 *
 * [준비중 메뉴]
 *
 * productCards.ts에서
 *
 * status: 'preparing'
 *
 * 으로 설정한다.
 *
 * 준비중 메뉴는
 * - 클릭 이동 방지
 * - 비활성 스타일 적용
 * - 준비중 Badge 표시
 *
 * 로 처리한다.
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
   2. 상세 패널 다국어 Label
   ========================================================= */

/**
 * 상세 패널에서 사용하는 고정 문구
 */
const DETAIL_PANEL_LABELS: Record<
    Locale,
    {
        note: string;
        preparing: string;
    }
> = {

    ko: {
        note: '메뉴를 클릭하면 새 탭으로 열립니다.',
        preparing: '준비중입니다'
    },

    en: {
        note: 'Click a menu item to open it in a new tab.',
        preparing: 'Coming soon'
    },

    ja: {
        note: 'メニューをクリックすると新しいタブで開きます。',
        preparing: '準備中です'
    }
};


/* =========================================================
   3. Event 상태
   ========================================================= */

/**
 * 복사 버튼 이벤트가 document에
 * 중복 등록되는 것을 방지한다.
 *
 * 복사 버튼은 Event Delegation 방식으로 처리하므로
 * 한 번만 등록하면 이후 새로 생성되는 버튼에도 적용된다.
 */
let isCopyHandlerBound: boolean = false;


/* =========================================================
   4. 상세 메뉴 / Flyout
   ========================================================= */

/**
 * ProductLink 목록을 HTML로 변환한다.
 *
 *
 * 일반 메뉴
 * ---------------------------------------------------------
 *
 * ACT45
 * └ 실적
 *
 *
 * 하위 메뉴
 * ---------------------------------------------------------
 *
 * ACT45
 * └ PEIS
 *    ├ Daily
 *    └ Monthly
 *
 *
 * children을 재귀적으로 처리하기 때문에
 * 필요하면 여러 단계의 하위 메뉴도 구성할 수 있다.
 *
 *
 * 준비중 메뉴
 * ---------------------------------------------------------
 *
 * status: 'preparing'
 *
 * 상태일 경우 링크 이동을 막고
 * 준비중 Badge를 표시한다.
 *
 *
 * @param links
 * 출력할 ProductLink 목록
 *
 * @param locale
 * 현재 포털 언어
 *
 * @param labels
 * 상세 패널 다국어 문구
 *
 * @param depth
 * 현재 Flyout 메뉴 깊이
 */
function renderFlyoutLinks(
    links: ProductLink[] | undefined,
    locale: Locale,
    labels: {
        preparing: string;
    },
    depth: number = 0
): string {

    /**
     * links가 없으면 빈 배열 사용
     */
    const safeLinks: ProductLink[] =
        links || [];


    return safeLinks
        .map(
            (link: ProductLink): string => {

                /**
                 * 준비중 상태
                 */
                const isDisabled: boolean =
                    link.status === 'preparing';


                /**
                 * 하위 메뉴 존재 여부
                 */
                const hasChildren: boolean =
                    !!link.children &&
                    link.children.length > 0;


                /**
                 * 실제 이동 가능한 링크인지 확인
                 *
                 * 아래 조건에서는 이동하지 않는다.
                 *
                 * - 준비중
                 * - children 존재
                 * - URL 없음
                 */
                const canNavigate: boolean =
                    !isDisabled &&
                    !hasChildren &&
                    !!link.url;


                /**
                 * 이동 가능한 경우만 실제 URL 사용
                 */
                const href: string =
                    canNavigate
                        ? link.url || '#'
                        : '#';


                /**
                 * 메뉴 CSS Class
                 */
                const linkClass: string = [
                    depth === 0
                        ? 'tdk-detail-link'
                        : 'tdk-flyout-item',

                    isDisabled
                        ? 'is-disabled'
                        : '',

                    hasChildren
                        ? 'has-flyout'
                        : ''
                ]
                    .filter(Boolean)
                    .join(' ');


                /**
                 * 재귀적으로 하위 메뉴 생성
                 */
                const childMenuHtml: string =
                    hasChildren
                        ? `
                          <div class="tdk-flyout-menu">
                            ${renderFlyoutLinks(
                            link.children,
                            locale,
                            labels,
                            depth + 1
                        )}
                          </div>
                        `
                        : '';


                /**
                 * 메뉴 오른쪽 상태 영역
                 */
                const statusHtml: string =
                    hasChildren
                        ? `
                          <span class="tdk-flyout-arrow">
                            ›
                          </span>
                        `
                        : isDisabled
                            ? `
                              <span class="tdk-detail-link__badge">
                                ${labels.preparing}
                              </span>
                            `
                            : '';


                return `
                  <div
                    class="tdk-flyout-wrap ${
                    depth > 0
                        ? 'is-nested'
                        : ''
                }"
                  >

                    <a
                      class="${linkClass}"

                      href="${href}"

                      target="${
                    canNavigate
                        ? '_blank'
                        : '_self'
                }"

                      rel="noopener noreferrer"

                      title="${
                    isDisabled
                        ? labels.preparing
                        : ''
                }"

                      aria-disabled="${
                    isDisabled
                        ? 'true'
                        : 'false'
                }"

                      ${
                    canNavigate
                        ? ''
                        : 'onclick="return false;"'
                }
                    >

                      <span>
                        ${getLocalizedText(
                    link.text,
                    locale
                )}
                      </span>

                      ${statusHtml}

                    </a>

                    ${childMenuHtml}

                  </div>
                `;
            }
        )
        .join('');
}


/* =========================================================
   5. 상세 패널 출력
   ========================================================= */

/**
 * 선택한 Dashboard Card의
 * 상세 메뉴를 출력한다.
 *
 *
 * 예)
 *
 * 생산
 *
 * ├ CORE
 * │  └ Ferrite
 * │     ├ 실적
 * │     └ 공정현황
 * │
 * └ COIL
 *    ├ ACT45
 *    ├ ADL2012
 *    ├ VLS-EX
 *    ├ VLS-CX
 *    └ PID
 *
 *
 * @param card
 * 클릭한 Dashboard Card
 *
 * @param locale
 * 현재 포털 언어
 */
export function renderDetailPanel(
    card: ProductCard,
    locale: Locale
): void {

    /**
     * 상세 패널 DOM
     *
     * cardlist.ts에서 생성한다.
     */
    const panel: HTMLElement | null =
        document.getElementById(
            'tdk-detail-panel'
        );


    if (!panel) {
        return;
    }


    /**
     * 현재 언어 Label
     */
    const labels =
        DETAIL_PANEL_LABELS[locale] ||
        DETAIL_PANEL_LABELS.ko;


    /**
     * Dashboard Card 상세 HTML
     */
    panel.innerHTML = `
      <div class="tdk-detail-panel__inner">

        ${
        card.items
            .map(
                (
                    item: ProductItem,
                    itemIndex: number
                ): string => {

                    /**
                     * CORE / COIL 내부 Product Group
                     */
                    const visibleGroups: ProductGroup[] =
                        item.groups;


                    /**
                     * 표시할 그룹이 없으면
                     * CORE / COIL 영역 자체를 생성하지 않는다.
                     */
                    if (
                        visibleGroups.length === 0
                    ) {
                        return '';
                    }


                    return `
                          <div class="tdk-detail-item">

                            <!-- =====================================
                                 Product Category
                                 CORE / COIL
                                 ===================================== -->
                            <div class="tdk-detail-item__title">
                              ${getLocalizedText(
                        item.title,
                        locale
                    )}
                            </div>


                            <!-- =====================================
                                 Product Group
                                 Ferrite / ACT45 / ADL2012 ...
                                 ===================================== -->
                            <div class="tdk-detail-groups">

                              ${
                        visibleGroups
                            .map(
                                (
                                    group: ProductGroup,
                                    groupIndex: number
                                ): string => {

                                    const groupTitle: string =
                                        getLocalizedText(
                                            group.title,
                                            locale
                                        );


                                    /**
                                     * =================================
                                     * Direct Link Group
                                     * =================================
                                     *
                                     * 시설 카드처럼
                                     * ProductGroup 자체에 URL이 있으면
                                     * 하위 메뉴 없이 바로 이동한다.
                                     */
                                    if (group.url) {

                                        return `
                                                    <a
                                                      class="
                                                        tdk-detail-group
                                                        tdk-detail-group--direct
                                                      "
                                                      href="${group.url}"
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                    >

                                                      <div
                                                        class="
                                                          tdk-detail-group__title
                                                          tdk-detail-group__title--direct
                                                        "
                                                      >

                                                        <div class="tdk-detail-group__header">

                                                          <span>
                                                            ${groupTitle}
                                                          </span>

                                                        </div>

                                                      </div>

                                                    </a>
                                                  `;
                                    }


                                    /**
                                     * =================================
                                     * Expandable Product Group
                                     * =================================
                                     *
                                     * Ferrite / ACT45 / ADL2012 등
                                     * 클릭하면 상세 링크를 펼친다.
                                     */
                                    return `
                                                <div class="tdk-detail-group">

                                                  <button
                                                    class="tdk-detail-group__title"
                                                    type="button"
                                                    data-detail-group-index="${itemIndex}-${groupIndex}"
                                                    aria-expanded="false"
                                                  >

                                                    <div class="tdk-detail-group__header">

                                                      ${
                                        group.image
                                            ? `
                                                                <img
                                                                  class="tdk-detail-group__img"
                                                                  src="${group.image}"
                                                                  alt="${groupTitle}"
                                                                />
                                                              `
                                            : ''
                                    }

                                                      <span>
                                                        ${groupTitle}
                                                      </span>

                                                    </div>


                                                    <span
                                                      class="arrow"
                                                      aria-hidden="true"
                                                    >
                                                      ▾
                                                    </span>

                                                  </button>


                                                  <!-- =================================
                                                       Detail Link
                                                       ================================= -->
                                                  <div
                                                    class="tdk-detail-links"
                                                    id="tdk-detail-links-${itemIndex}-${groupIndex}"
                                                  >

                                                    ${renderFlyoutLinks(
                                        group.links,
                                        locale,
                                        labels
                                    )}

                                                  </div>

                                                </div>
                                              `;
                                }
                            )
                            .join('')
                    }

                            </div>

                          </div>
                        `;
                }
            )
            .join('')
    }


        <!-- ===============================================
             Detail Panel 안내
             =============================================== -->
        <div class="tdk-detail-note">
          ${labels.note}
        </div>

      </div>
    `;


    /**
     * 새로 생성된 Product Group에
     * 열기 / 닫기 이벤트 연결
     */
    bindDetailGroupEvents();


    /**
     * 다음 Frame에서 표시 Class 적용
     *
     * CSS Transition이 정상 동작하도록 한다.
     */
    window.requestAnimationFrame(
        (): void => {

            panel.classList.add(
                'is-visible'
            );
        }
    );
}


/* =========================================================
   6. 상세 패널 닫기
   ========================================================= */

/**
 * 현재 열려 있는 상세 패널을 닫는다.
 *
 * CSS Animation 종료 후
 * 내부 HTML도 제거한다.
 */
export function hideDetailPanel(): void {

    const panel: HTMLElement | null =
        document.getElementById(
            'tdk-detail-panel'
        );


    if (!panel) {
        return;
    }


    /**
     * 닫기 Animation 시작
     */
    panel.classList.remove(
        'is-visible'
    );


    /**
     * Animation 종료 후 HTML 제거
     */
    window.setTimeout(
        (): void => {

            if (
                !panel.classList.contains(
                    'is-visible'
                )
            ) {

                panel.innerHTML = '';
            }

        },
        260
    );
}


/* =========================================================
   7. Product Group 열기 / 닫기
   ========================================================= */

/**
 * Ferrite / ACT45 / ADL2012 등
 * 접을 수 있는 Product Group 버튼에
 * 클릭 이벤트를 연결한다.
 */
function bindDetailGroupEvents(): void {

    /**
     * data-detail-group-index가 있는
     * 실제 Expand Button만 선택한다.
     *
     * 시설 Direct Link Group은 제외한다.
     */
    const buttons:
        NodeListOf<HTMLButtonElement> =
        document.querySelectorAll(
            '.tdk-detail-group__title[data-detail-group-index]'
        );


    buttons.forEach(
        (
            button: HTMLButtonElement
        ): void => {

            button.addEventListener(
                'click',
                (): void => {

                    /**
                     * Product Group Index
                     *
                     * 예)
                     *
                     * CORE 첫 번째 Group
                     * → 0-0
                     *
                     * COIL 첫 번째 Group
                     * → 1-0
                     */
                    const index: string | null =
                        button.getAttribute(
                            'data-detail-group-index'
                        );


                    if (!index) {
                        return;
                    }


                    /**
                     * 현재 버튼에 연결된
                     * Detail Link 영역
                     */
                    const currentLinks:
                        HTMLElement | null =
                        document.getElementById(
                            `tdk-detail-links-${index}`
                        );


                    if (!currentLinks) {
                        return;
                    }


                    /**
                     * 열림 / 닫힘 상태 변경
                     */
                    const isOpen: boolean =
                        currentLinks.classList.toggle(
                            'is-open'
                        );


                    /**
                     * Button 스타일 상태 변경
                     */
                    button.classList.toggle(
                        'is-open',
                        isOpen
                    );


                    /**
                     * 접근성 상태도 같이 갱신
                     */
                    button.setAttribute(
                        'aria-expanded',
                        isOpen
                            ? 'true'
                            : 'false'
                    );
                }
            );
        }
    );
}


/* =========================================================
   8. 복사 버튼
   ========================================================= */

/**
 * .tdk-copy-btn 클릭 시
 * data-copy 값을 Clipboard로 복사한다.
 *
 * 현재 공용 계정 Popup 등에서 사용한다.
 *
 *
 * Event Delegation
 * ---------------------------------------------------------
 *
 * document 전체에 이벤트를 한 번만 연결한다.
 *
 * 따라서 언어 변경 등으로 Popup HTML이
 * 새로 생성되어도 추가 이벤트 등록 없이
 * 복사 버튼이 계속 동작한다.
 */
export function bindCopyButtons(): void {

    /**
     * 중복 등록 방지
     */
    if (isCopyHandlerBound) {
        return;
    }


    isCopyHandlerBound = true;


    document.addEventListener(
        'click',

        async (
            event: MouseEvent
        ): Promise<void> => {

            const target:
                HTMLElement | null =
                event.target as HTMLElement | null;


            if (!target) {
                return;
            }


            /**
             * 클릭한 요소 또는 부모에서
             * .tdk-copy-btn 검색
             */
            const button:
                HTMLButtonElement | null =
                target.closest(
                    '.tdk-copy-btn'
                ) as HTMLButtonElement | null;


            if (!button) {
                return;
            }


            /**
             * Clipboard에 복사할 값
             */
            const value: string | null =
                button.getAttribute(
                    'data-copy'
                );


            if (!value) {
                return;
            }


            try {

                /**
                 * Clipboard 복사
                 */
                await navigator.clipboard.writeText(
                    value
                );


                /**
                 * 기존 버튼 텍스트 보관
                 */
                const originalText: string =
                    button.innerText;


                /**
                 * 복사 성공 표시
                 */
                button.innerText =
                    '복사완료';


                button.classList.add(
                    'is-copied'
                );


                /**
                 * 1.2초 후 원상복구
                 */
                window.setTimeout(
                    (): void => {

                        button.innerText =
                            originalText;


                        button.classList.remove(
                            'is-copied'
                        );

                    },
                    1200
                );

            } catch {

                /**
                 * 복사 실패 표시
                 */
                const originalText: string =
                    button.innerText;


                button.innerText =
                    '실패';


                window.setTimeout(
                    (): void => {

                        button.innerText =
                            originalText;

                    },
                    1200
                );
            }
        }
    );
}


/* =========================================================
   9. 초기 Event 등록
   ========================================================= */

/**
 * 복사 버튼은 Event Delegation 방식이므로
 * 최초 한 번만 document에 등록한다.
 *
 * 이후 cardlist.ts의 공용 계정 Popup이
 * 다시 렌더링되어도 그대로 동작한다.
 */
bindCopyButtons();