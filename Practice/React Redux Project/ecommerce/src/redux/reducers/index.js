import {combineReducers} from 'redux'
import {productReducer}  from './ProductReducer'

const reducers=combineReducers({
    allProducts: productReducer,
})

export default reducers