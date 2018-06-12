import axios from "axios";
import history from "../history";

// * ACTION TYPES
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_FROM_CART = 'GET_PRODUCTS_FROM_CART'

// * INITIAL STATE
const productsState = {
  products: [],
  cartProducts: []
};

// * ACTION CREATORS
const getAllProducts = products => ({ type: GET_PRODUCTS, products });

//THUNK CREATORS

//Fetch All Products
export const fetchAllProducts = () => dispatch =>
  axios
    .get("/api/products/")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(err => console.log(err));

//REDUCER
export default function(state = productsState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
