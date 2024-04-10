import React from "react";
import Index from "views/Index.js";
import Profile from "pages/dashboard/profile/Profile";
import TableUsers from "pages/dashboard/users/TableUsers";
import Icons from "views/examples/Icons.js";
import TableProducts from "pages/dashboard/products/TableProducts";
import TableCategories from "pages/dashboard/categories/TableCategories";
import RestaurantTemplate from "layouts/client/RestaurantTemplate";
import TableOrder from "pages/dashboard/orders/TableOrder";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/",
    name: "Client",
    icon: "ni ni-laptop",
    component: <RestaurantTemplate />,
    layout: "/client",
    roles: ['ADMIN', 'USER',]
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },

  {
    path: "/table-order",
    name: "Table Order",
    icon: "ni ni-money-coins",
    component: <TableOrder />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/user-profile",
    name: "My Profile",
    icon: "ni ni-circle-08",
    component: <Profile />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/table-users",
    name: "Table Users",
    icon: "ni ni-single-02",
    component: <TableUsers />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/table-products",
    name: "Table Products",
    icon: "ni ni-archive-2",
    component: <TableProducts />,
    layout: "/admin",
    roles: ['ADMIN'] 
  },
  {
    path: "/table-categories",
    name: "Table Categrories",
    icon: "ni ni-collection",
    component: <TableCategories />,
    layout: "/admin",
    roles: ['ADMIN'] 
  }
];
export default routes;