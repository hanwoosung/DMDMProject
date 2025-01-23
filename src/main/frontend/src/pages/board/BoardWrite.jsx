import React, {useRef} from "react";
import BoardWriteStyles from "../../assets/css/board/BoardWrite.module.css";
import Title from "../../components/common/TitleComponents";
import Input from "../../components/common/InputComponents";
import SubTitle from "../../components/common/SubTitleComponents";
import HashTag from "../../components/board/HashTagComponents";
import BoardWriteHandler from "../../services/board/BoardWriteHandler";
import Select from "../../components/common/SelectComponents";
import BigBtn from "../../components/common/BigBtnComponents";
import Tiptap from "../../components/editor/TipTapEditor";

const BoardWrite = () => {
    const {
        handleRemoveHashTag,
        handleAddHashTag,
        handleSave,
        hashTags,
        boardType,
        editorRef,
        setBoardFiles,
        boardData,
        setBoardData,
        alertMessage,
        setAlertMessage
    } = BoardWriteHandler();

    return (
        <div className={BoardWriteStyles.boardWriteContainer}>
            <Title title="게시글 작성" />

            <SubTitle title="제목" />
            <Input
                width={"100%"}
                maxLength={100}
                placeholder={"제목을 입력 해주세요"}
                onChange={(e) =>
                    setBoardData((prevState) => ({
                        ...prevState,
                        title: e.target.value, // 제목 상태 업데이트
                    }))
                }
            />

            <Select
                display={"none"}
                options={boardType}
                onChange={(value) => {
                    // setSelectedBoardType(e.target.value); // 선택된 값으로 상태 업데이트
                    setBoardData((prevState) => ({
                        ...prevState,
                        boardType: value, // 게시판 유형 상태 업데이트
                    }));
                }}
                value={boardData.boardType} // 초기값 설정
            />

            <SubTitle title="내용" />
            <Tiptap
                onEditorReady={(editor) => (editorRef.current = editor)}
                setFiles={setBoardFiles}
            />

            <SubTitle title="해시태그 (5개)" />
            <HashTag
                hashTags={hashTags}
                onAdd={handleAddHashTag}
                onRemove={handleRemoveHashTag}
            />

            <BigBtn
                title={"저장"}
                margin={"20px 0px 20px 0px"}
                onClick={handleSave}
            />
        </div>
    );
};

export default BoardWrite;