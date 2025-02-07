import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("access"));
    const [loginUser, setLoginUser] = useState(window.localStorage.getItem("name"));

    useEffect(() => {
        // ✅ 로컬 스토리지 값이 변경되었을 때 로그인 상태 업데이트
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
