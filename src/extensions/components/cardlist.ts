import {
    Locale,
    LocalizedText,
    ProductCard
} from '../models/types';


/**
 * =========================================================
 * Dashboard Card List
 * =========================================================
 *
 * 메인 포털의 Dashboard Card 영역을 생성한다.
 *
 * 실제 카드 데이터
 * → data/productCards.ts
 *
 * 카드 클릭 후 상세 메뉴
 * → components/detailPanel.ts
 *
 * 카드 디자인
 * → styles/customStyles.ts
 *
 *
 * [공용 계정 기능]
 *
 * 현재 공용 계정 기능은 삭제하지 않고
 * 화면에서만 숨김 처리한다.
 *
 * 향후 다시 사용할 경우 아래 설정값만 변경한다.
 */


/* =========================================================
   1. 공용 계정 표시 설정
   ========================================================= */

/**
 * 공용 계정 버튼 / Popup 전체 표시 여부
 *
 * false
 * → 현재 화면에서 숨김
 *
 * true
 * → 공용 계정 버튼 및 Popup 사용
 */
const SHOW_PUBLIC_ACCOUNT: boolean = false;


/**
 * 공용 계정 Popup 내부의
 * Tableau 계정 표시 여부
 *
 * false
 * → SCADA 계정만 표시
 *
 * true
 * → SCADA + Tableau 계정 표시
 *
 * ※ SHOW_PUBLIC_ACCOUNT가 true인 경우에만 의미가 있다.
 */
const SHOW_TABLEAU_ACCOUNT: boolean = false;


/* =========================================================
   2. 다국어 처리
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
   3. HTML Escape
   ========================================================= */

/**
 * HTML 문자열에 삽입되는 값을 Escape 처리한다.
 *
 * HTML 깨짐 및 예상하지 못한 HTML 삽입을 방지한다.
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
   4. 다국어 Label
   ========================================================= */

/**
 * Dashboard 및 공용 계정 Popup에서 사용하는
 * 다국어 Label
 *
 * 공용 계정 기능은 현재 숨김 상태지만
 * 향후 재사용을 위해 Label을 유지한다.
 */
const TABLEAU_SECTION_LABELS: Record<
    Locale,
    {
        dashboard: string;
        account: string;
        popupTitle: string;
        scadaTitle: string;
        tableauTitle: string;
        id: string;
        password: string;
        notice: string;
        copy: string;
    }
> = {

    ko: {
        dashboard: '대시보드&nbsp;&nbsp;Dashboard',
        account: '공용 계정',
        popupTitle: '공용 계정',
        scadaTitle: 'SCADA 접속 계정',
        tableauTitle: 'Tableau 접속 계정',
        id: 'ID',
        password: 'Password',
        notice: '시스템 접속 시 아래 계정을 사용하세요.',
        copy: '복사'
    },

    en: {
        dashboard: 'Dashboard',
        account: 'Public Account',
        popupTitle: 'Public Account',
        scadaTitle: 'SCADA Login Account',
        tableauTitle: 'Tableau Login Account',
        id: 'ID',
        password: 'Password',
        notice: 'Use the accounts below to access each system.',
        copy: 'Copy'
    },

    ja: {
        dashboard: 'ダッシュボード',
        account: 'パブリックアカウント',
        popupTitle: 'パブリックアカウント',
        scadaTitle: 'SCADA 接続アカウント',
        tableauTitle: 'Tableau 接続アカウント',
        id: 'ID',
        password: 'Password',
        notice: '各システム接続時に下記のアカウントを使用してください。',
        copy: 'コピー'
    }
};


/* =========================================================
   5. Card Title
   ========================================================= */

/**
 * Dashboard Card 제목 HTML 생성
 *
 * 한국어
 * → 한국어 + 영어 Sub Title
 *
 * 영어 / 일본어
 * → 해당 언어 제목만 표시
 */
