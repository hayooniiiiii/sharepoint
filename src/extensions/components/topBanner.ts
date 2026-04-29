import { Locale } from '../models/types';

/**
 * Top Banner에서 사용하는 다국어 라벨
 */
const TOP_BANNER_LABELS: Record<Locale, {
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

/**
 * Top Banner HTML 생성
 *
 * 기존 HTML 구조와 class/id는 유지한다.
 * 텍스트만 locale 기준으로 변경한다.
 */
export function getTopBannerHtml(title: string, locale: Locale): string {
    const currentLabels = TOP_BANNER_LABELS[locale] || TOP_BANNER_LABELS.ko;

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
            <span class="tdk-top-banner__title">${title}</span>
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

          <!-- 게시판 메뉴를 다시 사용할 때는 아래 주석만 해제 -->
          <!--
          <a
            class="tdk-nav-btn"
            href="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SitePages/%EA%B2%8C%EC%8B%9C%ED%8C%90.aspx"
            target="_self"
          >
            ${currentLabels.noticeBoard}
          </a>
          -->
        </div>
      </nav>
    </div>
  `;
}