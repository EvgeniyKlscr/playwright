import { test, expect } from 'fixtures/api.fixture';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import { createProductSchema } from 'data/schemas/products/create.schema';
import { STATUS_CODES } from 'data/status-codes';
import _ from 'lodash';
import { validateResponse } from 'utils/validation/validate-response.utils';
import { dataForValidCases } from 'data/sales-portal/products/valid-products';

/**
 * Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  - с позитивными проверками

  Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

  Требования:
  Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
  Manufacturer: обязательное
  Price: обязательное, Price should be in range 1-99999
  Amount: обязательное, Amount should be in range 0-999
  Notes: Notes should be in range 0-250 and without < or > symbols
 */

test.describe('[API] [Sales Portal] [Products]', () => {
  let id = '';
  let token = '';

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const { testName, data } of dataForValidCases) {
    test(`Verify ${testName}`, async ({ productsApi }) => {
      const createdProduct = await productsApi.create({ ...generateProductData(), ...data }, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ['_id', 'createdOn'])).toEqual(
        _.omit(createdProduct.body.Product, ['_id', 'createdOn']),
      );
    });
  }
});
