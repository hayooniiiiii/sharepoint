import { Locale, LocalizedText, ProductCard } from '../models/types';

/**
 * 다국어 텍스트 반환 함수
 */
function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

/**
 * 한국어 화면에서는 카드 제목 아래에 영어 제목도 같이 표시
 */
function getCardTitleHtml(card: ProductCard, locale: Locale): string {
    const mainTitle: string = getLocalizedText(card.title, locale);

    if (locale !== 'ko') {
        return mainTitle;
    }

    return `
      ${mainTitle}
      <span class="tdk-main-card__sub">
        ${card.title.en}
      </span>
    `;
}

/**
 * 카드 리스트 화면에서 사용하는 다국어 라벨
 */
const TABLEAU_SECTION_LABELS: Record<Locale, {
    dashboard: string;
    account: string;
    popupTitle: string;
    id: string;
    password: string;
    notice: string;
    copy: string;
}> = {
    ko: {
        dashboard: '대시보드',
        account: 'Tableau 계정',
        popupTitle: 'Tableau 접속 계정',
        id: 'ID',
        password: 'Password',
        notice: 'Tableau 접속 시 위 계정을 사용하세요.',
        copy: '복사'
    },
    en: {
        dashboard: 'Dashboard',
        account: 'Tableau Account',
        popupTitle: 'Tableau Login Account',
        id: 'ID',
        password: 'Password',
        notice: 'Use the account above to access Tableau.',
        copy: 'Copy'
    },
    ja: {
        dashboard: 'ダッシュボード',
        account: 'Tableau アカウント',
        popupTitle: 'Tableau 接続アカウント',
        id: 'ID',
        password: 'Password',
        notice: 'Tableau 接続時に上記のアカウントを使用してください。',
        copy: 'コピー'
    }
};

/**
 * 대시보드 카드 섹션 HTML 생성
 */
export function getTableauSectionHtml(cards: ProductCard[], locale: Locale): string {
    const labels = TABLEAU_SECTION_LABELS[locale] || TABLEAU_SECTION_LABELS.ko;

    return `
    <div class="tdk-tableau-section">
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">${labels.dashboard}</div>
        </div>

        <button
          class="tdk-tableau-account-btn"
          id="tdk-tableau-account-btn"
          type="button"
        >
          ${labels.account}
        </button>
      </div>

      <div class="tdk-card-row">
        ${cards.map((card: ProductCard) => `
          <button
            class="tdk-main-card"
            data-card-id="${card.id}"
            type="button"
            style="background-image: url('${card.image}');"
          >
            <div class="tdk-main-card__title">
              ${getCardTitleHtml(card, locale)}
            </div>
          </button>
        `).join('')}
      </div>

      <div class="tdk-detail-panel" id="tdk-detail-panel"></div>

      <div class="tdk-tableau-popup" id="tdk-tableau-popup">
        <div
          class="tdk-tableau-popup__backdrop"
          id="tdk-tableau-popup-backdrop"
        ></div>

        <div class="tdk-tableau-popup__box">
          <button
            class="tdk-tableau-popup__close"
            id="tdk-tableau-popup-close"
            type="button"
            aria-label="Close"
          >
            ×
          </button>

          <div class="tdk-tableau-popup__title">
            ${labels.popupTitle}
          </div>

          <div class="tdk-tableau-popup__row">
            <span>${labels.id}</span>

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

          <div class="tdk-tableau-popup__row">
            <span>${labels.password}</span>

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

          <div class="tdk-tableau-popup__notice">
            ${labels.notice}
          </div>
        </div>
      </div>
    </div>
  `;
}