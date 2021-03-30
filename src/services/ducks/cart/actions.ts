import { action, ActionType } from 'typesafe-actions';

import { CartTypes, Product } from './types';

export const cartAdd = (data: Product) => action(CartTypes.ADD, { data });

export const cartRemove = (id: number) => action(CartTypes.REMOVE, { id });

export type ProductActions = ActionType<{
  cartAdd: typeof cartAdd;
  cartRemove: typeof cartRemove;
}>;
