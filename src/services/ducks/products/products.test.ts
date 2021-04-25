import {
  productsRequest,
  productsDelete,
  productsNew,
  productsGet,
  onProductsGet,
  onProductsError,
  onProductsRequest,
} from './actions';
import { ProductTypes, Product } from './types';

describe('Actions types', () => {
  it('should create an action type of @PRODUCTS/GET', () => {
    expect(ProductTypes.GET).toBe('@PRODUCTS/GET');
  });

  it('should create an action type of @PRODUCTS/ERROR', () => {
    expect(ProductTypes.ERROR).toBe('@PRODUCTS/ERROR');
  });

  it('should create an action type of @PRODUCTS/REQUEST', () => {
    expect(ProductTypes.REQUEST).toBe('@PRODUCTS/REQUEST');
  });

  it('should create an action type of @PRODUCTS/NEW', () => {
    expect(ProductTypes.NEW).toBe('@PRODUCTS/NEW');
  });

  it('should create an action type of @PRODUCTS/DELETE', () => {
    expect(ProductTypes.DELETE).toBe('@PRODUCTS/DELETE');
  });
});

describe('Actions Creators', () => {
  it('should call an action to request products', () => {
    expect(productsRequest()).toStrictEqual({
      type: ProductTypes.REQUEST,
      error: undefined,
      payload: undefined,
      meta: undefined,
    });
  });

  it('should call an action to delete a product', () => {
    expect(productsDelete(1)).toStrictEqual({
      type: ProductTypes.DELETE,
      error: undefined,
      payload: {
        id: 1,
      },
      meta: undefined,
    });
  });

  it('should call an action to add a product', () => {
    expect(productsNew('iPhone', 2000)).toStrictEqual({
      type: ProductTypes.NEW,
      error: undefined,
      payload: {
        name: 'iPhone',
        price: 2000,
      },
      meta: undefined,
    });
  });

  it('should call an action to save the products', () => {
    const products: Product[] = [
      {
        id: 1,
        name: 'iPhone',
        price: 200,
      },
      {
        id: 2,
        name: 'Samsung S10',
        price: 200,
      },
    ];
    expect(productsGet(products)).toStrictEqual({
      type: ProductTypes.GET,
      error: undefined,
      payload: {
        data: products,
      },
      meta: undefined,
    });
  });
});

describe('Actions Handlers', () => {
  it('should create an action handle to save a product', () => {
    const initialState = {
      data: [],
      error: false,
      loading: true,
    };

    const products: Product[] = [
      {
        id: 1,
        name: 'iPhone',
        price: 200,
      },
      {
        id: 2,
        name: 'Samsung S10',
        price: 200,
      },
    ];

    expect(onProductsGet(initialState, { payload: { data: products } })).toStrictEqual({
      data: products,
      error: false,
      loading: false,
    });
  });

  it('should create an action handle to set loading', () => {
    const initialState = {
      data: [],
      error: false,
      loading: false,
    };

    expect(onProductsRequest(initialState)).toStrictEqual({
      data: [],
      error: false,
      loading: true,
    });
  });

  it('should create an action handle to indicate error', () => {
    const initialState = {
      data: [],
      error: false,
      loading: false,
    };

    expect(onProductsError(initialState, { payload: { stack: 'Error 404' } })).toStrictEqual({
      data: [],
      error: true,
      loading: false,
      stack: 'Error 404',
    });
  });
});
