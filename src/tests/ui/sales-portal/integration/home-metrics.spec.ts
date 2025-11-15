import { test, expect } from 'fixtures/business.fixture';
import { generateMetricsData } from 'data/sales-portal/home/metrics';
import numeral from 'numeral';

// hw-26

test.describe('[Integration] [Sales Portal] [Metrics]', () => {
  test('Total Orders Metric', async ({ loginAsAdmin, mock, homePage }) => {
    const totalOrders = 250;
    const metrics = generateMetricsData({ totalOrders });
    await mock.metrics(metrics);
    await loginAsAdmin();

    expect(
      homePage.totalOrdersNumberLocator,
      `[ASSERT] Verify total orders metric is equal to ${totalOrders}`,
    ).toHaveText(totalOrders.toString());
  });

  test('Total Customers Metric', async ({ loginAsAdmin, mock, homePage }) => {
    const totalNewCustomers = 1000;
    const metrics = generateMetricsData({ totalNewCustomers });
    await mock.metrics(metrics);
    await loginAsAdmin();

    expect(
      homePage.totalCustomersNumberLocator,
      `[ASSERT] Verify total customers metric is equal to ${totalNewCustomers}`,
    ).toHaveText(totalNewCustomers.toString());
  });

  test('Total Cancelled Orders Metric', async ({ loginAsAdmin, mock, homePage }) => {
    const totalCanceledOrders = 1;
    const metrics = generateMetricsData({ totalCanceledOrders });
    await mock.metrics(metrics);
    await loginAsAdmin();

    expect(
      homePage.totalCancalledOrdersNumberLocator,
      `[ASSERT] Verify total cancelled orders metric is equal to ${totalCanceledOrders}`,
    ).toHaveText(totalCanceledOrders.toString());
  });

  test('Total Revenue Metric', async ({ loginAsAdmin, mock, homePage }) => {
    const totalRevenue = 123456;
    const formattedTotalRevenue = numeral(totalRevenue).format('0.0a');
    const metrics = generateMetricsData({ totalRevenue });
    await mock.metrics(metrics);
    await loginAsAdmin();

    expect(
      homePage.totalRevenue,
      `[ASSERT] Verify total revenue metric is equal to ${formattedTotalRevenue}`,
    ).toHaveText(`$${formattedTotalRevenue}`);
  });

  test('Total Average Order Value Metric', async ({ loginAsAdmin, mock, homePage }) => {
    const averageOrderValue = 5000000;
    const formattedAverageOrderValue = numeral(averageOrderValue).format('0.0a');
    const metrics = generateMetricsData({ averageOrderValue });
    await mock.metrics(metrics);
    await loginAsAdmin();

    expect(
      homePage.averageOrderValue,
      `[ASSERT] Verify total average order value metric is equal to ${formattedAverageOrderValue}`,
    ).toHaveText(`$${formattedAverageOrderValue}`);
  });
});
