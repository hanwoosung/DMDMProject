import CommentWriteStyle from "../../assets/css/board/CommentWrite.module.css";
import TextArea from "../common/TextAreaComponents";
import SmallBtn from "../common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";
import React, {useState} from "react";

import {ReactComponent as CommentEmoticon} from "../../assets/image/icon_comment_emoticon.svg";
import EmojiGrid from "./EmojiGridComponents";
import Alert from "../common/AlertComponents";
import Confirm from "../common/ConfirmComponents";

const CommentWrite = ({
                          style,
                          comment = {
                              commentId: null,
                              parentCommentId: null,
                              boardId: null,
                              depth: 0,
                              commentContent: "",
                              commentType: "TEXT",
                          },
                          handleSaveComment
                      }) => {

    const [commentValue, setCommentValue] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isEmojiGridVisible, setIsEmojiGridVisible] = useState(false); // 이모지 창 상태 추가

    const handleSaveEmoticon = (src) => {

        const content = `<img alt="이모티콘" width="100" height="100" draggable="false" src="${src}">`

        let emoticon = {
            ...comment,
            commentType: "EMOTICON",
            commentContent: content
        }

        handleSaveComment(emoticon, setCommentValue);
        setIsEmojiGridVisible(false);
    }

    return (
        <div className={CommentWriteStyle.container} style={style}>
            <TextArea style={{margin: "10px", height: "130px", width: "98%"}}
                      contents={commentValue}
                      onChange={(e) => {
                          setCommentValue(e.target.value);
                      }} />
            <div className={CommentWriteStyle.btnWrap}>
                <span>
                    <CommentEmoticon
                        width={30}
                        height={30}
                        onClick={() => setIsEmojiGridVisible(!isEmojiGridVisible)} />
                    <SmallBtn title={"작성"}
                              onClick={() => {
                                  comment.commentContent = commentValue;
                                  handleSaveComment(comment, setCommentValue);
                              }} />
                </span>
            </div>

            {isEmojiGridVisible && (
                <EmojiGrid
                    handleSaveEmoticon={handleSaveEmoticon}
                    setIsEmojiGridVisible={setIsEmojiGridVisible}
                    setAlertMessage={setAlertMessage}
                    setIsAlert={setIsAlert} />
            )}

            <Alert message={alertMessage}
                   isVisible={isAlert}
                   onAlert={() => {
                       setIsAlert(false);
                   }} />

        </div>
    );
}

export default CommentWrite;