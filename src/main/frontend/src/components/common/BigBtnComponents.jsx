import BtnStyles from "../../assets/css/common/Btn.module.css";

const BigBtn = ({
                    id,
                    name,
                    title = "큰버튼",
                    width,
                    height,
                    ...rest
                }) => {

    return (
        <button style={{width: width, height: height}}
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