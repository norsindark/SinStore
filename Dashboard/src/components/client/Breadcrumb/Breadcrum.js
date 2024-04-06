import React from 'react';
import bgImg from '../../../assets/img/background/bg.jpg';

const Breadcrumb = () => {
    return (
        <section className="fp__breadcrumb" >
            <div className="fp__breadcrumb_overlay">
                <div className="container">
                    <div className="fp__breadcrumb_text">
                        <h1>Sin Store</h1>
                        <ul>
                            <li><a >home</a></li>
                            {/* <li><a >menu Details</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumb;