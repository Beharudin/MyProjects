import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { Axios } from 'axios';
export const cookies = new Cookies();
export const _host = window.location.host.split(':')[0];
export const _port = window.location.host.split(':')[1];
const AUTH_PORT = Number(_port) + 1;
const CAMUNDA_ADP_PORT = Number(_port) + 2;
const BACKEND_PORT = Number(_port) + 3;
const remote_host = '10.100.150.36';
export const BASE_AUTH_URL = `http://${remote_host}:${AUTH_PORT}/api/v1`;
export const BASE_CAMADPTR_URL = `http://${_host}:${CAMUNDA_ADP_PORT}/api/v1`;
export const BASE_BACKEND_URL = `http://${remote_host}:${BACKEND_PORT}/api/v1`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
