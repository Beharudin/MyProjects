import { buy_cakes1 } from "./CakeTypes";

const initialState={
    noOfCakes: 15,
}

const cakeReducers1=(state=initialState, action)=>{
    switch(action.type){
        case buy_cakes1:return{
            ...state, noOfCakes: state.noOfCakes-action.payload
        }
        default: return state
    }
}

export default cakeReducers1