/**
 * Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/

import { expect, test } from '@playwright/test';

test.describe('[DEMO LOGIN PAGE]', () => {
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';
  const creds = {
    name: 'test@gmail.com',
    password: 'SecretPw123!@#',
  };

  test('Success login with data from localStorage', async ({ page }) => {
    const usernameInput = page.locator('//input[@id="userName"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const submitButton = page.locator('//input[@id="submit"]');
    const successMessage = page.locator('//h4[@id="successMessage"]');

    await page.goto(baseUrl);
    await page.evaluate((data) => {
      const key = data.name;
      const value = JSON.stringify({
        name: data.name,
        password: data.password,
      });
      localStorage.setItem(key, value);
    }, creds);

    await usernameInput.fill(creds.name);
    await passwordInput.fill(creds.password);
    await submitButton.click();

    await expect(successMessage).toHaveText(`Hello, ${creds.name}!`);
  });
});
