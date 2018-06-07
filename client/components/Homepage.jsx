import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */

export const Homepage = props => {
  const { products } = props.products;
  console.log(props, 'HOME PAGE PROPS>><><<><>><><><><>');
  console.log(products, 'HOME PAGE PRODUCTS !!<><<><>><><><><>!!');
  return (
    <div>
      <h1>cubed</h1>
      <div className="all-products-view">
        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
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
};

// export default class Homepage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       products: [],
//     };
//   }

//   componentDidMount() {
//     axios
//       .get('/api/products')
//       .then(res => res.data)
//       .then(products => {
//         this.setState({ products });
//       })
//       .catch(console.error);
//   }
//   render() {
//     const products = this.state.products;
//     console.log('products:', products);
//     return (
//       <div>
//         <h1>cubed</h1>
//         <div className="all-products-view">
//           <h1>TEST</h1>
//           {products.map(product => {
//             return (
//               <div key={product.id}>
//                 <Link to={`/products/${product.id}`}>
//                   <h3>{product.title}</h3>
//                   <img src={product.imageUrl} alt="" />
//                 </Link>
//                 <p>Price: {product.price}</p>
//                 <p>In Stock: {product.inventory}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

/**
 * CONTAINER
 */

const mapState = state => ({
  products: state.products,
});

const HomepageContainer = connect(mapState)(Homepage);

export default HomepageContainer;

/**
 * PROP TYPES
 */

Homepage.propTypes = {
  products: PropTypes.object,
};
