import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateChosenCategory, displayAllProducts } from "../store";
/**
 * COMPONENT
 */

export const Homepage = props => {
  const { categories, filterWord, userId } = props;
  const { handleCategoryClick, handleAllProductsClick } = props;

  // Filters all the products by category if category is chosen otherwise it keeps all products
  let products = (!props.chosenCategory
    ? props.products
    : props.products.filter(product =>
        product.categories.find(
          category => category.name === props.chosenCategory
        )
      )
  ).filter(product =>
    product.title.toLowerCase().match(filterWord.toLowerCase())
  );

  // console.log(userId,'><><><><><><><>')
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
        {userId ? (
          <div className="categories margin-15px-10px font-size-1-05em">
            <Link to={"/history"}>Order History</Link>
          </div>
        ) : (
          <div />
        )}
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
                  // It renders if inventory less than 10
                  <h3 className="margin-10px-20px font-color-red">
                    Only {product.inventory} left
                  </h3>
                ) : (
                  // It renders if inventory more than 10
                  <h3 className="margin-10px-20px font-color-green">
                    In Stock
                  </h3>
                )
              ) : (
                // It renders if inventory is 0
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
  return {
    filterWord: state.products.filterWord,
    chosenCategory: state.categories.chosenCategory,
    products: state.products.products,
    categories: state.categories.categories,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => ({
  //Deletes chosenCategory in the state so it renders all products again
  handleAllProductsClick: () => dispatch(displayAllProducts()),
  //Updates chosenCategory's state with the one clicked
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
