import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import UserHeader from "components/dashboard/Headers/UserHeader.js";
import { useAuth } from "context/auth";
import { updateUser } from "services/user";
import { BASE_API } from "constant/network";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedAbout, setEditedAbout] = useState("");
  const [avatarBase64, setAvatarBase64] = useState(userData?.avatarBase64 || '');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByAccessToken();
        const response = await axios.get(`http://localhost:3001/users?email=${user.email}`);
        const { data } = response;
        if (data && data.length > 0) {
          setUserData(data[0]);
        } else {
          console.error("User not found in database");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [getUserByAccessToken]);


  const handleEditUser = (userData) => {
    setEditingUser(userData);
    setEditedName(userData.name);
    setEditedEmail(userData.email);
    setEditedRole(userData.role);
    setEditedStatus(userData.status);
    setEditedPassword(userData.password);
    setEditedStreet(userData.address.street);
    setEditedCity(userData.address.city);
    setEditedCountry(userData.address.country);
    setEditedPostalCode(userData.address.postal_code);
    setEditedAbout(userData.about);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      case "street":
        setEditedStreet(value);
        break;
      case "city":
        setEditedCity(value);
        break;
      case "country":
        setEditedCountry(value);
        break;
      case "postalCode":
        setEditedPostalCode(value);
        break;
      case "about":
        setEditedAbout(value);
        break;
      case "password":
        setEditedPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSaveEdit = async () => {
    updateUser(editingUser, editedName, editedEmail, editedRole, editedStatus, editedPassword, editedStreet, editedCity, editedCountry, editedPostalCode, editedAbout, setIsModalOpen, setEditingUser);
  };

  const refreshUserData = async () => {
    try {
      const userEmail = await getUserByAccessToken();
      const response = await axios.get(`http://localhost:3001/users?email=${userEmail.email}`);
      const { data } = response;
      if (data && data.length > 0) {
        setUserData(data[0]);
      } else {
        console.error("User not found in database");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        setEditingUser(userData);
        const updatedUser = { ...userData, avatarUrl: base64String };
        await axios.put(`${BASE_API}/users/${userData.id}`, updatedUser);
        console.log("Avatar updated successfully!");
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        {/* Profile card */}
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={avatarBase64 || (userData?.avatarUrl || "")}
                      />
                    </label>
                    {/* Input để chọn file */}
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {userData?.name || "Update information about you"}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {userData?.address.street || ""}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userData?.address.city || "Update information about you"} - {userData?.address.country || ""}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />

                  </div>
                  <hr className="my-4" />
                  <p>
                    {userData?.about || "Update information about you"}
                  </p>
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              {/* Card content */}
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={() => handleEditUser(userData)}
                    >
                      Edit profile
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {/* User information */}
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.name || ""}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.email || ""}
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData ? userData.name.split(' ')[0] : ""}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData ? userData.name.split(' ').slice(1).join(' ') : ""}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.address.street || ""}
                            id="input-address"
                            placeholder="Address"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.address.city || ""}
                            id="input-city"
                            placeholder="City"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.address.country || ""}
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-postal-code"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userData?.address.postal_code || ""}
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* About Me */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue={userData?.about || ""}
                        type="textarea"
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Modal */}
        {/* Modal */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit} backdrop="static">
          <ModalHeader toggle={handleCancelEdit}>Edit My Profile</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" value={editedName} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={editedEmail} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="street">Street</Label>
                <Input type="text" name="street" id="street" value={editedStreet} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" id="city" value={editedCity} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input type="text" name="country" id="country" value={editedCountry} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="postal_code">Postal Code</Label>
                <Input type="text" name="postalCode" id="postalCode" value={editedPostalCode} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="about">About Me</Label>
                <Input type="textarea" name="about" id="about" value={editedAbout} onChange={handleChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>


      </Container>
    </>
  );
};

export default Profile;
