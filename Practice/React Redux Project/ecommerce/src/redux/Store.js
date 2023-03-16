import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers/index";

const store = createStore(reducers, composeWithDevTools())

export default store;