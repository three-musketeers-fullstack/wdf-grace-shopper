import axios from 'axios';

// * ACTION TYPES
const UPDATE_LOCAL_CART_STATE = 'UPDATE_LOCAL_CART_STATE'

// * INITIAL STATE
const localCartState = [];

// * ACTION CREATORS
const updateState = products => {
  return {
    type: UPDATE_LOCAL_CART_STATE,
    products,
  };
};


// THUNK CREATORS
export const updateLocalCartState = products => dispatch => dispatch(updateState(products))

// REDUCER

export default function reducer(state = localCartState, action) {
  switch (action.type) {
    case UPDATE_LOCAL_CART_STATE:
      return action.products;
    default:
      return state;
  }
}