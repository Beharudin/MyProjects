// import {createStore} from 'redux'
// import  cakeReducers  from './cake/CakeReducers'

// const store = createStore(cakeReducers)

// export default store

import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import  cakeReducers  from './cake/CakeReducers'
import RootReducers from './RootReducers';
import userReducer from './user/userReducer';

// const store = createStore(cakeReducers, composeWithDevTools(
//     applyMiddleware(logger)))

// const store = createStore(RootReducers, composeWithDevTools(
    // applyMiddleware(thunk)))
    
const store = createStore(userReducer, composeWithDevTools(
    applyMiddleware(thunk)))
export default store
