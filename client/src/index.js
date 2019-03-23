import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux';
import App from './App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';
import setAuthToken from './common/setAuthToken';
import { setCurrentUser, logoutUser } from './actions';
// import history from './history';
import 'semantic-ui-css/semantic.min.css'
import './index.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt_decode(localStorage.jwtToken)))
  // EXPIRAR TOKEN
  if (jwt_decode(localStorage.jwtToken).exp < (Date.now() / 1000)) {
    store.dispatch(logoutUser());
    // history.push('/login')
    window.location.href = '/login';
  }
}

ReactDOM
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

serviceWorker.unregister();
