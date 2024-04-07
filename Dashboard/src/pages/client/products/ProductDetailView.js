import React, { useState, useEffect } from 'react';
import { getProducts } from 'services/admin/products/product.service';
import { useParams } from 'react-router-dom';
import { useUserContext } from 'context/user';
import { addCartItem } from 'services/users/cart/userCart.service';
import { Container, Row, Col, Button, Input, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
    const { productSlug } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { user, getUserByAccessToken } = useUserContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
                const product = fetchedProducts.find(product => product.slug === productSlug);
                setProduct(product);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [productSlug]);

    const handleAddToCart = async (showProduct) => {
        try {
            const data = {
                userId: user.id,
                productId: showProduct.id,
                quantity: quantity
            };
            const response = await addCartItem(data);
            if (response.httpStatus === "OK") {
                toast.success(response.message, { duration: 2000 }, { position: 'top-right' });
                getUserByAccessToken()
            } else if (response.httpStatus !== "OK") {
                toast.error(response.message, { duration: 2000 }, { position: 'top-right' });
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            // Only update the quantity state if the input contains only numbers
            setQuantity(inputValue === '' ? '' : parseInt(inputValue));
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="fp__menu_details mt_115 xs_mt_85 mb_95 xs_mb_65">
            <Row id='details'>
                <Col lg="5" md="9" className="wow fadeInUp" data-wow-duration="1s">
                    <Row className="exzoom hidden" id="exzoom" style={{ height: '100%' }}>
                        <Row className="exzoom_img_box fp__menu_details_images" style={{ height: '100%' }}>
                            <Nav className='exzoom_img_ul' style={{ height: '100%' }}>
                                <NavLink style={{ height: '100%' }}>
                                    <img className="zoom img-fluid w-100 h-100" src={product.image || "images/menu1.png"} alt="product" style={{ height: '100%' }} />
                                </NavLink>
                            </Nav>
                        </Row>
                    </Row>
                </Col>

                <Col lg="7" className="wow fadeInUp" data-wow-duration="1s">
                    <div className="fp__menu_details_text">
                        <h2>{product.name || "Product Name"}</h2>
                        <h3 className="price">{product.price || ""} VNĐ </h3>
                        <p>
                            In Stocks: {product.productWarehouses.map(productWarehouse => (
                                <span key={productWarehouse.id}>{productWarehouse.quantityAvailable}</span>
                            ))}
                        </p>
                        <p className="short_description">{product.description || "Description not available"}</p>

                        <div className="details_quentity">
                            <h5>select quantity</h5>
                            <div className="quentity_btn_area d-flex flex-wrapa align-items-center">
                                <div className="quentity_btn">
                                    <Button color="primary" onClick={handleDecrease}><i className="fas fa-minus"></i></Button>
                                    <Input
                                        type="text"
                                        value={quantity}
                                        onChange={handleChange}
                                        placeholder="Enter quantity"
                                    />
                                    <Button color="success" onClick={handleIncrease}><i className="far fa-plus"></i></Button>
                                </div>
                            </div>
                        </div>

                        <Nav className="details_button_area d-flex flex-wrap">
                            <NavLink className="common_btn" onClick={() => handleAddToCart(product)}>
                                Add to cart
                            </NavLink>
                        </Nav>
                    </div>
                </Col>
            </Row>

            {/* Description and Reviews tabs */}
            <Row className="mt-5">
                <Col className="wow fadeInUp" data-wow-duration="1s">
                    <div className="fp__menu_description_area mt_100 xs_mt_70">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="menu_det_description">
                                    <p>{product.description || "Description not available"}</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className="fp__review_area">

                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Related Items */}
            <Row className="fp__related_menu mt_90 xs_mt_60">
                <Col lg="12">
                    <div>
                        <h2>Related Items</h2>
                    </div>
                </Col>
                {products.map((relatedProduct, index) => (
                    <Col xl="3" key={index} className="wow fadeInUp" data-wow-duration="1s">
                        <Row className="fp__menu_item">
                            <div className="fp__menu_item_img">
                                <img src={relatedProduct.image || "images/menu2_img_1.jpg"} alt="menu" className="img-fluid w-100" />
                                <a className="category" href="#">{relatedProduct.category || "Category"}</a>
                            </div>
                            <div className="fp__menu_item_text">
                                <Link className="title" to={`/products/details/${relatedProduct.slug}`} onClick={() => window.scrollTo(0, 500)}>
                                    {relatedProduct.name}
                                </Link>
                                <h5 className="price">${relatedProduct.price || ""}</h5>
                            </div>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductDetails;
