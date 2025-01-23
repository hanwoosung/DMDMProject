import styles from "../../assets/css/user/UserInput.module.css";

const UserInput = ({
                       label,
                       placeholder,
                       value,
                       maxLength,
                       onChange,
                       buttonText,
                       onButtonClick,
                       errorMessage,
                       type,
                       disabled,
                   }) => {
    const handleInputChange = (e) => {
        // 입력값 변경 시 에러 메시지 초기화
        onChange(e);
    };

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputGroup}>
                <input
                    type={type}
                    className={styles.input}
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLength}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                {buttonText && (
                    <button className={styles.checkButton} onClick={onButtonClick} disabled={disabled}>
                        {buttonText}
                    </button>
                )}
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
};

export default UserInput;
