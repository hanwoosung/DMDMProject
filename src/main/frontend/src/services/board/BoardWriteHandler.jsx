import boardWriteData from "./BoardWriteData";

const useBoardWriteHandler = () => {

    const {
        hashTags,
        setHashTags,
        boardType
    } = boardWriteData();

    const handleAddHashTag = (tag) => {
        if (hashTags.length >= 5) return;
        if (tag && !hashTags.includes(tag)) {
            setHashTags([...hashTags, tag]);
        }
    };

    const handleRemoveHashTag = (tag) => {
        setHashTags(hashTags.filter((t) => t !== tag));
    };

    return {handleRemoveHashTag, handleAddHashTag, hashTags, boardType}
}

export default useBoardWriteHandler;