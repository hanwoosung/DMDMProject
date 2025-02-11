import {useNavigate} from "react-router-dom";
import {useLogin} from "../contexts/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const {setIsLoggedIn, setLoginUser} = useLogin();
    const fetchLogout = async () => {
        try {
            // 로그아웃 요청 시 백엔드에서 refresh token 블랙리스트 처리 (혹은 refresh 토큰 DB 에서 삭제)
            const response = await fetch("http://localhost:8090/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                window.localStorage.removeItem("access");
                window.localStorage.removeItem("name");
                window.localStorage.removeItem("role");
                window.localStorage.removeItem("userId");

                setIsLoggedIn(false);
                setLoginUser(null);
            }
            navigate("/login", {replace: true});
        } catch (error) {
            console.log("error: ", error);
            navigate("/login", {replace: true});
        }
    }
    fetchLogout();
    return;
}

export default Logout;