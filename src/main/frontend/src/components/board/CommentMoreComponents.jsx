import MoreStyle from "../../assets/css/board/More.module.css";

const CommentMore = ({status = false}) => {
    return (
        <div className={status ? MoreStyle.CommentContainerOn : MoreStyle.CommentContainer}>

        </div>
    );

}

export default CommentMore;