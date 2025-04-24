// BasePage
import { Locator, Page } from '@playwright/test';

export class BasePage{

    readonly page : Page;
    readonly headerBookNowBtn : Locator;
    readonly cookiesAcceptBtn : Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerBookNowBtn = page.locator("#white-nav-cta");
        this.cookiesAcceptBtn = page.locator('#onetrust-accept-btn-handler')
    }

    // Accepts Cookies "IF" prompted
    async acceptCookiesIfPrompted(){
        if (await this.cookiesAcceptBtn.isVisible()) {
            await this.cookiesAcceptBtn.click();
          }
    }

}
