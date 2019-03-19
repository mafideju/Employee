import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from './reducers';

import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

serviceWorker.unregister();
