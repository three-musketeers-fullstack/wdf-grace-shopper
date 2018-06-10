import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateChosenCategory, displayAllProducts } from "../store";
/**
 * COMPONENT
 */

export const Homepage = props => {
  const { categories } = props;
  const { handleCategoryClick, handleAllProductsClick } = props;
  let products = !props.chosenCategory
    ? props.products
    : props.products.filter(product =>
        product.categories.find(
          category => category.name === props.chosenCategory
        )
      );
  return (
    <div className="flex-row">
      <div id="sidebar">
        <div>
          <a href="#">
            <h3
              className="categories margin-15px-10px font-size-1-05em"
              onClick={handleAllProductsClick}
            >
              All Products
            </h3>
          </a>
        </div>
        {categories &&
          categories.map(category => {
            return (
              <a
                onClick={() => handleCategoryClick(category.name)}
                key={category.id}
                href="#"
              >
                <h3
                  className=" categories margin-15px-20px
                font-size-1em"
                >
                  {category.name}
                </h3>
              </a>
            );
          })}
      </div>
      <div className="flex-row flex-wrapper margin-30px width-200">
        {products.map(product => {
          return (
            <div className="products-rendering width-20vw" key={product.id}>
              <Link
                className=" flex-column margin-15px-20px"
                to={`/products/${product.id}`}
              >
                <img className=" img-all-products" src={product.imageUrl} />
                <h2 className="categories font-size-2em">{product.title}</h2>
              </Link>
              <h3 className="margin-10px-20px">{product.rating} stars</h3>
              <h2
                className=" 
              font-size-2em
              price-red-color margin-10px-20px"
              >
                ${(product.price / 100).toFixed(2)}
              </h2>
              {product.inventory ? (
                product.inventory < 10 ? (
                  <h3 className="margin-10px-20px font-color-red">
                    Only {product.inventory} left
                  </h3>
                ) : (
                  <h3 className="margin-10px-20px font-color-green">
                    In Stock
                  </h3>
                )
              ) : (
                <h3 className="margin-10px-20px font-color-red">
                  Out of Stock
                </h3>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = state => {
  // console.log("STATE", state);
  return {
    chosenCategory: state.categories.chosenCategory,
    products: state.products.products,
    categories: state.categories.categories
  };
};

const mapDispatch = dispatch => ({
  handleAllProductsClick: () => dispatch(displayAllProducts()),
  handleCategoryClick: category => dispatch(updateChosenCategory(category))
});

const HomepageContainer = connect(
  mapState,
  mapDispatch
)(Homepage);

export default HomepageContainer;

/**
 * PROP TYPES
 */

Homepage.propTypes = {
  products: PropTypes.object
};
