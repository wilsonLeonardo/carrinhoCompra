import { action, ActionType } from 'typesafe-actions';

import { CartTypes, Product } from './types';

// Action Creators
export const cartAdd = (data: Product) => action(CartTypes.ADD, { data });

export const cartRemove = (id: number) => action(CartTypes.REMOVE, { id });

// Action Handlers
export const onCartAdd = (state, { payload: { data } }) => {
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
};

export const onCartRemove = (state, { payload: { id } }) => ({
  data: state.data.filter((x) => x.id !== id),
});

export type ProductActions = ActionType<{
  cartAdd: typeof cartAdd;
  cartRemove: typeof cartRemove;
}>;
