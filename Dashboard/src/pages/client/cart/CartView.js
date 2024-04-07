import React, { useContext, useState, useEffect } from 'react';
import { Table, Input, Button, Container, Row, Col } from 'reactstrap';
import { UserContext } from 'context/user';
import { addCartItem, removeCartItem } from 'services/users/cart/userCart.service';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CartView = () => {
    const { cartItems, user, getUserByAccessToken, cart } = useContext(UserContext);
    const [quantities, setQuantities] = useState({});

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const updatedCartData = {
                userId: user.id,
                productId: productId,
                quantity: newQuantity
            };
            const response = await addCartItem(updatedCartData);
            if (response.httpStatus !== "OK") {
                toast.error(response.message, { duration: 2000 }, { position: 'top-right' });
                getUserByAccessToken();
            } else if (response.httpStatus === "OK") {
                toast.success("Item has been update successfully!", { duration: 2000 }, { position: 'top-right' });
                getUserByAccessToken();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemoveProduct = async (productId) => {
        const confirmRemove = window.confirm('Are you sure you want to remove this item?');
        if (confirmRemove) {
            try {
                const response = await removeCartItem(productId);
                if (response.httpStatus === "OK") {
                    toast.success(response.message, { duration: 2000 }, { position: 'top-right' });
                    getUserByAccessToken();
                } else {
                    toast.error(response.message, { duration: 2000 }, { position: 'top-right' });
                }
            } catch (error) {
                console.error('Error removing item:', error);
            }
        }
    };

    const formatCurrency = (amount) => {
        const parts = amount.toString().split('.');
        let integerPart = parts[0];
        const decimalPart = parts[1] || '';

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return integerPart + (decimalPart ? ',' + decimalPart : '');
    };

    return (
        <Container className="my-8">
            <Row className="mb-4">
                <Col lg="12" className="wow fadeInUp mb-5" data-wow-duration="1s">
                    <div className="fp__cart_list">
                        <div className="table-responsive" style={{ maxHeight: '800px', overflowY: 'auto' }}>
                            <Table >
                                <tbody>
                                    <tr>
                                        <th className="fp__pro_img">Image</th>
                                        <th className="fp__pro_name">Details</th>
                                        <th className="fp__pro_status">Price</th>
                                        <th className="fp__pro_select">Quantity</th>
                                        <th className="fp__pro_tk">Total (VND)</th>
                                        <th className="fp__pro_icon">
                                            <a className="clear_all">Action</a>
                                        </th>
                                    </tr>
                                    {cartItems.map((item, index) => {
                                        const currentQuantity = item.quantity || 1;
                                        return (
                                            <tr key={index}>
                                                <td className="fp__pro_img">
                                                    <img src={item.productId.image} alt="product" className="img-fluid w-100" />
                                                </td>
                                                <td className="fp__pro_name">
                                                    <Link to={`/products/details/${item.productId.slug}`}>{item.productId.name}</Link>
                                                </td>
                                                <td className="fp__pro_status">
                                                    <h6>${item.productId.price}</h6>
                                                </td>
                                                <td className="fp__pro_select">
                                                    <div class="quentity_btn">
                                                        <Button color="primary" onClick={() => updateQuantity(item.productId.id, currentQuantity > 1 ? -1 : 1)}><i className="fas fa-minus"></i></Button>
                                                        <Input
                                                            type="text"
                                                            value={currentQuantity}
                                                            readOnly
                                                            placeholder="Enter quantity"
                                                            style={{ width: '70px', textAlign: 'center' }}
                                                        />
                                                        <Button color="success" onClick={() => updateQuantity(item.productId.id, 1)}><i className="far fa-plus"></i></Button>
                                                    </div>
                                                </td>
                                                <td className="fp__pro_tk">
                                                    <h6>{formatCurrency(item.productId.price * currentQuantity)}</h6>
                                                </td>
                                                <td className="fp__pro_icon">
                                                    <span className="clear_all">
                                                        <i className="fas fa-trash d-flex justify-content-center removeIcon" onClick={() => handleRemoveProduct(item.id)}></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
                <Col lg="12" className="wow fadeInUp d-flex justify-content-end" data-wow-duration="1s" style={{ width: '100%' }}>
                    <div className="fp__cart_list_footer_button flex-column" style={{ width: '30%' }}>
                        <h6>Total Cart</h6>
                        <p>Subtotal: <span>{cart.totalPrice ? formatCurrency(cart.totalPrice) : ""}</span></p>
                        {cart.totalPrice ? (
                            <>
                                <p>VAT: <span>{formatCurrency(cart.totalPrice - (cart.totalPrice * 0.9))}</span></p>
                                <p className="total"><span>Total:</span> <span>{formatCurrency(cart.totalPrice + (cart.totalPrice * 0.1))} VNĐ</span></p>
                            </>
                        ) : null}
                        <form>
                            <Input type="text" placeholder="Coupon Code" />
                            <Button type="submit">Apply</Button>
                        </form>
                        <a className="common_btn" href="#">Checkout</a>
                    </div>
                </Col>

            </Row>
        </Container>

    );
}

export default CartView;
