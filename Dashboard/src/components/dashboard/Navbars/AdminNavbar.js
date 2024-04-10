import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "context/auth.js";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  Nav,
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";
import avtImg from "../../../assets/img/theme/avt.jpg";
import toast, { Toaster } from "react-hot-toast";
import { getProducts } from "services/admin/products/product.service";

const AdminNavbar = ({ brandText }) => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);
  const [toastRendered, setToastRendered] = useState(false);

  useEffect(() => {
    if (toastRendered) {
      return;
    }

    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        checkLowStock(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const checkLowStock = (productsData) => {
      productsData.forEach(product => {
        product.productWarehouses.forEach(warehouse => {
          if (warehouse.quantityAvailable < 50) {
            toast.custom((t) => (
              <div
                className={`custom-toast ${t.visible ? 'animate-enter' : 'animate-leave'
                  } bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5 d-flex " style={{ alignItems: 'center !important' }}>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={product.image}
                        alt=""
                      />
                      <p className="mt-1 text-sm text-gray-700">
                        {product.name} LOW STOCK: {warehouse.quantityAvailable} AVAILABLE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ));
          }
        });
      });
    };

    const getUser = async () => {
      const user = await getUserByAccessToken();
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        console.log("User:", user.role.name);
      }
      setIsAuthenticatedChecked(true);
    };

    const toastRenderCount = parseInt(localStorage.getItem('toastRenderCount')) || 0;
    if (toastRenderCount < 1) {
      localStorage.setItem('toastRenderCount', (toastRenderCount + 1).toString());
      fetchProducts();
    } else {
      setToastRendered(true);
    }

    getUser();
  }, [isAuthenticatedChecked, getUserByAccessToken, currentUser, toastRendered]);


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={avtImg}

                    // src={currentUser ? currentUser.avatarUrl : avtImg}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {currentUser ? currentUser.fullName : ""}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
