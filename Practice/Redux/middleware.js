const redux=require('redux');
const reduxLogger=require('redux-logger');

const createStore=redux.createStore;
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()


const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//action
function buy_cake() {
  return {
    type: BUY_CAKE,
    info: "Buy cake info",
  };
}

function buy_icecream() {
    return {
      type: BUY_ICECREAM,
    };
  }

//initial state
const initialState = {
  noOfCake: 20,
  noOfIcecream: 10,
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        noOfCake: state.noOfCake - 1,
      };
      case BUY_ICECREAM:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream - 1,
      };
    default:
      return state;
  }
};

//redux store
const store = createStore(reducer, applyMiddleware(logger));
console.log('Inital state: ', store.getState())
const unsubscribe=store.subscribe(()=>{})
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_icecream());
store.dispatch(buy_icecream());
unsubscribe()

