import React,{useEffect} from 'react'
import {Button,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions'
import Swal from 'sweetalert2'


const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector((state) => state.orderList)
    const {loading,error,orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo || userInfo.isAdmin !== true){
            navigate('/')
        }else{
            dispatch(listOrders())
        }
    },[dispatch,navigate,userInfo])

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Do you want remove the order?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
            }
          })
    }

  return (
    <>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (order.paidAt.substring(0,10)) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (order.deliveredAt.substring(0,10)) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Details</Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' ><i className='fas fa-trash'></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default OrderListScreen