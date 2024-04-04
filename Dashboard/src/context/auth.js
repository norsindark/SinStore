import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth";
import { getUser } from "services/user";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    // const signIn = async (email, password) => {
    //     const { accessToken } = await login(email, password);

    //     console.log(accessToken);

    //     setError(null);
    //     setLoading(false);
    //     if (!accessToken) return setUser(null)

    //     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    //     setAccessToken(accessToken)
    //     localStorage.setItem('accessToken', accessToken)
    // }

    const getTokenFromLocalStorage = () => {
        const token = localStorage.get("accessToken")
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        setAccessToken(token)
      }


    const removeToken = () => {
        localStorage.removeItem("accessToken");
    };

    const signOut = async () => {
        setUser(null);
        removeToken();
        navigate("/auth/login", { replace: true });
    };

    const getUserByAccessToken = async () => {
		const user = await getUser()
		if (!user) {
			setLoading(false)
			return setUser(null)
		}
		return user;
	}


    return (
        <AuthContext.Provider value={{
            signOut,
            getTokenFromLocalStorage,
            removeToken,
            getUserByAccessToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
