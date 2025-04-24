// Page Object Model -> Booking Process Page Page.
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingProcessPage extends BasePage {
    
    public showStudioInformationBtn: Locator;
    public studioName: Locator;
    public studioAddress: Locator;
    public studioNumber: Locator;
    public studioCity: Locator;
    public toggledInformation: Locator;
    public studioNameToggle: Locator;
    public memOptionBasic: Locator;

    constructor(page: Page) {
        super(page);
        this.showStudioInformationBtn = page.locator('#studio-info-toggle')
        this.toggledInformation = page.locator('[aria-labelledby="studio-info-toggle"]')
        this.studioName = this.toggledInformation.locator('.studio-name-api')
        this.studioAddress = this.toggledInformation.locator('.studio-physical-address-api')
        this.studioCity = this.toggledInformation.locator('.flex-center-2.justify-center.gap-0')
        this.studioNumber = this.toggledInformation.locator('.studio-phone-api')
        this.studioNameToggle = page.locator('#studio-info-name-title')
        this.memOptionBasic = page.locator('[web-product-id="Basic"]')
}
    // Returns City Details
    async getCityDetails(){
        let city = await this.page.locator('.studio-physical-city-api').first().innerText();
        let divider = await this.page.locator('#studio-physical-city-divider').innerText();
        let region = await this.page.locator('.studio-physical-region-api').innerText();
        let postal = await this.page.locator('.studio-physical-postal-api').innerText();
        return city + divider + " " + region + " " + postal
    }

}



//.studio-info-toggle
