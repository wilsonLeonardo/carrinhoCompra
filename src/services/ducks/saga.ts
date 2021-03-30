import { all, takeLatest } from 'redux-saga/effects';

import { ProductSaga, NewProductSaga, DeleteProductSaga, ProductTypes } from './products';

export function* RootSaga() {
  yield all([takeLatest(ProductTypes.REQUEST, ProductSaga)]);
  yield all([takeLatest(ProductTypes.NEW, NewProductSaga)]);
  yield all([takeLatest(ProductTypes.DELETE, DeleteProductSaga)]);
}
