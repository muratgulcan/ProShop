import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { Row,Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Paginate from './Paginate';
import {listProducts} from '../actions/productActions'

const HomeScreen = () => {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products,page,pages} = productList
  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])

  return (
    <>
        <h1>Latest Products</h1>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
          <>
          <Meta title='Home' />
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                      <Product product={product}/> 
                  </Col>
              ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
          </>
        )}
        
        
    </>
  )
}

export default HomeScreen