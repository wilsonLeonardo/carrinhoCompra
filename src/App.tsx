import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';

import { routes } from './providers/routes';

export function App() {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
              />
            )
          );
        })}
        <Redirect to='/' />
      </Switch>
    </HashRouter>
  );
}
