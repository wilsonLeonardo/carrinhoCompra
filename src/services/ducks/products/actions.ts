import { AxiosError } from 'axios';
import { action, ActionType } from 'typesafe-actions';

import { ProductTypes, Product } from './types';

export const productsRequest = () => action(ProductTypes.REQUEST);

export const productsGet = (data: Product[]) => action(ProductTypes.GET, { data });

export const productsError = (stack: AxiosError) => action(ProductTypes.ERROR, { stack });

export const productsNew = (name: string, price: number) => action(ProductTypes.NEW, { name, price });

export const productsDelete = (id: number) => action(ProductTypes.DELETE, { id });

export type ProductActions = ActionType<{
  productsGet: typeof productsGet;
  productsError: typeof productsError;
  productsRequest: typeof productsRequest;
  productsNew: typeof productsNew;
  productsDelete: typeof productsDelete;
}>;
