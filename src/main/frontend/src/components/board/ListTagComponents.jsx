import HashTagsStyles from "../../assets/css/board/HashTags.module.css";

const ListTag = ({tagList = []}) => {
    return(
        <span>
            {tagList.map((tag) => (
                <span className={HashTagsStyles.listTag}><span>#</span>{tag}</span>
            ))}
        </span>
    );
}

export default ListTag;