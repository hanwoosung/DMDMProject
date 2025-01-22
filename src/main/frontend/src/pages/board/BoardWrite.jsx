import BoardWriteStyles from "../../assets/css/board/BoardWrite.module.css";
import Title from "../../components/common/TitleComponents";
import Input from "../../components/common/InputComponents";
import SubTitle from "../../components/common/SubTitleComponents";
import TextArea from "../../components/common/TextAreaComponents";
import HashTag from "../../components/board/HashTagComponents";
import BoardWriteHandler from "../../services/board/BoardWriteHandler";
import Select from "../../components/common/SelectComponents";
import BigBtn from "../../components/common/BigBtnComponents";
import Tiptap from "../../components/common/TipTapEditor";


const BoardWrite = () => {



    const {
        handleRemoveHashTag,
        handleAddHashTag,
        hashTags,
        boardType
    } = BoardWriteHandler();

    return (
        <div className={BoardWriteStyles.boardWriteContainer}>
            <Title title="게시글 작성" />

            <SubTitle title="제목" />
            <Input width={"100%"}
                   maxLength={100}
                   placeholder={"제목을 입력 해주세요"} />

            <Select options={boardType} />

            <SubTitle title="내용" />

            <Tiptap/>

            <SubTitle title="해시태그 (5개)" />
            <HashTag hashTags={hashTags}
                     onAdd={handleAddHashTag}
                     onRemove={handleRemoveHashTag} />

            <BigBtn title={"저장"}
                    margin={"20px 0px 20px 0px"}/>
        </div>
    );
};

export default BoardWrite;
