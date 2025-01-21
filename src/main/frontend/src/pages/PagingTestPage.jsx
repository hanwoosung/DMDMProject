import React, { useState, useEffect } from 'react';
import PagingButtons from '../components/common/PagingButtons';
import styles from "../assets/css/common/Paging.module.css";
/*

    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ
    API로 테스트 했을 때 예시 일단 나는 안해봄 이렇게 하라고함 ㅋㅋ


// API 요청을 보내는 함수 (가상의 API 함수 예시)
const fetchData = async (page) => {
    setIsLoading(true);  // 로딩 시작
    try {
        // 여기서 실제 API 호출을 합니다.
        // 예시: const response = await fetch(`https://api.example.com/data?page=${page}&size=${pageSize}`);
        // const data = await response.json();

        // 더미 데이터 대신 실제 API 응답 데이터를 사용
        const totalCount = 30000;
        const totalPage = Math.ceil(totalCount / pageSize);

        const dummyPagingData = {
            totalPage: totalPage,
            currentPage: page,
            startPage: Math.floor((page - 1) / pageBtnCount) * pageBtnCount + 1,
            endPage: Math.min(Math.floor((page - 1) / pageBtnCount) * pageBtnCount + pageBtnCount, totalPage),
            prevBtn: page > 1,
            nextBtn: page < totalPage,
            firstPageBtn: page > 1,
            lastPageBtn: page < totalPage,
        };

        setPagingData(dummyPagingData);  // 응답 받은 데이터로 상태 갱신
    } catch (error) {
        console.error("API 요청 실패:", error);
    } finally {
        setIsLoading(false);  // 로딩 종료
    }
};

    // 페이지가 변경될 때마다 API 호출
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);  // currentPage가 변경될 때마다 실행


    const handlePageChange = (page) => {
        setCurrentPage(page);  // 페이지 번호가 바뀌면 상태 업데이트
    };
*/

const PagingTestPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingData, setPagingData] = useState(null);

    const pageSize = 10;
    const pageBtnCount = 10;

    useEffect(() => {
        const totalCount = 120;
        const totalPage = Math.ceil(totalCount / pageSize);

        const startPage = Math.floor((currentPage - 1) / pageBtnCount) * pageBtnCount + 1;
        const endPage = Math.min(startPage + pageBtnCount - 1, totalPage);

        const nextBtn = endPage < totalPage && currentPage < totalPage;

        const dummyPagingData = {
            totalPage: totalPage,
            currentPage: currentPage,
            startPage: Math.floor((currentPage - 1) / pageBtnCount) * pageBtnCount + 1,
            endPage: Math.min(Math.floor((currentPage - 1) / pageBtnCount) * pageBtnCount + pageBtnCount, totalPage),
            prevBtn: currentPage > 1,
            nextBtn : nextBtn,
            firstPageBtn: currentPage > 1,
            lastPageBtn: currentPage < totalPage,
        };

        setPagingData(dummyPagingData);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);

    };

    if (!pagingData) return <div>Loading...</div>;

    return (
        <div >
            <h2>Paging Test Page</h2>
            {/* 여기서 PagingButtons 컴포넌트를 사용 */}
            <PagingButtons
                currentPage={currentPage}
                pageSize={pageSize}
                pageBthSize={pageBtnCount}
                onPageChange={handlePageChange}
                pagingData={pagingData}
            />
        </div>
    );
};

export default PagingTestPage;
