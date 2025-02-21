import React, {useEffect, useRef, useState} from "react";
import BoardWriteStyles from "../../assets/css/board/BoardWrite.module.css";
import Title from "../../components/common/TitleComponents";
import Input from "../../components/common/InputComponents";
import SubTitle from "../../components/common/SubTitleComponents";
import HashTag from "../../components/board/HashTagComponents";
import BoardWriteHandler from "../../services/board/BoardWriteHandler";
import Select from "../../components/common/SelectComponents";
import BigBtn from "../../components/common/BigBtnComponents";
import Tiptap from "../../components/editor/TipTapEditor";
import Alert from "../../components/common/AlertComponents";
import Confirm from "../../components/common/ConfirmComponents";
import fetchAuthorizedPage from "../../services/common/fetchAuthorizedPage";
import {useLocation, useNavigate} from "react-router-dom";

const BoardWrite = () => {

    const [data, setData] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAuthorizedPage("http://localhost:8090/board", navigate, location);
            if (result) setData(result);
        };

        fetchData();
    }, [navigate, location]);

    const {
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
        isConfirmVisible,
        setIsConfirmVisible,
        setConfirmMessage,
        confirmMessage,
    } = BoardWriteHandler();

    return (
        <div className={BoardWriteStyles.boardWriteContainer}>
            <Title title={title.label + " 작성"} />

            <SubTitle title="제목" />
            <Input
                width={"100%"}
                maxLength={100}
                placeholder={"제목을 입력 해주세요"}
                onChange={(e) =>
                    setBoardData((prevState) => ({
                        ...prevState,
                        boardTitle: e.target.value, // 제목 상태 업데이트
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
                onClick={() => {
                    setConfirmMessage("저장 하시겠습니까?");
                    setIsConfirmVisible(true);
                }}
            />

            <Alert message={alertMessage}
                   isVisible={isAlert}
                   onAlert={() => {
                       setIsAlert(false);
                   }} />

            <Confirm message={confirmMessage}
                     isVisible={isConfirmVisible}
                     onConfirm={() => {
                         setIsConfirmVisible(false);
                         handleSave();
                     }}
                     onCancel={() => {
                         setIsConfirmVisible(false)
                     }} />
        </div>
    );
};

export default BoardWrite;