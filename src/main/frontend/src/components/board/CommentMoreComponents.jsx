import MoreStyle from "../../assets/css/board/More.module.css";
import useApi from "../../hooks/common/useApi";
import {useNavigate} from "react-router-dom";

const CommentMore = ({
                         status = false,
                         setIsAlert,
                         setAlertMessage,
                         commentId,
                         boardId,
                         userId
                     }) => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const navigate = useNavigate();
    const sess = window.localStorage.userId ?? "";

    const deleteComment = () => {

        if (userId === "" || userId !== sess) {
            setIsAlert(true);
            setAlertMessage("작성자만 삭제할 수 있습니다.");
            return;
        }

        del(`/api/v1/comment/${commentId}`, {
            headers: {"Content-Type": "application/json"},
        }).then((res) => {
            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }
            navigate(0);
        }).catch((res) => {
            setIsAlert(true);
            setAlertMessage(res.message);
        });
    }

    return (
        <div className={status ? MoreStyle.CommentContainerOn : MoreStyle.CommentContainer}>
            <ul>
                <li onClick={deleteComment}>삭제</li>
            </ul>
        </div>
    );

}

export default CommentMore;