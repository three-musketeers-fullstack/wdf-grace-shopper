import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Login,
  Signup,
  UserHome,
  Cart,
  SingleProduct,
  Homepage
} from "./components";
import {
  me,
  fetchAllProducts,
  fetchAllCategories,
  updateLocalCartState
} from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route component={Homepage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  //Creates an array with unique products ids and quantity from the local storage
  const cache = {};

  localStorage.getItem("cart") && Array.from(JSON.parse(localStorage.getItem("cart"))).forEach(
    product => (cache[product.productId] = product)
  );

  const localCart = localStorage.getItem("cart") ? Object.values(cache) : [];

  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchAllCategories());
      dispatch(fetchAllProducts());
      dispatch(updateLocalCartState(localCart));
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
