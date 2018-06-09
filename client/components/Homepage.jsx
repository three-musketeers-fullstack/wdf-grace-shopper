import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */

export const Homepage = props => {
  const { products } = props.products;
  const categories = props.categories;
  console.log(props.categories);
  return (
    <div className="flex-row">
      <div className="width-25">
        {categories &&
          categories.map(category => {
            return (
              <a key={category.id}>
                <h3>{category.name}</h3>
              </a>
            );
          })}
      </div>
      <div className="flex-row flex-wrapper margin-30px">
        {products.map(product => {
          return (
            <div className="width-23 products-rendering" key={product.id}>
              <Link
                className=" flex-column margin-15px-20px"
                to={`/products/${product.id}`}
              >
                <img className=" img-all-products" src={product.imageUrl} />
                <h2 className="font-size-2em">{product.title}</h2>
              </Link>
              <h3 className="margin-10px-20px">{product.rating} stars</h3>
              <h2 className=" 
              font-size-2em
              price-red-color margin-10px-20px">
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

const mapState = state => ({
  products: state.products,
  categories: state.categories
});

const HomepageContainer = connect(mapState)(Homepage);

export default HomepageContainer;

/**
 * PROP TYPES
 */

Homepage.propTypes = {
  products: PropTypes.object
};
