import { createReducer } from 'typesafe-actions';

import { ProductActions, onCartAdd, onCartRemove } from './actions';
import { CartTypes, CartState } from './types';

export const initialState: CartState = {
  data: [],
};

export default createReducer<CartState, ProductActions>(initialState, {
  [CartTypes.ADD]: onCartAdd,
  [CartTypes.REMOVE]: onCartRemove,
});
