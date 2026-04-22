export function getFooterHtml(bottomText: string): string {
    return `
    <footer class="tdk-footer">
      <div class="tdk-footer__inner">

        <div class="tdk-footer__left">
          <img
            class="tdk-footer__logo"
            src="https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/Tdk_icon3.png?csf=1&web=1&e=xP4hBV"
            alt="TDK Logo"
          />
          <span class="tdk-footer__text">TDK Korea Portal</span>
        </div>

        <div class="tdk-footer__right">
          ${bottomText}
        </div>

      </div>
    </footer>
  `;
}