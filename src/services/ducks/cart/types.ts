export interface Product {
  id?: number;
  name?: string;
  price?: number;
  qtd?: number | 1;
}

export interface CartState {
  data: Product[];
}

export enum CartTypes {
  ADD = '@CART/ADD',
  REMOVE = '@PRODUCTS/REMOVE',
}
