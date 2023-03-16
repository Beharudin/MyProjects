import { actionTypes } from "../constants/ActionTypes";

const initialState = {
  products: [],
  product: []
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.SELECTED_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
      case actionTypes.REMOVE_SELECTED_PRODUCT:
        return {...state, product: []}
    default:
      return state;
  }
};
