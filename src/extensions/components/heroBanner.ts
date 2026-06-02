import { Locale } from '../models/types';

const HERO_LABELS: Record<Locale, string> = {
    ko: 'TDK Korea Portal',
    en: 'TDK Korea Portal',
    ja: 'TDK Korea Portal'
};

export function getHeroBannerHtml(
    bannerUrls: string[],
    locale: Locale
): string {
    const title = HERO_LABELS[locale] || HERO_LABELS.ko;

    return `
    <div class="tdk-hero-banner" id="tdk-hero-banner">
      ${bannerUrls.map((url: string, index: number) => `
        <img
          class="tdk-hero-banner__image ${index === 0 ? 'is-active' : ''}"
          src="${url}"
          alt="TDK Company Banner ${index + 1}"
          data-banner-index="${index}"
        />
      `).join('')}

      <div class="tdk-hero-banner__overlay"></div>

      <button class="tdk-hero-banner__arrow tdk-hero-banner__arrow--prev" type="button">
        ‹
      </button>

      <button class="tdk-hero-banner__arrow tdk-hero-banner__arrow--next" type="button">
        ›
      </button>

      <div class="tdk-hero-banner__content">
        <div class="tdk-hero-banner__headline">${title}</div>
      </div>
    </div>
  `;
}