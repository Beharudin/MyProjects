import { buy_cakes } from "./CakeTypes";

const initialState={
    noOfCakes: 20,
}

const cakeReducers=(state=initialState, action)=>{
    switch(action.type){
        case buy_cakes:return{
            ...state, noOfCakes: state.noOfCakes-1
        }
        default: return state
    }
}

export default cakeReducers