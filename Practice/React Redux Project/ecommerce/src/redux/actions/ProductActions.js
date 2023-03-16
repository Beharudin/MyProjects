import { actionTypes } from "../constants/ActionTypes";

export const SetProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const SelectedProduct = (product) => {
  return {
    type: actionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const RemoveSelectedProduct = () => {
  return {
    type: actionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
