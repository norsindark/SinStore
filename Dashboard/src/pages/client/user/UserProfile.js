import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaAddressCard, FaShoppingBag, FaLock, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { useUserContext } from 'context/user';
import avtImg from 'assets/img/avt.jpg';
import { Pagination } from 'react-bootstrap';
import { updateUserProfile } from 'services/users/profile/userProfile.service';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { changePassword } from "services/user";

const UserProfile = () => {
    const { user, cart, orders, getUserByAccessToken } = useUserContext();
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'info');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(6);
    const [showOrder, setShowOrder] = useState(true);
    const [showInvoice, setShowInvoice] = useState(false);
    const [showPagination, setShowPagination] = useState(true);
    const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);

    const [editingUser, setEditingUser] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [editedConfirmPassword, setEditedConfirmPassword] = useState("");
    const [editedStreet, setEditedStreet] = useState("");
    const [editedCity, setEditedCity] = useState("");
    const [editedCountry, setEditedCountry] = useState("");
    const [editedPostalCode, setEditedPostalCode] = useState("");
    const [editedAbout, setEditedAbout] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
    }, [user, cart]);


    const handleEditUser = (currentUser) => {
        setEditingUser(currentUser);
        setEditedName(currentUser.fullName);
        setEditedEmail(currentUser.email);
        setEditedPhone(currentUser.phone);
        setEditedStreet(currentUser.address.street);
        setEditedCity(currentUser.address.city);
        setEditedCountry(currentUser.address.country);
        setEditedPostalCode(currentUser.address.postalCode);
        setEditedAbout(currentUser.about);
        setIsModalOpen(true);
    };

    const handleSaveEdit = async () => {
        const data = {
            fullName: editedName,
            email: editedEmail,
            phone: editedPhone,
            address: {
                street: editedStreet,
                city: editedCity,
                country: editedCountry,
                postalCode: editedPostalCode
            },
            about: editedAbout
        };
        const response = await updateUserProfile(editingUser.id, data);
        if (response.status === 200) {
            toast.success('Update profile successfully');
            getUserByAccessToken();
        } else {
            toast.error('Update profile failed');
        };
        setIsModalOpen(false);
    };

    const handleEditPassword = (currentUser) => {
        setEditingUser(currentUser);
        setIsModalPasswordOpen(true);
    };

    const handleChangePassword = async () => {
        if (editedPassword !== editedConfirmPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }
        setEditingUser(currentUser);
        const formData = {
            password: editedPassword,
        };
        changePassword(editingUser, formData, setIsModalOpen, setEditingUser);
    };

    const handleCancelEditPassword = () => {
        setEditingUser(null);
        setIsModalPasswordOpen(false);
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
            case "confirmPassword":
                setEditedConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleTabClick = (tabName) => {
        localStorage.setItem('activeTab', tabName);
        setActiveTab(tabName);
    };

    const handleViewInvoice = (order) => {
        setSelectedOrder(order);
        setShowOrder(false);
        setShowInvoice(true);
        setShowPagination(false);
    };

    const handleGoBack = () => {
        setSelectedOrder(null);
        setShowOrder(true);
        setShowInvoice(false);
        setShowPagination(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'COMPLETED').length;
    const canceledOrders = orders.filter(order => order.status === 'CANCELED').length;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (

        <Container className="fp__dashboard mt_120 xs_mt_90 mb_100 xs_mb_70">
            <Row>

                {/* tab menu  */}
                <Col xl={3} lg={4} wow="fadeInUp" data-wow-duration="1s">
                    <div className="fp__dashboard_menu">
                        <div className="dasboard_header">
                            <div className="dasboard_header_img">
                                <img src={avtImg} alt="user" className="img-fluid w-100" />
                                <Label htmlFor="upload">
                                    <FaCamera />
                                </Label>
                                <input type="file" id="upload" hidden />
                            </div>
                            <h2>{currentUser && currentUser.fullName ? currentUser.fullName : ""}</h2>


                        </div>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <Button className={`nav-link ${activeTab === 'info' ? 'active' : ''}`} onClick={() => handleTabClick('info')}>
                                <span><FaUser /></span> Info
                            </Button>
                            <Button className={`nav-link ${activeTab === 'address' ? 'active' : ''}`} onClick={() => handleTabClick('address')}>
                                <span><FaAddressCard /></span> Address
                            </Button>
                            <Button className={`nav-link ${activeTab === 'order' ? 'active' : ''}`} onClick={() => handleTabClick('order')}>
                                <span><FaShoppingBag /></span> Order
                            </Button>
                            <Button className={`nav-link ${activeTab === 'password' ? 'active' : ''}`} onClick={() => handleTabClick('password')}>
                                <span><FaLock /></span> Change Password
                            </Button>
                            <Button className="nav-link" type="button">
                                <span><FaSignOutAlt /></span> Logout
                            </Button>
                        </div>
                    </div>
                </Col>

                {/* content */}
                <Col xl={9} lg={8}>
                    <div className="fp__dashboard_content">
                        <div className="fp__dsahboard_overview">

                            {/* info */}
                            {activeTab === 'info' && (
                                <div className="fp__dsahboard_overview">
                                    <div className="fp_dashboard_body">
                                        <h3>Welcome to your Profile</h3>
                                        <div className="fp__dsahboard_overview">
                                            <Row>
                                                <Col xl={4} sm={6} md={4}>
                                                    <div className="fp__dsahboard_overview_item">
                                                        <h4>Total order <span>({totalOrders})</span></h4>
                                                    </div>
                                                </Col>
                                                <Col xl={4} sm={6} md={4}>
                                                    <div className="fp__dsahboard_overview_item green">
                                                        <h4>Completed <span>({completedOrders})</span></h4>
                                                    </div>
                                                </Col>
                                                <Col xl={4} sm={6} md={4}>
                                                    <div className="fp__dsahboard_overview_item red">
                                                        <h4>Cancel <span>({canceledOrders})</span></h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="fp_dash_personal_info">
                                            <h4>Parsonal Information
                                                <Link className="dash_info_btn">
                                                    <span className="edit" onClick={() => handleEditUser(currentUser)}>edit</span>
                                                </Link>
                                            </h4>

                                            <div className="personal_info_text">
                                                <p><span>Name:</span>{currentUser && currentUser.fullName ? currentUser.fullName : ""}</p>
                                                <p><span>Email:</span>{currentUser && currentUser.email ? currentUser.email : ""}</p>
                                                <p><span>Phone:</span>{currentUser && currentUser.phone ? currentUser.phone : ""}</p>
                                                <p><span>Address:</span> {currentUser && currentUser.address && currentUser.address.street ? currentUser.address.street : ""} </p>
                                            </div>


                                            <div className="fp_dash_personal_info_edit comment_input p-0">
                                                <form>
                                                    <Row>
                                                        <Col>
                                                            <div className="fp__comment_imput_single">
                                                                <Label>name</Label>
                                                                <input type="text" placeholder="Name" />
                                                            </div>
                                                        </Col>
                                                        <Col xl={6} lg={6}>
                                                            <div className="fp__comment_imput_single">
                                                                <Label>email</Label>
                                                                <input type="email" placeholder="Email" />
                                                            </div>
                                                        </Col>
                                                        <Col xl={6} lg={6}>
                                                            <div className="fp__comment_imput_single">
                                                                <Label>phone</Label>
                                                                <input type="text" placeholder="Phone" />
                                                            </div>
                                                        </Col>
                                                        <Col xl={12}>
                                                            <div className="fp__comment_imput_single">
                                                                <Label>address</Label>
                                                                <textarea rows="4" placeholder="Address"></textarea>
                                                            </div>
                                                            <Button type="submit" className="common_btn">submit</Button>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )}

                            {/* address */}
                            {activeTab === 'address' && (
                                <div className="fp_dashboard_address">
                                    <h3>Address</h3>
                                    <div className="fp__dsahboard_overview_item">
                                        <div className="fp_dashboard_existing_address">
                                            <Row>
                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="text" readOnly placeholder="Country Name" value={user && user.address.country && user.address.country ? user.address.country : ""} />
                                                    </div>
                                                </Col>
                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="text" readOnly placeholder="Street Address *" value={user && user.address && user.address.street ? user.address.street : ""} />
                                                    </div>
                                                </Col>
                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="text" readOnly placeholder="Town / City *" value={user && user.address && user.address.city ? user.address.city : ""} />
                                                    </div>
                                                </Col>

                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="text" readOnly placeholder="Zip *" value={user && user.address && user.address.postalCode ? user.address.postalCode : ""} />
                                                    </div>
                                                </Col>
                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="text" readOnly placeholder="Phone *" value={user && user.phone && user.phone ? user.phone : ""} />
                                                    </div>
                                                </Col>
                                                <Col md={6} lg={12} xl={6}>
                                                    <div className="fp__check_single_form">
                                                        <input type="email" readOnly placeholder="Email *" value={user && user.email && user.email ? user.email : ""} />
                                                    </div>
                                                </Col>
                                                <Col md={12} lg={12} xl={12}>
                                                    <div className="fp__check_single_form">
                                                        <textarea cols="3" rows="4" placeholder="About Me" value={user && user.about && user.about ? user.about : ""} ></textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* order */}
                    {activeTab === 'order' && (
                        <div className="fp_dashboard_body">
                            <h3>order list</h3>

                            {/* order list */}
                            {showOrder && !showInvoice && (
                                <div className="fp_dashboard_order">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr className="t_header">
                                                    <th>Order</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                                {currentOrders.map((order, index) => (
                                                    <tr key={order.id}>
                                                        <td>
                                                            <h5>#{indexOfFirstOrder + index + 1}</h5>
                                                        </td>
                                                        <td>
                                                            <p>{moment(order.createdAt).format('DD/MM/YYYY')}</p>
                                                        </td>
                                                        <td>
                                                            <span style={{
                                                                backgroundColor:
                                                                    order.status === 'PENDING' ? 'green' :
                                                                        order.status === 'PAID' ? '#1aacc9' :
                                                                            order.status === 'PAY FAILED' ? 'red' : '',
                                                                color: 'white',
                                                            }} className={order.status === 'completed' ? 'complete' : ''}>
                                                                {order.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <h5>{order.totalPrice.toLocaleString('vi-VN')} VNĐ</h5>
                                                        </td>
                                                        <td>
                                                            <Link className="view_invoice" onClick={() => handleViewInvoice(order)}>View Details</Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {showPagination && (
                                <Row className="mb-4">
                                    <Col xs={12}>
                                        <nav aria-label="...">
                                            <Pagination className="d-flex flex-wrap justify-content-center">
                                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                                {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => index + 1).map(number => (
                                                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                                                        {number}
                                                    </Pagination.Item>
                                                ))}
                                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)} />
                                            </Pagination>
                                        </nav>
                                    </Col>
                                </Row>
                            )}

                            {/* order details */}
                            {showInvoice && selectedOrder && (
                                <div className="fp__invoice">
                                    <Link className="go_back" onClick={handleGoBack}><i className="fas fa-long-arrow-alt-left"></i> go back</Link>
                                    <div className="fp__invoice_header">
                                        <div className="header_address">
                                            <h4>Invoice To</h4>
                                            <p>{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.country}, {selectedOrder.postalCode}</p>
                                            <p>{selectedOrder.phone}</p>
                                            <p>{selectedOrder.email}</p>
                                        </div>
                                        <div className="header_address">
                                            <p><b>Invoice No:</b> <span>{selectedOrder.id}</span></p>
                                            <p><b>Date:</b> <span>{moment(selectedOrder.createdAt).format('DD/MM/YYYY')}</span></p>
                                        </div>
                                    </div>
                                    <div className="fp__invoice_body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr className="border_none">
                                                        <th className="sl_no">SL</th>
                                                        <th className="package">Item Description</th>
                                                        <th className="price">Price</th>
                                                        <th className="qnty">Quantity</th>
                                                        <th className="total">Total</th>
                                                    </tr>
                                                    {selectedOrder.orderItems.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td className="sl_no">{index + 1}</td>
                                                            <td className="package">
                                                                <p>{item.productId.name.substring(0, 20)}</p>
                                                                <span>{item.productId.description.split(' ').slice(0, 5).join(' ')}</span>
                                                            </td>
                                                            <td className="price">{item.productId.price.toLocaleString('vi-VN')} VNĐ</td>
                                                            <td className="qnty">{item.quantity}</td>
                                                            <td className="total">{(item.quantity * item.productId.price).toLocaleString('vi-VN')} VNĐ</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="package" colSpan="3">
                                                            <b>VAT(10%)</b>
                                                        </td>
                                                        <td className="qnty"></td>
                                                        <td className="total">{(selectedOrder.totalPrice * 0.1).toLocaleString('vi-VN')} VNĐ</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="package" colSpan="3">
                                                            <b>Sub Total</b>
                                                        </td>
                                                        <td className="qnty"></td>
                                                        <td className="total">{selectedOrder.totalPrice.toLocaleString('vi-VN')} VNĐ</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* change password */}
                    <div className="fp_dashboard_body fp__change_password">
                        {activeTab === 'password' && (
                            <div className="fp__review_input">

                                <div className="comment_input pt-0">
                                    <Row>
                                        <Button
                                            color="info"
                                            onClick={() => handleEditPassword(currentUser)}
                                        >
                                            Change Password
                                        </Button>
                                    </Row>
                                </div>
                            </div>
                        )}
                    </div>

                </Col>
            </Row>

            {/* Modal Edit*/}
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

            {/* Modal changePassword */}
            <Modal isOpen={isModalPasswordOpen} toggle={handleCancelEditPassword} backdrop="static">
                <ModalHeader toggle={handleCancelEditPassword}>Change Password</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="newPassword">New Password</Label>
                            <div className="input-group">
                                <Input type={showPassword ? "text" : "password"} name="password" id="password" value={editedPassword || ""} onChange={handleChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmNewPassword">Confirm New Password</Label>
                            <div className="input-group">
                                <Input type={showPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={editedConfirmPassword || ""} onChange={handleChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleChangePassword}>Change Password</Button>{' '}
                    <Button color="secondary" onClick={handleCancelEditPassword}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container >
    );
}

export default UserProfile;