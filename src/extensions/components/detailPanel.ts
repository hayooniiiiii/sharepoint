import {
    Locale,
    LocalizedText,
    ProductCard,
    ProductGroup,
    ProductItem,
    ProductLink
} from '../models/types';

function getLocalizedText(text: LocalizedText, locale: Locale): string {
    return text[locale] || text.ko || text.en || text.ja || '';
}

function getNoteText(locale: Locale): string {
    const labels: Record<Locale, string> = {
        ko: '메뉴를 클릭하면 Tableau가 새 탭으로 열립니다.',
        en: 'Click a menu to open Tableau in a new tab.',
        ja: 'メニューをクリックすると、Tableau が新しいタブで開きます。'
    };

    return labels[locale];
}

export function renderDetailPanel(card: ProductCard, locale: Locale): void {
    const panel: HTMLElement | null = document.getElementById('tdk-detail-panel');
    if (!panel) {
        return;
    }

    panel.innerHTML = `
    <div class="tdk-detail-panel__inner">
      ${card.items.map((item: ProductItem, itemIndex: number) => `
        <div class="tdk-detail-item">
          <div class="tdk-detail-item__title">
            ${getLocalizedText(item.title, locale)}
          </div>

          <div class="tdk-detail-groups">
            ${item.groups.map((group: ProductGroup, groupIndex: number) => `
              <div class="tdk-detail-group">
                <button
                  class="tdk-detail-group__title"
                  type="button"
                  data-group-index="${itemIndex}-${groupIndex}"
                >
                  <span>${getLocalizedText(group.title, locale)}</span>
                  <span class="arrow">▾</span>
                </button>

                <div
                  class="tdk-detail-links"
                  id="tdk-detail-links-${itemIndex}-${groupIndex}"
                >
                  ${group.links.map((link: ProductLink) => `
                    <a
                      class="tdk-detail-link"
                      href="${link.url}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${getLocalizedText(link.text, locale)}
                    </a>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <div class="tdk-detail-note">
        ${getNoteText(locale)}
      </div>
    </div>
  `;

    bindDropdownEvents();

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

function bindDropdownEvents(): void {
    const buttons: NodeListOf<Element> = document.querySelectorAll('.tdk-detail-group__title');

    buttons.forEach((button: Element): void => {
        button.addEventListener('click', (): void => {
            const index: string | null = button.getAttribute('data-group-index');
            if (!index) {
                return;
            }

            const currentLinks: HTMLElement | null = document.getElementById(`tdk-detail-links-${index}`);
            if (!currentLinks) {
                return;
            }

            const allLinks: NodeListOf<Element> = document.querySelectorAll('.tdk-detail-links');
            const allButtons: NodeListOf<Element> = document.querySelectorAll('.tdk-detail-group__title');

            allLinks.forEach((links: Element): void => {
                if (links !== currentLinks) {
                    links.classList.remove('is-open');
                }
            });

            allButtons.forEach((btn: Element): void => {
                if (btn !== button) {
                    btn.classList.remove('is-open');
                }
            });

            currentLinks.classList.toggle('is-open');
            button.classList.toggle('is-open');
        });
    });
}