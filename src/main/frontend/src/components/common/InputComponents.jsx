import inputStyles from "../../assets/css/common/Input.module.css";


const Input = ({
                   type = "text",
                   name,
                   id,
                   placeholder,
                   width,
                   height,
                   ...rest
               }) => {

    return (
        <input style={{width: width, height: height}}
               className={inputStyles.commonInput}
               type={type}
               name={name}
               id={id}
               placeholder={placeholder}
               {...rest}
        />
    )

}

export default Input;