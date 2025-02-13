import React from "react";
import styles from "../../assets/css/admin/PostManagement.module.css";

const PostTable = ({posts}) => {
    return (
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
            {posts?.map((post) => (
                <tr key={post.boardId}>
                    <td><input type="checkbox"/></td>
                    <td>{post.boardId}</td>
                    <td>{post.userId}</td>
                    <td>{post.boardType}</td>
                    <td>{post.boardTitle}</td>
                    <td>{post.insert}</td>
                    <td>{post.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PostTable;
