import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import fetchAuthorizedPage from "../services/common/fetchAuthorizedPage";
import styles from "../assets/css/SignUpPage.module.css";
import UserInput from "../components/user/UserInput";
import CustomDatePicker from "../components/user/CustomDatePicker";
import Alert from "../components/common/AlertComponents";

const UserEditPage = () => {
    const [nickname, setNickname] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [isEmailAgree, setIsEmailAgree] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [profileDeleted, setProfileDeleted] = useState(false);
    const [deletedFileId, setDeletedFileId] = useState(null);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetchAuthorizedPage("http://localhost:8090/api/v1/user/profile", navigate, window.location);

                if (response) {
                    const data = response.data;
                    setNickname(data.userName);
                    setBirth(data.userBirth);
                    setEmail(data.userEmail);
                    setIsEmailAgree(data.userEmailPushYn === "Y");

                    if (data.fileDto) {
                        setProfileImage({ fileNo: data.fileDto.fileNo, filePath: data.fileDto.filePath });
                    } else {
                        setProfileImage(null);
                    }
                }
            } catch (error) {
                console.error("유저 프로필 조회 실패:", error);
            }
        };

        getUserProfile();
    }, [navigate]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage({ fileNo: null, filePath: imageUrl });
            setProfileDeleted(false);
            setDeletedFileId(null);
            console.log("프로필 이미지 변경:", imageUrl);
        }
    };

    const handleProfileClick = () => {
        fileInputRef.current.click();
    };

    const handleProfileImageDelete = (event) => {
        event.stopPropagation();
        if (profileImage && profileImage.fileNo) {
            setDeletedFileId(profileImage.fileNo);
        }
        setProfileImage(null);
        setProfileDeleted(true);
    };


    const validateInputs = () => {
        const newErrors = {};

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
        return Object.keys(newErrors).length === 0;
    };


    const handleUpdateProfile = async () => {
        if (!validateInputs()) return;

        const formData = new FormData();
        const accessToken = localStorage.getItem("access");

        const userData = {
            userName: nickname,
            userBirth: birth,
            userEmail: email,
            userEmailPushYn: isEmailAgree ? "Y" : "N",
            profileDeleted: profileDeleted,
            fileDto: deletedFileId ? { fileNo: deletedFileId } : profileImage && profileImage.fileNo ? { fileNo: profileImage.fileNo } : null,
        };

        console.log("전송할 데이터:", userData);

        formData.append("userData", new Blob([JSON.stringify(userData)], { type: "application/json" }));

        if (!profileDeleted && fileInputRef.current.files[0]) {
            formData.append("profileImage", fileInputRef.current.files[0]);
        }

        try {
            const response = await axios.post("http://localhost:8090/api/v1/user/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "access": accessToken,
                },
            });

            console.log("프로필 업데이트 완료:", response.data);
            setAlertMessage("프로필이 성공적으로 업데이트되었습니다!");
            setIsAlert(true);

            fetchUserProfile();
        } catch (error) {
            console.error("프로필 업데이트 실패:", error);
            setAlertMessage("프로필 업데이트 중 오류가 발생했습니다.");
            setIsAlert(true);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await fetchAuthorizedPage("http://localhost:8090/api/v1/user/profile", navigate, window.location);
            if (response) {
                const data = response.data;
                setNickname(data.userName);
                setBirth(data.userBirth);
                setEmail(data.userEmail);
                setIsEmailAgree(data.userEmailPushYn === "Y");

                if (data.fileDto) {
                    setProfileImage({ fileNo: data.fileDto.fileNo, filePath: data.fileDto.filePath });
                } else {
                    setProfileImage(null);
                }

                setProfileDeleted(false);
                setDeletedFileId(null);
            }
        } catch (error) {
            console.error("유저 프로필 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [navigate]);

    return (
        <div className={styles.signUpMainContainer2}>

            {/* 프로필 이미지 */}
            <div className={styles.profileContainer} onClick={handleProfileClick}>
                {profileImage ? (
                    <img className={styles.profileImg} src={profileImage.filePath} alt="profile" />
                ) : (
                    <div className={styles.emptyProfile}></div>
                )}

                {profileImage && (
                    <button className={styles.closeButton} onClick={handleProfileImageDelete}>✖</button>
                )}
            </div>

            {/* 파일 업로드 Input (숨김) */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfileImageChange}
            />

            {/* 사용자 정보 입력 */}
            <UserInput
                label="닉네임"
                placeholder="알파벳, 숫자, 한글 20자 이내"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                errorMessage={errors.nickname}
                type="text"
            />

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
            />

            {/* 이메일 수신 동의 */}
            <div className={styles.emailAgreeSection}>
                <label className={styles.switch}>
                    <input type="checkbox" checked={isEmailAgree} onChange={() => setIsEmailAgree(!isEmailAgree)} />
                    <span className={styles.slider}></span>
                </label>
                <div className={styles.emailText}>
                    이메일 수신 동의<br />
                    <div className={styles.emailDescription}>
                        DMDM의 다양한 이벤트, 뉴스레터 및 광고를 받아보시겠어요?
                    </div>
                </div>
            </div>

            {/* 수정 버튼 */}
            <button className={styles.confirmButton} onClick={handleUpdateProfile}>
                수정 완료
            </button>

            <Alert
                isVisible={isAlert}
                message={alertMessage}
                onAlert={() => setIsAlert(false)}
            />
        </div>
    );
};

export default UserEditPage;
