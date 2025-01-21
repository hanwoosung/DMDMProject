import React, {useEffect, useState} from 'react';
import PagingButtons from '../components/common/PagingButtons';

const fetchData = async (page, pageSize) => {
    try {
        const response = await fetch(`http://localhost:8090/paged-data?page=${page}&size=${pageSize}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("API 요청 실패:", error);
    }
};

const PagingTestPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagingData, setPagingData] = useState(null);
    const [items, setItems] = useState([]);
    const pageSize = 10;

    useEffect(() => {
        const loadData = async () => {
            const { data, paging } = await fetchData(currentPage, pageSize);
            setItems(data);
            setPagingData(paging);
        };

        loadData();
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (!pagingData) return <div>Loading...</div>;

    return (
        <div>
            <h2>Paging Test Page</h2>
            {/* 페이지 데이터 표시 */}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            {/* 페이징 버튼 */}
            <PagingButtons
                currentPage={currentPage}
                pageSize={pageSize}
                pageBthSize={5}  // 페이지 그룹 크기
                onPageChange={handlePageChange}
                pagingData={pagingData}
            />
        </div>
    );
};

export default PagingTestPage;
