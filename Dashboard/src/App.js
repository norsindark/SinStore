import React, { useState, useEffect, useParams } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RestaurantTemplate from "layouts/client/RestaurantTemplate";
import ClientProduct from "layouts/client/ClientProduct";
import ProductDetails from "layouts/client/ProductDetails";
import CartLayout from "layouts/client/CartLayout";
import CheckoutLayout from "layouts/client/CheckoutLayout";
import UserProfileLayout from "layouts/client/UserProfileLayout";
import PaymentResultLayout from "layouts/client/PaymentResultLayout";

import { useAuth } from "context/auth.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminLayout from "layouts/dashboard/Admin";
import AuthLayout from "layouts/dashboard/Auth";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";

const App = () => {
  const { getUserByAccessToken } = useAuth();
  const [ role, setRole ] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserByAccessToken();
      // console.log("User:", user);
      if (user) {
        setRole(user.role.name);
      };
    }
    checkAuth();
  }, [ getUserByAccessToken, role]);

  // console.log("Role:", role);

  return (
    <Routes>
      <Route path="/*" element={<RestaurantTemplate />} />
      <Route path="/products" element={<ClientProduct />} />
      <Route path="/products/details/:productSlug" element={<ProductDetails />} />
      <Route path="/checkout" element={<CheckoutLayout />} />
      <Route path="/cart" element={<CartLayout />} />
      <Route path="/payment-result/*" element={<PaymentResultLayout />} />
      <Route path="/my-profile" element={<UserProfileLayout />} />
      {role === "ADMIN" ?  (
        <Route path="/admin/*" element={<AdminLayout />} />
      ) : (
        <Route path="/" element={<RestaurantTemplate />} />
      )}
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<UnauthorizedPage />} />
    </Routes>
  )
}

export default App