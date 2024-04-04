import RestaurantTemplate from "layouts/client/RestaurantTemplate";
import ClientProduct from "layouts/client/ClientProduct";

var clientRoutes = [
    {
        path: "/client",
        name: "client",
        icon: "ni ni-tv-2 text-primary",
        component: <RestaurantTemplate />,
        layout: "/auth",
        roles: ['ADMIN', 'USER']
    },
    {
        path: "/products",
        name: "products",
        icon: "ni ni-tv-2 text-primary",
        component: <ClientProduct />,
        layout: "/auth",
        roles: ['ADMIN', 'USER']
    }
]

export default clientRoutes;