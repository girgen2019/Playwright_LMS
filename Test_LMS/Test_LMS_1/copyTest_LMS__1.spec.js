/** @format */

// @ts-check
import { test, expect, chromium } from '@playwright/test';
test.describe('Testing demoqa.com', () => {
  const getInfoForm = [
    'John Doe',
    'nil.goa@gmail.com',
    'Los Angeles',
    'Shabani',
  ];
  test('Validate form of "DEMOQA"', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demoqa.com/text-box');
    await expect(page).toHaveTitle(/DEMOQA/);

    await page.locator('#userName').fill(getInfoForm[0]);
    await page.locator('#userEmail').fill(getInfoForm[1]);
    await page.locator('#currentAddress').fill(getInfoForm[2]);
    await page.locator('#permanentAddress').fill(getInfoForm[3]);
    await expect(page.locator('#userName')).toHaveValue('John Doe');
    await expect(page.locator('#userEmail')).toHaveValue('nil.goa@gmail.com');
    await expect(page.getByPlaceholder('Current Address')).toHaveValue('Los Angeles');
    await expect(page.locator('#permanentAddress')).toHaveValue('Shabani');
    await page.locator('#submit').click();

    await expect(page.locator('#name')).toContainText('John Doe');
    await expect(page.locator('#email')).toContainText('nil.goa@gmail.com');
    await expect(page.locator('p#currentAddress.mb-1')).toContainText('Los Angeles');
    await expect(page.locator('p#permanentAddress.mb-1')).toContainText('Shabani');
  });
});