function getCardTitleHtml(
    card: ProductCard,
    locale: Locale
): string {

    const mainTitle: string =
        escapeHtml(
            getLocalizedText(
                card.title,
                locale
            )
        );


    /**
     * 영어 / 일본어
     */
    if (locale !== 'ko') {

        return mainTitle;
    }


    /**
     * 한국어에서는 영어 제목도 함께 표시
     */
    const englishTitle: string =
        escapeHtml(
            card.title.en
        );


    return `
${mainTitle}

<span class="tdk-main-card__sub">
    ${englishTitle}
</span>
    `;
}


/* =========================================================
   6. Dashboard Card
   ========================================================= */

/**
 * 개별 Dashboard Card HTML 생성
 */
function getDashboardCardHtml(
    card: ProductCard,
    locale: Locale
): string {

    const cardId: string =
        escapeHtml(
            card.id
        );


    const cardImage: string =
        escapeHtml(
            card.image
        );


    return `
<button
class="tdk-main-card"
data-card-id="${cardId}"
type="button"
style="background-image: url('${cardImage}');"
>
<div class="tdk-main-card__title">

    ${getCardTitleHtml(
    card,
    locale
)}

</div>
</button>
    `;
}


/* =========================================================
   7. 공용 계정 버튼
   ========================================================= */

/**
 * 공용 계정 Popup을 여는 버튼 HTML 생성
 *
 * SHOW_PUBLIC_ACCOUNT = false
 * → hidden / disabled
 *
 * SHOW_PUBLIC_ACCOUNT = true
 * → 정상 버튼으로 표시
 */
function getPublicAccountButtonHtml(
    accountLabel: string
): string {

    const hiddenAttributes: string =
        SHOW_PUBLIC_ACCOUNT
            ? ''
            : `
hidden
disabled
aria-hidden="true"
tabindex="-1"
        `;


    return `
    <button
class="tdk-tableau-account-btn"
id="tdk-tableau-account-btn"
type="button"
${hiddenAttributes}
>
${accountLabel}
</button>
    `;
}


/* =========================================================
   8. 공용 계정 Popup
   ========================================================= */

/**
 * 공용 계정 Popup HTML 생성
 *
 * 현재는 SHOW_PUBLIC_ACCOUNT = false이므로
 * DOM에는 유지하되 화면에서는 hidden 처리한다.
 *
 * 향후 SHOW_PUBLIC_ACCOUNT = true로 변경하면
 * 기존 Application Customizer의 Popup 이벤트를
 * 그대로 사용할 수 있다.
 */
