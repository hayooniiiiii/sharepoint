import { Locale } from '../models/types';

/**
 * Footer 라벨
 */
const FOOTER_LABELS: Record<Locale, {
    title: string;
}> = {
    ko: {
        title: 'TDK Korea Portal'
    },
    en: {
        title: 'TDK Korea Portal'
    },
    ja: {
        title: 'TDK Korea Portal'
    }
};

/**
 * Footer HTML 생성
 *
 * 구조는 유지하고 텍스트만 locale 기반으로 변경
 */
export function getFooterHtml(
    bottomText: string,
    locale: Locale
): string {

    const labels = FOOTER_LABELS[locale] || FOOTER_LABELS.ko;

    return `
    <footer class="tdk-footer">
      <div class="tdk-footer__inner">

        <!-- 좌측: 로고 + 타이틀 -->
        <div class="tdk-footer__left">
          <img
            class="tdk-footer__logo"
            src="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/Tdk_icon3.png?csf=1&web=1&e=xP4hBV"
            alt="TDK Logo"
          />
          <span class="tdk-footer__text">
            ${labels.title}
          </span>
        </div>

        <!-- 우측: 하단 문구 -->
        <div class="tdk-footer__right">
          ${bottomText}
        </div>

      </div>
    </footer>
  `;
}