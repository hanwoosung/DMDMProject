import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams, useNavigate} from "react-router-dom";

const useBoardListHandler = () => {

    const {boardType: boardTypeParam} = useParams();
    const [boardType, setBoardType] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const {data: fetchedEvents, loading} = useFetch(`/api/v1/gubn/BOARD_CATEGORY/${boardTypeParam}`, {
        data: {
            parentCode: "BOARD_CATEGORY"
        }
    }, "post");

    useEffect(() => {

        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents) {
            if (fetchedEvents.statusCode === 200) {
                setBoardType(fetchedEvents.data);
            } else {
                setIsAlert(true);
                setAlertMessage(fetchedEvents.message);
            }

        }


    }, [fetchedEvents]);

    return {
        boardType,
        alertMessage,
        setAlertMessage,
        isAlert,
        setIsAlert,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage
    }
}

export default useBoardListHandler;