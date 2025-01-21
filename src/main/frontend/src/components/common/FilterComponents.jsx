import {useState} from "react";
import FilterStyles from "../../assets/css/common/Filter.module.css";

const Filter = ({
                    list = [
                        {label: "전체", value: ""}
                    ],
                    defaultValue,
                    onClick
                }) => {

    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleClick = (value) => {
        setSelectedValue(value);
        if (onClick) {
            onClick(value);
        }
    };

    return (
        <div className={FilterStyles.filterBox}>
            {list.map((item, index) => (
                <span
                    className={`${FilterStyles.filter} ${selectedValue === item.value ? FilterStyles.selected : ""}`} // 선택된 항목에 스타일 적용
                    key={index}
                    data-data={item.value}
                    onClick={() => handleClick(item.value)}
                >
                    {item.label}
                </span>
            ))}
        </div>
    );
};

export default Filter;
