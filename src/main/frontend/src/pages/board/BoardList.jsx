import Title from "../../components/common/TitleComponents";
import BoardListStyle from "../../assets/css/board/BoardList.module.css";
import React from "react";
import BoardListHandler from "../../services/board/BoardListHandler";
import Alert from "../../components/common/AlertComponents";
import Confirm from "../../components/common/ConfirmComponents";
import NoticeList from "../../components/board/NoticeListComponents";
import {useNavigate} from "react-router-dom";
import Select from "../../components/common/SelectComponents";
import BasicBoardList from "../../components/board/BasicBoardListComponent";

const BoardList = () => {

    const {
        boardList,
        boardType,
        alertMessage,
        setAlertMessage,
        isAlert,
        setIsAlert,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage
    } = BoardListHandler();


    return (
        <div className={BoardListStyle.boardListContainer}>
            <Title title={boardType.name} />

            <NoticeList />

            <div className={BoardListStyle.selectWrap}>
                <Select style={{position: "right"}}
                        options={[{value: "recent", label: "최신순"}, {value: "pop", label: "인기순"}]}
                />
            </div>

            <BasicBoardList boardList={boardList}/>

            <Alert message={alertMessage}
                   isVisible={isAlert}
                   onAlert={() => {
                       setIsAlert(false);
                   }} />

            <Confirm message={confirmMessage}
                     isVisible={isConfirmVisible}
                     onConfirm={() => {
                         setIsConfirmVisible(false);
                     }}
                     onCancel={() => {
                         setIsConfirmVisible(false)
                     }} />
        </div>
    );
}

export default BoardList;