export interface TProductQuery {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface TProduct {
  _id: string;
  name: string;
  brand: string;
  image?: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface IOrderData {
  _id: string;
  user: string;
  product: string | TProduct;
  quantity: number;
  totalPrice: number;
  shippingAddress: string;
  transaction?: ITransaction;
  createdAt: Date;
  updatedAt: Date;
}
export interface ITransaction {
  id: string;
  checkoutURL: string;
  bank_status: string;
  date_time: Date;
  method: string;
  payment_status: string;
  sp_code: string;
  status: null;
}
