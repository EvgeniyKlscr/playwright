import { IResponseFields } from './core.types';

interface IOrders {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any[];
  ordersCountPerDay: any[];
}

interface ICustomerGrowth {
  date: {
    year: number;
    month: number;
    day: number;
  };
  count: number;
}

interface ICustomers {
  totalNewCustomers: number;
  topCustomers: any[];
  customerGrowth: ICustomerGrowth[];
}

interface IProducts {
  topProducts: any[];
}

interface IMetrics {
  customers: ICustomers;
  orders: IOrders;
  products: IProducts;
}

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}
