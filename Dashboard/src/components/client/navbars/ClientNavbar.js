import React, { useEffect, useState, useContext } from 'react';
import logoImg from "../../../assets/img/logo.png";
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler, InputGroup, InputGroupAddon, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa';
import { getProducts } from 'services/admin/products/product.service';
import { useUserContext } from 'context/user';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientNavbar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState('');
  const { user, cart } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
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

  useEffect(() => {
    setSearchProduct(searchResults.length);
    setDropdownOpen(searchResults.length > 0);
  }, [searchResults]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('search-results') && !event.target.classList.contains('search-result') && !event.target.classList.contains('image-product') && !event.target.classList.contains('search-container') && !event.target.classList.contains('input-group') && !event.target.classList.contains('input-group-append') && !event.target.classList.contains('input-group-text') && !event.target.classList.contains('form-control') && !event.target.classList.contains('search-icon') && !event.target.classList.contains('search-results')) {
      setSearchResults([]);
      setIsOpen(false);
    }
  };


  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const results = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);
    setSearchResults(results);
  };

  const handleClickProduct = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsOpen(false);
    window.scrollTo(0, 400);
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

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
            <NavItem className="nav-item" >
              <InputGroup>
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText><FaSearch /></InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {dropdownOpen && (
                <div className="search-container">
                  <div className="search-results">
                    {searchResults.map((product, index) => (
                      <div key={index} className="search-result" name='searchBar'>
                        <Link className="search-result" onClick={handleClickProduct} to={`/products/details/${product.slug}`}>
                          <img className='image-product' src={product.image} /> {truncateString(product.name, 10)}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </NavItem>

            <NavItem className="nav-item">
              <NavLink tag={Link} to="/cart" className="cart_icon" style={{ marginLeft: '24px' }}>
                <FaShoppingBasket />
                <span style={{ marginLeft: '4px', marginTop: '32px' }}>{totalItems}</span>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink>
                {/* <div class="avatar avatar-xl position-relative"
                  style= {{maxWidth: '40px', maxHeight: '40px', minWidth: '40px !important'  }}>
                  <img src={currentUser ? currentUser.image : ''} alt="Product Image"
                    class="img-fluid" />
                </div> */}
                <FaUser /> {currentUser ? currentUser.fullName : ''}
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default ClientNavbar;