import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/api-config';
import { credentials } from 'config/env';
import { loginSchema } from 'data/schemas/login/login.schema';
import { STATUS_CODES } from 'data/status-codes';
import { validateResponse } from 'utils/validate-response.utils';

/**
 * Написать смоук API тест на логин
  - создать и проверить схему
  - проверить статус
  - проверить наличие токена в хедерах
 */

const { baseURL, endpoints } = apiConfig;

test.describe('[API] [Sales Portal] [Auth]', () => {
  test('Login', async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        'content-type': 'application/json',
      },
    });

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = loginResponse.headers();
    const token = headers['authorization']!;
    expect(token).toBeTruthy();
  });
});
