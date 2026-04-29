import {
    Locale,
    LocalizedText,
    ProductCard,
    ProductGroup,
    ProductItem,
    ProductLink
} from '../models/types';

import { TABLEAU_URL } from '../data/constants';

function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

const DETAIL_PANEL_LABELS: Record<Locale, {
    note: string;
    preparing: string;
}> = {
    ko: {
        note: '메뉴를 클릭하면 새 탭으로 열립니다.',
        preparing: '준비중입니다'
    },
    en: {
        note: 'Click a menu item to open it in a new tab.',
        preparing: 'Coming soon'
    },
    ja: {
        note: 'メニューをクリックすると新しいタブで開きます。',
        preparing: '準備中です'
    }
};

let isCopyHandlerBound: boolean = false;

function renderFlyoutLinks(
    links: ProductLink[],
    locale: Locale,
    labels: { preparing: string },
    depth: number = 0
): string {
    return links.map((link: ProductLink): string => {
        const isDisabled: boolean = link.url === TABLEAU_URL;
        const hasChildren: boolean = !!link.children && link.children.length > 0;

        return `
          <div class="tdk-flyout-wrap ${depth > 0 ? 'is-nested' : ''}">
            <a
              class="${depth === 0 ? 'tdk-detail-link' : 'tdk-flyout-item'} ${isDisabled ? 'is-disabled' : ''} ${hasChildren ? 'has-flyout' : ''}"
              href="${isDisabled ? '#' : link.url}"
              target="${isDisabled ? '_self' : '_blank'}"
              rel="noopener noreferrer"
              title="${isDisabled ? labels.preparing : ''}"
              aria-disabled="${isDisabled ? 'true' : 'false'}"
              ${isDisabled ? 'onclick="return false;"' : ''}
            >
              <span>${getLocalizedText(link.text, locale)}</span>

              ${
            hasChildren
                ? '<span class="tdk-flyout-arrow">›</span>'
                : isDisabled
                    ? `<span class="tdk-detail-link__badge">${labels.preparing}</span>`
                    : ''
        }
            </a>

            ${
            hasChildren
                ? `
                      <div class="tdk-flyout-menu">
                        ${renderFlyoutLinks(link.children!, locale, labels, depth + 1)}
                      </div>
                    `
                : ''
        }
          </div>
        `;
    }).join('');
}

export function renderDetailPanel(card: ProductCard, locale: Locale): void {
    const panel: HTMLElement | null = document.getElementById('tdk-detail-panel');

    if (!panel) {
        return;
    }

    const labels = DETAIL_PANEL_LABELS[locale] || DETAIL_PANEL_LABELS.ko;

    panel.innerHTML = `
    <div class="tdk-detail-panel__inner">

      ${card.items.map((item: ProductItem, itemIndex: number): string => {
        const visibleGroups: ProductGroup[] = item.groups;

        if (visibleGroups.length === 0) {
            return '';
        }

        return `
          <div class="tdk-detail-item">
            <div class="tdk-detail-item__title">
              ${getLocalizedText(item.title, locale)}
            </div>

            <div class="tdk-detail-groups">
              ${visibleGroups.map((group: ProductGroup, groupIndex: number): string => `
                <div class="tdk-detail-group">
                  <button
                    class="tdk-detail-group__title"
                    type="button"
                    data-detail-group-index="${itemIndex}-${groupIndex}"
                  >
                    <div class="tdk-detail-group__header">
                      ${
            group.image
                ? `<img
                                  class="tdk-detail-group__img"
                                  src="${group.image}"
                                  alt="${getLocalizedText(group.title, locale)}"
                                />`
                : ''
        }

                      <span>${getLocalizedText(group.title, locale)}</span>
                    </div>

                    <span class="arrow">▾</span>
                  </button>

                  <div
                    class="tdk-detail-links"
                    id="tdk-detail-links-${itemIndex}-${groupIndex}"
                  >
                    ${renderFlyoutLinks(group.links, locale, labels)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
    }).join('')}

      <div class="tdk-detail-note">
        ${labels.note}
      </div>

    </div>
  `;

    bindDetailGroupEvents();
    bindCopyButtons();

    requestAnimationFrame((): void => {
        panel.classList.add('is-visible');
    });
}

export function hideDetailPanel(): void {
    const panel: HTMLElement | null = document.getElementById('tdk-detail-panel');

    if (!panel) {
        return;
    }

    panel.classList.remove('is-visible');

    window.setTimeout((): void => {
        if (!panel.classList.contains('is-visible')) {
            panel.innerHTML = '';
        }
    }, 260);
}

function bindDetailGroupEvents(): void {
    const buttons: NodeListOf<HTMLElement> =
        document.querySelectorAll('.tdk-detail-group__title');

    buttons.forEach((button: HTMLElement): void => {
        button.addEventListener('click', (): void => {
            const index: string | null =
                button.getAttribute('data-detail-group-index');

            if (!index) {
                return;
            }

            const currentLinks: HTMLElement | null =
                document.getElementById(`tdk-detail-links-${index}`);

            if (!currentLinks) {
                return;
            }

            currentLinks.classList.toggle('is-open');
            button.classList.toggle('is-open');
        });
    });
}

export function bindCopyButtons(): void {
    if (isCopyHandlerBound) {
        return;
    }

    isCopyHandlerBound = true;

    document.addEventListener('click', async (event: MouseEvent): Promise<void> => {
        const target = event.target as HTMLElement | null;

        if (!target) {
            return;
        }

        const button: HTMLButtonElement | null =
            target.closest('.tdk-copy-btn') as HTMLButtonElement | null;

        if (!button) {
            return;
        }

        const value: string | null = button.getAttribute('data-copy');

        if (!value) {
            return;
        }

        try {
            await navigator.clipboard.writeText(value);

            const originalText: string = button.innerText;

            button.innerText = '복사완료';
            button.classList.add('is-copied');

            window.setTimeout((): void => {
                button.innerText = originalText;
                button.classList.remove('is-copied');
            }, 1200);
        } catch {
            button.innerText = '실패';

            window.setTimeout((): void => {
                button.innerText = '복사';
            }, 1200);
        }
    });
}

bindCopyButtons();