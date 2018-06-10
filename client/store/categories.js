import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_CATEGORIES = 'GET_CATEGORIES';

// INITIAL STATE
const categoriesState = [];

// ACTION CREATORS
const getAllCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

// THUNK CREATORS
export const fetchAllCategories = () => dispatch =>
  axios
    .get('/api/categories')
    .then(res => dispatch(getAllCategories(res.data)))
    .catch(err => console.log(err));

export default function(state = categoriesState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
