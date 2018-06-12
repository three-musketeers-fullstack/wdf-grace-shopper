import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserOrders } from "../store";

//need to connect to store, also user homepage is not used
const OrderHistory = props => {
  // , total, userAddress, createdAt, products
  const { userId, orders, getAllOrders } = props;
  getAllOrders(userId);
  const ordersByUser = orders.filter(order => order[0].userId === userId);
  console.log(props, "<><><><><>>");
  return (
    <div>
      <h1>Order History</h1>
      <div>
        {ordersByUser.length &&
          ordersByUser.map(order => {
            let count = 1;
            return (
              <div key={order.id}>
                {order.map(singleOrder => {
                  const {
                    userAddress,
                    products,
                    total,
                    createdAt,
                    id
                  } = singleOrder;
                  return (
                    <div key={id}>
                      <div>
                        <h2>Order Number: {count++}</h2>
                        <h2>Sent To: {userAddress}</h2>
                        <div>
                          <h2> Total: {total}</h2>
                          <h4>Order Placed On: {createdAt.slice(0, 10)}</h4>
                        </div>
                        <div>
                          {products.map(product => {
                            return (
                              <div key={product.id}>
                                <Link to={`/products/${product.id}`}>
                                  <h4>{product.title}</h4>
                                  <div className="img-small">
                                    <img src={product.imageUrl} />
                                  </div>

                                  <p> Descrption: {product.description}</p>
                                  <h3>Item Cost: {product.price}</h3>
                                  <h6>Rating: {product.rating}</h6>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    orders: state.orders,
    userId: state.user.id
  };
};

const mapToDispatch = dispatch => ({
  getAllOrders: userId => dispatch(fetchUserOrders(userId))
});
export default connect(
  mapStateToProps,
  mapToDispatch
)(OrderHistory);
