import React, { useEffect, useState, useContext } from 'react';
import logoImg from "../../../assets/img/logo.png";
import { Link } from 'react-router-dom';
import { useUserContext } from 'context/user';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const ClientNavbar = () => {
  const { user, cartItems, cart, address, getUserByAccessToken } = useUserContext();
  const [totalItems, setTotalItems] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserByAccessToken();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (cart && cart.cartItems) {
      setTotalItems(cart.cartItems.length);
    } else {
      setTotalItems(0);
    }
  }, [cart]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  return (

    <Navbar light expand="md" className="navbar navbar-expand-lg main_menu" style={{ position: 'fixed', width: '100%', top: 50 }}>
      <div className="container">
        <NavbarBrand href="/" className='navbar-brand '>
          <img src={logoImg} alt="FoodPark" className="img-fluid" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="m-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/" className="nav-link" active={window.location.pathname === '/'}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about" className="nav-link" active={window.location.pathname === '/about'}>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/products" className="nav-link" active={window.location.pathname === '/products'}>Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/chefs" className="nav-link" active={window.location.pathname === '/chefs'}>Chefs</NavLink>
            </NavItem>
          </Nav>
          <Nav className="menu_icon d-flex flex-wrap" navbar>
            <NavItem className="nav-item">
              <InputGroup>
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText><FaSearch /></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink tag={Link} to="/cart" className="cart_icon" style={{ marginLeft: '24px' }}>
                <FaShoppingBasket />
                <span style={{ marginLeft: '4px', marginTop: '32px' }}>{totalItems}</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink>
                <FaUser />{currentUser ? currentUser.fullName : ''}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default ClientNavbar;