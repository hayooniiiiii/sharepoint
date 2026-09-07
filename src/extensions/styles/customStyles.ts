export const CUSTOM_STYLES = `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap');


/* =========================================================
   1. BASE
   ========================================================= */

.tdk-product-section {
  background: #f4f6f8;
  padding: 40px 24px 56px;
  font-family:
    'Inter',
    'Noto Sans KR',
    'Malgun Gothic',
    sans-serif;
  box-sizing: border-box;
}


.tdk-product-wrap,
.tdk-top-banner__inner,
.tdk-footer__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}


.tdk-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}


.tdk-section-header__eyebrow {
  margin-bottom: 6px;

  color: #2563eb;

  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}


.tdk-section-header__title {
  color: #0f172a;

  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
}


/* =========================================================
   2. TOP BANNER
   ========================================================= */

.tdk-top-banner {
  position: relative;
  z-index: 10;

  background: #0b4fb3;
  color: #ffffff;

  box-shadow:
    0 6px 18px rgba(0, 71, 187, 0.15);
}


.tdk-top-banner__inner {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}


.tdk-top-banner__row {
  width: 100%;
  max-width: 1280px;
  min-height: 56px;

  margin: 0 auto;
  padding: 10px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  box-sizing: border-box;
}


.tdk-top-banner__brand {
  min-width: 0;

  display: inline-flex;
  align-items: center;
  gap: 14px;

  flex: 0 0 auto;

  color: #ffffff;
  text-decoration: none;
}


.tdk-top-banner__brand:hover {
  opacity: 0.96;
}


.tdk-top-banner__logo {
  width: auto;
  height: 38px;

  display: block;
  flex-shrink: 0;

  object-fit: contain;
}


.tdk-top-banner__title {
  color: #ffffff;

  font-size: 21px;
  font-weight: 800;
  line-height: 1.2;

  white-space: nowrap;
}


.tdk-top-banner__actions {
  margin-left: auto;

  display: flex;
  align-items: center;
  gap: 16px;

  flex: 0 0 auto;
}


.tdk-top-banner__actions a {
  color: rgba(255, 255, 255, 0.92);

  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}


.tdk-top-banner__actions a:hover {
  color: #ffffff;
  opacity: 1;
}


.tdk-lang-select {
  min-width: 92px;
  height: 34px;

  padding: 0 10px;

  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 6px;
  outline: none;

  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
}


.tdk-lang-select option {
  background: #ffffff;
  color: #111827;
}


/* =========================================================
   3. NAVIGATION
   ========================================================= */

.tdk-nav {
  padding: 0;

  display: flex;
  justify-content: center;

  overflow-x: auto;

  background: rgba(0, 0, 0, 0.12);

  backdrop-filter: blur(6px);

  border-top:
    1px solid rgba(255, 255, 255, 0.14);
}


.tdk-nav::-webkit-scrollbar {
  height: 6px;
}


.tdk-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999px;
}


.tdk-nav__inner {
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  align-items: stretch;
  gap: 6px;

  box-sizing: border-box;
}


.tdk-nav-btn {
  position: relative;

  min-width: 120px;
  height: 54px;

  padding: 0 22px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0;

  background: transparent;
  color: rgba(255, 255, 255, 0.85);

  font-size: 15px;
  font-weight: 700;
  text-decoration: none;

  white-space: nowrap;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}


.tdk-nav-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}


.tdk-nav-btn.is-active {
  background: #ffffff;
  color: #0b4fb3;

  font-weight: 800;

  border-radius: 6px 6px 0 0;

  box-shadow:
    0 -2px 0 #ffffff,
    0 4px 12px rgba(0, 0, 0, 0.12);
}


.tdk-nav-btn.is-active::after {
  content: "";

  position: absolute;

  left: 16px;
  right: 16px;
  bottom: 0;

  height: 3px;

  background: #0b4fb3;

  border-radius: 999px;
}


.tdk-nav-btn.is-active:hover {
  background: #ffffff;
  color: #083985;
}


/* =========================================================
   4. HERO BANNER
   ========================================================= */

.tdk-hero-banner {
  position: relative;

  width: 100%;
  height: 420px;

  margin-bottom: 36px;

  overflow: hidden;

  background: #0f172a;

  border-radius: 24px;

  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.16);
}


.tdk-hero-banner__image {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;
  object-position: 25% 18%;

  opacity: 0;

  transition:
    opacity 0.35s ease;
}


.tdk-hero-banner__image.is-active {
  opacity: 1;
}


.tdk-hero-banner__overlay {
  position: absolute;
  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      90deg,
      rgba(3, 7, 18, 0.72) 0%,
      rgba(3, 7, 18, 0.38) 45%,
      rgba(3, 7, 18, 0.08) 100%
    );
}


.tdk-hero-banner__content {
  position: absolute;

  left: 36px;
  bottom: 36px;

  z-index: 2;

  max-width: 680px;

  color: #ffffff;
}


.tdk-hero-banner__eyebrow {
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  opacity: 0.92;
}


.tdk-hero-banner__headline {
  margin: 0;

  font-size: 44px;
  font-weight: 800;
  line-height: 1.08;
}


.tdk-hero-banner__arrow {
  position: absolute;

  top: 50%;

  z-index: 3;

  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  border: none;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.35);
  color: #ffffff;

  font-size: 34px;
  line-height: 1;

  cursor: pointer;
}


.tdk-hero-banner__arrow:hover {
  background: rgba(0, 0, 0, 0.55);
}


.tdk-hero-banner__arrow--prev {
  left: 18px;
}


.tdk-hero-banner__arrow--next {
  right: 18px;
}


/* =========================================================
   5. DASHBOARD CARD
   ========================================================= */

.tdk-tableau-section {
  margin-top: 8px;
}


.tdk-card-row {
  display: grid;

  grid-template-columns:
    repeat(6, minmax(0, 1fr));

  gap: 10px;

  margin-bottom: 14px;
}


.tdk-main-card {
  position: relative;

  min-height: 215px;

  padding: 14px;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  overflow: hidden;

  border: 2px solid transparent;
  border-radius: 18px;

  background-color: #1e293b;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  text-align: left;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(15, 23, 42, 0.10);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    filter 0.2s ease,
    opacity 0.2s ease;
}


.tdk-main-card::before {
  content: "";

  position: absolute;
  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.06) 0%,
      rgba(15, 23, 42, 0.18) 50%,
      rgba(15, 23, 42, 0.68) 100%
    );

  transition:
    background 0.2s ease;
}


.tdk-main-card:hover {
  transform:
    translateY(-4px)
    scale(1.01);

  box-shadow:
    0 16px 32px rgba(15, 23, 42, 0.18);
}


.tdk-main-card:hover::before {
  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.04) 0%,
      rgba(15, 23, 42, 0.15) 50%,
      rgba(15, 23, 42, 0.60) 100%
    );
}


.tdk-main-card.is-active {
  z-index: 2;

  border-color: #2f73ff;

  transform:
    translateY(-2px)
    scale(1.01);

  filter: brightness(1.05);

  opacity: 1;

  box-shadow:
    0 0 0 3px rgba(47, 115, 255, 0.22),
    0 16px 30px rgba(15, 23, 42, 0.20);
}


.tdk-main-card.is-active::before {
  background:
    linear-gradient(
      180deg,
      rgba(29, 78, 216, 0.06) 0%,
      rgba(15, 23, 42, 0.22) 50%,
      rgba(15, 23, 42, 0.65) 100%
    );
}


.tdk-card-row.has-active
.tdk-main-card:not(.is-active) {
  transform: scale(0.985);

  filter: brightness(0.65);

  opacity: 0.72;
}


.tdk-main-card__title {
  position: relative;

  z-index: 2;

  margin-bottom: 4px;

  display: flex;
  flex-direction: column;

  color: #ffffff;

  font-size: 20px;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: 0.01em;

  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.45);
}


.tdk-main-card.is-active
.tdk-main-card__title {
  transform: scale(1.03);
}


.tdk-main-card__sub {
  margin-top: 4px;

  font-size: inherit;
  font-weight: 900;

  opacity: 0.85;
}


/* =========================================================
   6. DETAIL PANEL
   ========================================================= */

.tdk-detail-panel {
  max-height: 0;

  margin-top: 0;
  padding: 0 20px;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #d7deea;
  border-radius: 20px;

  opacity: 0;

  transform: translateY(-8px);

  pointer-events: none;

  box-sizing: border-box;

  box-shadow:
    0 8px 24px rgba(15, 23, 42, 0.06);

  transition:
    max-height 0.32s ease,
    opacity 0.24s ease,
    transform 0.24s ease,
    margin-top 0.24s ease,
    padding-top 0.24s ease,
    padding-bottom 0.24s ease;
}


.tdk-detail-panel.is-visible {
  max-height: 1200px;

  margin-top: 8px;
  padding: 20px;

  overflow: visible;

  opacity: 1;

  transform: translateY(0);

  pointer-events: auto;
}


.tdk-detail-panel__inner {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 20px;

  align-items: start;

  overflow: visible;

  box-sizing: border-box;

  transition:
    grid-template-columns 0.28s ease;
}


/**
 * 왼쪽 영역의 Flyout이 열렸을 때
 * 왼쪽 영역에 공간을 더 배정한다.
 */
.tdk-detail-panel__inner:has(
  .tdk-detail-item:nth-child(1)
  .tdk-detail-links.is-open
  .tdk-detail-link.has-flyout
) {
  grid-template-columns:
    1.3fr 0.7fr;
}


/**
 * 오른쪽 영역의 Flyout이 열렸을 때
 * 오른쪽 영역에 공간을 더 배정한다.
 */
.tdk-detail-panel__inner:has(
  .tdk-detail-item:nth-child(2)
  .tdk-detail-links.is-open
  .tdk-detail-link.has-flyout
) {
  grid-template-columns:
    0.7fr 1.3fr;
}


.tdk-detail-item,
.tdk-detail-groups,
.tdk-detail-group,
.tdk-flyout-wrap,
.tdk-detail-links.is-open {
  overflow: visible;
}


.tdk-detail-item {
  min-width: 0;

  padding: 16px;

  background: #f8fafc;

  border: 1px solid #dbe5f1;
  border-radius: 16px;

  box-sizing: border-box;
}


.tdk-detail-item__title {
  margin-bottom: 14px;
  padding-bottom: 10px;

  color: #0f172a;

  font-size: 18px;
  font-weight: 800;

  border-bottom:
    1px solid #e5e7eb;
}


.tdk-detail-groups {
  display: flex;
  flex-direction: column;
  gap: 14px;
}


.tdk-detail-group {
  position: relative;

  width: 100%;
  max-width: 100%;

  padding: 12px 14px;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  box-sizing: border-box;

  transition:
    width 0.25s ease;
}


.tdk-detail-group:has(
  .tdk-detail-links.is-open
  .tdk-detail-link.has-flyout
) {
  width: 70%;
  min-width: 320px;

  margin-right: auto;
}


.tdk-detail-group__title {
  width: 100%;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;
  outline: none;

  background: transparent;

  color: #1d4ed8;

  font-size: 15px;
  font-weight: 800;
  text-align: left;

  cursor: pointer;

  box-sizing: border-box;
}


.tdk-detail-group__header {
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 10px;
}


.tdk-detail-group__img {
  width: 40px;
  height: 40px;

  object-fit: contain;

  flex-shrink: 0;
}


.tdk-detail-group__title .arrow {
  margin-left: 10px;

  flex-shrink: 0;

  color: #2563eb;

  font-size: 14px;
  font-weight: 800;

  transition:
    transform 0.22s ease;
}


.tdk-detail-group__title.is-open .arrow {
  transform: rotate(180deg);
}


.tdk-detail-links {
  max-height: 0;

  margin-top: 0;

  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow: hidden;

  opacity: 0;

  transition:
    max-height 0.25s ease,
    opacity 0.2s ease,
    margin-top 0.2s ease;
}


.tdk-detail-links.is-open {
  max-height: 620px;

  margin-top: 12px;

  opacity: 1;
}


.tdk-detail-link {
  width: 100%;

  padding: 10px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  background: #eff6ff;
  color: #1e3a8a;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  box-sizing: border-box;
}


.tdk-detail-link:hover {
  background: #dbeafe;
}


.tdk-detail-link.is-disabled {
  background: #e5e7eb;
  color: #94a3b8;

  cursor: not-allowed;

  pointer-events: none;
}


.tdk-detail-link.is-disabled.has-flyout {
  cursor: default;

  pointer-events: auto;
}


.tdk-detail-link__badge {
  padding: 3px 8px;

  flex-shrink: 0;

  background: #cbd5e1;
  color: #475569;

  border-radius: 999px;

  font-size: 11px;
  font-weight: 800;
}


.tdk-flyout-wrap {
  position: relative;
}


.tdk-flyout-arrow {
  flex-shrink: 0;

  color: #2563eb;

  font-size: 16px;
  font-weight: 900;
}


.tdk-flyout-menu {
  position: absolute;

  top: -7px;
  left: calc(100% - 20px);

  z-index: 9999;

  width: 350px;
  min-width: 200px;
  max-width: 420px;

  padding: 7px;

  overflow: visible;

  background: #ffffff;

  border: 1px solid #d7deea;
  border-radius: 12px;

  opacity: 0;
  visibility: hidden;

  transform:
    translateX(-6px)
    scale(0.98);

  transform-origin: left top;

  box-sizing: border-box;

  box-shadow:
    0 14px 28px rgba(15, 23, 42, 0.16);

  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0.18s ease;
}


.tdk-flyout-wrap:hover
> .tdk-flyout-menu,
.tdk-flyout-menu:hover {
  opacity: 1;
  visibility: visible;

  transform:
    translateX(0)
    scale(1);
}


.tdk-flyout-menu
.tdk-flyout-menu {
  top: -7px;
  left: calc(100% - 20px);
}


.tdk-flyout-item {
  min-height: 32px;

  padding: 8px 9px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;

  color: #1e3a8a;

  border-radius: 9px;

  font-size: 12px;
  font-weight: 800;
  text-decoration: none;

  white-space: nowrap;

  box-sizing: border-box;
}


.tdk-flyout-item:hover {
  background: #dbeafe;
}


.tdk-flyout-item.is-disabled {
  color: #64748b;
}


.tdk-detail-note {
  grid-column: 1 / -1;

  margin-top: 4px;
  padding: 12px 16px;

  background: #eff6ff;
  color: #1e3a8a;

  border-radius: 12px;

  font-size: 14px;
  font-weight: 700;
}


/* Direct Link Group */

.tdk-detail-group--direct {
  display: block;

  text-decoration: none;

  cursor: pointer;
}


.tdk-detail-group__title--direct {
  width: 100%;

  box-sizing: border-box;
}


.tdk-detail-group--direct:hover {
  background: #eff6ff;

  border-color: #bfdbfe;
}


/* =========================================================
   7. QUICK LINKS
   ========================================================= */

.tdk-quick-links {
  margin-bottom: 0;
}


.tdk-quick-scroll {
  margin-top: 10px;

  display: grid;

  /*
   * 현재 Quick Link는 9개.
   *
   * 개수가 변경되어도 각 항목이 동일한 너비를 갖는다.
   */
  grid-template-columns:
    repeat(9, minmax(0, 1fr));

  gap: 16px;
}


.tdk-quick-scroll-item {
  width: 100%;
  min-width: 0;
  height: 110px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background: #ffffff;
  color: #111827;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  text-decoration: none;

  box-sizing: border-box;

  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.06);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.tdk-quick-scroll-item:hover {
  transform: translateY(-5px);

  border-color: #bfd8ff;

  box-shadow:
    0 16px 28px rgba(15, 23, 42, 0.12);
}


.tdk-quick-scroll__icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f1f5f9;

  border-radius: 14px;
}


.tdk-quick-scroll__icon img {
  width: 26px;
  height: 26px;

  object-fit: contain;
}


.tdk-quick-scroll__text {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
}


/* =========================================================
   8. DEPARTMENT CHANNEL
   ========================================================= */

/**
 * 현재 Department Channel 전체를 숨긴 상태.
 *
 * 향후 다시 표시할 경우 아래
 *
 * display: none !important;
 *
 * 한 줄을 제거하면 된다.
 */
.tdk-department-section {
  display: none !important;

  margin-top: 40px;
  padding: 28px 24px 30px;

  background: #dceefc;

  border-radius: 24px;

  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.06);
}


.tdk-department-row {
  margin-top: 18px;

  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(240px, 1fr));

  gap: 12px;
}


.tdk-department-btn {
  min-height: 46px;

  padding: 10px 14px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  background:
    linear-gradient(
      90deg,
      #1d4ed8,
      #3b82f6
    );

  color: #ffffff;

  border:
    1px solid rgba(255, 255, 255, 0.18);

  border-radius: 8px;

  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  text-decoration: none;

  white-space: normal;
  word-break: keep-all;

  box-sizing: border-box;

  box-shadow:
    0 6px 14px rgba(29, 78, 216, 0.18);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
}


.tdk-department-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 18px rgba(29, 78, 216, 0.24);
}


.tdk-department-btn.is-disabled,
.tdk-department-btn:disabled {
  background: #8aa6d8;
  color: rgba(255, 255, 255, 0.92);

  cursor: not-allowed;

  pointer-events: none;

  box-shadow: none;

  opacity: 0.72;
}


/* =========================================================
   9. PUBLIC ACCOUNT POPUP
   ========================================================= */

/**
 * 공용계정 기능은 현재 cardlist.ts에서
 * hidden 상태로 관리한다.
 *
 * 기능은 삭제하지 않고 향후 재사용 가능하도록 유지한다.
 */


/* 공용계정 Button */

.tdk-tableau-account-btn {
  height: 38px;

  padding: 0 16px;

  border: none;
  border-radius: 999px;

  background: #0047bb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 8px 18px rgba(0, 71, 187, 0.22);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.tdk-tableau-account-btn:hover {
  background: #003a99;

  transform: translateY(-1px);
}


/**
 * 중요:
 *
 * Tableau 영역은 cardlist.ts의 hidden 속성으로 관리한다.
 *
 * 예전처럼 class 자체를 display:none으로 만들면
 * SHOW_TABLEAU_ACCOUNT = true로 바꿔도
 * 계속 숨겨지는 문제가 발생한다.
 */
.tdk-tableau-login-hidden[hidden] {
  display: none !important;
}


/* Popup이 hidden 상태면 항상 숨김 */

.tdk-tableau-popup[hidden] {
  display: none !important;
}


/* Popup 전체 */

.tdk-tableau-popup {
  position: fixed;
  inset: 0;

  z-index: 99999;

  display: none;
}


.tdk-tableau-popup.is-open:not([hidden]) {
  display: block;
}


/* Backdrop */

.tdk-tableau-popup__backdrop {
  position: absolute;
  inset: 0;

  background: rgba(15, 23, 42, 0.55);

  backdrop-filter: blur(4px);
}


/* Popup Box */

.tdk-tableau-popup__box {
  position: absolute;

  top: 50%;
  left: 50%;

  width:
    min(480px, calc(100% - 32px));

  padding: 26px;

  transform:
    translate(-50%, -50%);

  background: #ffffff;

  border-radius: 22px;

  box-sizing: border-box;

  box-shadow:
    0 24px 60px rgba(15, 23, 42, 0.28);
}


/* Close */

.tdk-tableau-popup__close {
  position: absolute;

  top: 14px;
  right: 16px;

  border: none;

  background: transparent;

  font-size: 26px;

  cursor: pointer;
}


/* Title */

.tdk-tableau-popup__title {
  margin-bottom: 18px;

  color: #0f172a;

  font-size: 22px;
  font-weight: 900;
}


/* ID / Password */

.tdk-tableau-popup__row {
  margin-top: 10px;
  padding: 14px 16px;

  display: grid;

  grid-template-columns:
    86px 1fr auto;

  align-items: center;
  gap: 10px;

  background: #eff6ff;
  color: #1e3a8a;

  border-radius: 14px;
}


.tdk-tableau-popup__row span {
  font-weight: 800;
}


.tdk-tableau-popup__value {
  color: #1e3a8a;

  font-weight: 900;

  word-break: break-all;
}


/* Copy Button */

.tdk-copy-btn {
  height: 30px;

  padding: 0 12px;

  border: none;
  border-radius: 999px;

  background: #2563eb;
  color: #ffffff;

  font-size: 12px;
  font-weight: 800;

  white-space: nowrap;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.tdk-copy-btn:hover {
  background: #1e40af;

  transform: translateY(-1px);
}


.tdk-copy-btn.is-copied {
  background: #16a34a;
}


/* Popup 안내문 */

.tdk-tableau-popup__notice {
  margin-top: 16px;
  padding: 12px 14px;

  background: #f8fafc;
  color: #475569;

  border-radius: 12px;

  font-size: 13px;
  font-weight: 700;
}


/* =========================================================
   10. FOOTER
   ========================================================= */

.tdk-footer {
  margin-top: 40px;

  background: #071633;
  color: #ffffff;
}


.tdk-footer__inner {
  width: 100%;
  max-width: 1280px;

  margin: 0 auto;
  padding: 18px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  box-sizing: border-box;
}


.tdk-footer__left {
  min-width: 0;

  display: flex;
  align-items: center;
  gap: 12px;
}


.tdk-footer__logo {
  width: auto;
  height: 28px;

  display: block;

  object-fit: contain;

  flex-shrink: 0;
}


.tdk-footer__text {
  color: #ffffff;

  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;

  white-space: nowrap;
}


.tdk-footer__right {
  color: rgba(255, 255, 255, 0.85);

  font-size: 13px;
  font-weight: 500;

  text-align: right;

  white-space: nowrap;
}


/* =========================================================
   11. HIDE NATIVE SHAREPOINT UI
   ========================================================= */

/**
 * Application Customizer가 html/body에
 * tdk-hide-sp-ui Class를 추가한 경우만
 * SharePoint 기본 UI를 숨긴다.
 *
 * Home이 아닌 페이지에서는 Class가 제거되므로
 * SharePoint 기본 UI가 다시 표시된다.
 */

html.tdk-hide-sp-ui #SuiteNavWrapper,
html.tdk-hide-sp-ui #SuiteNavPlaceHolder,
html.tdk-hide-sp-ui #sp-appBar,
html.tdk-hide-sp-ui #spLeftNav,
html.tdk-hide-sp-ui #spSiteHeader,
html.tdk-hide-sp-ui #spCommandBar,

html.tdk-hide-sp-ui [data-automation-id="SiteHeader"],
html.tdk-hide-sp-ui [data-automationid="SiteHeader"],

html.tdk-hide-sp-ui [data-automation-id="siteHeader"],
html.tdk-hide-sp-ui [data-automationid="siteHeader"],

html.tdk-hide-sp-ui [data-automation-id="SiteHeaderRegion"],
html.tdk-hide-sp-ui [data-automationid="SiteHeaderRegion"],

html.tdk-hide-sp-ui [data-automation-id="pageCommandBar"],
html.tdk-hide-sp-ui [data-automationid="pageCommandBar"],

html.tdk-hide-sp-ui [data-automation-id="pageHeader"],
html.tdk-hide-sp-ui [data-automationid="pageHeader"],

html.tdk-hide-sp-ui [role="banner"],
html.tdk-hide-sp-ui header[role="banner"],


body.tdk-hide-sp-ui #SuiteNavWrapper,
body.tdk-hide-sp-ui #SuiteNavPlaceHolder,
body.tdk-hide-sp-ui #sp-appBar,
body.tdk-hide-sp-ui #spLeftNav,
body.tdk-hide-sp-ui #spSiteHeader,
body.tdk-hide-sp-ui #spCommandBar,

body.tdk-hide-sp-ui [data-automation-id="SiteHeader"],
body.tdk-hide-sp-ui [data-automationid="SiteHeader"],

body.tdk-hide-sp-ui [data-automation-id="siteHeader"],
body.tdk-hide-sp-ui [data-automationid="siteHeader"],

body.tdk-hide-sp-ui [data-automation-id="SiteHeaderRegion"],
body.tdk-hide-sp-ui [data-automationid="SiteHeaderRegion"],

body.tdk-hide-sp-ui [data-automation-id="pageCommandBar"],
body.tdk-hide-sp-ui [data-automationid="pageCommandBar"],

body.tdk-hide-sp-ui [data-automation-id="pageHeader"],
body.tdk-hide-sp-ui [data-automationid="pageHeader"],

body.tdk-hide-sp-ui [role="banner"],
body.tdk-hide-sp-ui header[role="banner"] {
  display: none !important;
  visibility: hidden !important;
}


/* =========================================================
   12. NOTICE POPUP
   =========================================================
 *
 * MX Poster Popup
 *
 * 브라우저 확대율에 따라 Poster도 같이 확대한다.
 *
 * 따라서 Poster를 viewport 크기에 맞춰
 * 강제로 축소하지 않는다.
 */


/* Popup 전체 */

.tdk-notice-popup {
  position: fixed;
  inset: 0;

  z-index: 100000;

  padding: 24px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  overflow: auto;

  background: transparent;

  opacity: 0;
  visibility: hidden;

  pointer-events: none;

  box-sizing: border-box;

  overscroll-behavior: contain;

  -webkit-overflow-scrolling: touch;

  transition:
    opacity 0.22s ease,
    visibility 0.22s ease;
}


/* Popup Open */

.tdk-notice-popup.is-open {
  opacity: 1;
  visibility: visible;

  pointer-events: auto;
}


/* Popup 외부 클릭 영역 */

.tdk-notice-popup__backdrop {
  position: fixed;
  inset: 0;

  z-index: 1;

  background: transparent;

  backdrop-filter: none;
  -webkit-backdrop-filter: none;

  cursor: pointer;
}


/* Poster Dialog */

.tdk-notice-popup__dialog {
  position: relative;

  z-index: 2;

  /*
   * Poster 기본 크기
   *
   * Browser 확대 시 CSS Pixel 자체가 확대되므로
   * Poster도 함께 크게 보인다.
   */
  width: 760px;
  min-width: 760px;

  max-width: none;
  max-height: none;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  flex: 0 0 auto;

  overflow: visible;

  background: transparent;

  border: none;
  border-radius: 14px;

  transform:
    translateY(16px)
    scale(0.97);

  box-sizing: border-box;

  box-shadow:
    0 14px 42px rgba(15, 23, 42, 0.24);

  transition:
    transform 0.24s ease;
}


/* Popup Open Animation */

.tdk-notice-popup.is-open
.tdk-notice-popup__dialog {
  transform:
    translateY(0)
    scale(1);
}


/* Poster Image */

.tdk-notice-popup__image {
  width: 100%;
  height: auto;

  min-width: 0;

  max-width: none;
  max-height: none;

  margin: 0;
  padding: 0;

  display: block;

  object-fit: initial;

  background: transparent;

  border: none;
  border-radius: 14px 14px 0 0;

  user-select: none;

  -webkit-user-drag: none;

  box-sizing: border-box;
}


/* X Button */

.tdk-notice-popup__close {
  position: absolute;

  top: 12px;
  right: 12px;

  z-index: 4;

  width: 42px;
  height: 42px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border:
    1px solid rgba(255, 255, 255, 0.72);

  border-radius: 50%;

  outline: none;

  background:
    rgba(255, 255, 255, 0.92);

  color: #1e293b;

  font-family:
    Arial,
    sans-serif;

  font-size: 28px;
  font-weight: 400;
  line-height: 1;

  cursor: pointer;

  box-sizing: border-box;

  box-shadow:
    0 5px 16px rgba(15, 23, 42, 0.24);

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.tdk-notice-popup__close:hover {
  background: #ffffff;
  color: #1d4ed8;

  transform: rotate(90deg);

  box-shadow:
    0 7px 20px rgba(15, 23, 42, 0.3);
}


.tdk-notice-popup__close:focus-visible {
  box-shadow:
    0 0 0 4px rgba(37, 99, 235, 0.3),
    0 5px 16px rgba(15, 23, 42, 0.24);
}


/* Footer Control */

.tdk-notice-popup__footer {
  width: 100%;
  min-height: 62px;

  padding:
    10px 12px 10px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  flex-shrink: 0;

  background: #ffffff;

  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 14px 14px;

  box-sizing: border-box;
}


/* 오늘 하루 보지 않음 */

.tdk-notice-popup__today-label {
  min-width: 0;

  display: inline-flex;
  align-items: center;
  gap: 9px;

  color: #334155;

  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;

  cursor: pointer;

  user-select: none;
}


.tdk-notice-popup__today-checkbox {
  width: 18px;
  height: 18px;

  margin: 0;

  flex-shrink: 0;

  accent-color: #2563eb;

  cursor: pointer;
}


.tdk-notice-popup__today-text {
  display: inline-block;

  line-height: 1.4;
}


/* Footer Close Button */

.tdk-notice-popup__confirm {
  min-width: 86px;
  height: 40px;

  padding: 0 20px;

  flex-shrink: 0;

  border: none;
  border-radius: 10px;
  outline: none;

  background: #0b4fb3;
  color: #ffffff;

  font-size: 14px;
  font-weight: 800;

  cursor: pointer;

  box-sizing: border-box;

  box-shadow:
    0 6px 15px rgba(11, 79, 179, 0.22);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.tdk-notice-popup__confirm:hover {
  background: #083985;

  transform: translateY(-1px);

  box-shadow:
    0 9px 19px rgba(11, 79, 179, 0.28);
}


.tdk-notice-popup__confirm:focus-visible {
  box-shadow:
    0 0 0 4px rgba(37, 99, 235, 0.28),
    0 6px 15px rgba(11, 79, 179, 0.22);
}


/**
 * Notice Popup이 열린 동안
 * 뒤쪽 SharePoint 화면 Scroll 차단
 */
body.tdk-notice-popup-open {
  overflow: hidden !important;
}


/* =========================================================
   13. RESPONSIVE - 1200px
   ========================================================= */

@media (max-width: 1200px) {

  .tdk-product-section {
    padding:
      36px 20px 48px;
  }


  .tdk-card-row {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }


  .tdk-quick-scroll {
    grid-template-columns:
      repeat(5, minmax(0, 1fr));
  }


  .tdk-detail-panel__inner {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  .tdk-department-row {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  .tdk-top-banner__row,
  .tdk-nav__inner,
  .tdk-footer__inner {
    padding-left: 20px;
    padding-right: 20px;
  }
}


/* =========================================================
   14. RESPONSIVE - 1024px
   ========================================================= */

@media (max-width: 1024px) {

  .tdk-top-banner__row {
    min-height: auto;

    padding-top: 16px;
    padding-bottom: 16px;

    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 12px;
  }


  .tdk-top-banner__actions {
    flex-wrap: wrap;

    gap: 12px;
  }


  .tdk-nav__inner {
    padding-left: 20px;
    padding-right: 20px;

    flex-wrap: wrap;

    gap: 6px;
  }


  .tdk-nav-btn {
    min-width: 108px;
    height: 50px;

    padding: 0 18px;

    font-size: 14px;
  }


  .tdk-hero-banner {
    height: 260px;

    margin-bottom: 28px;

    border-radius: 20px;
  }


  .tdk-hero-banner__content {
    left: 24px;
    right: 24px;
    bottom: 24px;
  }


  .tdk-hero-banner__headline {
    font-size: 34px;
  }


  .tdk-section-header__title {
    font-size: 28px;
  }


  .tdk-card-row {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }


  .tdk-quick-scroll {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }


  .tdk-detail-panel__inner {
    grid-template-columns: 1fr;
  }


  .tdk-main-card {
    min-height: 170px;
  }


  .tdk-department-row {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}


/* =========================================================
   15. RESPONSIVE - 768px
   ========================================================= */

@media (max-width: 768px) {

  .tdk-product-section {
    padding:
      28px 16px 40px;
  }


  .tdk-top-banner__row {
    padding: 14px 16px;

    gap: 10px;
  }


  .tdk-top-banner__brand {
    gap: 10px;
  }


  .tdk-top-banner__logo {
    height: 30px;
  }


  .tdk-top-banner__title {
    font-size: 18px;
  }


  .tdk-top-banner__actions {
    width: 100%;

    flex-wrap: wrap;

    gap: 10px;
  }


  .tdk-top-banner__actions a {
    font-size: 12px;
  }


  .tdk-lang-select {
    height: 32px;

    padding: 0 8px;

    font-size: 12px;
  }


  .tdk-nav {
    overflow-x: auto;
  }


  .tdk-nav__inner {
    padding: 0 16px;

    flex-wrap: nowrap;

    overflow-x: auto;

    -webkit-overflow-scrolling: touch;
  }


  .tdk-nav-btn {
    min-width: auto;
    height: 46px;

    padding: 0 14px;

    flex: 0 0 auto;

    font-size: 13px;
  }


  .tdk-hero-banner {
    height: 220px;

    border-radius: 18px;
  }


  .tdk-hero-banner__content {
    left: 18px;
    right: 18px;
    bottom: 18px;
  }


  .tdk-hero-banner__headline {
    font-size: 28px;
    line-height: 1.15;
  }


  .tdk-card-row {
    grid-template-columns: 1fr;
  }


  .tdk-main-card {
    min-height: 150px;

    padding: 14px;
  }


  .tdk-main-card__title {
    font-size: 20px;
  }


  /* Quick Link Grid */

  .tdk-quick-scroll {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 12px;
  }


  .tdk-quick-scroll-item {
    width: 100%;
    height: 96px;
  }


  .tdk-quick-scroll__icon {
    width: 42px;
    height: 42px;
  }


  .tdk-quick-scroll__icon img {
    width: 22px;
    height: 22px;
  }


  .tdk-quick-scroll__text {
    font-size: 12px;
  }


  .tdk-detail-panel {
    padding-left: 14px;
    padding-right: 14px;
  }


  .tdk-detail-panel.is-visible {
    padding: 16px 14px;
  }


  .tdk-detail-item {
    padding: 14px;
  }


  .tdk-detail-item__title {
    font-size: 16px;
  }


  .tdk-detail-group__title {
    font-size: 14px;
  }


  .tdk-detail-link {
    font-size: 13px;
  }


  .tdk-footer__inner {
    padding: 16px;

    flex-direction: column;
    align-items: flex-start;

    gap: 12px;
  }


  .tdk-footer__text {
    font-size: 15px;
  }


  .tdk-footer__right {
    font-size: 12px;

    white-space: normal;

    text-align: left;
  }


  .tdk-department-section {
    padding:
      22px 18px 24px;
  }


  .tdk-department-row {
    grid-template-columns: 1fr;
  }


  /* Notice Popup */

  .tdk-notice-popup {
    padding: 12px;
  }


  .tdk-notice-popup__dialog {
    width: 760px;
    min-width: 760px;

    max-width: none;
    max-height: none;

    border-radius: 12px;
  }


  .tdk-notice-popup__image {
    width: 100%;

    max-width: none;
    max-height: none;

    border-radius:
      12px 12px 0 0;
  }


  .tdk-notice-popup__close {
    top: 9px;
    right: 9px;

    width: 38px;
    height: 38px;

    font-size: 25px;
  }


  .tdk-notice-popup__footer {
    min-height: 58px;

    padding:
      9px 10px 9px 13px;

    gap: 12px;

    border-radius:
      0 0 12px 12px;
  }


  .tdk-notice-popup__today-label {
    font-size: 13px;
  }


  .tdk-notice-popup__today-checkbox {
    width: 17px;
    height: 17px;
  }


  .tdk-notice-popup__confirm {
    min-width: 72px;
    height: 38px;

    padding: 0 14px;

    font-size: 13px;
  }
}


/* =========================================================
   16. RESPONSIVE - 480px
   ========================================================= */

@media (max-width: 480px) {

  .tdk-top-banner__row {
    padding: 12px;
  }


  .tdk-top-banner__title {
    font-size: 16px;
  }


  .tdk-top-banner__logo {
    height: 26px;
  }


  .tdk-top-banner__actions {
    width: 100%;

    gap: 8px;
  }


  .tdk-top-banner__actions a,
  .tdk-lang-select {
    font-size: 12px;
  }


  .tdk-nav__inner {
    padding: 0 12px;
  }


  .tdk-nav-btn {
    height: 44px;

    padding: 0 12px;

    font-size: 12px;
  }


  .tdk-hero-banner {
    height: 190px;
  }


  .tdk-hero-banner__headline {
    font-size: 24px;
  }


  .tdk-section-header__title {
    font-size: 24px;
  }


  .tdk-main-card {
    min-height: 136px;

    padding: 12px;
  }


  .tdk-main-card__title {
    font-size: 18px;
  }


  .tdk-quick-scroll {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;
  }


  .tdk-quick-scroll-item {
    width: 100%;
    height: 92px;
  }


  /* Notice Popup */

  .tdk-notice-popup {
    padding: 8px;
  }


  /**
   * 모바일에서도 Poster 자체는 760px 유지.
   *
   * 화면을 초과하는 영역은
   * Popup Scroll로 확인한다.
   */
  .tdk-notice-popup__dialog {
    width: 760px;
    min-width: 760px;

    max-width: none;
    max-height: none;
  }


  .tdk-notice-popup__image {
    width: 100%;

    max-width: none;
    max-height: none;
  }


  .tdk-notice-popup__footer {
    min-height: 58px;

    padding:
      9px 10px 9px 13px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 10px;
  }


  .tdk-notice-popup__today-label {
    min-height: 32px;

    padding: 0 3px;
  }


  .tdk-notice-popup__confirm {
    width: auto;
    min-width: 72px;
  }
}

`;