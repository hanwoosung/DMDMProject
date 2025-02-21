import TitleStyles from "../../assets/css/common/Title.module.css";

const SubTitle = ({
                    title = "제목",
                    sub = "",
                    ...rest
                }) => {

    return (
        <div className={TitleStyles.subTitle} {...rest}>
            {title} <span>{sub}</span>
        </div>
    )

}

export default SubTitle;