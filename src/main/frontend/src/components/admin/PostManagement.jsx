import React, {useEffect, useState} from "react";
import styles from "../../assets/css/admin/PostManagement.module.css";
import SmallBtn from "../common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";
import Select from "../common/SelectComponents";
import Input from "../common/InputComponents";

const PostManagement = () => {
    const {post} = useApi();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("게시글 관리");
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
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

    const fetchCategoryCodes = async () => {
        const response = await post(`/api/v1/gubn`, {
            body: {parentCode: "BOARD_CATEGORY"},
        });
        return response?.data || [];
    };

    useEffect(() => {
        const fetchAndSetCategoryCodes = async () => {
            const updatedTopGubns = await fetchCategoryCodes();
            setCategorys(updatedTopGubns.map((gubn) => ({value: gubn.code, label: gubn.name})));
        };
        fetchAndSetCategoryCodes();
    }, []);

    useEffect(() => {

    }, [setCategorys]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.filterContainer}>
                    <SmallBtn title={"활성화"}/>
                    <SmallBtn title={"비활성화"}/>
                    <Select options={[...categorys]}
                            onChange={(value) => {
                                setSelectedCategory(value);
                            }}
                            value={selectedCategory}/>
                    <Input
                        type="text"
                        placeholder="아이디로 검색 하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SmallBtn title={"검색"}/>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeaders}>
                    <h2 className={`${styles.subtitle} ${selectedTitle === "게시글 관리" && styles.selectHeader}`}
                        onClick={() => setSelectedTitle("게시글 관리")}>게시글 관리</h2>
                    <h2 className={`${styles.subtitle} ${selectedTitle === "댓글 관리" && styles.selectHeader}`}
                        onClick={() => setSelectedTitle("댓글 관리")}>댓글 관리</h2>
                </div>
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
                            <td><input type="checkbox"/></td>
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
        </div>
    );
};

export default PostManagement;