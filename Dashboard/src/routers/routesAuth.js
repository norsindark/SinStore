import React from "react";
import Register from "pages/dashboard/authentication/Register";
import Login from "pages/dashboard/authentication/Login";
import ResetPassword from "pages/dashboard/authentication/ResetPassword";

var routesAuth = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <Register />,
        layout: "/auth",
    },
    {
        path: "/change-password",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <ResetPassword />,
        layout: "/auth",
    },
];
export default routesAuth;