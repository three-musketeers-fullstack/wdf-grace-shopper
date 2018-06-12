import axios from "axios";


// * ACTION TYPES
const GET_PRODUCTS = "GET_PRODUCTS";
const FILTER_WORD_CHANGE = 'FILTER_WORD_CHANGE';

// * INITIAL STATE
const productsState = {
  products: [],
  filterWord: ''
};

// * ACTION CREATORS
const getAllProducts = products => ({ type: GET_PRODUCTS, products });

const filterWordAction = word => ({ type: FILTER_WORD_CHANGE, word})

//THUNK CREATORS

//Fetch All Products
export const fetchAllProducts = () => dispatch =>
  axios
    .get("/api/products/")
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(err => console.log(err));

export const filterWordChange = word => dispatch => dispatch(filterWordAction(word))

//REDUCER
export default function(state = productsState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
      case FILTER_WORD_CHANGE:
      return { ...state, filterWord: action.word };
    default:
      return state;
  }
}
