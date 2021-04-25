import { AxiosError } from 'axios';
import { action, ActionType } from 'typesafe-actions';

import { ProductTypes, Product } from './types';

// Actions Creators
export const productsRequest = () => action(ProductTypes.REQUEST);

export const productsGet = (data: Product[]) => action(ProductTypes.GET, { data });

export const productsError = (stack: AxiosError) => action(ProductTypes.ERROR, { stack });

export const productsNew = (name: string, price: number) => action(ProductTypes.NEW, { name, price });

export const productsDelete = (id: number) => action(ProductTypes.DELETE, { id });

// Actions Handlers
export const onProductsGet = (state, { payload: { data } }) => ({
  ...state,
  data,
  error: false,
  loading: false,
});

export const onProductsRequest = (state) => ({ ...state, loading: true });

export const onProductsError = (state, { payload: { stack } }) => ({
  ...state,
  error: true,
  stack,
});

export type ProductActions = ActionType<{
  productsGet: typeof productsGet;
  productsError: typeof productsError;
  productsRequest: typeof productsRequest;
  productsNew: typeof productsNew;
  productsDelete: typeof productsDelete;
}>;
