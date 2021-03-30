export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductState {
  readonly data: Product[];
  error?: boolean;
  loading?: boolean;
}

export enum ProductTypes {
  GET = '@PRODUCTS/GET',
  ERROR = '@PRODUCTS/ERROR',
  REQUEST = '@PRODUCTS/REQUEST',
  NEW = '@PRODUCTS/NEW',
}
