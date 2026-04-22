import { Locale } from '../models/types';

export function getTopBannerHtml(title: string, locale: Locale): string {
    const labels: Record<Locale, {
        worldWide: string;
        koreaProduct: string;
        main: string;
        noticeBoard: string;
    }> = {
        ko: {
            worldWide: 'Worldwide',
            koreaProduct: '생산제품',
            main: 'Main',
            noticeBoard: '게시판'

        },
        en: {
            worldWide: 'Worldwide',
            koreaProduct: 'TDK KOREA Products',
            main: 'Main',
            noticeBoard: 'Notice Board'
        },

        ja: {
            worldWide: 'Worldwide',
            koreaProduct: 'TDK KOREA 生産製品',
            main: 'Main',
            noticeBoard: '掲示板'

        }
    };

    const currentLabels = labels[locale];

    return `
    <div class="tdk-top-banner">
      <div class="tdk-top-banner__inner">
        <div class="tdk-top-banner__row">
          <a
            class="tdk-top-banner__brand"
            href="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/Home.aspx"
            target="_self"
            aria-label="TDK Korea Portal Home"
          >
            <img
              class="tdk-top-banner__logo"
              src="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/Tdk_icon4.png?csf=1&web=1&e=vC9zS1"
              alt="TDK Logo"
            />
            <span class="tdk-top-banner__title">TDK KOREA</span>
          </a>

          <div class="tdk-top-banner__actions">
            <a href="https://www.tdk.com/" target="_blank" rel="noopener noreferrer">${currentLabels.worldWide}</a>
            <a href="https://www.tdk.com/en/tdk_korea/index.html#:~:text=Main%20production%20products" target="_blank" rel="noopener noreferrer">${currentLabels.koreaProduct}</a>

            <select id="tdk-lang-select" class="tdk-lang-select" aria-label="Language Select">
              <option value="ko" ${locale === 'ko' ? 'selected' : ''}>한국어</option>
              <option value="en" ${locale === 'en' ? 'selected' : ''}>English</option>
              <option value="ja" ${locale === 'ja' ? 'selected' : ''}>日本語</option>
            </select>
          </div>
        </div>
      </div>

      <nav class="tdk-nav" id="tdk-nav" aria-label="Portal navigation">
        <div class="tdk-nav__inner">
          <a
            class="tdk-nav-btn"
            href="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/Home.aspx"
            target="_self"
          >
            ${currentLabels.main}
          </a>

          <a
            class="tdk-nav-btn"
            href="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/%EA%B2%8C%EC%8B%9C%ED%8C%90.aspx"
            target="_self"
          >
            ${currentLabels.noticeBoard}
          </a>

      
        </div>
      </nav>
    </div>
  `;
}