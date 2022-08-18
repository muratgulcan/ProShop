import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails,payOrder } from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
} from '../constants/orderConstants'

const OrderScreen = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const orderId = params.id

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
    if(!loading && loading === undefined){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
          }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => parseInt(acc) + parseInt(item.price) * parseInt(item.qty), 0)
        )

    }
    
    useEffect(() => {
      if (!order || successPay || order._id !== orderId) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch(getOrderDetails(orderId))
      }
    }, [dispatch, orderId, successPay, order])

    const paymentHandler = () => {
      dispatch(payOrder(orderId,{payer:{email:userInfo.email},status:'COMPLETED',update_time:Date.now(),}))
    }
  
    return loading ? <Loader/> : error ? <><Message variant='danger'>{error} </Message><Link to={'/'}><Button type='button' variant='primary'>Go back home</Button></Link></> : 
    <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong>{order.user.name}</p>
                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                <p>
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}

              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                <strong>Method: </strong>
                {order.paymentMethod}
                </p>
                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                {orderPay.loading ? <Loader/> :  <Button variant='primary' type='button' className='btn-block' onClick={paymentHandler}>Debit or Credi Cart</Button>}
               
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
    </>
  }
  
  export default OrderScreen