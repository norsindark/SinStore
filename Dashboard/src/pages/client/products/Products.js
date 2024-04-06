import React, { useState, useEffect } from 'react';
import { getProducts } from 'services/admin/products/product.service';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [show, setShow] = useState(false);
    const [showProductImage, setShowProductImage] = useState('');
    const [showProductName, setShowProductName] = useState('');
    const [showProductPrice, setShowProductPrice] = useState('');
    const [showProductQuantity, setShowProductQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);


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
        setShowProductImage(product.image);
        setShowProductName(product.name);
        setShowProductPrice(product.price);
        setShowProductQuantity(totalQuantityAvailable);
        setShow(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClose = () => setShow(false);

    return (
        <section className="fp__menu mt_95 xs_mt_45 mb_100 xs_mb_70">
            <div className="container">


                <div className="row">
                    <div className="col-12 mb-3">
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
                    </div>

                    {currentItems.map(product => (
                        <div key={product.id} className="col-xl-3 col-sm-6 col-lg-4 burger pizza wow fadeInUp" data-wow-duration="1s">
                            <div className="fp__menu_item">
                                <div className="fp__menu_item_img">
                                    <img src={product.image} alt={product.name} className="img-fluid w-100" />
                                    <a className="category" href="#">{product.category}</a>
                                </div>
                                <div className="fp__menu_item_text">
                                    <p className="rating">
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} className="fas fa-star"></i>
                                        ))}
                                    </p>
                                    <p>
                                        In Stocks: {product.productWarehouses.map(productWarehouse => (
                                            <span key={productWarehouse.id}>{productWarehouse.quantityAvailable}</span>
                                        ))}
                                    </p>


                                    <Link className="title" to={`/products/details/${product.slug}`}>{product.name}</Link>
                                    <h5 className="price">{product.price ? product.price : 'N/A'} VNĐ</h5>

                                    <ul className="d-flex flex-wrap justify-content-center">
                                        <li>
                                            <a data-bs-toggle="modal" data-bs-target="#cartModal" onClick={() => handleShow(product)}><i className="fas fa-shopping-basket"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="fp__pagination mt_35">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="...">
                                <Pagination >
                                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                    {pageNumbers.map(number => (
                                        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)} >
                                            {number}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
                                </Pagination>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fp__cart_popup">
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Maxican Pizza Test Better</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="fp__cart_popup_img">
                            <img src={showProductImage} alt={showProductName} className="img-fluid w-100" />
                        </div>
                        <div className="fp__cart_popup_text">
                            <p className="rating">
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className="fas fa-star"></i>
                                ))}
                                <h4 className="price">{showProductPrice}</h4>
                            </p>
                            <p>
                                In Stocks: {showProductQuantity}
                               
                            </p>
                        </div>
                        <div class="details_quentity">
                            <h5>select quentity</h5>
                            <div class="quentity_btn_area d-flex flex-wrapa align-items-center">
                                <div class="quentity_btn">
                                    <button class="btn btn-danger"><i class="fas fa-minus"></i></button>
                                    <input type="text" placeholder="1" />
                                    <button class="btn btn-success"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Add to Cart
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>


    );
}

export default Products;