import Title from "../../components/common/TitleComponents";
import BoardListStyle from "../../assets/css/board/BoardList.module.css";
import React, {useState} from "react";
import BoardListHandler from "../../services/board/BoardListHandler";
import Alert from "../../components/common/AlertComponents";
import Confirm from "../../components/common/ConfirmComponents";
import NoticeList from "../../components/board/NoticeListComponents";
import {useNavigate} from "react-router-dom";
import Select from "../../components/common/SelectComponents";
import BasicBoardList from "../../components/board/BasicBoardListComponents";
import PagingButtons from "../../components/common/PagingButtons";
import Search from "../../components/common/SearchComponents";

const BoardList = () => {

    const {
        sortType,
        setSortType,
        search,
        setSearch,
        searchType,
        setSearchType,
        searchData,
        setSearchData,
        currentPage,
        pagingData,
        pageSize,
        boardList,
        boardType,
        alertMessage,
        setAlertMessage,
        isAlert,
        setIsAlert,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage,
        handlePageChange
    } = BoardListHandler();


    return (
        <div className={BoardListStyle.boardListContainer}>
            <Title title={boardType.name} />

            <NoticeList />

            {/*<div className={BoardListStyle.selectWrap}>*/}
            {/*    <Select style={{position: "right"}}*/}
            {/*            options={[{value: "recent", label: "최신순"}, {value: "pop", label: "인기순"}]}*/}
            {/*            value={sortType}*/}
            {/*            onChange={setSortType}*/}
            {/*    />*/}
            {/*</div>*/}

            <BasicBoardList boardList={boardList} />

            <div className={BoardListStyle.searchWrap}>
                <Search selectValue={searchType}
                        onSelectChange={setSearchType}
                        onInputChange={setSearch}
                        onClick={() => {
                            setSearchData(search);
                        }} />
            </div>

            <PagingButtons
                currentPage={currentPage}
                pageSize={pageSize}
                pageBthSize={10}  // 페이지 그룹 크기
                onPageChange={handlePageChange}
                pagingData={pagingData}
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
                     }}
                     onCancel={() => {
                         setIsConfirmVisible(false)
                     }} />
        </div>
    );
}

export default BoardList;