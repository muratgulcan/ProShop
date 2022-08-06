import axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPIING_ADDRESS} from '../constants/cartConstants'
import { toast } from 'react-toastify';


export const addToCart = (id,qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type:CART_ADD_ITEM,
        payload: {
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch,getState) => {
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
} 

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPIING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
    toast.success('Shipping address saved.', {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
} 
