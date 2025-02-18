import { createContext, useContext, useEffect, useState } from "react";
import fetchReissue from "../services/common/fetchReissue";
import fetchUserProfile from "../services/common/fetchUserProfile";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
    } catch (e) {
        return false;
    }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUser, setLoginUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = window.localStorage.getItem("access");

            if (token && isTokenValid(token)) {
                console.log("🔹 accessToken 유효 → 로그인 유지");
                const userName = window.localStorage.getItem("name");
                const userId = window.localStorage.getItem("userId");
                setIsLoggedIn(true);
                setLoginUser(userName);

                if (userId) {
                    const profileUrl = await fetchUserProfile(userId);
                    setProfileImage(profileUrl);
                }
                return;
            }

            console.log("🔹 accessToken 없음 또는 만료 → refresh 시도");
            const success = await fetchReissue();
            if (success) {
                const userName = window.localStorage.getItem("name");
                setIsLoggedIn(true);
                setLoginUser(userName);

                if (userName) {
                    const profileUrl = await fetchUserProfile(userName);
                    setProfileImage(profileUrl);
                }
            } else {
                setIsLoggedIn(false);
                setLoginUser(null);
                setProfileImage(null);
            }
        };

        checkAuthStatus();

        const handleStorageChange = () => {
            setIsLoggedIn(!!window.localStorage.getItem("access"));
            setLoginUser(window.localStorage.getItem("name"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [loginUser]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginUser, setLoginUser, profileImage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useLogin = () => useContext(AuthContext);
export default AuthProvider;
