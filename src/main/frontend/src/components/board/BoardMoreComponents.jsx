import MoreStyle from "../../assets/css/board/More.module.css";
import useApi from "../../hooks/common/useApi";
import {useNavigate} from "react-router-dom";

const BoardMore = ({
                       status = false,
                       boardId,
                       setIsAlert,
                       setAlertMessage,
                       boardType,
                       userId
                   }) => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const navigate = useNavigate();
    const sess = window.localStorage.userId ?? "";


    const deleteBoard = () => {

        if (userId === "" || userId !== sess) {
            setIsAlert(true);
            setAlertMessage("작성자만 삭제할 수 있습니다.");
            return;
        }

        del(`/api/v1/board/${boardId}`, {
            headers: {"Content-Type": "application/json"},
        }).then((res) => {
            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }

            navigate(`/board-list/${boardType}`);

        }).catch((res) => {
            setIsAlert(true);
            setAlertMessage(res.message);
        });
    }

    return (
        <div className={status ? MoreStyle.BoardContainerOn : MoreStyle.BoardContainer}>
            <ul>
                <li onClick={deleteBoard}>삭제
                </li>
            </ul>
        </div>
    );

}

export default BoardMore;