import { test as base, expect } from '@playwright/test';
import { HomePage } from 'ui/pages/home.page';
import { AddNewProductPage } from 'ui/pages/products/add-new-products.page';
import { ProductsListPage } from 'ui/pages/products/products-list.page';
import { SignInPage } from 'ui/pages/sign-in/sign-in.page';

export interface IPages {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  signInPage: SignInPage;
}

const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

export { test, expect };
