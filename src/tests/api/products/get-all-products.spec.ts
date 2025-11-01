import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/api-config';
import { credentials } from 'config/env';
import { generateProductData } from 'data/sales-portal/products/generate-products';
import { createProductSchema } from 'data/schemas/products/create.schema';
import { getAllProductSchema } from 'data/schemas/products/get-all.schema';
import { STATUS_CODES } from 'data/status-codes';
import { IProductFromResponse } from 'data/types/product.types';
import _ from 'lodash';
import { validateResponse } from 'utils/validate-response.utils';

/**
 * Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
  - Залогиниться
  - Создать продукт и проверить 201й статус
  - Получить все продукты
  - создать и проверить схему
  - проверить статус
  - проверить, что в массиве тела респонса есть созданный продукт
  - Проверить поля IsSuccess и ErrorMessage
 */

const { baseURL, endpoints } = apiConfig;

test.describe('[API] [Sales Portal] [Products]', () => {
  let id = '';
  let token = '';

  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test('Get All Product', async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        'content-type': 'application/json',
      },
    });
    const loginBody = await loginResponse.json();
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginBody.IsSuccess).toBe(true);
    expect.soft(loginBody.ErrorMessage).toBe(null);
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers();
    token = headers['authorization']!;
    expect(token).toBeTruthy();

    const productData = generateProductData();
    const createProductResponse = await request.post(baseURL + endpoints.products, {
      data: productData,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createProductBody.Product;

    expect(_.omit(actualProductData, ['_id', 'createdOn'])).toEqual(productData);

    id = actualProductData._id;

    const getAllProductsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const getProductBody = await getAllProductsResponse.json();
    await validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const expectedProduct = getProductBody.Products.find((item: IProductFromResponse) => item._id === id);
    expect.soft(_.omit(expectedProduct, ['_id', 'createdOn'])).toEqual(productData);
    expect.soft(getProductBody.IsSuccess).toBe(true);
    expect.soft(getProductBody.ErrorMessage).toBe(null);
  });
});
