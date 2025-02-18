import styles from "../assets/css/user/Login.module.css";
import logo from "../assets/image/img_logo.jpg";
import UserInput from "../components/user/UserInput";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Response} from "../type/Response";
import Alert from "../components/common/AlertComponents";
import {useLogin} from '../contexts/AuthContext';

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn, setIsLoggedIn, setLoginUser} = useLogin();
    const prevUrl = location.state || "/";

    // 로그인 상태 확인 후 리다이렉트
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", {replace: true});
        }
    }, [isLoggedIn, navigate]);

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
        setErrorMessage(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage(null);
    };

    const handleAccountFindClick = () => {
        navigate("/account-find");
    };

    const handleSignUpClick = () => {
        navigate("/sign-up");
    };

    const onNaverLogin = () => {
        window.location.href = "http://localhost:8090/oauth2/authorization/naver"
    }
    const onKakaoLogin = () => {
        window.location.href = "http://localhost:8090/oauth2/authorization/kakao"
    }

    const onGithubLogin = () => {
        window.location.href = "http://localhost:8090/oauth2/authorization/github"
    }

    const onGoogleLogin = () => {
        window.location.href = "http://localhost:8090/oauth2/authorization/google"
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLoginClick();
        }
    };

    const handleLoginClick = async () => {
        try {
            const response = await axios.post("http://localhost:8090/login", {
                userId,
                userPw: password,
            }, {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            });
            if (response.data.result === Response.SUCCESS) {

                const name = response.data.data.userName;
                const role = response.data.data.userRole;
                const userId = response.data.data.userId;

                /*setAlertMessage("로그인 성공");
                setIsAlert(true);*/

                window.localStorage.setItem("access", response.headers.get("access"));
                window.localStorage.setItem("name", name);
                window.localStorage.setItem("role", role);
                window.localStorage.setItem("userId", userId);

                setIsLoggedIn(true);
                setLoginUser(name);

                navigate(prevUrl, {replace: true});
            } else {
                setErrorMessage(response.data.data.message);
            }
        } catch (err) {
            setErrorMessage(err.response.data.message);
            console.log(err);
        }
    };

    return (
        <div className={styles.loginMainContainer}>
            <img src={logo} className={styles.LoginLogo} alt="logo" />
            <h1 className={styles.LoginTitle}>DMDM에 오신 것을 환영합니다.</h1>
            <div className={styles.LoginSubTitle}>DMDM은 개발자들을 위한 플랫폼입니다.</div>

            <div className={styles.lineContainer} style={{marginBottom: "10px"}}>
                <hr className={styles.line} />
                <span className={styles.lineText}>로그인</span>
                <hr className={styles.line} />
            </div>

            <UserInput
                label="아이디"
                placeholder="4 ~ 15자 이내(영문, 숫자 필수)"
                value={userId}
                onChange={handleUserIdChange}
                type="text"
                containerStyle={{marginBottom: "10px"}}
                inputStyle={{padding: "12px"}}
            />

            <UserInput
                label="비밀번호"
                placeholder="최소 6자 이상(알파벳, 숫자 필수)"
                value={password}
                onChange={handlePasswordChange}
                containerStyle={{marginBottom: "10px"}}
                inputStyle={{padding: "12px"}}
                type="password"
                errorMessage={errorMessage}
                onKeyDown={handleKeyDown}
            />

            <div className={styles.findText}>
                <span className={styles.accountFind} onClick={handleAccountFindClick}>
                    계정찾기
                </span>
                |
                <span className={styles.signUp} onClick={handleSignUpClick}>
                    회원가입
                </span>
            </div>

            <button
                className={styles.confirmButton}
                onClick={handleLoginClick}
                disabled={false}
            >
                로그인
            </button>

            <div className={styles.lineContainer}>
                <hr className={styles.line} />
                <span className={styles.lineText}>SNS로 로그인</span>
                <hr className={styles.line} />
            </div>

            <div className={styles.snsContainer}>
                <div className={styles.snsKakaoBtn} onClick={onKakaoLogin}></div>
                <div className={styles.snsNaverBtn} onClick={onNaverLogin}></div>
                <div className={styles.snsGithubBtn} onClick={onGithubLogin}></div>
                <div className={styles.snsGoogleBtn} onClick={onGoogleLogin}></div>
            </div>

            <Alert
                isVisible={isAlert}
                message={alertMessage}
                onAlert={() => {
                    setIsAlert(false);
                }}
            />
        </div>
    );
};

export default LoginPage;
