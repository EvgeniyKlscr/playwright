import { test as base, expect } from 'fixtures/page.fixture';
import { credentials } from 'config/env';

const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ homePage, signInPage }, use) => {
    await use(async () => {
      await signInPage.open();
      await signInPage.fillCredentials(credentials);
      await signInPage.clickOnLoginButton();

      await homePage.waitForOpened();
    });
  },
});

export { test, expect };
