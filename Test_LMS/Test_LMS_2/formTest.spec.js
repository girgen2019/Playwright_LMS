/** @format */

const { test, expect, chromium } = require('@playwright/test');
const { FormPage } = require('./FormPage');
const path = require('path');

test.describe('Form', async () => {
   test('Success enter to the web site', async () => {
    let formPage;
    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const context = await browser.newContext();
    const page = await context.newPage();
    formPage = new FormPage(page);
    await formPage.goto();
    await formPage.fillNameEmail('John', 'Doe', 'JohnDoe@gmail.com');
    await formPage.selectGender();
    await formPage.fillMobilePhone('1234567890');
    await formPage.selectBirthday(1, 1, 2000);
    await formPage.fillSubjects('english');
    await formPage.choiceOfHobbies();
    await formPage.uploadFile();
    await formPage.choiceStateAndCity();
    await formPage.submitForm();
  });

});
