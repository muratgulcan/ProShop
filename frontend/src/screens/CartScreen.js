import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link, useNavigate, useParams,useLocation} from 'react-router-dom'
import Message from '../components/Message';
import {Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import {addToCart,removeFromCart} from '../actions/cartActions'


const CartScreen = ({history}) => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate(`/login/?redirect=/shipping`)
  }

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])
  return (
    <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x+1} value={x+1}>{x + 1}</option>
                        ))}
                    </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc,item) => parseInt(acc)+parseInt(item.qty),0 )}) items</h2>
                ${cartItems.reduce((acc,item) => parseInt(acc)+parseInt(item.qty)*parseInt(item.price),0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>Proceed to checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    </Row>
  )
}

export default CartScreen