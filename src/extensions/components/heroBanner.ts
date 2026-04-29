import { Locale } from '../models/types';

/**
 * Hero Banner 라벨
 */
const HERO_LABELS: Record<Locale, string> = {
    ko: 'TDK Korea Portal',
    en: 'TDK Korea Portal',
    ja: 'TDK Korea Portal'
};

export function getHeroBannerHtml(
    bannerUrl: string,
    locale: Locale
): string {

    const title = HERO_LABELS[locale] || HERO_LABELS.ko;

    return `
    <div class="tdk-hero-banner">
      <img class="tdk-hero-banner__image" src="${bannerUrl}" alt="TDK Company Banner" />
      <div class="tdk-hero-banner__overlay"></div>
      <div class="tdk-hero-banner__content">
        <div class="tdk-hero-banner__headline">${title}</div>
      </div>
    </div>
  `;
}