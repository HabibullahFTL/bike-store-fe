export interface TQuery {
  limit?: string;
  page?: string;
  searchTerm?: string;
  searchValue?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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
