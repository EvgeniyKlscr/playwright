import test, { expect } from '@playwright/test';
import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import _ from 'lodash';
import { HomePage } from 'ui/pages/home.page';
import { AddNewProductPage } from 'ui/pages/products/add-new-products.page';
import { ProductsListPage } from 'ui/pages/products/products-list.page';
import { SignIn } from 'ui/pages/sign-in/sign-in.page';

/**
 * Разработать е2е теста со следующими шагами:
 - Открыть Sales Portal локально поднятый в докере
 - Войти в приложения используя учетные данные указанные в readme к проекту
 - Создать продукт (модуль Products)
 - Верифицировать появившуюся нотификацию
 - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)
 */

test.describe('[Sales Portal] [Products]', () => {
  test('Add new product', async ({ page }) => {
    const signInPage = new SignIn(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await signInPage.open();
    await signInPage.fillCredentials(credentials);
    await signInPage.clickOnLoginButton();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule('Products');
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    const expectedResult = _.omit(productData, ['amount', 'notes']);
    const getTableData = await productsListPage.getLastProductData(productData.name);
    const actualResult = _.omit(getTableData, ['createdOn']);
    expect(actualResult, '[ASSERT] Table data is correct').toEqual(expectedResult);
  });
});
