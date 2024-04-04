import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import UserHeader from "components/dashboard/Headers/UserHeader.js";
import { useAuth } from "context/auth";
import { updateUser } from "services/user";
import { BASE_API } from "constant/network";
import avtImg from "../../../assets/img/theme/avt.jpg";

const Profile = () => {
  const [currenUser, setCurrenUser] = useState(null);
  const { getUserByAccessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedStreet, setEditedStreet] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedAbout, setEditedAbout] = useState("");
  const [avatarBase64, setAvatarBase64] = useState(currenUser?.avatarBase64 || '');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByAccessToken();
      setCurrenUser(user);
      console.log("User:", user);
    };
    fetchUser();
  }, []);

  const handleEditUser = (currenUser) => {
    setEditingUser(currenUser);
    setEditedName(currenUser.fullName);
    setEditedEmail(currenUser.email);
    setEditedPhone(currenUser.phone);
    setEditedPassword(currenUser.password);
    setEditedStreet(currenUser.address.street);
    setEditedCity(currenUser.address.city);
    setEditedCountry(currenUser.address.country);
    setEditedPostalCode(currenUser.address.postalCode);
    setEditedAbout(currenUser.about);
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
      case "phone":
        setEditedPhone(value);
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
    const formData = {
        fullName: editedName,
        email: editedEmail,
        password: editedPassword,
        phone: editedPhone,
        address: {
            street: editedStreet,
            city: editedCity,
            country: editedCountry,
            postalCode: editedPostalCode
        },
        about: editedAbout,
    };

    updateUser(editingUser, formData, setIsModalOpen, setEditingUser);
};
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        setEditingUser(currenUser);
        const updatedUser = { ...currenUser, avatarUrl: base64String };
        await axios.put(`${BASE_API}/users/${currenUser.id}`, updatedUser);
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
                        src={avatarBase64 || (currenUser?.avatarUrl ?? avtImg)}
                      />
                    </label>
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
                    {currenUser?.fullName || "Update information about you"}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {currenUser?.address.street || ""}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {currenUser?.address.city || "Update information about you"} - {currenUser?.address.country || ""}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />

                  </div>
                  <hr className="my-4" />
                  <p>
                    {currenUser?.about || "Update information about you"}
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
                      onClick={() => handleEditUser(currenUser)}
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
                            defaultValue={currenUser?.fullName || ""}
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
                            defaultValue={currenUser?.email || ""}
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
                            defaultValue={currenUser ? currenUser.fullName.split(' ')[0] : ""}
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
                            defaultValue={currenUser ? currenUser.fullName.split(' ').slice(1).join(' ') : ""}
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
                            defaultValue={currenUser?.address.street || ""}
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
                            defaultValue={currenUser?.address.city || ""}
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
                            defaultValue={currenUser?.address.country || ""}
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
                            defaultValue={currenUser?.address.postalCode || ""}
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
                        defaultValue={currenUser?.about || ""}
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
                <Input type="text" name="name" id="name" value={editedName || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={editedEmail || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input type="phone" name="phone" id="phone" value={editedPhone || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="street">Street</Label>
                <Input type="text" name="street" id="street" value={editedStreet || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input type="text" name="city" id="city" value={editedCity || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country</Label>
                <Input type="text" name="country" id="country" value={editedCountry || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="postal_code">Postal Code</Label>
                <Input type="text" name="postalCode" id="postalCode" value={editedPostalCode || ""} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="about">About Me</Label>
                <Input type="textarea" name="about" id="about" value={editedAbout || ""} onChange={handleChange} />
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
