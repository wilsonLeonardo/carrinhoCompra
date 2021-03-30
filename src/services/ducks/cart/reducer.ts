import { action, createReducer } from 'typesafe-actions';

import { ProductActions } from './actions';
import { CartTypes, CartState } from './types';

export const initialState: CartState = {
  data: [],
};

export default createReducer<CartState, ProductActions>(initialState, {
  [CartTypes.ADD]: (state, { payload: { data } }) => {
    const x = state.data.map((x) => x.id);
    const i = x.indexOf(data.id);

    if (i === -1) {
      return {
        ...state,
        data: [...state.data, { ...data, qtd: 1 }],
      };
    }
    const oldValue = state.data[i].qtd;

    state.data[i].qtd = (oldValue && oldValue + 1) || 1;
    return {
      ...state,
    };
  },
  [CartTypes.REMOVE]: (state, { payload: { id } }) => ({
    data: state.data.filter((x) => x.id !== id),
  }),
});
