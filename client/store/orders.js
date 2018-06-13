import axios from "axios";

//action type
const GET_ALL_ORDERS = "GET_ALL_ORDERS";

//action creator

const getAllOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  };
};

export const fetchAllOrders = orders => dispatch => {
  axios
    .get(`/api/orders/`)
    .then(res => res.data)
    .then(foundOrders => dispatch(getAllOrders(foundOrders)))
    .catch(err => console.error(err));
};

// export const fetchUserOrders = (userId) => dispatch => {
//   axios
//     .get(`/api/orders/history/${userId}`)
//     .then(res => res.data)
//     .then(foundOrders => dispatch(getAllOrders(foundOrders)))
//     .catch(err => console.error(err));
// };


export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return [...state, action.orders];
    default:
      return state;
  }
}
