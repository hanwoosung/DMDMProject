import React from "react";
import styles from "../../assets/css/admin/PostManagement.module.css";

const CommentTable = ({ comments }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>선택</th>
                    <th>댓글 번호</th>
                    <th>아이디</th>
                    <th>댓글 내용</th>
                    <th>등록일시</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                {comments?.map((comment) => (
                    <tr key={comment.commentId}>
                        <td><input type="checkbox" /></td>
                        <td>{comment.commentId}</td>
                        <td>{comment.userId}</td>
                        <td>{comment.commentContent}</td>
                        <td>{comment.insert}</td>
                        <td className={styles.statusBtns}>
                            <button className={styles.activateBtn}>활성화</button>
                            <button className={styles.deactivateBtn}>비활성화</button>
                            <button className={styles.deleteBtn}>삭제</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CommentTable;
