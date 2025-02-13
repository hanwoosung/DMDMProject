import React, {useEffect, useState} from "react";
import styles from "../../assets/css/admin/PostManagement.module.css";
import SmallBtn from "../../components/common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";
import Select from "../../components/common/SelectComponents";
import Input from "../../components/common/InputComponents";
import convertUtils from "../../assets/js/common/ConvertUtils";
import PostTable from "../../components/admin/PostTable";
import CommentTable from "../../components/admin/CommentTable";
import PagingButtons from "../../components/common/PagingButtons";

const PostManagement = () => {
    const {get, post} = useApi();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("게시글 관리");
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [posts, setPosts] = useState([]);
    const [pagingData, setPagingData] = useState()
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCategoryCodes = async () => {
        const response = await post(`/api/v1/gubn`, {
            body: {parentCode: "BOARD_CATEGORY"},
        });
        return response?.data || [];
    };

    const fetchPosts = async (selectedCategory, currentPage) => {
        const response = await get(`/api/v1/board/${selectedCategory}/management?page=${currentPage}`);
        return response?.data || [];
    };

    useEffect(() => {
        const fetchAndSetCategoryCodes = async () => {
            const updatedCategorys = await fetchCategoryCodes();
            setCategorys(updatedCategorys.map((category) => ({value: category.code, label: category.name})));
        };
        fetchAndSetCategoryCodes();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;
        const fetchAndSetPosts = async () => {
            const posts = await fetchPosts(selectedCategory, currentPage);
            console.log(posts);
            setPosts(posts.list);
            setPagingData(posts.paging);
        };
        fetchAndSetPosts();
    }, [currentPage, selectedCategory]);

    const changeCategory = (selectedCategory) => {
        setCurrentPage(1);
        setSelectedCategory(selectedCategory);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.filterContainer}>
                    <div className={styles.actionItemBox}>
                        <SmallBtn title={"활성화"}/>
                        <SmallBtn title={"비활성화"}/>
                        <Select display={selectedTitle === "댓글 관리" ? "none" : "block"} options={[...categorys]}
                                onChange={(value) => {
                                    changeCategory(value);
                                }}
                                value={selectedCategory}/>
                    </div>
                    <div className={styles.searchBox}>
                        <Input
                            type="text"
                            placeholder="아이디로 검색 하세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SmallBtn title={"검색"}/>
                    </div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeaders}>
                    <h2 className={`${styles.subtitle} ${selectedTitle === "게시글 관리" && styles.selectHeader}`}
                        onClick={() => setSelectedTitle("게시글 관리")}>게시글 관리</h2>
                    <h2 className={`${styles.subtitle} ${selectedTitle === "댓글 관리" && styles.selectHeader}`}
                        onClick={() => setSelectedTitle("댓글 관리")}>댓글 관리</h2>
                </div>
                {selectedTitle === "게시글 관리" ? <PostTable posts={posts}/> : <CommentTable comments={posts}/>}
            </div>

            {pagingData &&
                <PagingButtons
                    currentPage={currentPage}
                    pageSize={10}
                    pageBthSize={10}
                    onPageChange={(page) => setCurrentPage(page)}
                    pagingData={pagingData}
                />
            }

        </div>
    );
};

export default PostManagement;