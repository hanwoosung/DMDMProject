import HashTagsStyles from "../../assets/css/board/HashTags.module.css";

const Tag = ({ value, onRemove }) => {

    return (
        <span className={HashTagsStyles.tag}>
            <span className={HashTagsStyles.tagStyle}>#</span>
            <span>{value}</span>
            <span onClick={onRemove} className={HashTagsStyles.removeTag}>X</span>
        </span>
    )

}

export default Tag;