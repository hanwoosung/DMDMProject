import boardWriteData from "./BoardWriteData";
import useApi from "../../hooks/common/useApi";

const useBoardWriteHandler = () => {

    const {
        hashTags,
        setHashTags,
        boardType,
        editorRef,
        boardFiles,
        setBoardFiles,
        boardData,
        setBoardData
    } = boardWriteData();

    const {get, post, put, del, loading, error} = useApi();

    // 저장 버튼 클릭 시 호출되는 함수
    const handleSave = async () => {
        if (editorRef.current) {
            const content = editorRef.current.getHTML(); // 에디터 내용 가져오기

            // 빈 값 체크
            if (!boardData.title || !boardData.boardType) {
                alert("제목과 게시판 유형은 필수로 입력해야 합니다.");
                return; // 필수 값이 없으면 저장하지 않음
            }

            if (!content) {
                alert("내용을 입력해주세요.");
                return; // 내용이 없으면 저장하지 않음
            }


            let params = {
                files: boardFiles,
                board: boardData,
                hashTags: hashTags,
            }

            console.log(params);



            // await post("/api/v1/board", {
            //     body: params,
            //     header: "multipart/form-data"
            // });


        }
    };

    const handleAddHashTag = (tag) => {
        if (hashTags.length >= 5) return;
        if (tag && !hashTags.includes(tag)) {
            setHashTags([...hashTags, tag]);
        }
    };

    const handleRemoveHashTag = (tag) => {
        setHashTags(hashTags.filter((t) => t !== tag));
    };

    return {
        handleRemoveHashTag,
        handleAddHashTag,
        handleSave,
        hashTags,
        boardType,
        editorRef,
        setBoardFiles,
        boardData,
        setBoardData
    }
}

export default useBoardWriteHandler;