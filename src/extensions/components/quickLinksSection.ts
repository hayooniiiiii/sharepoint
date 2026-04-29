import { Locale, LocalizedText, QuickLink } from '../models/types';

/**
 * =========================
 * 다국어 텍스트 반환
 * =========================
 */
function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

/**
 * =========================
 * HTML escape 처리 (XSS 방지)
 * =========================
 */
function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * =========================
 * Quick Links 라벨
 * =========================
 *
 *
 * - locale 기준으로 분리
 */
const QUICK_LINK_LABELS: Record<Locale, {
    title: string;
}> = {
    ko: {
        title: '어플리케이션'
    },
    en: {
        title: 'Application'
    },
    ja: {
        title: 'アプリケーション'
    }
};

/**
 * =========================
 * Quick Links HTML 생성
 * =========================
 *
 * - 하단 아이콘 메뉴 영역
 * - 링크 + 아이콘 + 텍스트 표시
 */
export function getQuickLinksHtml(links: QuickLink[], locale: Locale): string {
    const labels = QUICK_LINK_LABELS[locale] || QUICK_LINK_LABELS.ko;

    return `
    <div class="tdk-quick-links">

      <!-- 섹션 제목 -->
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">
            ${labels.title}
          </div>
        </div>
      </div>

      <!-- 가로 스크롤 리스트 -->
      <div class="tdk-quick-scroll">

        ${links.map((link: QuickLink) => {
        const text = escapeHtml(getLocalizedText(link.text, locale));

        return `
              <a
                class="tdk-quick-scroll-item"
                href="${link.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="tdk-quick-scroll__icon">
                  <img src="${link.icon}" alt="${text}" />
                </div>

                <div class="tdk-quick-scroll__text">
                  ${text}
                </div>
              </a>
            `;
    }).join('')}

      </div>
    </div>
  `;
}