import React, { useState, useParams  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RestaurantTemplate from "layouts/client/RestaurantTemplate";
import ClientProduct from "layouts/client/ClientProduct";
import ProductDetails from "layouts/client/ProductDetails";
import Cart from "layouts/client/Cart";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLayout from "layouts/dashboard/Admin";
import AuthLayout from "layouts/dashboard/Auth";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<RestaurantTemplate />} />
      <Route path="/products/*" element={<ClientProduct />} />
      <Route path="/products/details/:productSlug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<UnauthorizedPage />} />
    </Routes>
  )
}

export default App