
const { test, expect, chromium } = require('@playwright/test');
const { copyFormPage } = require('../Test_LMS_2/copyFormPage');
const path = require('path');

test.describe('Validation of adding data to application', async () => {
   test('Validate user sings in successfully', async ({page}) => {
   
    const formPage = new copyFormPage(page);
    await formPage.goto();
    await formPage.fillNameEmail('John', 'Doe', 'JohnDoe@gmail.com');
    await formPage.selectGender();
    await formPage.fillMobilePhone('1234567890');
    await formPage.selectBirthday(1, 1, 2000);
    await formPage.fillSubjects('english');
    await formPage.chooseHobbies();
    await formPage.uploadFile();
    await formPage.checkInfoAboutStateAndCity('Rajasthan', 'Jaiselmer');
    await page.click('#submit');
  });
});
