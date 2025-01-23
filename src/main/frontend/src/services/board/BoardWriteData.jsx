import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams} from "react-router-dom";

const useBoardWriteData = () => {

    const {boardType: boardTypeParam} = useParams();

    const [hashTags, setHashTags] = useState([]);
    const [boardType, setBoardType] = useState([]);
    const [boardFiles, setBoardFiles] = useState([]);
    const editorRef = useRef(null); // 에디터 객체를 참조
    const [boardData, setBoardData] = useState({
        title: "",
        boardType: boardTypeParam
    });
    const [alertMessage, setAlertMessage] = useState("ㅎㅇ");

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

            setBoardType(selectInfo);
        }

    }, [fetchedEvents]);

    return {
        hashTags,
        setHashTags,
        boardType,
        editorRef,
        boardFiles,
        setBoardFiles,
        boardData,
        setBoardData,
        alertMessage,
        setAlertMessage
    }
}

export default useBoardWriteData;