import BtnStyles from "../../assets/css/common/Btn.module.css";

const SmallBtn = ({
                      id,
                      name,
                      title = "작은버튼",
                      width,
                      height,
                      ...rest
                  }) => {

    return (
        <button style={{width: width, height: height}}
                className={BtnStyles.smallBtn}
                id={id}
                name={name}
                {...rest}
        >
            {title}
        </button>
    )

}

export default SmallBtn;