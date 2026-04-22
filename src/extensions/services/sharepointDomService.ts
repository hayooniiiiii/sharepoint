export function hideNativeSharePointUi(): void {
    const selectors: string[] = [
        '[data-automationid="SiteHeader"]',
        '[data-automation-id="SiteHeader"]',
        '#spSiteHeader'
    ];

    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
        });
    }
}