import TitleStyles from "../../assets/css/common/Title.module.css";

const SubTitle = ({
                    title = "제목",
                    ...rest
                }) => {

    return (
        <div className={TitleStyles.subTitle}>
            {title}
        </div>
    )

}

export default SubTitle;