import {useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/common/useFetch";

const useBoardWriteData = () => {

    const [hashTags, setHashTags] = useState([]);
    const [boardType, setBoardType] = useState([]);
    const editorRef = useRef(null); // 에디터 객체를 참조

    // 저장 버튼 클릭 시 호출되는 함수
    const handleSave = () => {
        if (editorRef.current) {
            const content = editorRef.current.getHTML(); // 에디터 내용 가져오기
            console.log("Editor Content:", content); // 콘솔에 출력 (디버깅용)
            alert("작성된 내용:\n" + content); // 작성된 내용을 확인
        }
    };

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

    return {hashTags, setHashTags, boardType, editorRef}
}

export default useBoardWriteData;