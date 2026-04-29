import { DepartmentLink, DepartmentLinkSet, Locale, LocalizedText } from '../models/types';

/**
 * 다국어 텍스트 반환
 */
function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

/**
 * HTML escape 처리
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
 * 부문 채널 라벨
 */
const DEPARTMENT_LABELS: Record<Locale, {
    title: string;
}> = {
    ko: {
        title: '부문 채널'
    },
    en: {
        title: 'Department Channel'
    },
    ja: {
        title: '部門チャンネル'
    }
};

/**
 * 부문 채널 HTML 생성
 *
 * - departmentLinks는 언어별 배열이 아니라 단일 배열
 * - 각 item.text만 { ko, en, ja } 구조로 관리
 */
export function getDepartmentSectionHtml(
    departmentLinks: DepartmentLinkSet,
    locale: Locale
): string {
    const labels = DEPARTMENT_LABELS[locale] || DEPARTMENT_LABELS.ko;

    return `
    <div class="tdk-department-section">
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">${labels.title}</div>
        </div>
      </div>

      <div class="tdk-department-row">
        ${departmentLinks.map((item: DepartmentLink): string => {
        const isDisabled: boolean = item.disabled === true || !item.url;

        const href: string = isDisabled
            ? 'javascript:void(0);'
            : item.url || '';

        const targetAttrs: string = isDisabled
            ? 'aria-disabled="true"'
            : 'target="_blank" rel="noopener noreferrer"';

        const text: string = escapeHtml(getLocalizedText(item.text, locale));

        return `
            <a
              class="tdk-department-btn${isDisabled ? ' is-disabled' : ''}"
              href="${escapeHtml(href)}"
              ${targetAttrs}
            >
              ${text}
            </a>
          `;
    }).join('')}
      </div>
    </div>
  `;
}