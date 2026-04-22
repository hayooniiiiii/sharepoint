import { Locale, LocalizedText, ProductCard } from '../models/types';

function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

function getDashboardTitle(locale: Locale): string {
    const labels: Record<Locale, string> = {
        ko: '대시보드',
        en: 'Dashboard',
        ja: 'ダッシュボード'
    };

    return labels[locale];
}

export function getTableauSectionHtml(cards: ProductCard[], locale: Locale): string {
    return `
    <div class="tdk-tableau-section">
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">${getDashboardTitle(locale)}</div>
        </div>
      </div>

      <div class="tdk-card-row">
        ${cards.map((card: ProductCard) => `
          <button
            class="tdk-main-card"
            data-card-id="${card.id}"
            type="button"
            style="background-image: url('${card.image}');"
          >
            <div class="tdk-main-card__title">${getLocalizedText(card.title, locale)}</div>
          </button>
        `).join('')}
      </div>

      <div class="tdk-detail-panel" id="tdk-detail-panel"></div>
    </div>
  `;
}