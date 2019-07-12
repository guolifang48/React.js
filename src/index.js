import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';

import AppProvider from './components/AppProvider/AppProvider';

import Dashboard from './containers/Dashboard';
import { NotFound, BackendError, Lockscreen, PasswordReset, Signin, Signup } from './pages';

import registerServiceWorker from './registerServiceWorker';

import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import configureStore from './store'
import rootSaga from './sagas'

const { store, persistor } = configureStore()
store.runSaga(rootSaga, store)

render(
  <Provider store={store}>
		<PersistGate persistor={persistor}>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/500" component={BackendError} />
            <Route exact path="/Lockscreen" component={Lockscreen} />
            <Route exact path="/forgot" component={PasswordReset} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
	  </PersistGate>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();