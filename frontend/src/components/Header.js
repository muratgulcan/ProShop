import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  const takeToProfile = () => {
    navigate('/profile')
  }
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                  <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox/>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="username">
                        <NavDropdown.Item onClick={takeToProfile}>
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i> Sign In</Nav.Link>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title='Admin' id="adminmenu">
                        <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>
                            Users
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>
                            Products
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>
                            Orders
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header