import { Locale, LocalizedText, QuickLink } from '../models/types';

function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getQuickLinksTitle(locale: Locale): string {
    const labels: Record<Locale, string> = {
        ko: '어플리케이션',
        en: 'Application',
        ja: 'アプリケーショ'
    };

    return labels[locale];
}

export function getQuickLinksHtml(links: QuickLink[], locale: Locale): string {
    return `
    <div class="tdk-quick-links">
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">${getQuickLinksTitle(locale)}</div>
        </div>
      </div>

      <div class="tdk-quick-scroll">
        ${links.map((link: QuickLink) => `
          <a class="tdk-quick-scroll-item" href="${link.url}" target="_blank" rel="noopener noreferrer">
            <div class="tdk-quick-scroll__icon">
              <img src="${link.icon}" alt="${escapeHtml(getLocalizedText(link.text, locale))}" />
            </div>
            <div class="tdk-quick-scroll__text">${escapeHtml(getLocalizedText(link.text, locale))}</div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}