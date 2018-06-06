import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
/**
 * COMPONENT
 */

// export const Homepage = props => {
//   const { products } = props;

//   return (
//     <div>
//       <h1>cubed</h1>
//       <div className="all-products-view">
//         {products.map(product => {
//           return (
//             <div key={product.id}>
//               <Link to="/singleProduct">
//                 <h3>{product.name}</h3>
//                 <p>{product.price}</p>
//                 <p>{product.quanitity}</p>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => {
        this.setState({ products });
      })
      .catch(console.error);
  }
  render() {
    const products = this.state.products;
    console.log('products:', products);
    return (
      <div>
        <h1>cubed</h1>
        <div className="all-products-view">
          <h1>TEST</h1>
          {products.map(product => {
            return (
              <div key={product.id}>
                <Link to="/singleProduct">
                  <h3>{product.title}</h3>
                  <img src={product.imageUrl} alt="" />
                </Link>
                <p>Price: {product.price}</p>
                <p>In Stock: {product.inventory}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

// const mapState = state => {
//   return {
//     products: state.products,
//   };
// };

// export default connect(mapState)(Homepage);

/**
 * PROP TYPES
 */
