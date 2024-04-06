import React from 'react';
import { Table, Input, Button } from 'reactstrap';

const CartView = () => {
    return (
        <section className="fp__cart_view mt_125 xs_mt_95 mb_100 xs_mb_70">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 wow fadeInUp" data-wow-duration="1s">
                        <div className="fp__cart_list">
                            <div className="table-responsive">
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th className="fp__pro_img">
                                                Image
                                            </th>

                                            <th className="fp__pro_name">
                                                details
                                            </th>

                                            <th className="fp__pro_status">
                                                price
                                            </th>

                                            <th className="fp__pro_select">
                                                quantity
                                            </th>

                                            <th className="fp__pro_tk">
                                                total
                                            </th>

                                            <th className="fp__pro_icon">
                                                <a className="clear_all" href="#">clear all</a>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td className="fp__pro_img"><img src="images/menu1.png" alt="product"
                                                    className="img-fluid w-100" />
                                            </td>

                                            <td className="fp__pro_name">
                                                <a href="#">Hyderabadi Biryani</a>
                                                <span>medium</span>
                                                <p>coca-cola</p>
                                                <p>7up</p>
                                            </td>

                                            <td className="fp__pro_status">
                                                <h6>$180.00</h6>
                                            </td>

                                            <td className="fp__pro_select">
                                                <div className="quentity_btn">
                                                    <Button color="danger"><i className="fal fa-minus"></i></Button>
                                                    <Input type="text" placeholder="1" />
                                                    <Button color="success"><i className="fal fa-plus"></i></Button>
                                                </div>
                                            </td>

                                            <td className="fp__pro_tk">
                                                <h6>$180,00</h6>
                                            </td>

                                            <td className="fp__pro_icon">
                                                <a href="#"><i className="far fa-times"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 wow fadeInUp" data-wow-duration="1s">
                        <div className="fp__cart_list_footer_button">
                            <h6>total cart</h6>
                            <p>subtotal: <span>$124.00</span></p>
                            <p>delivery: <span>$00.00</span></p>
                            <p>discount: <span>$10.00</span></p>
                            <p className="total"><span>total:</span> <span>$134.00</span></p>
                            <form>
                                <Input type="text" placeholder="Coupon Code" />
                                <Button type="submit">apply</Button>
                            </form>
                            <a className="common_btn" href=" #">checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CartView;
