import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

test.describe('OrangeTheory -> Header Studio Page to Booking Lead', () => {

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onLandingPage().goToLandingPage();
    await pm.onLandingPage().headerBookNowBtn.click();

    // Accept cookies if prompted
    await pm.onBasePage().acceptCookiesIfPrompted()
    
    // Ensure studio list is visible
    await expect(pm.onLandingPage().listStudio).not.toHaveCount(0, { timeout: 30000 });
  });

  test('Scenario 1: Validate Studio Address via Closest Studio Modal', async ({ page }) => {
    const pm = new PageManager(page);

    // Get studio details from the modal
    const arrayStudio = await pm.onLandingPage().getStudioDetails(pm.onLandingPage().listStudio, 'h3');
    const randomStudio = Math.floor(Math.random() * arrayStudio.length);

    // Click "Book a Class" on a random studio
    await pm.onLandingPage().bookAClassBtn.nth(randomStudio).click();

    // Validate that studio details match on the booking page
    await expect(pm.onBookingProcessPage().studioNameToggle).toContainText(arrayStudio[randomStudio].studioName, { timeout: 15000 });
    expect(await pm.onBookingProcessPage().studioNameToggle.innerText()).toBe(arrayStudio[randomStudio].studioName);

    await pm.onBookingProcessPage().showStudioInformationBtn.click();
    expect(await pm.onBookingProcessPage().studioName.innerText()).toBe(arrayStudio[randomStudio].studioName);
    expect(await pm.onBookingProcessPage().studioAddress.innerText()).toBe(arrayStudio[randomStudio].address[0]);
    expect(await pm.onBookingProcessPage().getCityDetails()).toBe(arrayStudio[randomStudio].address[1]);
    expect(await pm.onBookingProcessPage().studioNumber.innerText()).toBe(arrayStudio[randomStudio].phoneNumber);
  });

  test('Scenario 2: Validate Studio Address via Display All to Join Now (Basic Package)', async ({ page }) => {
    const pm = new PageManager(page);

    // Click "Display All Locations" button
    await pm.onLandingPage().displayAllLocationsBtn.last().click();

    // Wait for location list to populate
    await expect(pm.onLandingPage().joinNowBtn).not.toHaveCount(0, { timeout: 20000 });

    // Get details of all locations
    const arrayLocations = await pm.onLandingPage().getStudioDetails(pm.onLandingPage().listLocation, 'h2');
    const index = 0;

    await pm.onLandingPage().joinNowBtn.nth(index).click();
    await page.waitForLoadState(); // Ensure page fully loads

    // Select Basic Membership option
    await pm.onBookingProcessPage().memOptionBasic.click();


    // Validate studio details on the booking page
    await expect(pm.onBookingProcessPage().studioNameToggle).toContainText(arrayLocations[index].studioName, { timeout: 15000 });
    expect(await pm.onBookingProcessPage().studioNameToggle.innerText()).toBe(arrayLocations[index].studioName);

    await pm.onBookingProcessPage().showStudioInformationBtn.click();
    expect(await pm.onBookingProcessPage().studioName.innerText()).toBe(arrayLocations[index].studioName);
    expect(await pm.onBookingProcessPage().studioAddress.innerText()).toBe(arrayLocations[index].address[0]);
    expect(await pm.onBookingProcessPage().getCityDetails()).toBe(arrayLocations[index].address[1]);
    expect(await pm.onBookingProcessPage().studioNumber.innerText()).toBe(arrayLocations[index].phoneNumber);
  });

  // Clean-up after each test
  test.afterEach(async ({ page }) => {
    await page.close();
  });

});

// CORS
// Studio Name is not consistent