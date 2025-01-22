import TextAreaStyles from "../../assets/css/common/TextArea.module.css";

const TextArea = ({
                      contents,
                      ...rest
                  }) => {

    return (
        <textarea className={TextAreaStyles.textarea}>
            {contents}
        </textarea>
    )

}

export default TextArea;