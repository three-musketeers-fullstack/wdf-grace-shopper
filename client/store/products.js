import axios from "axios";
import history from "../history";

// * ACTION TYPES
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";

// * INITIAL STATE
const productsState = {
    products: [],
    product: {}
};

// * ACTION CREATORS
const getSingleProduct = product => ({ type: GET_SINGLE_PRODUCT, product });
const getAllProducts = products => ({ type: GET_PRODUCTS, products });

//THUNK CREATORS

//Fetch Single Product
const fetchSingleProduct = () => dispatch =>
  axios
    .get("/api/products/:id")
    .then(res => dispatch(getSingleProduct(res.data)))
    .catch(err => console.log(err));

//Fetch All Products
const fetchAllProducts = () => dispatch =>
  axios
    .get("/api/products/")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(err => console.log(err));

//REDUCER
export default function(state = productsState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, product: action.product};
    case GET_PRODUCTS:
      return {...state, products: action.products};
    default:
      return state;
  }
}
