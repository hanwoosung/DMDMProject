import {useEffect, useState} from "react";
import useFetch from "../../hooks/common/useFetch";

const useBoardWriteData = () => {

    const [hashTags, setHashTags] = useState([]);
    const [boardType, setBoardType] = useState([]);

    const {data: fetchedEvents, loading} = useFetch(`/api/v1/gubn`, {
        data: {
            parentCode: "board_category"
        }
    }, "post");

    useEffect(() => {

        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents) {
            const selectInfo = fetchedEvents.data.map((data) => {
                return {
                    value: data.code,
                    label: data.name
                }
            })

            setBoardType(selectInfo);
        }

    }, [fetchedEvents]);

    return {hashTags, setHashTags, boardType}
}

export default useBoardWriteData;