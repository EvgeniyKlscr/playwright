import { test, expect } from '@playwright/test';
import { invalidData, NOTIFICATIONS } from 'data/demo-login-form/register.data';

test.describe('[DEMO REGISTER PAGE][SMOKE] Registration', () => {
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

  test.beforeEach(async ({ page }) => {
    const loginFormText = page.locator('//h2[@id="loginForm"]');
    const registerFormText = page.locator('//h2[@id="registerForm"]');
    const registerButtonOnLoginPage = page.locator('//input[@id="registerOnLogin"]');

    await page.goto(baseUrl);
    await expect(loginFormText, '[ASSERT] Verify login page').toHaveText('Login');
    await registerButtonOnLoginPage.click();
    await expect(registerFormText, '[ASSERT] Verify register form').toHaveText('Registration');
  });

  test('Registration with valid data', async ({ page }) => {
    const usernameRegisterInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordRegisterInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButton = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const backButton = page.locator('//input[@id="backOnRegister"]');
    const loginFormText = page.locator('//h2[@id="loginForm"]');

    await usernameRegisterInput.fill('John Doe');
    await passwordRegisterInput.fill('Password1');
    await registerButton.click();
    await expect(successMessage, '[ASSERT] Verify success message').toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);

    await backButton.click();
    await expect(loginFormText, '[ASSERT] Verify return to login page').toHaveText('Login');
  });

  test('Registration with valid data (minimum number of characters)', async ({ page }) => {
    const usernameRegisterInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordRegisterInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButton = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const backButton = page.locator('//input[@id="backOnRegister"]');
    const loginFormText = page.locator('//h2[@id="loginForm"]');

    await usernameRegisterInput.fill('Joh');
    await passwordRegisterInput.fill('Password');
    await registerButton.click();
    await expect(successMessage, '[ASSERT] Verify success message').toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);

    await backButton.click();
    await expect(loginFormText, '[ASSERT] Verify return to login page').toHaveText('Login');
  });

  test('Registration with valid data (maximum number of characters)', async ({ page }) => {
    const usernameRegisterInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordRegisterInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButton = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');
    const backButton = page.locator('//input[@id="backOnRegister"]');
    const loginFormText = page.locator('//h2[@id="loginForm"]');

    await usernameRegisterInput.fill('UserNameWith40Chars_123456789012345678');
    await passwordRegisterInput.fill('ApasswordOver20Chars');
    await registerButton.click();
    await expect(successMessage, '[ASSERT] Verify success message').toHaveText(NOTIFICATIONS.SUCCESS_REGISTER);

    await backButton.click();
    await expect(loginFormText, '[ASSERT] Verify return to login page').toHaveText('Login');
  });
});

test.describe('[DEMO REGISTER PAGE][NEGATIVE] Registration', () => {
  /**
    * Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
      https://anatoly-karpovich.github.io/demo-login-form/

    Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
  */

  const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

  test.beforeEach(async ({ page }) => {
    const loginFormText = page.locator('//h2[@id="loginForm"]');
    const registerFormText = page.locator('//h2[@id="registerForm"]');
    const registerButtonOnLoginPage = page.locator('//input[@id="registerOnLogin"]');

    await page.goto(baseUrl);
    await expect.soft(loginFormText, '[ASSERT] Verify login page').toHaveText('Login');
    await registerButtonOnLoginPage.click();
    await expect.soft(registerFormText, '[ASSERT] Verify register form').toHaveText('Registration');
  });

  for (const { title, credentials, errorMessage } of invalidData) {
    test(`${title}`, async ({ page }) => {
      const usernameRegisterInputLocator = page.locator('//input[@id="userNameOnRegister"]');
      const passwordRegisterInputLocator = page.locator('//input[@id="passwordOnRegister"]');
      const registerButtonLocator = page.locator('//input[@id="register"]');
      const errorMessageLocator = page.locator('//h4[@id="errorMessageOnRegister"]');

      await usernameRegisterInputLocator.fill(credentials.username);
      await passwordRegisterInputLocator.fill(credentials.password);
      await registerButtonLocator.click();
      await expect(errorMessageLocator, `[ASSERT] Verify error message is ${errorMessage}`).toHaveText(errorMessage);
    });
  }
});
