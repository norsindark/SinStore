import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from 'services/admin/products/product.service';
import { Dropdown, Modal, Button, Pagination, Image, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { addCartItem } from 'services/users/cart/userCart.service';
import { useUserContext } from 'context/user';
import toast, { Toaster } from 'react-hot-toast';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { user, getUserByAccessToken } = useUserContext();
    const [sortBy, setSortBy] = useState('name');
    const [show, setShow] = useState(false);
    const [showProduct, setShowProduct] = useState({});
    const [showProductImage, setShowProductImage] = useState('');
    const [showProductName, setShowProductName] = useState('');
    const [showProductPrice, setShowProductPrice] = useState('');
    const [showProductQuantity, setShowProductQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const initialTotalPrice = showProductPrice * quantity;
        setTotalPrice(initialTotalPrice);
    }, [show, showProductPrice, quantity]);

    const handleAddToCart = async (showProduct) => {
        try {
            const data = {
                userId: user.id,
                productId: showProduct.id,
                quantity: quantity
            };
            // console.log(data);
            const response = await addCartItem(data);
            if (response.httpStatus === "OK") {
                toast.success(response.message, { duration: 2000 }, { position: 'top-right' });
                getUserByAccessToken()
                handleClose();
            } else if (response.httpStatus !== "OK") {
                toast.error(response.message, { duration: 2000 }, { position: 'top-right' });
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };


    const sortProducts = (type) => {
        const sortedProducts = [...products];
        if (type === 'name') {
            sortedProducts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        } else if (type === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (type === 'priceHighToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
        setSortBy(type);
    };

    const handleShow = (product) => {
        let totalQuantityAvailable = product.productWarehouses.reduce((total, productWarehouse) => total + productWarehouse.quantityAvailable, 0);
        setShowProduct(product);
        setShowProductImage(product.image);
        setShowProductName(product.name);
        setShowProductPrice(product.price);
        setShowProductQuantity(totalQuantityAvailable);
        setShow(true);
    };

    const handleChange = (event) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/\D/g, '');
        setQuantity(sanitizedInput);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClose = () => {
        setShow(false);
        setQuantity(1);
        setTotalPrice(0);
    };

    const calculateTotalPrice = (quantity, price) => {
        return quantity * price;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
          return str.substring(0, maxLength) + '...';
        }
        return str;
      };
    

    return (
        <Container className="my-4">
            <Row className="mb-4">
                <Col xs={12} className="mb-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="sortDropdown">
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                className={`dropdown-item ${sortBy === 'name' ? 'active' : ''}`}
                                onClick={() => sortProducts('name')}
                            >
                                A-Z
                            </Dropdown.Item>
                            <Dropdown.Item
                                className={`dropdown-item ${sortBy === 'priceLowToHigh' ? 'active' : ''}`}
                                onClick={() => sortProducts('priceLowToHigh')}
                            >
                                Price: Low to High
                            </Dropdown.Item>
                            <Dropdown.Item
                                className={`dropdown-item ${sortBy === 'priceHighToLow' ? 'active' : ''}`}
                                onClick={() => sortProducts('priceHighToLow')}
                            >
                                Price: High to Low
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                {currentItems.map(product => (
                    <Col key={product.id} xl={3} sm={6} lg={4} className="burger pizza wow fadeInUp" data-wow-duration="1s">
                        <div className="fp__menu_item">
                            <div className="fp__menu_item_img">
                                <Image src={product.image} alt={product.name} fluid />
                                <Link className="category" to="#">{product.category}</Link>
                            </div>
                            <div className="fp__menu_item_text">
                                <div className="rating">
                                    {[...Array(5)].map((_, index) => (
                                        <i key={index} className="fas fa-star"></i>
                                    ))}
                                </div>
                                <p>
                                    In Stocks: {product.productWarehouses.map(productWarehouse => (
                                        <span key={productWarehouse.id}>{productWarehouse.quantityAvailable}</span>
                                    ))}
                                </p>

                                <Link className="title" to={`/products/details/${product.slug}`}>{truncateString(product.name, 10)}</Link>
                                <h5 className="price">{product.price ? product.price : 'N/A'} VNĐ</h5>

                                <div className="d-flex flex-wrap justify-content-center">
                                    <Button data-bs-toggle="modal" data-bs-target="#cartModal" onClick={() => handleShow(product)}><i className="fas fa-shopping-basket"></i></Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className="mb-4">
                <Col xs={12}>
                    <nav aria-label="...">
                        <Pagination className="d-flex flex-wrap justify-content-center" >
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {pageNumbers.map(number => (
                                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)} >
                                    {number}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
                        </Pagination>
                    </nav>
                </Col>
            </Row>


            {/* modal */}
            <Modal show={show} onHide={handleClose} centered className="fp__cart_popup">
                <Modal.Header closeButton>
                    <Modal.Title >{showProductName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <div className="fp__cart_popup_img">
                                <Image src={showProductImage} alt={showProductName} fluid />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="fp__cart_popup_text">
                                <p className="rating">
                                    {[...Array(5)].map((_, index) => (
                                        <i key={index} className="fas fa-star"></i>
                                    ))}
                                    <h4 className="price">{showProductPrice} VNĐ</h4>
                                </p>
                                <p>
                                    <span>In Stocks: {showProductQuantity} </span>
                                </p>

                                <p>
                                    <span>Total Price: {totalPrice} VNĐ</span>
                                </p>

                            </div>
                        </Col>
                        <Col md={8}>
                            <Row className="details_quentity">
                                <h5>select quantity</h5>
                                <Row className="quentity_btn_area d-flex flex-wrapa align-items-center">
                                    <div className="quentity_btn">
                                        {/* <Button variant="primary" onClick={decreaseQuantity}><i className="fas fa-minus"></i></Button> */}
                                        <InputGroup className=' d-flex align-item-center'>
                                            <FormControl type="number" placeholder="Enter quantity" value={quantity} onChange={handleChange} />
                                        </InputGroup>
                                        {/* <Button variant="success"  onClick={increaseQuantity}><i className="fas fa-plus"></i></Button> */}
                                    </div>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddToCart(showProduct)}>
                        Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Products;
