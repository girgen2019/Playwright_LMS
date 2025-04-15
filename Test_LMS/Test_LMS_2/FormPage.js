/** @format */

const { expect } = require('@playwright/test');
const path = require('path');

class FormPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('//*[@id="firstName"]');
    this.lastNameInput = page.locator('//*[@id="lastName"]');
    this.emailInput = page.locator('//*[@id="userEmail"]');
    this.genderRadioBtn1 = page.locator(
      '//*[@type="radio" and @id="gender-radio-1"]'
    );
    this.genderRadioBtn2 = page.locator('//*[@id="gender-radio-2"]');
    this.genderRadioBtn3 = page.locator('//*[@id="gender-radio-3"]');
    this.mobile = page.locator('//*[@id="userNumber"]');
    this.birthday = page.locator('//*[@id="dateOfBirthInput"]');
    this.subjectsInput = page.locator('//*[@id="subjectsInput"]');
    this.hobbiesSport = page.locator('//*[@id="hobbies-checkbox-1"]');
    this.hobbiesReading = page.locator('//*[@id="hobbies-checkbox-2"]');
    this.hobbiesMusic = page.locator('//*[@id="hobbies-checkbox-3"]');
    this.picture = page.locator('//*[@id="uploadPicture"]');
    this.selectState = page.locator('//*[@id="react-select-3-input"]');
    this.selectCity = page.locator('//*[@id="city"]');
    this.submit = page.locator('//*[@class="btn btn-primary"]');
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
      throw new Error('Некорректный номер радио-кнопки');
    }
  }

  async fillMobilePhone(phoneNumber) {
    if (
      typeof phoneNumber !== 'string' ||
      phoneNumber.length !== 10 ||
      isNaN(phoneNumber)
    ) {
      throw new Error('Number of mobile phone have to contain 10 values');
    }
    await this.mobile.fill(phoneNumber);
  }

  async selectBirthday(day, month, year) {
    await this.birthday.click();
    await this.page
      .locator('//*[@class="react-datepicker__month-select"]')
      .selectOption(`${month - 1}`);

    await this.page
      .locator('//*[@class="react-datepicker__year-select"]')
      .selectOption(`${year}`);

    const days = await this.page.locator('.react-datepicker__day');
    const allDays = await days.allTextContents();
    const targetDayIndex = allDays.findIndex((text) => text  === `${day}`);
    await days.nth(targetDayIndex).click();
  }

  async fillSubjects(str) {
    await this.subjectsInput.fill(str);
  }

  async choiceOfHobbies() {
    await this.subjectsInput.click({ force: true });
    await this.hobbiesSport.click({ force: true });
    await this.hobbiesReading.click({ force: true });
  }

  async uploadFile() {
    await this.picture.setInputFiles(path.join(__dirname, 'Мед3.png'));
  }

  async choiceStateAndCity() {
    await this.selectState.click({ force: true });
    await this.page.locator('.css-yt9ioa-option >> text=Rajasthan').click();
    await this.selectCity.click({ force: true });
    await this.page.locator('.css-yt9ioa-option >> text=Jaiselmer').click();
  }

  async submitForm() {
    await this.submit.click();
  }
}

module.exports = { FormPage };
