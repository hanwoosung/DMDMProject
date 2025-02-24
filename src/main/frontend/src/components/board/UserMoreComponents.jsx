import { useState } from "react";
import MoreStyle from "../../assets/css/board/More.module.css";
import useApi from "../../hooks/common/useApi";
import { useNavigate } from "react-router-dom";
import MessageModal from "../common/MessageModal";

const UserMore = ({
                      status = false,
                      userId,
                      userName,
                      setIsAlert,
                      setAlertMessage,
                  }) => {
    const { post } = useApi();
    const navigate = useNavigate();
    const sess = window.localStorage.userId ?? "";

    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const handleOpenMessageModal = () => {
        setIsMessageOpen(true);
    };

    // 블랙리스트 추가 처리
    const handleSaveBlackList = () => {
        post(`/api/v1/mypage/black-list/${userId}`, {
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }
            navigate(0);
        }).catch((res) => {
            setIsAlert(true);
            setAlertMessage(res.message);
        });
    };

    return (
        <div className={status ? MoreStyle.UserContainer : MoreStyle.UserContainerOn}>
            <ul>
                <li onClick={handleOpenMessageModal}>쪽지 보내기</li>
                <li onClick={handleSaveBlackList}>블랙리스트 추가</li>
            </ul>

            {/* 쪽지 모달 */}
            {isMessageOpen && (
                <MessageModal userId={userId}  userName={userName} onClose={() => setIsMessageOpen(false)} />
            )}
        </div>
    );
};

export default UserMore;
