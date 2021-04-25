import { AxiosInstance, AxiosError } from 'axios';
import { call, put, getContext } from 'redux-saga/effects';

import { productsGet, productsError, productsNew, productsRequest, productsDelete } from './actions';

export function* ProductSaga({ payload }: ReturnType<typeof productsGet>) {
  const api: AxiosInstance = yield getContext('api');
  try {
    const res = yield call(api.get, `/Products`, {
      cache: false,
    });

    if (res && res.data) {
      yield put(productsGet(res.data));
    }
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      yield put(productsError(error.response.data));
    }
  }
}

export function* NewProductSaga({ payload }: ReturnType<typeof productsNew>) {
  const api: AxiosInstance = yield getContext('api');
  try {
    const res = yield call(api.post, `/Products`, {
      name: payload.name,
      price: payload.price,
    });

    if (res && res.data) {
      yield put(productsRequest());
    }
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      yield put(productsError(error.response.data));
    }
  }
}

export function* DeleteProductSaga({ payload }: ReturnType<typeof productsDelete>) {
  const api: AxiosInstance = yield getContext('api');
  try {
    const res = yield call(api.delete, `/Products/${payload.id}`);

    if (res && res.data) {
      yield put(productsRequest());
    }
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      yield put(productsError(error.response.data));
    }
  }
}
