import TitleStyles from "../../assets/css/common/Title.module.css";

const Title = ({
                    title = "제목",
                    ...rest
                }) => {

    return (
        <div className={TitleStyles.title}>
            {title}
        </div>
    )

}

export default Title;