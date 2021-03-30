import { createReducer } from 'typesafe-actions';

import { ProductActions } from './actions';
import { ProductTypes, ProductState } from './types';

export const initialState: ProductState = {
  data: [],
  error: false,
  loading: true,
};

export default createReducer<ProductState, ProductActions>(initialState, {
  [ProductTypes.GET]: (state, { payload: { data } }) => ({
    ...state,
    data,
    error: false,
    loading: false,
  }),
  [ProductTypes.ERROR]: (state, { payload: { stack } }) => ({
    ...state,
    error: true,
    stack,
  }),
  [ProductTypes.REQUEST]: (state) => ({ ...state, loading: true }),
});
