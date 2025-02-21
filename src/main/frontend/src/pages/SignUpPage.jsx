import styles from "../assets/css/SignUpPage.module.css";
import "../../src/index.css";
import logo from "../assets/image/img_logo.jpg";
import UserInput from "../components/user/UserInput";
import {useEffect, useRef, useState} from "react";
import useApi from "../hooks/common/useApi";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "../components/common/AlertComponents";
import CustomDatePicker from "../components/user/CustomDatePicker";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const {post} = useApi();
    const [userId, setUserId] = useState("");
    const [isUserIdChecked, setIsUserIdChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const [isEmailAgree, setIsEmailAgree] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState({
        terms: false,
        privacy: false,
        all: false,
    });

    const SITE_KEY = "6Ld5aMAqAAAAAOBvbwqxT5i8vLcB2nvDmrNqsFjX";
    const [captchaToken, setCaptchaToken] = useState("");
    const [errors, setErrors] = useState({});
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    const refs = {
        userId: useRef(null),
        password: useRef(null),
        passwordConfirm: useRef(null),
        nickname: useRef(null),
        birth: useRef(null),
        email: useRef(null),
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    useEffect(() => {
        if (!captchaToken) {
            setIsCaptchaVerified(false);
        }
    }, [captchaToken]);



    //아이디 중복 체크
    const handleUserIdCheck = async () => {
        setErrors((prev) => ({
            ...prev,
            userId: null,
        }));

        if (!userId) {
            setErrors((prev) => ({
                ...prev,
                userId: "아이디를 입력해주세요.",
            }));
            return;
        } else if (!/^[a-zA-Z0-9]{4,15}$/.test(userId)) {
            setErrors((prev) => ({
                ...prev,
                userId: "아이디는 영문, 숫자 조합 4~15자여야 합니다.",
            }));
            return;
        }

        try {
            const response = await post("/api/v1/user/id-check", {
                body: {userId},
            });

            if (response.result === "SUCCESS" && response.data !== "중복된 아이디") {
                setAlertMessage("사용 가능한 아이디입니다! 🎉");
                setIsAlert(true);
                setIsUserIdChecked(true);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    userId: "이미 사용 중인 아이디입니다.",
                }));
            }
        } catch (err) {
            console.error(err);
            setErrors((prev) => ({
                ...prev,
                userId: "아이디 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.",
            }));
        }
    };

    //유효성 체크
    const validateForm = () => {
        const newErrors = {};

        if (!userId) {
            newErrors.userId = "아이디를 입력해주세요.";
        } else if (!/^[a-zA-Z0-9]{4,15}$/.test(userId)) {
            newErrors.userId = "아이디는 영문, 숫자 조합 4~15자여야 합니다.";
        }

        if (!isUserIdChecked) {
            newErrors.userId = "아이디 중복 체크를 해주세요.";
        }

        if (!password) {
            newErrors.password = "비밀번호를 입력해주세요.";
        } else if (password.length < 6) {
            newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
            newErrors.password = "비밀번호는 알파벳과 숫자를 포함해야 합니다.";
        }


        if (password !== passwordConfirm) {
            newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
        }

        if (!nickname) {
            newErrors.nickname = "닉네임을 입력해주세요.";
        } else if (!/^[a-zA-Z0-9가-힣]{1,20}$/.test(nickname)) {
            newErrors.nickname = "닉네임은 특수문자를 제외한 1~20자 이내로 입력해주세요.";
        }

        if (!birth) {
            newErrors.birth = "생년월일을 입력해주세요.";
        } else {
            const birthDate = new Date(birth);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (birthDate > today) {
                newErrors.birth = "오늘 이후의 날짜는 선택할 수 없습니다.";
            }
        }

        if (!email) {
            newErrors.email = "이메일을 입력해주세요.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "올바른 이메일 형식이 아닙니다.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstErrorKey = Object.keys(newErrors)[0];
            if (refs[firstErrorKey] && refs[firstErrorKey].current) {
                refs[firstErrorKey].current.focus();
            }
        }
        return Object.keys(newErrors).length === 0;
    };


    //회원가입 로직
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("유효성 검사 실패:", errors);
            return;
        }

        if (!captchaToken) {
            setAlertMessage("로봇 검증을 완료해주세요.");
            setIsAlert(true);
            return;
        }

        if (isCaptchaVerified) {
            const response = await post("/api/v1/recaptcha/verify", {body: {captchaToken}});

            if (!response.data) {
                setAlertMessage("로봇 검증에 실패했습니다. 다시 시도해주세요.");
                setIsAlert(true);

                setCaptchaToken("");
                setIsCaptchaVerified(false);
                return;
            }else {
                setIsCaptchaVerified(true);
            }
        }

        const data = {
            userId,
            userPw: password,
            userName: nickname,
            userBirth: birth,
            userEmail: email,
            userEmailPushYn: isEmailAgree ? "Y" : "N",
        };

        console.log("폼 데이터 확인:", data);
        try {
            const response = await post("/api/v1/user", { body: data });
            if (response.result === "SUCCESS") {
                setAlertMessage("회원가입이 완료되었습니다!");
                setIsAlert(true);
                navigate("/login");
            } else {
                setAlertMessage(
                    <span style={{ color: "red" }}>
                    회원가입 실패
                    <br />
                    <span style={{ color: "black" }}> {response.message}</span>
                </span>
                );
                setIsAlert(true);
            }
        } catch (error) {
            console.error("회원가입 오류:", error);
            setAlertMessage(
                <span style={{ color: "red" }}>
                회원가입 실패
                <br />
                <span style={{ color: "black" }}> 서버 오류가 발생했습니다.</span>
                <br />
                <span style={{ color: "black" }}> 다시 시도해주세요.</span>
            </span>
            );
            setIsAlert(true);
        }
    };


    // 이메일 수신 동의
    const handleEmailAgreeToggle = () => {
        setIsEmailAgree(!isEmailAgree);
    };

    // 약관 전체 동의
    const handleAllTermsToggle = () => {
        const newValue = !isTermsChecked.all;
        setIsTermsChecked({
            all: newValue,
            terms: newValue,
            privacy: newValue,
        });
    };

    // 개별 약관 동의
    const handleTermsChange = (type) => {
        setIsTermsChecked((prev) => {
            const updatedState = {
                ...prev,
                [type]: !prev[type],
            };

            updatedState.all = updatedState.terms && updatedState.privacy;
            return updatedState;
        });
    };

    // 이 밑으로 인풋 체인지 이벤트
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
        setErrors((prev) => ({
            ...prev,
            userId: null,
        }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors((prev) => ({
            ...prev,
            password: null,
        }));
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        setErrors((prev) => ({
            ...prev,
            passwordConfirm: null,
        }));
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setErrors((prev) => ({
            ...prev,
            nickname: null,
        }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors((prev) => ({
            ...prev,
            email: null,
        }));
    };

    const handleBirthChange = (date) => {
        setBirth(date);
        setErrors((prev) => ({
            ...prev,
            birth: null,
        }));
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


    const isSubmitDisabled = !isTermsChecked.terms || !isTermsChecked.privacy;

    return (
        <div className={styles.signUpMainContainer}>
            <img src={logo} className={styles.signUpLogo} alt="logo" />
            <h1 className={styles.signUpTitle}>DMDM에 오신 것을 환영합니다.</h1>
            <div className={styles.signUpSubTitle}>DMDM은 개발자들을 위한 플랫폼입니다.</div>

            <div className={styles.lineContainer}>
                <hr className={styles.line} />
                <span className={styles.lineText}>SNS로 로그인</span>
                <hr className={styles.line} />
            </div>

            <div className={styles.snsContainer}>
                <div className={styles.snsKakaoBtn}  onClick={onKakaoLogin}></div>
                <div className={styles.snsNaverBtn}  onClick={onNaverLogin}></div>
                <div className={styles.snsGithubBtn} onClick={onGithubLogin}></div>
                <div className={styles.snsGoogleBtn} onClick={onGoogleLogin}></div>
            </div>

            <div className={styles.lineContainer}>
                <hr className={styles.line} />
                <span className={styles.lineText}>기본정보</span>
                <hr className={styles.line} />
            </div>
            <UserInput
                label="아이디"
                placeholder="4 ~ 15자 이내(영문, 숫자 필수)"
                value={userId}
                onChange={handleUserIdChange}
                errorMessage={errors.userId}
                type="text"
                buttonText={"중복 체크"}
                onButtonClick={handleUserIdCheck}
                ref={refs.userId}
                disabled={isUserIdChecked}
            />

            <UserInput
                label="비밀번호"
                placeholder="최소 6자 이상(알파벳, 숫자 필수)"
                value={password}
                onChange={handlePasswordChange}
                errorMessage={errors.password}
                type="password"
                ref={refs.password}
            />

            <UserInput
                label="비밀번호 확인"
                placeholder="동일한 비밀번호를 입력해주세요."
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                errorMessage={errors.passwordConfirm}
                type="password"
                ref={refs.passwordConfirm}
            />

            <UserInput
                label="닉네임"
                placeholder="알파벳, 숫자, 한글 20자 이내"
                value={nickname}
                onChange={handleNicknameChange}
                errorMessage={errors.nickname}
                type="text"
                ref={refs.nickname}
            />

            {/*         <UserInput
                label="생년월일"
                placeholder="YYYY-MM-DD"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                errorMessage={errors.birth}
                type="date"
                ref={refs.birth}
            />*/}

            <CustomDatePicker
                label="생년월일"
                value={birth}
                onChange={handleBirthChange}
                errorMessage={errors.birth}
            />

            <UserInput
                label="이메일"
                placeholder="example@test.com"
                value={email}
                onChange={handleEmailChange}
                errorMessage={errors.email}
                type="email"
                ref={refs.email}
            />

            {/* 이메일 수신 동의 */}
            <div className={styles.emailAgreeSection}>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={isEmailAgree}
                        onChange={handleEmailAgreeToggle}
                    />
                    <span className={styles.slider}></span>
                </label>
                <div className={styles.emailText}>
                    이메일 수신 동의<br />
                    <div className={styles.emailDescription}>
                        DMDM의 다양한 이벤트, 뉴스레터 및 광고를 받아보시겠어요?
                    </div>
                </div>
            </div>

            {/* 약관 동의 */}
            <div className={styles.termsSection}>
                <p className={styles.termsTitle}>약관 동의</p>
                <div className={styles.termsCheckbox}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isTermsChecked.all}
                            onChange={handleAllTermsToggle}
                        />
                        전체 동의
                    </label>
                </div>
                <div className={styles.termsLine}></div>
                <div className={styles.termsCheckbox}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isTermsChecked.terms}
                            onChange={() => handleTermsChange("terms")}
                        />
                        통합 서비스 이용약관 <a href="/terms">보기</a>
                    </label>
                </div>
                <div className={styles.termsCheckbox}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isTermsChecked.privacy}
                            onChange={() => handleTermsChange("privacy")}
                        />
                        개인정보 처리방침 <a href="/privacy">보기</a>
                    </label>
                </div>
            </div>

            <div className={styles.captchaSection}>
                <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={handleCaptchaChange}
                />
                {errors.captcha && <p className={styles.errorMessage}>{errors.captcha}</p>}
            </div>


            <button
                className={styles.confirmButton}
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
            >
                확인
            </button>

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

export default SignUpPage;