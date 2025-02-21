import {useEffect, useState} from "react";
import useFetch from "../../hooks/common/useFetch";
import {useParams} from "react-router-dom";
import useApi from "../../hooks/common/useApi";

const useBoardHandler = () => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const {boardId: boardIdParam} = useParams();

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");

    const [board, setBoard] = useState({
        boardId: "",
        boardType: "",
        boardTypeName: "",
        boardTitle: "",
        boardContent: "",
        userId: "",
        userName: "",
        userLevel: 0,
        insert: "",
        insertDt: "",
        updateDt: "",
        status: "",
        likeCnt: 0,
        hateCnt: 0,
        loginLikes: "",
        tag: "",
        tags: [],
        vcnt: 0
    });

    const [comments, setComments] = useState([]);

    const {data: boardEvents, loading} = useFetch(`/api/v1/board/${boardIdParam}`, {}, "get");

    useEffect(() => {
        if (boardEvents && boardEvents.statusCode === 200) {
            setBoard(boardEvents.data.board);
            setComments(boardEvents.data.comments);
        } else if (boardEvents) {
            setIsAlert(true);
            setAlertMessage(boardEvents.message);
        }
    }, [boardEvents]);


    const handleLike = async (likeTarget, likeTargetType, likeType, loginLikes) => {
        const params = {
            likeTarget,
            likeTargetType,
            likeType,
            loginLikes
        };

        try {
            const res = await post("/api/v1/board/likes", {
                headers: {"Content-Type": "application/json"},
                body: params,
            });

            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }

            if (likeTargetType === "BOARD") {

                setBoard((prevState) => {
                    let newLikeCnt = prevState.likeCnt;
                    let newHateCnt = prevState.hateCnt;

                    if (likeType === "LIKE") {
                        if (prevState.loginLikes === "LIKE") {
                            newLikeCnt -= 1; // 기존 좋아요 취소
                        } else {
                            newLikeCnt += 1;
                            if (prevState.loginLikes === "HATE") newHateCnt -= 1; // 싫어요 → 좋아요 변경
                        }
                    } else if (likeType === "HATE") {
                        if (prevState.loginLikes === "HATE") {
                            newHateCnt -= 1; // 기존 싫어요 취소
                        } else {
                            newHateCnt += 1;
                            if (prevState.loginLikes === "LIKE") newLikeCnt -= 1; // 좋아요 → 싫어요 변경
                        }
                    }

                    return {
                        ...prevState,
                        loginLikes: prevState.loginLikes === likeType ? "" : likeType,
                        likeCnt: newLikeCnt,
                        hateCnt: newHateCnt
                    };
                });
            } else {
                setComments((prevState) => {
                    return prevState.map((comment) => {
                        if (comment.commentId === likeTarget) {
                            let newLikeCnt = comment.likeCnt;
                            let newHateCnt = comment.hateCnt;

                            if (likeType === "LIKE") {
                                if (comment.loginLikes === "LIKE") {
                                    newLikeCnt -= 1;
                                } else {
                                    newLikeCnt += 1;
                                    if (comment.loginLikes === "HATE") newHateCnt -= 1;
                                }
                            } else if (likeType === "HATE") {
                                if (comment.loginLikes === "HATE") {
                                    newHateCnt -= 1;
                                } else {
                                    newHateCnt += 1;
                                    if (comment.loginLikes === "LIKE") newLikeCnt -= 1;
                                }
                            }

                            return {
                                ...comment,
                                loginLikes: comment.loginLikes === likeType ? "" : likeType,
                                likeCnt: newLikeCnt,
                                hateCnt: newHateCnt
                            };
                        } else {
                            return comment;
                        }
                    });
                });
            }

        } catch (res) {
            setIsAlert(true);
            setAlertMessage(res.message);
        }
    };


    const handleSaveComment = (comment, setCommentValue) => {

        if (comment.commentContent === "") {
            setIsAlert(true);
            setAlertMessage("댓글내용을 작성해 주세요");
        }

        post("/api/v1/comment", {
            headers: {"Content-Type": "application/json"},
            body: comment,
        }).then((res) => {
            if (res.statusCode !== 200) {
                setIsAlert(true);
                setAlertMessage(res.message);
                return;
            }

            setComments(res.data);

            setCommentValue("");

        }).catch((res) => {
            setIsAlert(true);
            setAlertMessage(res.message);
        });

    }


    return {
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
    }
}

export default useBoardHandler;