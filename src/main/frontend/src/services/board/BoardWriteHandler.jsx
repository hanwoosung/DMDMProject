import boardWriteData from "./BoardWriteData";
import useApi from "../../hooks/common/useApi";

const useBoardWriteHandler = () => {

    const {
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
    } = boardWriteData();

    const {get, post, put, del, loading, error} = useApi();

    // 저장 버튼 클릭 시 호출되는 함수
    const handleSave = async () => {

        if (editorRef.current) {
            boardData.boardContent = editorRef.current.getHTML(); // 에디터 내용 가져오기

            // 빈 값 체크
            if (!boardData.boardTitle || !boardData.boardType) {
                setAlertMessage("제목은 필수로 입력해야 합니다.");
                setIsAlert(true);
                return; // 필수 값이 없으면 저장하지 않음
            }

            if (!boardData.boardContent || boardData.boardContent === "<p></p>") {
                setAlertMessage("내용을 입력해주세요.");
                setIsAlert(true);
                return; // 내용이 없으면 저장하지 않음
            }

            let params = {
                files: boardFiles,
                board: boardData,
                hashTags: hashTags,
            }

            setIsAlert(false);

            await post("/api/v1/board", {
                headers: {"Content-Type": "application/json"},
                body: params,
            }).then((res) => {
                if (res.statusCode !== 200) {
                    setIsAlert(true);
                    setAlertMessage(res.message);
                    return;
                }
                navigate(`/board-list/${title.value}`);

                console.log(res);
            }).catch((res) => {
                if (res.statusCode !== 200) {
                    setIsAlert(true);
                    setAlertMessage(res.message);
                    return;
                }
                console.log(res);
            });


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
        title,
        hashTags,
        boardType,
        editorRef,
        setBoardFiles,
        boardData,
        setBoardData,
        alertMessage,
        isAlert,
        setIsAlert,
        setAlertMessage,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage
    }
}

export default useBoardWriteHandler;