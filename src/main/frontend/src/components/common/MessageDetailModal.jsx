import { useState, useEffect } from "react";
import useApi from "../../hooks/common/useApi";
import styles from "../../assets/css/common/MessageModal.module.css";
import { IoClose } from "react-icons/io5";

const MessageDetailModal = ({ messageId, onClose }) => {
    const { post } = useApi();
    const [message, setMessage] = useState("");
    const [sendUserId, setSendUserId] = useState("");
    const [sendUserName, setSendUserName] = useState("");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await post("/api/v1/message/ok", {
                    body: { messageId },
                });

                setMessage(response.data.messageContent);
                setSendUserId(response.data.sendUserId);
                setSendUserName(response.data.sendUserName);
            } catch (error) {
                console.error("쪽지 불러오기 실패:", error);
                alert("쪽지를 불러오는 중 오류가 발생했습니다.");
                onClose();
            }
        };

        if (messageId) {
            fetchMessage();
        }
    }, [messageId]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* 닫기 버튼 */}
                <IoClose className={styles.closeIcon} onClick={onClose} />

                {/* 모달 헤더 */}
                <div className={styles.modalHeader}>
                    <h3>쪽지 내용</h3>
                </div>

                {/* 보낸 사람 정보 */}
                <div className={styles.modalBody}>
                    <p className={styles.target}>
                        <strong>보낸이 : </strong> {sendUserName} ({sendUserId})
                    </p>

                    {/* 쪽지 내용 */}
                    <p className={styles.label}>내용</p>
                    <textarea
                        className={styles.textArea}
                        value={message}
                        readOnly
                    />
                </div>

                {/* 버튼 */}
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.sendButton}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageDetailModal;
