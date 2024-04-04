import React, { useState, useEffect } from 'react';
import { getAllProducts } from 'services/product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
                console.log(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="fp__menu mt_95 xs_mt_45 mb_100 xs_mb_70">
            <div className="container">
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-xl-3 col-sm-6 col-lg-4 burger pizza wow fadeInUp" data-wow-duration="1s">
                            <div className="fp__menu_item">
                                <div className="fp__menu_item_img">
                                    <img src={product.image} alt={product.name} className="img-fluid w-100" />
                                    <a className="category" href="#">{product.category}</a>
                                </div>
                                <div className="fp__menu_item_text">
                                    <p className="rating">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <i key={index} className="fas fa-star"></i>
                                        ))}
                                        {product.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                                        {[...Array(5 - Math.ceil(product.rating))].map((_, index) => (
                                            <i key={index} className="far fa-star"></i>
                                        ))}
                                        <span>{product.numReviews}</span>
                                    </p>

                                    <a className="title" href={`menu_details/${product.id}`}>{product.name}</a>
                                    <h5 className="price">${product.price ? product.price : 'N/A'}</h5>

                                    <ul className="d-flex flex-wrap justify-content-center">
                                        <li><a href="#" data-bs-toggle="modal" data-bs-target="#cartModal"><i className="fas fa-shopping-basket"></i></a></li>
                                        <li><a href="#"><i className="fal fa-heart"></i></a></li>
                                        <li><a href="#"><i className="far fa-eye"></i></a></li>
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
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#"><i className="fas fa-long-arrow-alt-left"></i></a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#"><i className="fas fa-long-arrow-alt-right"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Products;
