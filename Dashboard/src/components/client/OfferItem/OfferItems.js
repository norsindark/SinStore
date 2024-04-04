import React from 'react';

const OfferItems = () => {
    return (
        <section className="fp__offer_item mt_100 xs_mt_70 pt_95 xs_pt_65 pb_150 xs_pb_120">
            <div className="container">
                <div className="row wow fadeInUp" data-wow-duration="1s">
                    <div className="col-md-8 col-lg-7 col-xl-6 m-auto text-center">
                        <div className="fp__section_heading mb_50">
                            <h4>daily offer</h4>
                            <h2>up to 75% off for this day</h2>
                            <span>
                                <img src="../../assets/img/heading_shapes.png" alt="shapes" className="img-fluid w-100" />
                            </span>
                            <p>Objectively pontificate quality models before intuitive information. Dramatically
                                recaptiualize multifunctional materials.</p>
                        </div>
                    </div>
                </div>

                {/* <div className="row offer_item_slider wow fadeInUp" data-wow-duration="1s">
                    <div className="col-xl-4">
                        <div className="fp__offer_item_single">
                            <div className="img">
                                <img src="../../assets/img/slider_img_1.png" alt="offer" className="img-fluid w-100" />
                            </div>
                            <div className="text">
                                <span>30% off</span>
                                <a className="title" href="menu_details.html">Dal Makhani Paneer</a>
                                <p>Lightly smoked and minced pork tenderloin topped</p>
                                <ul className="d-flex flex-wrap">
                                    <li><a href="#" data-bs-toggle="modal" data-bs-target="#cartModal"><i
                                        className="fas fa-shopping-basket"></i></a></li>
                                    <li><a href="#"><i className="fal fa-heart"></i></a></li>
                                    <li><a href="#"><i className="far fa-eye"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default OfferItems;
