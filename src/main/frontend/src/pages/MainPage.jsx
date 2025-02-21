import React from 'react';
import styles from '../assets/css/MainPage.module.css';
import useFetch from '../hooks/common/useFetch';
import Level from "../components/common/LevelComponents";
import profileImg from "../assets/image/ex_profile.png";
import {ReactComponent as Rank} from "../assets/image/icon_ranking.svg";
import {ReactComponent as Comment} from "../assets/image/icon_main_comment.svg";
import see from "../assets/image/icon_main_see.png";
import {ReactComponent as Like} from "../assets/image/icon_main_like.svg";
import newImg from "../assets/image/img_new.png";
import Banner from "../components/common/Banner";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const {data, loading, error} = useFetch('/api/v1/main');
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No Data</div>;

    const {
        todayBoardList = [],
        weekBoardList = [],
        freeBoardList = [],
        qnaBoardList = [],
        userLevelRankingList = [],
        userTotalRankingList = []
    } = data.data;

    const fillEmptyPosts = (posts) => {
        const filledPosts = [...posts];
        while (filledPosts.length < 5) {
            filledPosts.push({
                boardTitle: "",
                userName: "",
                userLevel: "",
                insertDt: "",
                viewCount: 0,
                commentCount: 0,
                likeCount: 0,
                filePath: "",
                isEmpty: true
            });
        }
        return filledPosts;
    };

    const nameClickHandler = (evt) => {
        alert("프로필 페이지 구현되면 이동할거임요")
    }

    const isNewPost = (insertDt) => {
        if (!insertDt) return false;
        const postTime = new Date(insertDt).getTime();
        const now = new Date().getTime();
        return now - postTime <= 24 * 60 * 60 * 1000;
    };

    const formatInsertDt = (insertDt) => {
        if (!insertDt || typeof insertDt !== 'string') return "";
        return insertDt.length > 10 ? insertDt.substring(0, 10) : insertDt;
    };

    const formatCount = (count) => (count > 99 ? "99+" : count);


    return (
        <div>
            <Banner />
            <div className={styles.container}>
                {/* 왼쪽 사용자 랭킹 */}
                <div className={styles.sidebar}>
                    <div className={styles.userRanking}>
                        <div className={styles.rankTitle}>
                            <Rank />
                            <div>사용자 랭킹</div>
                        </div>
                        <hr style={{marginTop: "17px", color: "#AAAAAA"}} />
                        <ul style={{marginTop: "20px"}}>
                            {userLevelRankingList.map((user, index) => (
                                <li key={index} className={styles.rankItem}>
                                    <img
                                        src={user.filePath || profileImg}
                                        alt="User"
                                        className={styles.userIcon}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${profileImg}?${Date.now()}`;
                                        }}
                                    />
                                    <span title={user.userName} onClick={nameClickHandler}
                                          className={styles.userName}>{user.userName}</span>
                                    <Level level={`${user.userLevel}`} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.medalRanking}>
                        <div className={styles.rankTitle}>
                            <Rank />
                            <div>주간 랭킹</div>
                        </div>
                        <hr style={{marginTop: "17px", color: "#AAAAAA"}} />
                        <ul style={{marginTop: "20px"}}>
                            {userTotalRankingList.map((user, index) => (
                                <li key={index} className={styles.rankItem}>
                                    <img
                                        src={user.filePath || profileImg}
                                        alt="User"
                                        className={styles.userIcon}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${profileImg}?${Date.now()}`;
                                        }}
                                    />
                                    <span title={user.userName} className={styles.userName}
                                          onClick={nameClickHandler}>{user.userName}</span>
                                    <div className={styles.medalIcons}>
                                        🏅 {user.goldMedal} 🥈 {user.silverMedal} 🥉 {user.bronzeMedal}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 오른쪽 게시판 */}
                <div className={styles.boardContainer}>
                    {[
                        {title: '일간 인기글', list: todayBoardList},
                        {title: '주간 인기글', list: weekBoardList},
                        {title: '자유게시판', list: freeBoardList},
                        {title: 'Q&A', list: qnaBoardList},
                    ].map((board, idx) => (
                        <div className={styles.board} key={idx}>
                            <h3 className={styles.boardTitle}>{board.title}</h3>
                            <ul className={styles.postList}>
                                {fillEmptyPosts(board.list).map((post, index) => (
                                    <li key={index}
                                        className={`${styles.postItem} ${post.isEmpty ? styles.emptyPost : ""}`}>

                                        <div className={styles.postContent}>
                                            <div className={styles.postHeader}>
                                                <div className={styles.nameLevelWrapper}>
                                                    <img
                                                        src={post.filePath || profileImg}
                                                        alt="User"
                                                        className={styles.userIcon}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `${profileImg}?${Date.now()}`;
                                                        }}
                                                    />
                                                    <Level level={post.userLevel ? `${post.userLevel}` : ""} />
                                                    <span className={styles.postUserName}
                                                    onClick={nameClickHandler}
                                                    >{post.userName}</span>
                                                </div>
                                                <span className={styles.timeAgo}>{formatInsertDt(post.insert)}</span>
                                                <div className={styles.postFooter}>
                                                    <span><img src={see} /> {formatCount(post.vcnt)}</span>
                                                    <span><Comment /> {formatCount(post.commentCount)}</span>
                                                    <span><Like /> {formatCount(post.likeCount)}</span>
                                                </div>
                                            </div>

                                            <div className={styles.boardTitleBox}>
                                                <div className={styles.postTitle}
                                                     onClick={() => {
                                                         navigate(`/board/${post.boardId}`);
                                                     }}>{post.boardTitle || " "}</div>
                                                {isNewPost(post.insertDt) && <img src={newImg} alt="New" />}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
