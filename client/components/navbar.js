import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, email }) => (
  <div
    className="header-style"
  >
    <div>
      <Link to="/">
        <img className="img-logo" src="/images/cube-logo.png" />
      </Link>
    </div>
    <div>
      <input className="input-style" placeholder="Search for Items" />
      {/* <button></button> */}
    </div>
 
      {isLoggedIn ? (<h3 className="color-white">Hello, {email}</h3>) : (<div></div>)}
 
    <nav className="flex-row">
      {isLoggedIn ? (
        <div className="flex-row align-items-center">
          {/* The navbar will show these links after you log in */}
          <Link className="header-buttons font-size-1-05em" to="/">
            Home
          </Link>
          <a className="header-buttons font-size-1-05em" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="flex-row align-items-center">
          {/* The navbar will show these links before you log in */}
          <Link className="header-buttons font-size-1-05em" to="/login">
            Login
          </Link>
          <Link className=" header-buttons font-size-1-05em" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
      <div>
        <Link to="/cart">
          <img className="shooping-cart-styling" src="/images/shopping-cart.png" />
        </Link>
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
