import { test as base, expect } from 'fixtures/page.fixture';
import { credentials, SALES_PORTAL_URL } from 'config/env';

// const test = base.extend<{
//   loginAsAdmin: () => Promise<void>;
// }>({
//   loginAsAdmin: async ({ homePage, signInPage }, use) => {
//     await use(async () => {

//       await signInPage.open();
//       await signInPage.fillCredentials(credentials);
//       await signInPage.clickOnLoginButton();

//       await homePage.waitForOpened();
//     });
//   },
// });

export const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, homePage }, use) => {
    await use(async () => {
      // const token = await loginApiService.loginAsAdmin();
      // await page.context().addCookies([
      //   {
      //     name: "Authorization",
      //     value: token,
      //     domain: "localhost",
      //     path: "/",
      //     expires: -1,
      //     httpOnly: false,
      //     secure: false,
      //     sameSite: "Lax",
      //   },
      // ]);
      const emailInput = page.locator('#emailinput');
      const passwordInput = page.locator('#passwordinput');
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
      await emailInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  },
});

export { expect };
