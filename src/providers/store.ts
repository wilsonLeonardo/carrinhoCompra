import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import Reducers, { RootSaga, ApplicationState } from '../services/ducks';
import { api } from './api';

export const history = createBrowserHistory();

export function createReduxStore(initialState?: any) {
  const saga = createSagaMiddleware({ context: { api } });

  const composeEnhancers = composeWithDevTools({});

  const store: Store<ApplicationState> = createStore(
    Reducers(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), saga))
  );

  saga.run(RootSaga);

  return store;
}
