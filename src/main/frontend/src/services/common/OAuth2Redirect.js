import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "../../contexts/AuthContext";

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setLoginUser } = useLogin();

    const OAuth2JwtHeaderFetch = async () => {
        const [queryParams] = useSearchParams();
        try {
            const response = await fetch("http://localhost:8090/oauth2-jwt-header", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                window.localStorage.setItem("access", response.headers.get("access"));

                const name = queryParams.get("name");
                const role = queryParams.get("role");
                const userId = queryParams.get("userId");

                window.localStorage.setItem("name", name);
                window.localStorage.setItem("role", role);
                window.localStorage.setItem("userId", userId);
                setIsLoggedIn(true);
                setLoginUser(name);
            }

            navigate('/', { replace: true });
        } catch (error) {
            console.log("error: ", error);
        }
    }

    OAuth2JwtHeaderFetch();
    return;
};


export default OAuth2Redirect;