import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import { test, expect } from 'fixtures/page.fixture';
import _ from 'lodash';

/**
 * Разработать е2е теста со следующими шагами:
 - Открыть Sales Portal локально поднятый в докере
 - Войти в приложения используя учетные данные указанные в readme к проекту
 - Создать продукт (модуль Products)
 - Верифицировать появившуюся нотификацию
 - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)
 */

test.describe('[Sales Portal] [Products]', () => {
  test('Add new product', async ({ signInPage, homePage, productsListPage, addNewProductPage }) => {
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
    const getTableData = await productsListPage.getProductData(productData.name);
    const actualResult = _.omit(getTableData, ['createdOn']);
    expect(actualResult, '[ASSERT] Table data is correct').toEqual(expectedResult);
  });
});
