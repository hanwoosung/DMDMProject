import ConfirmStyles from "../../assets/css/common/Confirm.module.css";
import SmallBtn from "./SmallBtnComponents";

const Alert = ({
                   message = "메세지 입니다.",
                   isVisible = false,
                   confirmName = "확인",
                   onAlert
               }) => {

    if (!isVisible) return null;

    const handleAlert = () => {
        if (onAlert) {
            onAlert(); // 확인 버튼 클릭 시 호출
        }
    };

    return (
        <div className={ConfirmStyles.overlay}>
            <div className={ConfirmStyles.modal}>
                <p className={ConfirmStyles.message}>{message}</p>
                <div className={ConfirmStyles.actions}>
                    <SmallBtn className={ConfirmStyles.confirm}
                              onClick={handleAlert}
                              title={confirmName} />
                </div>
            </div>
        </div>
    );
};

export default Alert;
