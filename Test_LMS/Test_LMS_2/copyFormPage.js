/** @format */

const { expect } = require('@playwright/test');
const path = require('path');

class copyFormPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderRadioBtn1 = page.locator(
      '#gender-radio-1'
    );
    this.genderRadioBtn2 = page.locator(
      '#gender-radio-2'
    );
    this.genderRadioBtn3 = page.locator(
      '#gender-radio-3'
    );
    this.mobilePhoneInput = page.locator('#userNumber');
    this.birthdayInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.hobbiesSport = page.locator('#hobbies-checkbox-1');
    this.hobbiesReading = page.locator('#hobbies-checkbox-2');
    this.hobbiesMusic = page.locator('#hobbies-checkbox-3');
    this.picture = page.locator('#uploadPicture');
    this.selectState = page.locator('#react-select-3-input');
    this.selectCity = page.locator('#city');
    this.submitButton = page.locator('#btn btn-primary');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillNameEmail(firstName, lastName, email) {
    await this.nameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
  }

  async selectGender() {
    let num = Math.floor(Math.random() * 3) + 1;
    if (num === 1) {
      await this.genderRadioBtn1.waitFor({ state: 'visible' });
      await this.genderRadioBtn1.check({ force: true });
    } else if (num === 2) {
      await this.genderRadioBtn2.waitFor({ state: 'visible' });
      await this.genderRadioBtn2.check({ force: true });
    } else if (num === 3) {
      await this.genderRadioBtn3.waitFor({ state: 'visible' });
      await this.genderRadioBtn3.check({ force: true });
    } else {
      throw new Error('Number of the phone is not correct');
    }
  }

  async fillMobilePhone(phoneNumber) {
    if (
      typeof phoneNumber !== 'string' ||
      phoneNumber.length !== 10 ||
      isNaN(phoneNumber)
    ) {
      throw new Error('Number of mobile phone have to contain 10 symbols');
    }
    await this.mobilePhoneInput.fill(phoneNumber);
  }

  async selectBirthday(day, month, year) {
    await this.birthdayInput.click();
    await this.page
      .locator('//*[@class="react-datepicker__month-select"]')
      .selectOption(`${month - 1}`);
    await this.page
      .locator('//*[@class="react-datepicker__year-select"]')
      .selectOption(`${year}`);
    const days = await this.page.locator('.react-datepicker__day');
    const allDays = await days.allTextContents();
    const targetDayIndex = allDays.findIndex((text) => text === `${day}`);
    await days.nth(targetDayIndex).click();
  }

  async fillSubjects(str) {
    await this.subjectsInput.fill(str);
    await this.subjectsInput.click();
  }

  async chooseHobbies() {
    await this.hobbiesSport.click({ force: true });
    await this.hobbiesReading.click({ force: true });
  }

  async uploadFile() {
    await this.picture.setInputFiles(path.join(__dirname, 'Мед3.png'));
  }

  async checkInfoAboutStateAndCity(state, city) {
    await this.selectState.click({ force: true });
    await this.page.pause()
    await this.page.locator(`div[class*="option"]:has-text("${state}")`).click();
    await this.selectCity.click({ force: true });
    await this.page.locator(`div[class*="option"]:has-text("${city}")`).click();
  }
}

module.exports = { copyFormPage };
