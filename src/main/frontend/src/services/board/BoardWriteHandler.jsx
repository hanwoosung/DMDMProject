import boardWriteData from "./BoardWriteData";

const useBoardWriteHandler = () => {

    const {
        hashTags,
        setHashTags,
        boardType,
        editorRef
    } = boardWriteData();

    const handleSave = () => {
        if (editorRef.current) {
            const content = editorRef.current.getHTML(); // 에디터 내용 가져오기
            console.log("Editor Content:", content); // 콘솔에 출력 (디버깅용)
            alert("작성된 내용:\n" + content); // 작성된 내용을 확인
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

    return {handleRemoveHashTag, handleAddHashTag, handleSave, hashTags, boardType, editorRef}
}

export default useBoardWriteHandler;