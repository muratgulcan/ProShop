import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link, useNavigate, useParams,useLocation} from 'react-router-dom'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import {addToCart} from '../actions/cartActions'


const CartScreen = ({history}) => {
  const params = useParams();
  const productId = params.id
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log(cartItems);


  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])
  return (
    <div>
        cart
    </div>
  )
}

export default CartScreen