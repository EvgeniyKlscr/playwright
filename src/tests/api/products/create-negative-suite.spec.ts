import { test } from 'fixtures/api.fixture';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import { STATUS_CODES } from 'data/status-codes';
import { validateResponse } from 'utils/validation/validate-response.utils';
import { dataForInvalidCases } from 'data/sales-portal/products/invalid-products';

/**
Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  - с негативыми проверками

  Требования:
  Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
  Manufacturer: обязательное
  Price: обязательное, Price should be in range 1-99999
  Amount: обязательное, Amount should be in range 0-999
  Notes: Notes should be in range 0-250 and without < or > symbols
 */

test.describe('[API] [Sales Portal] [Products]', () => {
  let token = '';

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  for (const { testName, data } of dataForInvalidCases) {
    test(`Verify ${testName}`, async ({ productsApi }) => {
      const productData = { ...generateProductData(), ...data };
      console.log('data', data);
      console.log('productData', productData);
      // @ts-expect-error Negative test
      const createdProduct = await productsApi.create({ ...productData, ...data }, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: 'Incorrect request body',
      });
    });
  }

  test(`Verify name should be unique`, async ({ productsApi }) => {
    const productData = generateProductData();
    await productsApi.create(productData, token);
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CONFLICT,
      IsSuccess: false,
      ErrorMessage: `Product with name '${productData.name}' already exists`,
    });
  });
});
