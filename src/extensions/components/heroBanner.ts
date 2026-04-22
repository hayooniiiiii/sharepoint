export function getHeroBannerHtml(bannerUrl: string): string {
    return `
    <div class="tdk-hero-banner">
      <img class="tdk-hero-banner__image" src="${bannerUrl}" alt="TDK Company Banner" />
      <div class="tdk-hero-banner__overlay"></div>
      <div class="tdk-hero-banner__content">
        <div class="tdk-hero-banner__headline">TDK Korea Portal</div>
      </div>
    </div>
  `;
}