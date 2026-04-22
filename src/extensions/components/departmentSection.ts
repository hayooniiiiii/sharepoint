import { DepartmentLink, DepartmentLinkSet } from '../models/types';

function getLanguageKey(value: string): keyof DepartmentLinkSet {
    const normalized: string = (value || '').toLowerCase();

    if (normalized.indexOf('ja') === 0) {
        return 'ja';
    }

    if (normalized.indexOf('ko') === 0) {
        return 'ko';
    }

    return 'en';
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function getDepartmentSectionHtml(
    departmentLinks: DepartmentLinkSet,
    localeOrCultureName: string
): string {
    const languageKey: keyof DepartmentLinkSet = getLanguageKey(localeOrCultureName);
    const items: DepartmentLink[] = departmentLinks[languageKey] || [];

    const titleMap: Record<keyof DepartmentLinkSet, string> = {
        ko: '부문 채널',
        en: 'Department Channel',
        ja: '部門チャンネル'
    };

    return `
    <div class="tdk-department-section">
      <div class="tdk-section-header">
        <div>
          <div class="tdk-section-header__title">${titleMap[languageKey]}</div>
        </div>
      </div>

      <div class="tdk-department-row">
        ${items.map((item: DepartmentLink): string => {
        const href: string = item.disabled || !item.url
            ? 'javascript:void(0);'
            : escapeHtml(item.url);

        const targetAttrs: string = item.disabled || !item.url
            ? 'aria-disabled="true"'
            : 'target="_blank" rel="noopener noreferrer"';

        return `
            <a
              class="tdk-department-btn${item.disabled ? ' is-disabled' : ''}"
              href="${href}"
              ${targetAttrs}
            >
              ${escapeHtml(item.text)}
            </a>
          `;
    }).join('')}
      </div>
    </div>
  `;
}