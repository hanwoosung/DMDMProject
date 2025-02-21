import CommentStyle from "../../assets/css/board/Comment.module.css";
import profileImg from "../../assets/image/ex_profile.png";
import Level from "../common/LevelComponents";
import CommentLikes from "./CommentLikesComponents";
import {ReactComponent as More} from "../../assets/image/icon_more.svg";
import CommentWrite from "./CommentWriteComponents";
import Depth from "./DepthComponents";
import React, {useEffect, useRef, useState} from "react";
import CommentMore from "./CommentMoreComponents";
import DOMPurify from "dompurify";
import BoardStyle from "../../assets/css/board/Board.module.css";
import UserMore from "./UserMoreComponents";

const Comment = ({
                     handleLike,
                     handleSaveComment,
                     comment,
                     type = "",
                     scrollToComment,
                     refCallback,
                     isHighlighted, // 🔥 강조 여부 prop 추가
                     setAlertMessage,
                     setIsAlert
                 }) => {

    const [edit, setEdit] = useState(false);
    const [isHidden, setIsHidden] = useState(comment.blackListYn === "Y" || comment.hateCnt >= 20);

    let containerClass = "container";
    if (type === "best") containerClass = "bestContainer";
    if (type === "answer") containerClass = "answerContainer";

    const [commentMore, setCommentMore] = useState(false);
    const commentMoreRef = useRef(null);

    const [userMore, setUserMore] = useState(false);
    const userMoreRef = useRef(null); // `UserMore`을 감지할 ref

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentMoreRef.current && !commentMoreRef.current.contains(event.target)) {
                setCommentMore(false);
            }

            if (userMoreRef.current && !userMoreRef.current.contains(event.target)) {
                setUserMore(false);
            }
        };

        if (commentMore) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        if (setUserMore) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [commentMore, userMore]);


    const sanitizedContent = DOMPurify.sanitize(comment.commentContent, {
        ADD_TAGS: ["iframe"], // 🚀 iframe 허용
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"]
    });

    return (
        <div className={`${CommentStyle.flexColum}`}
             ref={refCallback}> {/* 🔥 강조 클래스 추가 */}
            <div className={`${CommentStyle.flexRow}`}>
                <Depth depth={comment.depth} />

                <div
                    className={`${CommentStyle[containerClass]} ${isHighlighted ? CommentStyle.commentHighlight : ""}`}>
                    <div style={{position: "relative"}}>
                        <img className={CommentStyle.profile}
                             src={comment.filePath}
                             onError={(e) => {
                                 e.target.src = profileImg;
                             }}  // 이미지 로드 실패 시 기본 이미지로 대체
                             alt="Profile" onClick={() => {
                            setUserMore(true)
                        }} />
                        {userMore && (
                            <div className={BoardStyle.relative} ref={userMoreRef}>
                                <UserMore setIsAlert={setIsAlert} setAlertMessage={setAlertMessage}
                                          userId={comment.userId}
                                          userName={comment.userName} />
                            </div>
                        )}
                    </div>
                    <div className={CommentStyle.commentDetail}>
                        <div className={CommentStyle.userInfo}>
                            <span>
                                <Level level={comment.userLevel} />
                                <span>{comment.userName}</span>
                            </span>
                            <span>{comment.insert}</span>
                        </div>


                        <div className={CommentStyle.commentInfo}>
                            {comment.status === "ACTIVE" ? (
                                comment.commentType === "EMOTICON" ? (
                                    <div dangerouslySetInnerHTML={{__html: sanitizedContent}} />
                                ) : (
                                    comment.commentContent
                                )
                            ) : (
                                <b>삭제된 게시글 입니다.</b>
                            )}

                            {isHidden && comment.status === "ACTIVE" && (
                                <div
                                    className={isHidden ? CommentStyle.on : CommentStyle.off}
                                    onClick={() => setIsHidden(false)}
                                >
                                    {comment.blackListYn === "Y"
                                        ? "블랙리스트로 추가된 사용자의 댓글입니다."
                                        : "블라인드된 댓글입니다."}
                                </div>
                            )}
                        </div>

                        <div className={CommentStyle.btnInfo} ref={commentMoreRef}>
                            <CommentLikes cnt={comment.likeCnt}
                                          status={comment.loginLikes === "LIKE" ? "LIKE" : ""}
                                          onClick={() => {
                                              handleLike(comment.commentId, "COMMENT", "LIKE", comment.loginLikes)
                                          }} />
                            <CommentLikes type={"hate"}
                                          cnt={comment.hateCnt}
                                          status={comment.loginLikes === "HATE" ? "HATE" : ""}
                                          onClick={() => {
                                              handleLike(comment.commentId, "COMMENT", "HATE", comment.loginLikes)
                                          }} />
                            {type === "best" ? (
                                <span onClick={() => scrollToComment(comment.commentId)}>이동</span>
                            ) : (
                                <span onClick={() => setEdit(!edit)}>
                                    {edit ? "닫기" : "답글"}
                                </span>
                            )}
                            <span ref={commentMoreRef}>
                                <More onClick={() => setCommentMore(!commentMore)} />
                                {commentMore && <CommentMore status={commentMore}
                                                             setAlertMessage={setAlertMessage}
                                                             setIsAlert={setIsAlert}
                                                             userId={comment.userId}
                                                             boardId={comment.boardId}
                                                             commentId={comment.commentId} />}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {(type !== "best" && edit) ?
                (
                    <div className={CommentStyle.commentWriteWrap}>
                        <Depth depth={comment.depth} type={false} />
                        <CommentWrite handleSaveComment={handleSaveComment}
                                      comment={{
                                          commentId: null,
                                          parentCommentId: comment.commentId,
                                          boardId: comment.boardId,
                                          depth: comment.depth + 1,
                                          commentContent: "",
                                          commentType: "TEXT",
                                      }} />
                    </div>
                ) :
                ""
            }

        </div>
    );
}

export default Comment;