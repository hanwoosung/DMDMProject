import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams, useNavigate} from "react-router-dom";

const useBoardListHandler = () => {


    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const {data: fetchedEvents, loading} = useFetch(`/api/v1/gubn`, {
        data: {
            parentCode: "BOARD_CATEGORY"
        }
    }, "post");

    useEffect(() => {

        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents) {
            console.log(fetchedEvents);
            const selectInfo = fetchedEvents.data.map((data) => {
                return {
                    value: data.code,
                    label: data.name
                }
            })
            const isValidBoardType = selectInfo.some((item) => item.value === boardTypeParam);

            if (!isValidBoardType) {
                console.warn(`boardTypeParam(${boardTypeParam})이 유효하지 않아 메인으로 이동`);
                navigate("/"); // 🚀 메인 페이지로 이동
            }

            setBoardType(selectInfo);
        }

    }, [fetchedEvents]);

    return {
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