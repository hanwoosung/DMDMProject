import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/user/CustomDatePicker.css";
import { AiOutlineCalendar } from "react-icons/ai";

registerLocale("ko", ko);

const CustomDatePicker = ({ label, errorMessage, value, onChange }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateSelect = (date) => {
        setShowDatePicker(false);
        onChange(date.toISOString().split("T")[0]);
    };

    return (
        <div className="custom-date-picker-container">
            {label && <label className="custom-date-label">{label}</label>}
            <div className="custom-input-wrapper">
                <input
                    type="text"
                    readOnly
                    value={value || ""}
                    placeholder="생년월일 선택"
                    className="custom-input"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                />
                <span
                    className="calendar-icon"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                >
                    <AiOutlineCalendar size={24} />
                </span>
            </div>
            {showDatePicker && (
                <div className="datepicker-popup">
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={handleDateSelect}
                        locale="ko"
                        inline
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
            )}
            {errorMessage && <p className="custom-date-error">{errorMessage}</p>}
        </div>
    );
};

export default CustomDatePicker;
