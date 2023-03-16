import { combineReducers } from "redux"
import cakeReducers from "./cake/CakeReducers"
import userReducer from "./user/userReducer"


const RootReducers=combineReducers({
    cake: cakeReducers,
    user: userReducer,
})

export default RootReducers