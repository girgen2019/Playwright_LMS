/** @format */

const { test, expect, chromium } = require('@playwright/test');
const { FormPage } = require('./FormPage');
const path = require('path');

test.describe('Form', async ({context}) => {
  let formPage;
  test.beforeEach('Success enter to the web site', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    const page = await context.newPage();
    formPage = new FormPage(page);
    await formPage.goto();
  });

  test('Fill first name, last name, email', async () => {
    await formPage.fillNameEmail('John', 'Doe', 'JohnDoe@gmail.com');
  });

  test('Choice selector', async () => {
    await formPage.selectGender();
  });

  test('Fill the phone number', async () => {
    await formPage.fillMobilePhone('1234567890');
  });

  test('Choice th Birthday', async () => {
    await formPage.choiceOfBirthday(1,1,2000);
  });

  test('Fill the subjects', async()=> {
    await formPage.fillSubjects('something');

  })
  test('Choice of hobbies', async()=> {
    await formPage.choiceOfHobbies();

  })

  test('Upload of the file', async () => {
    await formPage.uploadFile();
  });

  test('Current Address', async () => {
    await formPage.fillCurrentAddress();
  });

  test('Choice of State and City', async () => {
    await formPage.choiceStateAndCity();
  });

  
  test('Submit', async()=> {
    await formPage.submitForm();

  })


});
