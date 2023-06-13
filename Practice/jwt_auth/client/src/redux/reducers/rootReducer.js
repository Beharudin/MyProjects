import { combineReducers } from "redux"
import loginReducer from "./loginReducer"


const RootReducers=combineReducers({
    loginAuth: loginReducer,
})

export default RootReducers