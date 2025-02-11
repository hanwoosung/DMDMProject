import React, { useState } from "react";
import styles from "../../assets/css/admin/PostManagement.module.css";

const PostManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: "dog123",
            category: "Q&A",
            title: "나 차키없샘",
            date: "2025-01-07 18:01",
            status: "활성"
        }
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <button className={styles.activeBtn}>활성화</button>
                <button className={styles.inactiveBtn}>비활성화</button>
                <select className={styles.categorySelect}>
                    <option>Q&A</option>
                </select>
                <input
                    type="text"
                    placeholder="이름으로 검색 하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchBtn}>검색</button>
            </div>

            <div className={styles.tableContainer}>
                <h2 className={styles.subtitle}>게시글 관리</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>게시글 번호</th>
                        <th>아이디</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>등록일시</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td><input type="checkbox" /></td>
                            <td>{post.id}</td>
                            <td>{post.username}</td>
                            <td>{post.category}</td>
                            <td>{post.title}</td>
                            <td>{post.date}</td>
                            <td className={styles.statusBtns}>
                                <button className={styles.activateBtn}>활성화</button>
                                <button className={styles.deactivateBtn}>비활성화</button>
                                <button className={styles.deleteBtn}>삭제</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.commentContainer}>댓글 관리</div>
        </div>
    );
};

export default PostManagement;
