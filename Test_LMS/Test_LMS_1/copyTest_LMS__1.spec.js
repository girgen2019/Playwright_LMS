/** @format */

// @ts-check
import { test, expect, chromium } from '@playwright/test';
test.describe('Testing demoqa.com', () => {
  
  test('has title', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demoqa.com/text-box');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/DEMOQA/);

    await test.step('Fill the form', async () => {
      const getInfoForm = [
        'John Doe',
        'nil.goa@gmail.com',
        'Los Angeles',
        'Shabani',
      ];

      await page.locator('//*[@id="userName"]').fill(getInfoForm[0]);
      await page.locator('//*[@id="userEmail"]').fill(getInfoForm[1]);
      await page.locator('//*[@id="currentAddress"]').fill(getInfoForm[2]);
      await page.locator('//*[@id="permanentAddress"]').fill(getInfoForm[3]);

      const fullName = await page.locator('//*[@id="userName"]').inputValue();
      const email = await page.locator('//*[@id="userEmail"]').inputValue();
      const currentAddress = await page
        .locator('//*[@id="currentAddress"]')
        .inputValue();
      const permanentAddress = await page
        .locator('//*[@id="permanentAddress"]')
        .inputValue();

      await expect(fullName).toBe('John Doe');
      await expect(email).toBe('nil.goa@gmail.com');
      await expect(currentAddress).toBe('Los Angeles');
      await expect(permanentAddress).toBe('Shabani');

      await page.locator('//*[@id="submit"]').click();
    });

    await test.step('Submit', async () => {
      await page.locator('//*[@id="submit"]').click();
    });

     await test.step('Checking of the data', async () => {
      const expectName = await page.locator(
        '//*[@id="name" and @class="mb-1"]'
      );
      const expectEmail = await page.locator(
        '//*[@id="email" and @class="mb-1"]'
      );
      const expectCurrentAdress = await page.locator(
        '//*[@id="currentAddress" and @class="mb-1"]'
      );
      const expectPermanentAdress = await page.locator(
        '//*[@id="permanentAddress" and @class="mb-1"]'
      );

      await expect(expectName).toContainText('John Doe');
      await expect(expectEmail).toContainText('nil.goa@gmail.com');
      await expect(expectCurrentAdress).toContainText('Los Angeles');
      await expect(expectPermanentAdress).toContainText('Shabani');
    });
  });
});
