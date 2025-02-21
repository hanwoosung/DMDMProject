import MoreStyle from "../../assets/css/board/More.module.css";
import useApi from "../../hooks/common/useApi";
import {useNavigate} from "react-router-dom";

const UserMore = ({
                      status = false,
                      userId,
                      setIsAlert,
                      setAlertMessage,
                  }) => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const navigate = useNavigate();
    const sess = window.localStorage.userId ?? "";

    const handleSaveBlackList = () => {

        post(`/api/v1/mypage/black-list/${userId}`, {
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
        <div className={status ? MoreStyle.UserContainer : MoreStyle.UserContainerOn}>
            <ul>
                <li onClick={handleSaveBlackList}>블랙리스트 추가</li>
            </ul>
        </div>
    );

}

export default UserMore;