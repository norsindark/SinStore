
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";

import AuthProvider from "context/auth";
import UserProdider from "context/user";
import App from "App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProdider>
      <App />
      </UserProdider>
    </AuthProvider>
  </BrowserRouter>
);
