import { all, takeLatest } from 'redux-saga/effects';

import { ProductSaga, NewProductSaga, ProductTypes } from './products';

export function* RootSaga() {
  yield all([takeLatest(ProductTypes.REQUEST, ProductSaga)]);
  yield all([takeLatest(ProductTypes.NEW, NewProductSaga)]);
}
