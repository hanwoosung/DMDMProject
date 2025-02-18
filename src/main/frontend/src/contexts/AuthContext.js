import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("access"));
    const [loginUser, setLoginUser] = useState(window.localStorage.getItem("name"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!window.localStorage.getItem("access"));
            setLoginUser(window.localStorage.getItem("name"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useLogin = () => useContext(AuthContext);
export default AuthProvider;
