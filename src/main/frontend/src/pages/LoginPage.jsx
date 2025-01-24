import styles from "../assets/css/user/Login.module.css";
import logo from "../assets/image/img_logo.jpg";
import UserInput from "../components/user/UserInput";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Response} from "../type/Response";
import Alert from "../components/common/AlertComponents";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

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

    const handleLoginClick = async () => {
        try {
            const response = await axios.post("http://localhost:8090/login", {
                userId,
                userPw: password,
            }, {
                headers: {"Content-Type": "application/json"},
            });
            if (response.data.result === Response.SUCCESS) {
                const token = response.headers["authorization"];

                setAlertMessage("로그인 성공");
                setIsAlert(true);

                if (token && token.startsWith("Bearer ")) {
                    localStorage.setItem("token", token.split(" ")[1]);
                }

                /*navigate("/a"); TODO : 이거 메인 만들면 넣어줘야함 */
            }
        } catch (err) {
            setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
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
                한우성인
            </button>

            <div className={styles.lineContainer}>
                <hr className={styles.line} />
                <span className={styles.lineText}>SNS로 로그인</span>
                <hr className={styles.line} />
            </div>

            <div className={styles.snsContainer}>
                <div className={styles.snsKakaoBtn}></div>
                <div className={styles.snsNaverBtn}></div>
                <div className={styles.snsGithubBtn}></div>
                <div className={styles.snsGoogleBtn}></div>
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
