import CommentWriteStyle from "../../assets/css/board/CommentWrite.module.css";
import TextArea from "../common/TextAreaComponents";
import SmallBtn from "../common/SmallBtnComponents";
import useApi from "../../hooks/common/useApi";
import {useState} from "react";

import {ReactComponent as CommentEmoticon} from "../../assets/image/icon_comment_emoticon.svg";
import EmojiGrid from "./EmojiGridComponents";

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

    return (
        <div className={CommentWriteStyle.container} style={style}>
            <TextArea style={{margin: "10px", height: "130px", width: "98%"}}
                      contents={commentValue}
                      onChange={(e) => {
                          setCommentValue(e.target.value);
                      }} />
            <div className={CommentWriteStyle.btnWrap}>
                <span>
                    <CommentEmoticon width={30} height={30} />
                    <SmallBtn title={"작성"}
                              onClick={() => {
                                  comment.commentContent = commentValue;
                                  handleSaveComment(comment, setCommentValue);
                              }} />
                </span>
            </div>
            <EmojiGrid />
        </div>
    );
}

export default CommentWrite;