import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import { expect, test } from 'fixtures/business.fixture';
import _ from 'lodash';

/**
 * Создайте e2e тест со следующими шагами:
1. Зайти на сайт Sales Portal
2. Залогиниться с вашими кредами
3. Перейти на страницу Products List
4. Перейти на станицу Add New Product
5. Создать продукта
6. Проверить наличие продукта в таблице
7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
8. В модалке удаления кликнуть кнопку Yes, Delete
9. Дождаться исчезновения модалки и загрузки страницы
10. Проверить, что продукт отсутствует в таблице

Вам понадобится:

- PageObject модалки удаления продукта
- Подключить модалку в PageObject страницы Products
- Использовать фикстуры
 */

test.describe('[Sales Portal][Products]', () => {
  test('Delete product', async ({ homePage, productsListPage, addNewProductPage, loginAsAdmin }) => {
    await loginAsAdmin();
    await homePage.clickOnViewModule('Products');
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(homePage.waitForNotification(NOTIFICATIONS.PRODUCT_CREATED)).toBeVisible();
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    const expectedResult = _.omit(productData, ['amount', 'notes']);
    const getTableData = await productsListPage.getProductData(productData.name);
    const actualResult = _.omit(getTableData, ['createdOn']);
    expect.soft(actualResult).toEqual(expectedResult);

    const { deleteProductsModal } = productsListPage;
    await productsListPage.deleteButton(productData.name).click();
    await deleteProductsModal.waitForOpened();
    await deleteProductsModal.clickConfirmButton();
    const successDeletedToast = homePage.waitForNotification(NOTIFICATIONS.PRODUCT_DELETED);
    await expect.soft(successDeletedToast).toBeVisible();
    await expect.soft(successDeletedToast).toBeHidden({ timeout: 15_000 });

    await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
  });
});
