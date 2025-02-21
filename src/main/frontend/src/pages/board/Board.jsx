import Title from "../../components/common/TitleComponents";
import BoardStyle from "../../assets/css/board/Board.module.css";
import profileImg from "../../assets/image/ex_profile.png";
import Level from "../../components/common/LevelComponents";
import ListTag from "../../components/board/ListTagComponents";
import Likes from "../../components/board/LikesComponents";
import CommentWrite from "../../components/board/CommentWriteComponents";
import SubTitle from "../../components/common/SubTitleComponents";
import Comment from "../../components/board/CommentComponents";
import {ReactComponent as More} from "../../assets/image/icon_more.svg";
import {ReactComponent as Share} from "../../assets/image/icon_share.svg";
import BoardHandler from "../../services/board/BoardHandler";
import DOMPurify from "dompurify";
import Alert from "../../components/common/AlertComponents";
import Confirm from "../../components/common/ConfirmComponents";
import React, {useEffect, useRef, useState} from "react";
import BoardMore from "../../components/board/BoardMoreComponents";
import UserMoreComponents from "../../components/board/UserMoreComponents";
import UserMore from "../../components/board/UserMoreComponents";

const Board = () => {

    const {
        board,
        comments,
        alertMessage,
        setAlertMessage,
        isAlert,
        setIsAlert,
        isConfirmVisible,
        setIsConfirmVisible,
        confirmMessage,
        setConfirmMessage,
        handleLike,
        handleSaveComment
    } = BoardHandler();

    const sanitizedContent = DOMPurify.sanitize(board.boardContent, {
        ADD_TAGS: ["iframe"], // 🚀 iframe 허용
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"]
    });

    const commentRefs = useRef({});

    // 댓글 요소를 저장하는 함수
    const registerCommentRef = (commentId, element) => {
        if (element) {
            commentRefs.current[commentId] = element;
        }
    };

    const [highlightedComment, setHighlightedComment] = useState(null); // 🔥 강조할 댓글 ID 저장

    const scrollToComment = (commentId) => {
        const targetElement = commentRefs.current[commentId];
        if (targetElement) {
            targetElement.scrollIntoView({behavior: "smooth", block: "center"});
            setHighlightedComment(commentId); // 🔥 이동한 댓글 강조
            setTimeout(() => setHighlightedComment(null), 500); // 0.5초 후 강조 제거
        }
    };

    const [boardMore, setBoardMore] = useState(false);
    const boardMoreRef = useRef(null); // 🔥 `BoardMore`을 감지할 ref

    const [userMore, setUserMore] = useState(false);
    const userMoreRef = useRef(null); // `UserMore`을 감지할 ref

    useEffect(() => {
        const handleClickOutside = (event) => {
            // BoardMore 외부 클릭 시 닫기
            if (boardMoreRef.current && !boardMoreRef.current.contains(event.target)) {
                setBoardMore(false);
            }

            // UserMore 외부 클릭 시 닫기 (🔥 단, UserMore 내부 클릭이면 닫지 않음!)
            if (userMoreRef.current && !userMoreRef.current.contains(event.target)) {
                setUserMore(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [boardMore, userMore]); // ✅ 상태 변경 감지하여 실행


    return (
        <div className={BoardStyle.boardContainer}>
            <Title title={board.boardTypeName} />
            <div className={BoardStyle.infoWrap}>
                <div className={BoardStyle.flex} ref={userMoreRef}>
                    <img
                        className={BoardStyle.profile}
                        src={board.filePath}
                        onError={(e) => {
                            e.target.src = profileImg;
                        }}
                        alt="Profile"
                        onClick={() => setUserMore(!userMore)} // ✅ 이미지 클릭 시 UserMore 열기/닫기
                    />
                    <div className={BoardStyle.flexColumn}>
        <span>
            <Level level={board.userLevel} />
        </span>
                        <span>{board.userName}</span>
                    </div>

                    {/* 🔥 UserMore을 프로필 이미지 클릭 시 열도록 변경 */}
                    {userMore && (
                        <div className={BoardStyle.relative} ref={userMoreRef}>
                            <UserMore setIsAlert={setIsAlert} setAlertMessage={setAlertMessage}
                                      userId={board.userId} />
                        </div>
                    )}
                </div>

                <div className={BoardStyle.flexRight}>
                    <div className={BoardStyle.boardInfo}>
                        <span>조회수 {board.vcnt}</span>
                        <span>{board.insert}</span>
                    </div>
                    <div className={BoardStyle.boardInfo}>
                        <span><Share width={24} height={24} onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                                .then(() => {
                                    setIsAlert(true);
                                    setAlertMessage("주소가 복사되었습니다.");
                                })
                                .catch(err => console.error("🚨 URL 복사 실패:", err));
                        }} /></span>
                        <span className={BoardStyle.relative} ref={boardMoreRef}>
                            <More onClick={() => {
                                setBoardMore(!boardMore)
                            }} />
                            {boardMore && <BoardMore status={boardMore}
                                                     setAlertMessage={setAlertMessage}
                                                     setIsAlert={setIsAlert}
                                                     boardType={board.boardType}
                                                     userId={board.userId}
                                                     boardId={board.boardId} />}
                        </span>
                    </div>
                </div>
            </div>

            <div className={BoardStyle.boardContent}
                 dangerouslySetInnerHTML={{__html: sanitizedContent}}>
            </div>

            <div className={BoardStyle.likeHate}>
                <Likes type={"good"}
                       cnt={board.likeCnt}
                       onClick={() => {
                           handleLike(board.boardId, "BOARD", "LIKE", board.loginLikes);
                       }}
                       status={board.loginLikes === "LIKE" ? "LIKE" : ""} />
                <Likes type={"hate"}
                       cnt={board.hateCnt}
                       onClick={() => {
                           handleLike(board.boardId, "BOARD", "HATE", board.loginLikes);
                       }}
                       status={board.loginLikes === "HATE" ? "HATE" : ""} />
            </div>

            <ListTag tagList={board.tags} />

            <div className={BoardStyle.commentContent}>
                <CommentWrite handleSaveComment={handleSaveComment}
                              comment={{
                                  commentId: null,
                                  parentCommentId: 0,
                                  boardId: board.boardId,
                                  depth: 0,
                                  commentContent: "",
                                  commentType: "TEXT",
                              }} />
            </div>

            <hr className={BoardStyle.line} />
            <SubTitle title={"베스트 댓글"}
                      style={{fontWeight: "bold", fontSize: "1.3rem"}}
                      sub={"(" + (comments ? comments.filter((comment) => comment.likeCnt >= 20).length : 0) + ")"} />

            {comments.map((comment) => (
                comment.likeCnt >= 20 ? (
                    <Comment
                        handleLike={handleLike}
                        handleSaveComment={handleSaveComment}
                        comment={comment}
                        type={"best"}
                        scrollToComment={scrollToComment}
                    />) : ""
            ))}

            <hr className={BoardStyle.line} />
            <SubTitle title={"댓글"}
                      style={{fontWeight: "bold", fontSize: "1.3rem"}}
                      sub={"(" + comments.length + ")"} />

            {comments.map((comment) => (
                <Comment
                    handleLike={handleLike}
                    handleSaveComment={handleSaveComment}
                    comment={comment}
                    type={comment.depth > 0 ? "answer" : ""}
                    refCallback={(el) => registerCommentRef(comment.commentId, el)}
                    isHighlighted={highlightedComment === comment.commentId}
                    setAlertMessage={setAlertMessage}
                    setIsAlert={setIsAlert}
                />
            ))}

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

}

export default Board;