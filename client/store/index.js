import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import products from "./products";
import categories from "./categories";
import localCart from "./localCart";
import orders from "./orders";

const reducer = combineReducers({
  user,
  products,
  categories,
  localCart,
  orders
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./products";
export * from "./categories";
export * from "./localCart";
export * from "./orders";
