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


const AdminNavbar = ({ brandText }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);

  useEffect(() => {
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

    if (!isAuthenticatedChecked || !currentUser) {
      getUser();
    }
  }, [isAuthenticatedChecked, getUserByAccessToken, currentUser]);

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
                      src={ avtImg}

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
