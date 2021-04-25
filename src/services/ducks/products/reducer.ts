import { createReducer } from 'typesafe-actions';

import { ProductActions, onProductsRequest, onProductsGet, onProductsError } from './actions';
import { ProductTypes, ProductState } from './types';

export const initialState: ProductState = {
  data: [],
  error: false,
  loading: false,
};

export default createReducer<ProductState, ProductActions>(initialState, {
  [ProductTypes.GET]: onProductsGet,
  [ProductTypes.ERROR]: onProductsError,
  [ProductTypes.REQUEST]: onProductsRequest,
});
