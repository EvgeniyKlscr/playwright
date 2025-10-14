import { expect, test } from '@playwright/test';

test.describe('[DEMO REGISTER FORM]', () => {
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-registration-form/';

  const registrationData = {
    firstName: 'John',
    lastName: 'Wick',
    address: 'Continental Hotel, New York',
    phone: '+1891237666',
    email: 'jonhwick@gmail.com',
    country: 'USA',
    sex: 'male',
    hobbies: ['Travelling', 'Sports'],
    language: 'English',
    skills: ['JavaScript', 'Python'],
    birthdayYear: '1970',
    birthdayMonth: 'September',
    birthdayDay: '2',
    password: 'TheBogeyman',
  };

  test('[DEMO REGISTER FORM][SMOKE] Successful registration', async ({ page }) => {
    // Registration Form
    const firstNameInput = page.locator('//input[@id="firstName"]');
    const lastNameInput = page.locator('//input[@id="lastName"]');
    const addressInput = page.locator('//textarea[@id="address"]');
    const emailInput = page.locator('//input[@id="email"]');
    const phoneInput = page.locator('//input[@id="phone"]');
    const countrySelector = page.locator('//select[@id="country"]');
    const maleGenderRadio = page.locator('//input[@value="male"]');
    const femaleGenderRadio = page.locator('//input[@value="female"]');
    const hobbiesCheckbox = (hobby: string) => page.locator(`//input[@value="${hobby}"]`);
    const languageInput = page.locator('//input[@id="language"]');
    const skillSelector = page.locator('//select[@id="skills"]');
    const birthdayYearSelector = page.locator('//select[@id="year"]');
    const birthdayMonthSelector = page.locator('//select[@id="month"]');
    const birthdayDaySelector = page.locator('//select[@id="day"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const confirmPasswordInput = page.locator('//input[@id="password-confirm"]');
    const confirmButton = page.locator('//button[@type="submit"]');

    // Registration Details
    const registrationDetails = page.locator('//h2[@class="text-center"]');
    const fullNameDetails = page.locator('//span[@id="fullName"]');
    const addressDetails = page.locator('//span[@id="address"]');
    const emailDetails = page.locator('//span[@id="email"]');
    const phoneDetails = page.locator('//span[@id="phone"]');
    const countryDetails = page.locator('//span[@id="country"]');
    const genderDetails = page.locator('//span[@id="gender"]');
    const languageDetails = page.locator('//span[@id="language"]');
    const skillsDetails = page.locator('//span[@id="skills"]');
    const hobbiesDetails = page.locator('//span[@id="hobbies"]');
    const dateOfBirthDetails = page.locator('//span[@id="dateOfBirth"]');
    const passwordDetails = page.locator('//span[@id="password"]');

    await page.goto(baseUrl);
    await firstNameInput.fill(registrationData.firstName);
    await lastNameInput.fill(registrationData.lastName);
    await addressInput.fill(registrationData.address);
    await emailInput.fill(registrationData.email);
    await phoneInput.fill(registrationData.phone);
    await countrySelector.selectOption(registrationData.country);
    registrationData.sex === 'male' ? await maleGenderRadio.check() : await femaleGenderRadio.check();
    for (const hobby of registrationData.hobbies) {
      await hobbiesCheckbox(hobby).check();
    }
    await languageInput.fill(registrationData.language);
    await skillSelector.selectOption(registrationData.skills);
    await birthdayYearSelector.selectOption(registrationData.birthdayYear);
    await birthdayMonthSelector.selectOption(registrationData.birthdayMonth);
    await birthdayDaySelector.selectOption(registrationData.birthdayDay);
    await passwordInput.fill(registrationData.password);
    await confirmPasswordInput.fill(registrationData.password);
    await confirmButton.click();

    await expect.soft(registrationDetails).toHaveText('Registration Details');
    await expect.soft(fullNameDetails).toHaveText(`${registrationData.firstName} ${registrationData.lastName}`);
    await expect.soft(addressDetails).toHaveText(registrationData.address);
    await expect.soft(emailDetails).toHaveText(registrationData.email);
    await expect.soft(phoneDetails).toHaveText(registrationData.phone);
    await expect.soft(countryDetails).toHaveText(registrationData.country);
    await expect.soft(genderDetails).toHaveText(registrationData.sex);
    await expect.soft(languageDetails).toHaveText(registrationData.language);
    await expect.soft(skillsDetails).toHaveText(registrationData.skills.join(', '));
    await expect.soft(hobbiesDetails).toHaveText(registrationData.hobbies.join(', '));
    await expect
      .soft(dateOfBirthDetails)
      .toHaveText(`${registrationData.birthdayDay} ${registrationData.birthdayMonth} ${registrationData.birthdayYear}`);
    const passwordLength = await passwordDetails.innerText();
    await expect.soft(passwordLength.length === registrationData.password.length).toBeTruthy();
  });
});
