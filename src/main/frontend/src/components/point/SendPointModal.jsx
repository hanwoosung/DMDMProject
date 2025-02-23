import {useEffect, useRef, useState} from "react";
import styles from "../../assets/css/point/SendPointModal.module.css";
import SmallBtn from "../common/SmallBtnComponents";
import Input from "../common/InputComponents";
import useApi from "../../hooks/common/useApi";
import Alert from "../common/AlertComponents";
import {useNavigate} from "react-router-dom";

const SendPointModal = ({
                            isVisible = false,
                            onClose,
                            recipient = "받는 사람",
                            receiveUserId
                        }) => {

    const {post} = useApi();

    let navigate = useNavigate();
    const btnRef = useRef(null);
    const [sendPoint, setSendPoint] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleSend = () => {
        post("/api/v1/send-point", {
                body: {
                    receiveUserId: receiveUserId,
                    sendPoint: sendPoint
                }
            }
        ).then(res => {
            if (res.message === "SUCCESS") {
                onAlert("포인트 보내기 완료");
            } else {
                onAlert(res.message);
            }
        });
    };

    const onAlert = (message) => {
        setAlertMessage(message);
        setIsAlert(true);
    }



    useEffect(() => {
        if (isVisible && btnRef.current) {
            btnRef.current.focus();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay}>
                <Alert
                    isVisible={isAlert}
                    message={alertMessage}
                    onAlert={() => {
                        setIsAlert(false);
                        onClose();
                    }}
                />
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <span className={styles.title}>포인트 보내기</span>
                        <button className={styles.closeBtn} onClick={onClose}>✖</button>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.recipient}>
                            <strong>대상</strong> {recipient}
                        </p>
                        <div className={styles.inputContainer}>
                            <Input
                                type="number"
                                placeholder="포인트 입력"
                                value={sendPoint}
                                onChange={(e) => setSendPoint(e.target.value)}
                            />
                            <SmallBtn
                                onClick={handleSend}
                                title="전송"
                                ref={btnRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendPointModal;