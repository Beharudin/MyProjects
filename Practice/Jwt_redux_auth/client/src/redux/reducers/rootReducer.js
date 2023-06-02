import { combineReducers } from "redux"
import authReducer from "./authReducer"


const RootReducers=combineReducers({
    auth: authReducer,
})

export default RootReducers