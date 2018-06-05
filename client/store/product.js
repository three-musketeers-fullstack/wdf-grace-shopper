import axios from 'axios'
import history from '../history'


const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';

const defaultProducts = {}

const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})