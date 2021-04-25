import { cartAdd, cartRemove, onCartAdd, onCartRemove } from './actions';
import { CartTypes, Product } from './types';

describe('Actions types', () => {
  it('should create an action type of @CART/ADD', () => {
    expect(CartTypes.ADD).toBe('@CART/ADD');
  });

  it('should create an action type of @CART/REMOVE', () => {
    expect(CartTypes.REMOVE).toBe('@CART/REMOVE');
  });
});

describe('Actions Creators', () => {
  it('should call an action to add a product on cart', () => {
    const product: Product = {
      id: 1,
      name: 'iPhone',
      price: 5000,
    };

    expect(cartAdd(product)).toStrictEqual({
      type: CartTypes.ADD,
      error: undefined,
      payload: { data: product },
      meta: undefined,
    });
  });

  it('should call an action to remove a product of cart', () => {
    expect(cartRemove(1)).toStrictEqual({
      type: CartTypes.REMOVE,
      error: undefined,
      payload: { id: 1 },
      meta: undefined,
    });
  });
});

describe('Actions Handlers', () => {
  it('should create an action handle to add product on cart', () => {
    const initialState = {
      data: [],
    };
    const product: Product = {
      id: 1,
      name: 'iPhone',
      price: 5000,
    };

    expect(onCartAdd(initialState, { payload: { data: product } })).toStrictEqual({
      data: [{ ...product, qtd: 1 }],
    });
  });
  it('should create an action handle to add a same product on cart', () => {
    const product: Product = {
      id: 1,
      name: 'iPhone',
      price: 5000,
    };
    const initialState = {
      data: [{ ...product, qtd: 1 }],
    };

    expect(onCartAdd(initialState, { payload: { data: product } })).toStrictEqual({
      data: [{ ...product, qtd: 2 }],
    });
  });
  it('should create an action handle to remove product of cart', () => {
    const initialState = {
      data: [
        { id: 1, name: 'iPhone', price: 5000, qtd: 2 },
        { id: 2, name: 'Teste', price: 5000, qtd: 5 },
      ],
    };

    expect(onCartRemove(initialState, { payload: { id: 1 } })).toStrictEqual({
      data: [{ id: 2, name: 'Teste', price: 5000, qtd: 5 }],
    });
  });
});
