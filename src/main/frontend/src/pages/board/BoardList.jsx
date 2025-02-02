import Title from "../../components/common/TitleComponents";
import BoardListStyle from "../../assets/css/board/BoardWrite.module.css";
import React from "react";

const BoardList = () => {

    return (
        <div className={BoardListStyle.boardWriteContainer}>
            <Title title="게시글"/>
        </div>
    );
}

export default BoardList;