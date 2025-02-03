import HashTagsStyles from "../../assets/css/board/HashTags.module.css";

const ListTag = () => {
    return(
        <>
            <span className={HashTagsStyles.listTag}><span>#</span>aaa</span>
            <span className={HashTagsStyles.listTag}><span>#</span>nnn</span>
            <span className={HashTagsStyles.listTag}><span>#</span>sss</span>
        </>
    );
}

export default ListTag;