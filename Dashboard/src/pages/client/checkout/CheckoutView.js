import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { createNewOrder } from 'services/users/order/Order.service';
import { UserContext } from 'context/user';
import toast, { Toaster } from 'react-hot-toast';

function CheckoutView() {
    const { user, address, cart } = useContext(UserContext);
    const [editedFullname, setEditedFullname] = useState(user ? user.fullName : "");
    const [editedCountry, setEditedCountry] = useState(address ? address.country : "");
    const [editedCity, setEditedCity] = useState(address ? address.city : "");
    const [editedStreet, setEditedStreet] = useState(address ? address.street : "");
    const [editedPostalCode, setEditedPostalCode] = useState(address ? address.postalCode : "");
    const [editedPhone, setEditedPhone] = useState(user ? user.phone : "");
    const [editedEmail, setEditedEmail] = useState(user ? user.email : "");
    const [editedNotes, setEditedNotes] = useState(address ? address.notes : "");

    useEffect(() => {
        setEditedFullname(user ? user.fullName : "");
        setEditedCountry(address ? address.country : "");
        setEditedCity(address ? address.city : "");
        setEditedStreet(address ? address.street : "");
        setEditedPostalCode(address ? address.postalCode : "");
        setEditedPhone(user ? user.phone : "");
        setEditedEmail(user ? user.email : "");
        setEditedNotes(address ? address.notes : "");
    }, [user, address, cart]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "fullname":
                setEditedFullname(value);
                break;
            case "country":
                setEditedCountry(value);
                break;
            case "city":
                setEditedCity(value);
                break;
            case "streetAddress":
                setEditedStreet(value);
                break;
            case "postalCode":
                setEditedPostalCode(value);
                break;
            case "phone":
                setEditedPhone(value);
                break;
            case "email":
                setEditedEmail(value);
                break;
            case "notes":
                setEditedNotes(value);
                break;
            default:
                break;
        }
    };

    const handleCreateOrder = async () => {
        const data = {
            userId: user ? user.id : 0,
            fullName: editedFullname,
            country: editedCountry,
            city: editedCity,
            address: editedStreet,
            postalCode: editedPostalCode,
            phone: editedPhone,
            email: editedEmail,
            notes: editedNotes
        };

        const response = await createNewOrder(data);
        if(response === undefined) return;
        if (response.httpStatus === "CREATED") {
            toast.success(response.message);
        } else if (response.httpStatus !== "CREATED"){
            toast.error(response.message);
        }
    };


    return (
        <section className="fp__cart_view mt_125 xs_mt_95 mb_100 xs_mb_70">
            <Container>
                <Row>
                    <Col lg="8" className="wow fadeInUp" data-wow-duration="1s">
                        <div className="fp__checkout_form">
                            <div className="fp__check_form">
                                <Row>
                                    <Col xs="12">
                                        <h5>billing address</h5>
                                    </Col>
                                    <Col md="12" lg="12" xl="12">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="fullname"
                                                placeholder="Full Name"
                                                value={editedFullname}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12" lg="12" xl="12">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="country"
                                                placeholder="Country"
                                                value={editedCountry}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" lg="12" xl="6">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="city"
                                                placeholder=" City *"
                                                value={editedCity}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" lg="12" xl="6">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="streetAddress"
                                                placeholder="Street Address *"
                                                value={editedStreet}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" lg="12" xl="6">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="postalCode"
                                                placeholder="Postal Code *"
                                                value={editedPostalCode}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" lg="12" xl="6">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="text"
                                                name="phone"
                                                placeholder="Phone *"
                                                value={editedPhone}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" lg="12" xl="6">
                                        <div className="fp__check_single_form">
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Email *"
                                                value={editedEmail}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12" lg="12" xl="12">
                                        <div className="fp__check_single_form">
                                            <h5>Additional Notes</h5>
                                            <textarea
                                                cols="3"
                                                rows="4"
                                                name="notes"
                                                placeholder="Notes about your order, e.g. special notes for delivery"
                                                value={editedNotes}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>

                    <Col lg="4" className="wow fadeInUp" data-wow-duration="1s">
                        <Row id="sticky_sidebar" className="fp__cart_list_footer_button">
                            <h6>total cart</h6>
                            <p>subtotal: <span>{cart && cart.totalPrice ? cart.totalPrice.toLocaleString() : ""} VNĐ</span></p>
                            <p>VAT(10%): <span>{cart && cart.totalPrice ? (cart.totalPrice * 0.1).toLocaleString() : ""} VNĐ</span></p>
                            <p className="total"><span>total:</span> <span>{cart && cart.totalPrice ? (cart.totalPrice + (cart.totalPrice * 0.1)).toLocaleString() : ""} VNĐ</span></p>
                            <form></form>
                            <a className="common_btn" onClick={handleCreateOrder}>PLACE ORDER</a>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default CheckoutView;
