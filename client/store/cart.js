import axios from 'axios';

// * ACTION TYPES
const USER_ADD_TO_CART = 'USER_ADD_TO_CART';
const GUEST_ADD_TO_CART = 'GUEST_ADD_TO_CART';
const USER_REMOVE_FROM_CART = 'USER_REMOVE_FROM_CART';
const GUEST_REMOVE_FROM_CART = 'GUEST_REMOVE_FROM_CART';

// * INITIAL STATE
const cartState = [];

// * ACTION CREATORS
const addToUserCart = product => {
  return {
    type: USER_ADD_TO_CART,
    product,
  };
};

const removeFromUserCart = product => {
  return {
    type: USER_REMOVE_FROM_CART,
    product,
  };
};
const addToGuestCart = product => {
  return {
    type: GUEST_ADD_TO_CART,
    product,
  };
};

const removeFromGuestCart = product => {
  return {
    type: GUEST_REMOVE_FROM_CART,
    product,
  };
};

// THUNK CREATORS
export const addItemToUserCart = (userId, product) => dispatch => {
  const {price, quantity} = product;
  if (userId) {
    axios.put(`/api/orders/cart/${userId}`, {price, quantity}).then(cartItem => {
      dispatch(addToUserCart(cartItem));
    })
    .catch(err => console.error(err));
  }
};

// REDUCER

export default function reducer(state = cartState, action) {
  switch (action.type) {
    case USER_ADD_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}
