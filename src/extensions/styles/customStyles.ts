export const CUSTOM_STYLES = `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap');

/* =========================
   1. BASE
========================= */
.tdk-product-section {
  background: #f4f6f8;
  padding: 40px 24px 56px;
  font-family: 'Inter', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
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
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
  margin-bottom: 6px;
}

.tdk-section-header__title {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;
}

/* =========================
   2. TOP BANNER
========================= */
.tdk-top-banner {
  background: #0b4fb3;
  color: #fff;
  box-shadow: 0 6px 18px rgba(0, 71, 187, 0.15);
  position: relative;
  z-index: 10;
}

.tdk-top-banner__inner {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}

.tdk-top-banner__row {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 10px 24px;
  box-sizing: border-box;
}

.tdk-top-banner__brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: #fff;
  min-width: 0;
  flex: 0 0 auto;
}

.tdk-top-banner__brand:hover {
  opacity: 0.96;
}

.tdk-top-banner__logo {
  height: 38px;
  width: auto;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.tdk-top-banner__title {
  font-size: 21px;
  font-weight: 800;
  line-height: 1.2;
  color: #fff;
  white-space: nowrap;
}

.tdk-top-banner__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
  margin-left: auto;
}

.tdk-top-banner__actions a {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.tdk-top-banner__actions a:hover {
  color: #ffffff;
  opacity: 1;
}

.tdk-lang-select {
  min-width: 92px;
  height: 34px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.24);
  background: rgba(255,255,255,0.12);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
}

.tdk-lang-select option {
  color: #111827;
  background: #ffffff;
}

/* =========================
   2-1. NAVIGATION
========================= */
.tdk-nav {
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  border-top: 1px solid rgba(255,255,255,0.14);
  overflow-x: auto;
  padding: 0;
}

.tdk-nav::-webkit-scrollbar {
  height: 6px;
}

.tdk-nav::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.25);
  border-radius: 999px;
}

.tdk-nav__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  gap: 6px;
}

.tdk-nav-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 54px;
  padding: 0 22px;
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  background: transparent;
  border: none;
  border-radius: 0;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;
}

.tdk-nav-btn:hover {
  background: rgba(255,255,255,0.12);
  color: #ffffff;
}

.tdk-nav-btn.is-active {
  background: #ffffff;
  color: #0b4fb3;
  font-weight: 800;
  border-radius: 6px 6px 0 0;
  box-shadow:
    0 -2px 0 #ffffff,
    0 4px 12px rgba(0,0,0,0.12);
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
/* =========================
   3. HERO BANNER
========================= */
.tdk-hero-banner {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 24px;
  margin-bottom: 36px;
  background: #0f172a;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
}

.tdk-hero-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 25% 18%;
  display: block;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.tdk-hero-banner__image.is-active {
  opacity: 1;
}

.tdk-hero-banner__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
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
  color: #fff;
  max-width: 680px;
}

.tdk-hero-banner__eyebrow {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
  opacity: 0.92;
}

.tdk-hero-banner__headline {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.08;
  margin: 0;
}

.tdk-hero-banner__arrow {
  position: absolute;
  top: 50%;
  z-index: 3;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  color: #ffffff;
  font-size: 34px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* =========================
   4. QUICK LINKS (FULL WIDTH GRID)
========================= */
.tdk-quick-links {
  margin-bottom: 0;
}

.tdk-quick-scroll {
  display: grid;                                 /* 🔥 flex → grid */
  grid-template-columns: repeat(9, 1fr);          /* 🔥 개수 맞춰 (지금 9개니까) */
  gap: 16px;
  margin-top: 10px;
}

/* 카드 */
.tdk-quick-scroll-item {
  width: 100%;            
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  color: #111827;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
  transition: all 0.2s ease;
}

.tdk-quick-scroll-item:hover {
  transform: translateY(-5px);
  border-color: #bfd8ff;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.12);
}

.tdk-quick-scroll__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tdk-quick-scroll__icon img {
  width: 26px;
  height: 26px;
}

.tdk-quick-scroll__text {
  font-size: 13px;
  font-weight: 800;
  text-align: center;
  line-height: 1.3;
}
/* =========================
   5. TABLEAU SECTION
========================= */
.tdk-tableau-section {
  margin-top: 8px;
}

.tdk-card-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.tdk-main-card {
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 18px;
  min-height: 215px;
  padding: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  cursor: pointer;
  text-align: left;
  background-color: #1e293b;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.10);
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
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.06) 0%,
    rgba(15, 23, 42, 0.18) 50%,
    rgba(15, 23, 42, 0.68) 100%
  );
  z-index: 1;
  transition: background 0.2s ease;
}

.tdk-main-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.18);
}

.tdk-main-card:hover::before {
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.04) 0%,
    rgba(15, 23, 42, 0.15) 50%,
    rgba(15, 23, 42, 0.60) 100%
  );
}

.tdk-main-card.is-active {
  border-color: #2f73ff;
  transform: translateY(-2px) scale(1.01);
  filter: brightness(1.05);
  opacity: 1;
  z-index: 2;
  box-shadow:
    0 0 0 3px rgba(47, 115, 255, 0.22),
    0 16px 30px rgba(15, 23, 42, 0.20);
}

.tdk-main-card.is-active::before {
  background: linear-gradient(
    180deg,
    rgba(29, 78, 216, 0.06) 0%,
    rgba(15, 23, 42, 0.22) 50%,
    rgba(15, 23, 42, 0.65) 100%
  );
}

.tdk-card-row.has-active .tdk-main-card:not(.is-active) {
  filter: brightness(0.65);
  opacity: 0.72;
  transform: scale(0.985);
}

.tdk-main-card__title {
  position: relative;
  z-index: 2;
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
  letter-spacing: 0.01em;
  line-height: 1.2;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
}

.tdk-main-card.is-active .tdk-main-card__title {
  transform: scale(1.03);
}

.tdk-main-card__sub {
  font-size: inherit;
  font-weight: 900;
  opacity: 0.85;
  margin-top: 4px;
}
/* =========================
   6. DETAIL PANEL
========================= */
.tdk-detail-panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin-top: 0;
  padding: 0 20px;
  background: #ffffff;
  border: 1px solid #d7deea;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transform: translateY(-8px);
  transition:
    max-height 0.32s ease,
    opacity 0.24s ease,
    transform 0.24s ease,
    margin-top 0.24s ease,
    padding-top 0.24s ease,
    padding-bottom 0.24s ease;
  pointer-events: none;
  box-sizing: border-box;
}

.tdk-detail-panel.is-visible {
  max-height: 1200px;
  opacity: 1;
  margin-top: 8px;
  padding: 20px;
  transform: translateY(0);
  pointer-events: auto;
  overflow: visible;
}

.tdk-detail-panel__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
  overflow: visible;
  transition: grid-template-columns 0.28s ease;
  box-sizing: border-box;
}

.tdk-detail-panel__inner:has(.tdk-detail-item:nth-child(1) .tdk-detail-links.is-open .tdk-detail-link.has-flyout) {
  grid-template-columns: 1.3fr 0.7fr;
}

.tdk-detail-panel__inner:has(.tdk-detail-item:nth-child(2) .tdk-detail-links.is-open .tdk-detail-link.has-flyout) {
  grid-template-columns: 0.7fr 1.3fr;
}

.tdk-detail-item,
.tdk-detail-groups,
.tdk-detail-group,
.tdk-flyout-wrap,
.tdk-detail-links.is-open {
  overflow: visible;
}

.tdk-detail-item {
  background: #f8fafc;
  border: 1px solid #dbe5f1;
  border-radius: 16px;
  padding: 16px;
  min-width: 0;
  box-sizing: border-box;
}

.tdk-detail-item__title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px 14px;
  box-sizing: border-box;
  transition: width 0.25s ease;
}

.tdk-detail-group:has(.tdk-detail-links.is-open .tdk-detail-link.has-flyout) {
  width: 70%;
  min-width: 320px;
  margin-right: auto;
}

.tdk-detail-group__title {
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 800;
  color: #1d4ed8;
  text-align: left;
  box-sizing: border-box;
}

.tdk-detail-group__header {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.tdk-detail-group__img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.tdk-detail-group__title .arrow {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 800;
  color: #2563eb;
  flex-shrink: 0;
  transition: transform 0.22s ease;
}

.tdk-detail-group__title.is-open .arrow {
  transform: rotate(180deg);
}

.tdk-detail-links {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 0;
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease,
    margin-top 0.2s ease;
}

.tdk-detail-links.is-open {
  max-height: 620px;
  opacity: 1;
  margin-top: 12px;
}

.tdk-detail-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  background: #eff6ff;
  color: #1e3a8a;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
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
  pointer-events: auto;
  cursor: default;
}

.tdk-detail-link__badge {
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: 999px;
  background: #cbd5e1;
  color: #475569;
  font-size: 11px;
  font-weight: 800;
}

.tdk-flyout-wrap {
  position: relative;
}

.tdk-flyout-arrow {
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 900;
  color: #2563eb;
}

.tdk-flyout-menu {
  position: absolute;
  top: -7px;
  left: calc(100% - 20px);
  width: 350px;
  min-width: 200px;
  max-width: 420px;
  padding: 7px;
  background: #ffffff;
  border: 1px solid #d7deea;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-6px) scale(0.98);
  transform-origin: left top;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0.18s ease;
  z-index: 9999;
  overflow: visible;
  box-sizing: border-box;
}

.tdk-flyout-wrap:hover > .tdk-flyout-menu,
.tdk-flyout-menu:hover {
  opacity: 1;
  visibility: visible;
  transform: translateX(0) scale(1);
}

.tdk-flyout-menu .tdk-flyout-menu {
  top: -7px;
  left: calc(100% - 20px);
}

.tdk-flyout-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-height: 32px;
  padding: 8px 9px;
  border-radius: 9px;
  color: #1e3a8a;
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
  border-radius: 12px;
  background: #eff6ff;
  color: #1e3a8a;
  font-size: 14px;
  font-weight: 700;
}

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
/* =========================
   7. FOOTER
========================= */
.tdk-footer {
  background: #071633;
  color: #ffffff;
  margin-top: 40px;
}

.tdk-footer__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 18px 24px;
  box-sizing: border-box;
}

.tdk-footer__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.tdk-footer__logo {
  height: 28px;
  width: auto;
  display: block;
  object-fit: contain;
  flex-shrink: 0;
}

.tdk-footer__text {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  white-space: nowrap;
}

.tdk-footer__right {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-align: right;
  white-space: nowrap;
}


/* =========================
   8. RESPONSIVE
========================= */
@media (max-width: 1200px) {
  .tdk-product-section {
    padding: 36px 20px 48px;
  }

  .tdk-card-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .tdk-detail-panel__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tdk-department-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tdk-top-banner__row,
  .tdk-nav__inner,
  .tdk-footer__inner {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 1024px) {
  .tdk-top-banner__row {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: auto;
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 12px;
  }

  .tdk-top-banner__actions {
    flex-wrap: wrap;
    gap: 12px;
  }

  .tdk-nav {
    padding: 0;
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
    border-radius: 20px;
    margin-bottom: 28px;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tdk-detail-panel__inner {
    grid-template-columns: 1fr;
  }

  .tdk-main-card {
    min-height: 170px;
  }

  .tdk-department-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .tdk-product-section {
    padding: 28px 16px 40px;
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
    font-size: 12px;
    padding: 0 8px;
    height: 32px;
  }

  .tdk-nav {
    padding: 0;
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
    font-size: 13px;
    flex: 0 0 auto;
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

  .tdk-quick-scroll {
    justify-content: flex-start;
    gap: 12px;
  }

  .tdk-quick-scroll-item {
    width: 104px;
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
    padding: 22px 18px 24px;
  }

  .tdk-department-row {
    grid-template-columns: 1fr;
  }
}

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

  .tdk-quick-scroll-item {
    width: 96px;
    height: 92px;
  }
}
/* =========================
   9. HIDE NATIVE SHAREPOINT UI
========================= */
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
body.tdk-hide-sp-ui [data-automation-id="pageHeader"],
body.tdk-hide-sp-ui [data-automationid="pageHeader"],
body.tdk-hide-sp-ui [role="banner"],
body.tdk-hide-sp-ui header[role="banner"] {
  display: none !important;
  visibility: hidden !important;
}
/* =========================
   10. DEPARTMENT SECTION
========================= */
.tdk-department-section {
  display: none !important;
  margin-top: 40px;
  padding: 28px 24px 30px;
  background: #dceefc;
  border-radius: 24px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.tdk-department-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.tdk-department-btn {
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 14px;
  border-radius: 8px;
  background: linear-gradient(90deg, #1d4ed8, #3b82f6);
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  white-space: normal;
  word-break: keep-all;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 6px 14px rgba(29, 78, 216, 0.18);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
  box-sizing: border-box;
}

.tdk-department-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(29, 78, 216, 0.24);
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


/* =========================
   TABLEAU ACCOUNT BUTTON + POPUP
========================= */

/* 버튼 */
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
  box-shadow: 0 8px 18px rgba(0, 71, 187, 0.22);
  transition: all 0.2s ease;
}
.tdk-tableau-login-hidden {
  display: none !important;
}
.tdk-tableau-account-btn:hover {
  background: #003a99;
  transform: translateY(-1px);
}

/* 팝업 전체 */
.tdk-tableau-popup {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
}

.tdk-tableau-popup.is-open {
  display: block;
}

/* 배경 */
.tdk-tableau-popup__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
}

/* 박스 */
.tdk-tableau-popup__box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(480px, calc(100% - 32px));
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 22px;
  padding: 26px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28);
}

/* 닫기 버튼 */
.tdk-tableau-popup__close {
  position: absolute;
  top: 14px;
  right: 16px;
  border: none;
  background: transparent;
  font-size: 26px;
  cursor: pointer;
}

/* 제목 */
.tdk-tableau-popup__title {
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 18px;
}

/* ID / PW 라인 */
.tdk-tableau-popup__row {
  display: grid;
  grid-template-columns: 86px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  margin-top: 10px;
  border-radius: 14px;
  background: #eff6ff;
  color: #1e3a8a;
}

.tdk-tableau-popup__row span {
  font-weight: 800;
}

.tdk-tableau-popup__value {
  font-weight: 900;
  color: #1e3a8a;
  word-break: break-all;
}

/* 복사 버튼 */
.tdk-copy-btn {
  height: 30px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, transform 0.2s ease;
}

.tdk-copy-btn:hover {
  background: #1e40af;
  transform: translateY(-1px);
}

.tdk-copy-btn.is-copied {
  background: #16a34a;
}

/* 안내문 */
.tdk-tableau-popup__notice {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f8fafc;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
}


/* =========================
   11. NOTICE POPUP
   브라우저 확대율에 따라 포스터도 확대
========================= */

/*
 * 팝업 전체 영역
 *
 * 포스터가 브라우저 화면보다 커지면
 * 팝업 영역 자체에 스크롤이 생긴다.
 */
.tdk-notice-popup {
  position: fixed;
  inset: 0;
  z-index: 100000;

  /*
   * 팝업 바깥쪽 여백
   */
  padding: 24px;

  /*
   * 포스터가 화면보다 작을 때는 중앙에 표시하고,
   * 화면보다 커지면 위쪽부터 스크롤할 수 있도록 한다.
   */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  /*
   * 브라우저 확대 시 포스터가 화면보다 커지면
   * 가로/세로 스크롤을 표시한다.
   */
  overflow: auto;

  /*
   * 기존 요청대로 검정 반투명 배경은 사용하지 않는다.
   */
  background: transparent;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  box-sizing: border-box;

  transition:
    opacity 0.22s ease,
    visibility 0.22s ease;

  /*
   * 팝업 내부 스크롤을 부드럽게 처리한다.
   */
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/*
 * 팝업이 열린 상태
 */
.tdk-notice-popup.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

/*
 * 팝업 바깥 클릭 영역
 *
 * 팝업이 스크롤되더라도 항상 화면 전체를 덮도록
 * fixed 위치를 사용한다.
 */
.tdk-notice-popup__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;

  background: transparent;

  backdrop-filter: none;
  -webkit-backdrop-filter: none;

  cursor: pointer;
}

/*
 * 포스터 이미지와 하단 버튼 영역을 감싸는 요소
 *
 * width를 고정하고 max-width를 제거하여
 * 브라우저 확대율이 포스터에도 그대로 적용되도록 한다.
 */
.tdk-notice-popup__dialog {
  position: relative;
  z-index: 2;

  /*
   * 포스터 기본 크기
   *
   * 브라우저 100%에서는 760px,
   * 브라우저 125%, 150% 확대 시 실제 화면에서도
   * 포스터가 함께 확대되어 보인다.
   */
  width: 760px;

  /*
   * 화면 크기에 맞춰 강제로 축소하지 않는다.
   */
  min-width: 760px;
  max-width: none;
  max-height: none;

  /*
   * 화면보다 작으면 중앙 정렬되고,
   * 화면보다 커지면 margin이 0으로 처리되어
   * 전체 영역을 스크롤할 수 있다.
   */
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  /*
   * dialog 내부에서 이미지를 자르지 않는다.
   */
  overflow: visible;

  flex: 0 0 auto;

  background: transparent;
  border: none;
  border-radius: 14px;

  box-shadow:
    0 14px 42px rgba(15, 23, 42, 0.24);

  transform: translateY(16px) scale(0.97);

  box-sizing: border-box;

  transition:
    transform 0.24s ease;
}

/*
 * 팝업이 열릴 때 표시 애니메이션
 */
.tdk-notice-popup.is-open
.tdk-notice-popup__dialog {
  transform: translateY(0) scale(1);
}

/*
 * 포스터 이미지
 *
 * 기존의 max-width, max-height를 제거한다.
 * 브라우저 확대 시 포스터도 함께 커진다.
 */
.tdk-notice-popup__image {
  display: block;

  /*
   * dialog 너비 전체를 사용한다.
   */
  width: 100%;
  height: auto;

  /*
   * 화면 크기에 맞춰 자동 축소하지 않는다.
   */
  min-width: 0;
  max-width: none;
  max-height: none;

  margin: 0;
  padding: 0;

  object-fit: initial;

  background: transparent;
  border: none;
  border-radius: 14px 14px 0 0;

  box-sizing: border-box;

  /*
   * 이미지 드래그 시 브라우저 기본 동작을 유지한다.
   */
  user-select: none;
  -webkit-user-drag: none;
}

/*
 * 포스터 오른쪽 위에 겹쳐 표시되는 X 버튼
 */
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

  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 50%;
  outline: none;

  background: rgba(255, 255, 255, 0.92);
  color: #1e293b;

  font-family: Arial, sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1;

  cursor: pointer;

  box-shadow:
    0 5px 16px rgba(15, 23, 42, 0.24);

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  box-sizing: border-box;
}

/*
 * X 버튼 Hover
 */
.tdk-notice-popup__close:hover {
  background: #ffffff;
  color: #1d4ed8;

  transform: rotate(90deg);

  box-shadow:
    0 7px 20px rgba(15, 23, 42, 0.3);
}

/*
 * 키보드로 X 버튼을 선택한 경우
 */
.tdk-notice-popup__close:focus-visible {
  box-shadow:
    0 0 0 4px rgba(37, 99, 235, 0.3),
    0 5px 16px rgba(15, 23, 42, 0.24);
}

/*
 * 포스터 바로 아래 하단 제어 영역
 */
.tdk-notice-popup__footer {
  width: 100%;
  min-height: 62px;

  padding: 10px 12px 10px 16px;

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

/*
 * 오늘 하루 보지 않음 영역
 */
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

/*
 * 오늘 하루 보지 않음 체크박스
 */
.tdk-notice-popup__today-checkbox {
  width: 18px;
  height: 18px;
  margin: 0;

  flex-shrink: 0;

  accent-color: #2563eb;

  cursor: pointer;
}

/*
 * 오늘 하루 보지 않음 문구
 */
.tdk-notice-popup__today-text {
  display: inline-block;

  line-height: 1.4;
}

/*
 * 하단 닫기 버튼
 */
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

  box-shadow:
    0 6px 15px rgba(11, 79, 179, 0.22);

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  box-sizing: border-box;
}

/*
 * 하단 닫기 버튼 Hover
 */
.tdk-notice-popup__confirm:hover {
  background: #083985;

  transform: translateY(-1px);

  box-shadow:
    0 9px 19px rgba(11, 79, 179, 0.28);
}

/*
 * 키보드로 닫기 버튼을 선택한 경우
 */
.tdk-notice-popup__confirm:focus-visible {
  box-shadow:
    0 0 0 4px rgba(37, 99, 235, 0.28),
    0 6px 15px rgba(11, 79, 179, 0.22);
}

/*
 * 공지 팝업이 열린 동안
 * 뒤쪽 SharePoint 화면의 스크롤은 막는다.
 *
 * 팝업 자체에는 overflow: auto가 있으므로
 * 확대된 포스터는 팝업 영역에서 스크롤할 수 있다.
 */
body.tdk-notice-popup-open {
  overflow: hidden !important;
}


/* =========================
   NOTICE POPUP RESPONSIVE
========================= */

/*
 * 기존 코드처럼 포스터를 화면 크기에 맞춰
 * 다시 축소하면 브라우저 확대 효과가 사라진다.
 *
 * 따라서 모바일 구간에서도 포스터 너비는 유지하고
 * 화면보다 큰 부분은 스크롤로 확인하도록 한다.
 */
@media (max-width: 768px) {
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

    border-radius: 12px 12px 0 0;
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

    padding: 9px 10px 9px 13px;
    gap: 12px;

    border-radius: 0 0 12px 12px;
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

@media (max-width: 480px) {
  .tdk-notice-popup {
    padding: 8px;
  }

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

  /*
   * 작은 화면에서도 하단 영역이 지나치게 길어지지 않도록
   * 가로 배치를 유지한다.
   */
  .tdk-notice-popup__footer {
    min-height: 58px;

    padding: 9px 10px 9px 13px;

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