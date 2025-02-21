import { useState } from "react";
import useApi from "../../hooks/common/useApi";
import styles from "../../assets/css/common/MessageModal.module.css";
import { IoClose } from "react-icons/io5";

const MessageModal = ({ userId, userName, onClose }) => {
    const { post } = useApi();
    const [message, setMessage] = useState("");

    const sendUserId = localStorage.getItem("userId");

    if (!sendUserId) {
        alert("로그인이 필요합니다.");
        onClose();
        return null;
    }

    const handleSendMessage = async () => {
        if (!message.trim()) return alert("내용을 입력해주세요!");

        try {
            await post("/api/v1/message", {
                body: {
                    sendUserId,
                    receiveUserId: userId,
                    messageContent: message,
                },
            });

            alert("쪽지가 성공적으로 전송되었습니다.");
            setMessage("");
            onClose();
        } catch (error) {
            console.error("쪽지 전송 실패:", error);
            alert("쪽지 전송에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <IoClose className={styles.closeIcon} onClick={onClose} />

                {/* 모달 헤더 */}
                <div className={styles.modalHeader}>
                    <h3>쪽지 보내기</h3>
                </div>

                {/* 대상 */}
                <div className={styles.modalBody}>
                    <p className={styles.target}>
                        <strong>대상 : </strong> {userName} ({userId})
                    </p>

                    {/* 내용 */}
                    <p className={styles.label}>내용</p>
                    <textarea
                        className={styles.textArea}
                        placeholder="쪽지 내용을 입력하세요."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                {/* 버튼 */}
                <div className={styles.modalFooter}>
                    <button onClick={handleSendMessage} className={styles.sendButton}>
                        쪽지 전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
