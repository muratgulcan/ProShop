import React,{useState} from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
 
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
 
  return ComponentWithRouterProp;
}
 
const SearchBox = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline="true" className='d-flex'>
            <Form.Control type="search" name="q" onChange={(e) => setKeyword(e.target.value)} placeholder="Search products" className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type="submit" variant="outline-success" className='p-2'>Search</Button>
        </Form>
    )
}
 
export default withRouter(SearchBox);