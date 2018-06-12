import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ReviewProduct = props => {
    const { products } = props.products;
    const paramId = Number(props.match.params.id);
    const product = products.length
    ? products.filter(product => {
        return product.id === paramId;
      })[0]
    : [];
}

const mapToProps = state => ({
    products: state.products
})

export default ReviewProduct;