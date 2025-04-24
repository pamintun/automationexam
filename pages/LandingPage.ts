// Page Object Model -> Landing Page.
import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';



export class LandingPage extends BasePage {
  // Frame and Locator declarations for the Studio modal
  private frameModalStudio: FrameLocator;
  public listStudio: Locator;
  public bookAClassBtn: Locator;
  public displayAllLocationsBtn: Locator;

  // Frame and Locator declarations for the Locations list
  private frameLocations: FrameLocator;
  public listLocation: Locator;
  public joinNowBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize iframe and related locators for the Studio modal
    this.frameModalStudio = page.frameLocator('#free-class-modal-iframe');
    this.listStudio = this.frameModalStudio.locator('[role="listitem"]');
    this.bookAClassBtn = this.frameModalStudio.locator('button[aria-label="Book a class"]');
    this.displayAllLocationsBtn = this.frameModalStudio.locator('.w-full.mx-5 button');

    // Initialize iframe and related locators for the Locations list
    this.frameLocations = page.frameLocator('#locations-iframe');
    this.listLocation = this.frameLocations.locator('[role="listitem"]');
    this.joinNowBtn = this.listLocation.locator('button[aria-label="Join Now"]');
  }

  async goToLandingPage() {
    await this.page.goto('https://www.sit.orangetheory.com/en-us');
  }

  /**
   * Extracts and returns a list of studio details including name, address, and phone number.
   * 
   * @param listLocator - Locator that targets each studio card item.
   * @param studioNameLocator - Selector string used to locate the studio name within each card.
   * @returns Array of studio data objects (index, studioName, address lines, phoneNumber).
   */
  async getStudioDetails(
    listLocator: Locator,
    studioNameLocator: string
  ): Promise<{ index: number; studioName: string; address: string[]; phoneNumber: string }[]> {
    const count = await listLocator.count();
    const data: { index: number; studioName: string; address: string[]; phoneNumber: string }[] = [];

    for (let i = 0; i < count; i++) {
      const card = listLocator.nth(i);
      const studioName = await card.locator(studioNameLocator).innerText();
      const address = await card.locator('p').innerText();
      const phoneNumber = await card.locator('span').first().innerText();

      data.push({
        index: i,
        studioName,
        address: address.split('\n'),
        phoneNumber,
      });
    }
    return data;
  }
}
