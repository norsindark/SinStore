import React, { useEffect, useState } from 'react';
import ClientFooter from 'components/client/Footers/ClientFooter';
import TopBar from 'components/client/topbar/TopBar';
import ClientNavbar from 'components/client/navbars/ClientNavbar';
import ClientBanner from 'components/client/Banner/ClientBanner';
import OfferItems from 'components/client/OfferItem/OfferItems';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style.css';


import "../../assets/css/all.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/spacing.css";
import "../../assets/css/slick.css";
import "../../assets/css/nice-select.css";
import "../../assets/css/venobox.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/jquery.exzoom.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";



const RestaurantTemplate = () => {

  useEffect(() => {
    const handleScroll = () => {
      const navOffset = document.querySelector('.main_menu')?.offsetTop || 0;
      const scrolling = window.pageYOffset || document.documentElement.scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const wow = new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      scrollContainer: null,
      resetAnimation: true
    });
    wow.init();
  }, []);

  window.FontAwesomeKitConfig = {
    "asyncLoading": {"enabled": true},
    "autoA11y": {"enabled": true},
    "baseUrl": "https://kit-pro.fontawesome.com",
    "license": "pro",
    "method": "css",
    "minify": {"enabled": true},
    "v4shim": {"enabled": true},
    "version": "latest"
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=device-dpi"
        />
        <title>FoodPark || Restaurant Template</title>
      </head>
      <body>
        {/* topbar */}
        <TopBar />

        {/* menu */}
        <ClientNavbar />

        {/* banner */}
        <ClientBanner />

        {/* offer items */}
        <OfferItems/>


        {/* footer */}
        <ClientFooter />

        {/* Scroll Button */}
        <div className="fp__scroll_btn">
          go to top
        </div>
      </body>
    </html>
  );
};

export default RestaurantTemplate;
