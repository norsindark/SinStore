import React from 'react';
import bannerBackground from '../../../assets/img/banner_bg.jpg';
import sliderImage from '../../../assets/img/slider_img_1.png';

const ClientBanner = () => {
    return (
        <section className="fp__banner" style={{ backgroundImage: `url(${bannerBackground})` }}>
            <div className="fp__banner_overlay">
                <div className="row banner_slider">
                    <div className="col-12">
                        <div className="fp__banner_slider">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-md-5 col-lg-5">
                                        <div className="fp__banner_img wow fadeInLeft" data-wow-duration="1s">
                                            <div className="img-container">
                                                <img src={sliderImage} alt="food item" className="img-fluid w-100" />
                                                <span>35% off</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-md-7 col-lg-6">
                                        <div className="fp__banner_text wow fadeInRight" data-wow-duration="1s">
                                            <h1>Different spice for a Different taste</h1>
                                            <h3>Fast Food & Restaurants</h3>
                                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum fugit minima et debitis ut distinctio optio qui voluptate natus.</p>
                                            <ul className="d-flex flex-wrap">
                                                <li><a className="common_btn" href="#">shop now</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientBanner;
