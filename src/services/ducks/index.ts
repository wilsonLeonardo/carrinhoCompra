import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { CartReducer, CartActions, CartState } from './cart';
import { ProductReducer, ProductActions, ProductState } from './products';

export default function createReducer(history: any) {
  return combineReducers({
    products: ProductReducer,
    cart: CartReducer,
    router: connectRouter(history),
  });
}

export type ApplicationState = {
  products: ProductState;
  cart: CartState;
};

export type ApplicationActions = typeof ProductActions & typeof CartActions;

export { RootSaga } from './saga';

export { ProductActions, CartActions };
