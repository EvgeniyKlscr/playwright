import { test, expect } from '@playwright/test';

enum NOTIFICATIONS {
  SUCCESS_REGISTER = 'Successfully registered! Please, click Back to return on login page',
}

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
