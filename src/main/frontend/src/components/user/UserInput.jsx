import styles from "../../assets/css/user/UserInput.module.css";

const UserInput = ({
                       label,
                       placeholder,
                       value,
                       maxLength,
                       onChange,
                       onKeyDown,
                       buttonText,
                       onButtonClick,
                       errorMessage,
                       type,
                       disabled,
                       inputStyle,
                       containerStyle,
                   }) => {
    const handleInputChange = (e) => {
        onChange(e);
    };

    return (
        <div className={styles.inputContainer} style={containerStyle}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputGroup}>
                <input
                    type={type}
                    className={styles.input}
                    style={inputStyle}
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLength}
                    onKeyDown={onKeyDown}
                    onChange={handleInputChange}
                    disabled={disabled}
                />
                {buttonText && (
                    <button
                        className={styles.checkButton}
                        onClick={onButtonClick}
                        disabled={disabled}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
};

export default UserInput;
