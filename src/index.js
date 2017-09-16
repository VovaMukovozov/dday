import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { loadRoot } from './actions/nodeActions';
import App from './App';

const store = configureStore();

store.dispatch(loadRoot());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();