export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Processing' 
  | 'In Courier' 
  | 'Delivered' 
  | 'Completed' 
  | 'Returned' 
  | 'Failed' 
  | 'Hold' 
  | 'Damage';

export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Seller';

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  weight: number;
  category: string;
  image: string;
}

export interface CustomerHealth {
  delivered: number;
  returned: number;
  failed: number;
  riskScore: 'Green' | 'Yellow' | 'Red';
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  organisationName?: string;
  address: string;
  district: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  previousDue: number;
  status: OrderStatus;
  createdAt: string;
  source: string;
  courier?: {
    name: string;
    parcelId: string;
    trackingId: string;
  };
}

export interface BalanceInfo {
  current: number;
  lowThreshold: number;
  history: {
    id: string;
    amount: number;
    type: 'recharge' | 'usage';
    date: string;
    description: string;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}
