import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { ruRU } from '@material-ui/data-grid';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import rootReducer from './store';
import history from './history';
import { Storage as storage } from './_helpers/localStorage'
import { createPersistentStorageMiddleware } from './middleware/createPersistentStorageMiddleware'
import { setToken } from './_helpers/auth-token';

const persistentStorageMiddleware = createPersistentStorageMiddleware(storage);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = () => {
  const auth = storage.getItem('auth');
  if (auth === undefined) {
      return undefined;
  }
  setToken(auth.token);
  return {auth: {
        user: auth.user,
        token: auth.token,
        loading: false,
        error: false,
      }
  }
};
const store = createStore(rootReducer, initialState(), composeEnhancers(applyMiddleware(thunk, persistentStorageMiddleware)));

const theme = createTheme((
    {
    }),
    ruRU
);

ReactDOM.render((
      <React.StrictMode>
          <Provider store={store}>
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Router>
          </Provider>
      </React.StrictMode>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
