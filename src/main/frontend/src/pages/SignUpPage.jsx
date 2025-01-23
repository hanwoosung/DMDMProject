import styles from "../assets/css/SignUpPage.module.css";
import "../../src/index.css";
import logo from "../assets/image/img_logo.jpg";
import UserInput from "../components/user/UserInput";
import {useEffect, useRef, useState} from "react";
import useApi from "../hooks/common/useApi";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "../components/common/AlertComponents";
import CustomDatePicker from "../components/user/CustomDatePicker";

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

    const [isEmailAgree, setIsEmailAgree] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState({
        terms: false,
        privacy: false,
        all: false,
    });

    const [captchaToken, setCaptchaToken] = useState("");
    const [errors, setErrors] = useState({});

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
                body: { userId },
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



    useEffect(() => {
        console.log(captchaToken)
    }, [captchaToken]);

    const SITE_KEY = process.env.REACT_APP_SITE_KEY;

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("유효성 검사 실패:", errors);
            return;
        }

        const data = {
            userId,
            password,
            nickname,
            birth,
            email,
            isEmailAgree,
        };

        console.log("폼 데이터 확인:", data);
    };


    // 이메일 수신 동의 토글
    const handleEmailAgreeToggle = () => {
        setIsEmailAgree(!isEmailAgree);
    };

    // 약관 전체 동의 토글
    const handleAllTermsToggle = () => {
        const newValue = !isTermsChecked.all;
        setIsTermsChecked({
            all: newValue,
            terms: newValue,
            privacy: newValue,
        });
    };

    // 개별 약관 동의 토글
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
                <div className={styles.snsKakaoBtn}></div>
                <div className={styles.snsNaverBtn}></div>
                <div className={styles.snsGithubBtn}></div>
                <div className={styles.snsGoogleBtn}></div>
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
                onChange={(e) => setUserId(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errors.password}
                type="password"
                ref={refs.password}
            />

            <UserInput
                label="비밀번호 확인"
                placeholder="동일한 비밀번호를 입력해주세요."
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                errorMessage={errors.passwordConfirm}
                type="password"
                ref={refs.passwordConfirm}
            />

            <UserInput
                label="닉네임"
                placeholder="알파벳, 숫자, 한글 20자 이내"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
                onChange={(date) => setBirth(date)}
                errorMessage={errors.birth}
            />

            <UserInput
                label="이메일"
                placeholder="example@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
