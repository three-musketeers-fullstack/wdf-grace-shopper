import axios from 'axios';

// * ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// * INITIAL STATE
const cartState = [];

// * ACTION CREATORS
const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

const removeFromCart = product => {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
};

// THUNK CREATORS
export const addItemToCart = (userId, product) => dispatch => {
  if (userId) {
    axios.put(`/api/cart/${userId}`, product).then(cartItem => {
      dispatch(addToCart(cartItem));
    });
  }
};

// REDUCER

export default function reducer(state = cartState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}
