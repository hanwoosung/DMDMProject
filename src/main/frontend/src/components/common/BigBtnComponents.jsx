import BtnStyles from "../../assets/css/common/Btn.module.css";

const BigBtn = ({
                    id,
                    name,
                    title = "큰버튼",
                    width,
                    height,
                    padding,
                    margin,
                    ...rest
                }) => {

    return (
        <button style={{width: width, height: height, padding: padding, margin: margin}}
                className={BtnStyles.bigBtn}
                id={id}
                name={name}
                {...rest}
        >
            {title}
        </button>
    )

}

export default BigBtn;