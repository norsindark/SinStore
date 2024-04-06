import React, { useState, useEffect } from 'react';
import { getProducts } from 'services/admin/products/product.service';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productSlug } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);

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
        <section className="fp__menu_details mt_115 xs_mt_85 mb_95 xs_mb_65">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-9 wow fadeInUp" data-wow-duration="1s">
                        <div className="exzoom hidden" id="exzoom">
                            <div className="exzoom_img_box fp__menu_details_images">
                                <ul className='exzoom_img_ul'>
                                    <li><img className="zoom img-fluid w-100" src={product.image || "images/menu1.png"} alt="product" /></li>
                                </ul>
                            </div>
                            <div className="exzoom_nav"></div>
                        </div>
                    </div>
                    <div className="col-lg-7 wow fadeInUp" data-wow-duration="1s">
                        <div className="fp__menu_details_text">
                            <h2>{product.name || "Product Name"}</h2>
                            <p className="rating">
                                {product.rating ? Array.from({ length: product.rating }).map((_, index) => (
                                    <i key={index} className="fas fa-star"></i>
                                )) : null}
                                {product.rating ? <span>({product.ratingCount || 0})</span> : null}
                            </p>
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
                                        <button className="btn btn-primary" onClick={() => setQuantity(Math.max(1, quantity - 1))}><i className="fas fa-minus"></i></button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            onChange={handleChange}
                                            placeholder="Enter quantity"
                                        />
                                        <button className="btn btn-success" onClick={() => setQuantity(quantity + 1)}><i className="far fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>

                            <ul className="details_button_area d-flex flex-wrap">
                                <li><a className="common_btn" href="#">add to cart</a></li>
                                {/* <li><a className="wishlist" href="#"><i className="far fa-heart"></i></a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Description and Reviews tabs */}
                <div className="row mt-5">
                    <div class="col-12 wow fadeInUp" data-wow-duration="1s">
                        <div class="fp__menu_description_area mt_100 xs_mt_70">
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
                    </div>
                </div>

                {/* Related Items */}
                <div className="row fp__related_menu mt_90 xs_mt_60">
                    <div className="col-lg-12">
                        <h2>Related Items</h2>
                    </div>
                    {products.map((relatedProduct, index) => (
                        <div key={index} className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                            <div className="fp__menu_item">
                                <div className="fp__menu_item_img">
                                    <img src={relatedProduct.image || "images/menu2_img_1.jpg"} alt="menu" className="img-fluid w-100" />
                                    <a className="category" href="#">{relatedProduct.category || "Category"}</a>
                                </div>
                                <div className="fp__menu_item_text">
                                    <p className="rating">
                                        {relatedProduct.rating ? Array.from({ length: relatedProduct.rating }).map((_, index) => (
                                            <i key={index} className="fas fa-star"></i>
                                        )) : null}
                                        {relatedProduct.rating ? <span>({relatedProduct.ratingCount || 0})</span> : null}
                                    </p>
                                    <a className="title" href="#">{relatedProduct.name || "Product Name"}</a>
                                    <h5 className="price">${relatedProduct.price || ""} <del>${relatedProduct.oldPrice || ""}</del></h5>
                                    <ul className="d-flex flex-wrap justify-content-center">
                                        <li><a href="#" data-bs-toggle="modal" data-bs-target="#cartModal"><i className="fas fa-shopping-basket"></i></a></li>
                                        <li><a href="#"><i className="far fa-heart"></i></a></li>
                                        <li><a href="#"><i className="far fa-eye"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
