import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "services/user";

export const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const getUserByAccessToken = async () => {
        try {
            const userData = await getUser();

            setUser(userData);
            setCartItems(userData.cart?.cartItems || []);
            setCart(userData.cart || []);
            setAddress(userData.address);
            setOrders(userData.orders || []);
            setOrderItems(userData.orders.flatMap(order => order.orderItems || []));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        getUserByAccessToken();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            cartItems,
            cart,
            address,
            orders,
            orderItems,
            getUserByAccessToken
        }}>
            {children}
        </UserContext.Provider>
    );
};
