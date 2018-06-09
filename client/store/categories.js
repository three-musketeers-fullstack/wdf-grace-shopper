import axios from "axios";
import history from "../history";

//ACTION TYPES
const GET_CATEGORIES = "GET_CATEGORIES";
const UPDATE_CHOSEN_CATEGORY = 'UPDATE_CHOSEN_CATEGORY'; 

// INITIAL STATE
const categoriesState = {
  categories: [],
  chosenCategory: ''
}

// ACTION CREATORS
const getAllCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

const chosenCategory = category => ({
  type: UPDATE_CHOSEN_CATEGORY,
  category
})

// THUNK CREATORS
export const fetchAllCategories = () => dispatch =>
  axios
    .get("/api/categories")
    .then(res => dispatch(getAllCategories(res.data)))
    .catch(err => console.log(err));

export const updateChosenCategory = category => dispatch => dispatch(chosenCategory(category))

//REDUCER
export default function(state = categoriesState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {...state, categories: action.categories};
    case UPDATE_CHOSEN_CATEGORY:
      return {...state, chosenCategory: action.category}
    default:
      return state;
  }
}