function getPublicAccountPopupHtml(
    labels: {
        popupTitle: string;
        scadaTitle: string;
        tableauTitle: string;
        id: string;
        password: string;
        notice: string;
        copy: string;
    }
): string {

    /**
     * Popup 전체 숨김 여부
     */
    const popupHiddenAttribute: string =
        SHOW_PUBLIC_ACCOUNT
            ? ''
            : 'hidden aria-hidden="true"';


    /**
     * Tableau 계정 영역 숨김 여부
     */
    const tableauHiddenAttribute: string =
        SHOW_TABLEAU_ACCOUNT
            ? ''
            : 'hidden aria-hidden="true"';


    return `
<div
class="tdk-tableau-popup"
id="tdk-tableau-popup"
${popupHiddenAttribute}
>

<!-- ===============================================
Popup Backdrop
=============================================== -->
<div
    class="tdk-tableau-popup__backdrop"
id="tdk-tableau-popup-backdrop"
    ></div>


    <!-- ===============================================
         Popup Content
         =============================================== -->
    <div class="tdk-tableau-popup__box">


    <!-- Popup Close -->
<button
    class="tdk-tableau-popup__close"
id="tdk-tableau-popup-close"
type="button"
aria-label="Close"
    >
            ×
          </button>


          <!-- =============================================
               Popup Title
               ============================================= -->
          <div class="tdk-tableau-popup__title">
    ${labels.popupTitle}
</div>


<!-- =============================================
     SCADA Account

     현재 계정 정보는 향후 재사용을 위해
     코드에 유지한다.
     ============================================= -->
<div class="tdk-tableau-popup__title">
    ${labels.scadaTitle}
</div>


<!-- SCADA ID -->
<div class="tdk-tableau-popup__row">

    <span>
        ${labels.id}
</span>

<strong class="tdk-tableau-popup__value">
    tdk@tdk.com
</strong>

<button
class="tdk-copy-btn"
type="button"
data-copy="tdk@tdk.com"
    >
    ${labels.copy}
</button>

</div>


<!-- SCADA Password -->
<div class="tdk-tableau-popup__row">

    <span>
        ${labels.password}
</span>

<strong class="tdk-tableau-popup__value">
    tdktdkkoreakorea2025!
    </strong>

    <button
class="tdk-copy-btn"
type="button"
data-copy="tdktdkkoreakorea2025!"
    >
    ${labels.copy}
</button>

</div>


<!-- =============================================
     Tableau Account

     현재는 SHOW_TABLEAU_ACCOUNT = false로
     화면에서 숨김 처리한다.

     향후 사용 시 true로 변경한다.
     ============================================= -->
<div
class="tdk-tableau-login-hidden"
${tableauHiddenAttribute}
>

<div class="tdk-tableau-popup__title">
    ${labels.tableauTitle}
</div>


<!-- Tableau ID -->
<div class="tdk-tableau-popup__row">

    <span>
        ${labels.id}
</span>

<strong class="tdk-tableau-popup__value">
    keunwoo.park@tdk.com
</strong>

<button
class="tdk-copy-btn"
type="button"
data-copy="keunwoo.park@tdk.com"
    >
    ${labels.copy}
</button>

</div>


<!-- Tableau Password -->
<div class="tdk-tableau-popup__row">

    <span>
        ${labels.password}
</span>

<strong class="tdk-tableau-popup__value">
    krpkw001!
    </strong>

    <button
class="tdk-copy-btn"
type="button"
data-copy="krpkw001!"
    >
    ${labels.copy}
</button>

</div>

</div>


<!-- =============================================
     안내 문구
     ============================================= -->
<div class="tdk-tableau-popup__notice">
    ${labels.notice}
</div>

</div>
</div>
    `;
}


/* =========================================================
   9. Dashboard Section
   ========================================================= */

/**
 * Dashboard Card Section 전체 HTML 생성
 *
 * @param cards
 * data/productCards.ts의 PRODUCT_CARDS
 *
 * @param locale
 * 현재 Portal 언어
 */
export function getTableauSectionHtml(
    cards: ProductCard[],
    locale: Locale
): string {

    /**
     * 현재 언어 Label
     */
    const labels =
        TABLEAU_SECTION_LABELS[locale] ||
        TABLEAU_SECTION_LABELS.ko;


    /**
     * Dashboard Card 목록
     */
    const cardItemsHtml: string =
        cards
            .map(
                (card: ProductCard): string =>
                    getDashboardCardHtml(
                        card,
                        locale
                    )
            )
            .join('');


    /**
     * Dashboard Section 전체
     */
    return `
<div class="tdk-tableau-section">


    <!-- ===============================================
    Dashboard Header
=============================================== -->
<div class="tdk-section-header">

<div>
    <div class="tdk-section-header__title">
    ${labels.dashboard}
</div>
</div>


<!-- =============================================
     공용 계정

     현재 SHOW_PUBLIC_ACCOUNT = false
     → 화면에서 숨김

     향후 true로 변경하면 다시 사용 가능
     ============================================= -->
${getPublicAccountButtonHtml(
    labels.account
)}

</div>


<!-- ===============================================
     Dashboard Card List
     =============================================== -->
<div class="tdk-card-row">

    ${cardItemsHtml}

</div>


<!-- ===============================================
     Detail Panel

     카드 클릭 시 detailPanel.ts에서
     상세 메뉴를 이 영역에 출력한다.
     =============================================== -->
<div
class="tdk-detail-panel"
id="tdk-detail-panel"
    ></div>


<!-- ===============================================
     공용 계정 Popup

     현재 숨김 상태지만
     향후 재사용을 위해 기능 유지
     =============================================== -->
${getPublicAccountPopupHtml(
    labels
)}


</div>
    `;
}
