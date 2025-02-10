import TextAreaStyles from "../../assets/css/common/TextArea.module.css";

const TextArea = ({
                      contents,
                      width,
                      height,
                      ...rest
                  }) => {

    return (
        <textarea
            style={{width: width, height: height}}
            className={TextAreaStyles.textarea} {...rest}>
            {contents}
        </textarea>
    )

}

export default TextArea;