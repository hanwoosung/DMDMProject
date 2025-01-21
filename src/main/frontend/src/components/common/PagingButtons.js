import React from 'react';
import styles from "../../assets/css/common/Paging.module.css";

const PagingButtons = ({ currentPage, pageSize, onPageChange, pagingData }) => {
    const { totalPage, startPage, endPage, prevBtn, nextBtn, firstPageBtn, lastPageBtn } = pagingData;

    const handlePageClick = (page) => {
        if (page < 1 || page > totalPage) return;
        onPageChange(page);
    };

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => handlePageClick(i)}
                disabled={i === currentPage}
                className={i === currentPage ? styles.active : ''}
            >
                {i}
            </button>
        );
    }

    return (
        <div className={styles.pagingButtons}>
            {/* First 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? styles.disabled : ''}
            >
                Start
            </button>

            {/* Prev 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? styles.disabled : ''}
            >
                Prev
            </button>

            {/* 페이지 번호 버튼 */}
            {pageButtons}

            {/* Next 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPage}
                className={currentPage === totalPage ? styles.disabled : ''}
            >
                Next
            </button>

            {/* Last 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(totalPage)}
                disabled={currentPage === totalPage}
                className={currentPage === totalPage ? styles.disabled : ''}
            >
                End
            </button>
        </div>
    );
};

export default PagingButtons;
