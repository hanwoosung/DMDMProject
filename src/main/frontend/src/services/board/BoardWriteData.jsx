import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams, useNavigate} from "react-router-dom";

const useBoardWriteData = () => {

    const navigate = useNavigate();
    const {boardType: boardTypeParam} = useParams();

    const [title, setTitle] = useState({});
    const [hashTags, setHashTags] = useState([]);
    const [boardType, setBoardType] = useState([]);
    const [boardFiles, setBoardFiles] = useState([]);
    const editorRef = useRef(null); // 에디터 객체를 참조
    const [boardData, setBoardData] = useState({
        boardTitle: "",
        boardType: boardTypeParam,
        boardContent: "",
    });
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

            const selectedItem = selectInfo.find((select) => select.value === boardTypeParam);
            setTitle(selectedItem ? selectedItem : '');
            setBoardType(selectInfo);
        }

    }, [fetchedEvents]);

    return {
        navigate,
        title,
        hashTags,
        setHashTags,
        boardType,
        editorRef,
        boardFiles,
        setBoardFiles,
        boardData,
        setBoardData,
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

export default useBoardWriteData;