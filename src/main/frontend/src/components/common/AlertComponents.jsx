import { useEffect, useRef } from "react";
import ConfirmStyles from "../../assets/css/common/Confirm.module.css";
import SmallBtn from "./SmallBtnComponents";

const Alert = ({
                   message = "메세지 입니다.",
                   isVisible = false,
                   confirmName = "확인",
                   onAlert
               }) => {

    const btnRef = useRef(null);

    useEffect(() => {
        if (isVisible && btnRef.current) {
            btnRef.current.focus();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleAlert = () => {
        if (onAlert) {
            onAlert();
        }
    };

    return (
        <div className={ConfirmStyles.overlay}>
            <div className={ConfirmStyles.modal}>
                <p className={ConfirmStyles.message}>{message}</p>
                <div className={ConfirmStyles.actions}>
                    <SmallBtn className={ConfirmStyles.confirm}
                              onClick={handleAlert}
                              title={confirmName}
                              ref={btnRef}
                    />
                </div>
            </div>
        </div>
    );
};

export default Alert;
