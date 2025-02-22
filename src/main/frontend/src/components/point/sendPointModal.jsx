import {useEffect, useRef, useState} from "react";
import styles from "../../assets/css/point/SendPointModal.module.css";
import SmallBtn from "../common/SmallBtnComponents";
import Input from "../common/InputComponents";

const SendPointModal = ({
                            isVisible = false,
                            onClose,
                            recipient = "받는 사람",
                            receiveUserId
                        }) => {

    const btnRef = useRef(null);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (isVisible && btnRef.current) {
            btnRef.current.focus();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleSend = () => {
        // if (onSend) {
        //     onSend(amount);
        // }
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.title}>포인트 보내기</span>
                    <div className={styles.closeBtnContainer}>
                        <button className={styles.closeBtn} onClick={onClose}>✖</button>
                    </div>
                </div>
                <div className={styles.content}>
                    <p className={styles.recipient}>
                        <strong>대상</strong> {recipient}
                    </p>
                    <div className={styles.inputContainer}>
                        <Input
                            type="number"
                            placeholder="포인트 입력"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
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
    );
};

export default SendPointModal;