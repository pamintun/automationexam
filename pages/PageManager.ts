// Page Manager -> page compiles and manages all Page Object Models
import { Page } from '@playwright/test';
import { LandingPage } from "./LandingPage.ts";
import { BookingProcessPage } from "./BookingProcessPage.ts";
import { BasePage } from "./BasePage.ts";


export class PageManager {
    private readonly page : Page;
    private readonly landingPage : LandingPage;
    private readonly bookingProcessPage : BookingProcessPage;
    private readonly basePage : BasePage;


    constructor(page: Page) {
        this.page = page;
        this.landingPage = new LandingPage(this.page);
        this.bookingProcessPage = new BookingProcessPage(this.page);
        this.basePage = new BasePage(this.page);
    }

    onLandingPage(){
        return this.landingPage;
    }

    onBookingProcessPage(){
        return this.bookingProcessPage;
    }

    onBasePage(){
        return this.basePage;
    }

}