import Title from "../../components/common/TitleComponents";
import SmallBtn from "../../components/common/SmallBtnComponents";

import BlackListStyle from "../../assets/css/mypage/blackList/BlackList.module.css";
import PagingButtons from "../../components/common/PagingButtons";
import React, {useEffect, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import Alert from "../../components/common/AlertComponents";
import Confirm from "../../components/common/ConfirmComponents";
import useApi from "../../hooks/common/useApi";

const BlackListPage = () => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pagingData, setPagingData] = useState({});
    const pageSize = 10;

    const [blackList, setBlackList] = useState([]);

    // ✅ 전체 체크 상태 관리
    const [isAllChecked, setIsAllChecked] = useState(false);

    const {
        data: blackListEvent,
        blackListEventLoading
    } = useFetch(`/api/v1/mypage/black-list?page=${currentPage}&size=${pageSize}`, {}, "get");

    useEffect(() => {
        if (blackListEvent) {
            if (blackListEvent.statusCode === 200) {
                setBlackList(blackListEvent.data.blackList);
                setPagingData(blackListEvent.data.paging);
            } else {
                setIsAlert(true);
                setAlertMessage(blackListEvent.message);
            }
        }
    }, [blackListEvent]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    // ✅ 개별 체크박스 선택 기능
    const handleCheckboxChange = (receiveUserId) => {
        const newData = blackList.map((item) =>
            item.receiveUserId === receiveUserId ? {...item, checked: !item.checked} : item
        );
        setBlackList(newData);

        // ✅ 모든 체크박스가 체크되었는지 확인
        setIsAllChecked(newData.every(item => item.checked));
    };

    // ✅ 전체 선택/해제 기능
    const handleAllCheckboxChange = () => {
        const newCheckedState = !isAllChecked;
        setBlackList(blackList.map(item => ({...item, checked: newCheckedState})));
        setIsAllChecked(newCheckedState);
    };

    const handleDeleteBlackList = () => {

        del("/api/v1/mypage/black-list", {
            headers: {"Content-Type": "application/json"},
            body: blackList.filter((black) => black.checked),
        }).then((res) => {

            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }



        }).catch((res) => {
            setIsAlert(true);
            setAlertMessage(res.message);
        });

    }
    return (
        <div>
            <Title title={"블랙리스트"} />
            <div className={BlackListStyle.flexRight}>
                <SmallBtn title={"해제"}
                          onClick={handleDeleteBlackList} />
            </div>
            <div className={BlackListStyle.tableContainer}>
                <table className={BlackListStyle.table}>
                    <thead>
                        <tr>
                            <th className={BlackListStyle.checkbox}>
                                {/* ✅ 전체 체크박스 */}
                                <input
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={handleAllCheckboxChange}
                                />
                            </th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>차단일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blackList.map((black) => (
                            <tr key={black.receiveUserId}>
                                <td className={BlackListStyle.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={black.checked}
                                        onChange={() => handleCheckboxChange(black.receiveUserId)}
                                    />
                                </td>
                                <td>{black.receiveUserId}</td>
                                <td>{black.userName}</td>
                                <td>{black.insertDt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <PagingButtons
                    currentPage={currentPage}
                    pageSize={pageSize}
                    pageBthSize={10}  // 페이지 그룹 크기
                    onPageChange={handlePageChange}
                    pagingData={pagingData}
                />
            </div>
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
};


export default BlackListPage;
