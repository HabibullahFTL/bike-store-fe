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
