import { useState } from "react";
import selectStyles from "../../assets/css/common/Select.module.css";

const Select = ({
                    options = [
                        { value: "value1", label: "label1" },
                        { value: "value2", label: "label2" },
                    ],
                    name,
                    id,
                    width,
                    height,
                    display,
                    value, // 현재 선택된 값
                    onChange, // 값 변경 핸들러
                    ...rest
                }) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        if (onChange) {
            onChange(newValue); // 외부 핸들러 호출
        }
    };

    return (
        <select
            style={{ width: width, height: height, display: display }}
            className={selectStyles.commonSelect}
            name={name}
            id={id}
            value={selectedValue} // 현재 선택된 값
            onChange={handleChange} // 변경 핸들러
            {...rest}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
