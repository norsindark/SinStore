
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import AuthProvider from "context/auth";
import UserProdider from "context/user";
import App from "App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
      />
      <UserProdider>
        <App />
      </UserProdider>
    </AuthProvider>
  </BrowserRouter>
);
