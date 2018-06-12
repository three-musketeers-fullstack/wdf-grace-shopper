import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const dummyData = [
    {
        "id": 1,
        "isPurchased": true,
        "total": 200,
        "userAddress": "the house",
        "userName": "bob",
        "createdAt": "2018-06-11T21:50:27.507Z",
        "updatedAt": "2018-06-11T21:50:27.507Z",
        "userId": 1,
        "products": [
            {
                "id": 2,
                "title": "Boullion Cube",
                "description": "Only the finest chicken stock. For any stew that needs a hint of chicken.",
                "price": 7240,
                "inventory": 14050,
                "imageUrl": "/images/default-cube.jpg",
                "rating": 4,
                "createdAt": "2018-06-11T21:46:30.791Z",
                "updatedAt": "2018-06-11T21:46:30.791Z",
                "order-product": {
                    "quantity": 2,
                    "price": 500,
                    "createdAt": "2018-06-11T21:50:56.929Z",
                    "updatedAt": "2018-06-11T21:50:56.929Z",
                    "orderId": 1,
                    "productId": 2
                }
            },
            {
                "id": 5,
                "title": "Ice Cube (Tray)",
                "description": "Not to be mistaken for Ice Cube. This is used to make frozen cubes of water.",
                "price": 299,
                "inventory": 1000,
                "imageUrl": "/images/default-cube.jpg",
                "rating": 3,
                "createdAt": "2018-06-11T21:46:30.792Z",
                "updatedAt": "2018-06-11T21:46:30.792Z",
                "order-product": {
                    "quantity": 1,
                    "price": 300,
                    "createdAt": "2018-06-11T21:58:56.825Z",
                    "updatedAt": "2018-06-11T21:58:56.825Z",
                    "orderId": 1,
                    "productId": 5
                }
            },
            {
                "id": 6,
                "title": "Nintendo Gamecube",
                "description": "One of the best gaming consoles of its generation. Easily the cubiest, as well.",
                "price": 30075,
                "inventory": 12,
                "imageUrl": "/images/default-cube.jpg",
                "rating": 4,
                "createdAt": "2018-06-11T21:46:30.792Z",
                "updatedAt": "2018-06-11T21:46:30.792Z",
                "order-product": {
                    "quantity": 12,
                    "price": null,
                    "createdAt": "2018-06-11T22:24:52.505Z",
                    "updatedAt": "2018-06-11T22:24:52.505Z",
                    "orderId": 1,
                    "productId": 6
                }
            }
        ]
    }
]
//need to connect to store, also user homepage is not used
const OrderHistory = props => {
  const { total, userAddress, createdAt, products } = dummyData[0];

  return (
    <div>
      <h1>Order History</h1>
      <h2>Sent To: {userAddress}</h2>
      <div>
        <h2> Total: {total}</h2>
        <h4>Order Placed On: {createdAt.slice(0,10)}</h4>
      </div>
      <div>
        {products.map(product => {
          return (
              <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>{product.title}</h4>
                <div className='img-small'>
                    <img src={product.imageUrl}/>
                </div>
                
                <p> Descrption: {product.description}</p>
                <h3>Item Cost: {product.price}</h3>
                <h6>Rating: {product.rating}</h6>
             </Link>
             <div>
                 
             </div>
              </div>
          )
        })}
        
      </div>
      
    </div>
  );
};

// const mapToProps = state => ({})
// export default connect(mapToProps)(OrderHistory)

export default OrderHistory;
