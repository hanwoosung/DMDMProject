import ConfirmStyles from "../../assets/css/common/Confirm.module.css";
import SmallBtn from "./SmallBtnComponents";

const Confirm = ({
                     message = "정말로 진행하시겠습니까?",
                     onConfirm,
                     onCancel,
                     isVisible = false,
                     confirmName="확인",
                     cancelName="취소",
                 }) => {
    if (!isVisible) return null; // 모달이 표시되지 않으면 아무것도 렌더링하지 않음

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(); // 확인 버튼 클릭 시 호출
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel(); // 취소 버튼 클릭 시 호출
        }
    };

    return (
        <div className={ConfirmStyles.overlay}>
            <div className={ConfirmStyles.modal}>
                <p className={ConfirmStyles.message}>{message}</p>
                <div className={ConfirmStyles.actions}>
                    <SmallBtn className={ConfirmStyles.confirm}
                              onClick={handleConfirm}
                              title={confirmName} />
                    <SmallBtn className={ConfirmStyles.cancel}
                              onClick={handleCancel}
                              title={cancelName} />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
