import { Page } from '@playwright/test';
import { apiConfig } from 'config/api-config';
import { STATUS_CODES } from 'data/status-codes';
import { IMetricsResponse } from 'data/types/metric.types';
import { IProductResponse, IProductsSortedResponse } from 'data/types/product.types';

export class Mock {
  constructor(private page: Page) {}

  async productsPage(body: IProductsSortedResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });
  }

  async productDetailsModal(body: IProductResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    await this.page.route(apiConfig.baseURL + apiConfig.endpoints.productById(body.Product._id), async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });
  }

  async metrics(body: IMetricsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    await this.page.route(apiConfig.baseURL + apiConfig.endpoints.metrics, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });
  }
}
