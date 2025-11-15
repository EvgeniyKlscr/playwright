import { IMetricsResponse } from 'data/types/metric.types';

export function generateMetricsData({
  totalOrders = 0,
  totalNewCustomers = 0,
  totalCanceledOrders = 0,
  totalRevenue = 0,
  averageOrderValue = 0,
}: {
  totalOrders?: number;
  totalNewCustomers?: number;
  totalCanceledOrders?: number;
  totalRevenue?: number;
  averageOrderValue?: number;
} = {}): IMetricsResponse {
  return {
    IsSuccess: true,
    Metrics: {
      orders: {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalCanceledOrders,
        recentOrders: [],
        ordersCountPerDay: [],
      },
      customers: {
        totalNewCustomers,
        topCustomers: [],
        customerGrowth: [],
      },
      products: {
        topProducts: [],
      },
    },
    ErrorMessage: null,
  };
}
