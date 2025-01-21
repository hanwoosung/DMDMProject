import selectStyles from "../../assets/css/common/Select.module.css";

const Select = ({
                    options = [
                        {value: "value1", label: "label1"},
                        {value: "value2", label: "label2"}
                    ],
                    name,
                    id,
                    width,
                    height,
                    ...rest
                }) => {
    return (
        <select
            style={{width: width, height: height}}
            className={selectStyles.commonSelect}
            name={name}
            id={id}
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
