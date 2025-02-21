import BoardListStyle from "../../assets/css/board/BoardList.module.css";
import profileImg from "../../assets/image/ex_profile.png";
import Tag from "./TagComponents";
import ListTag from "./ListTagComponents";
import {ReactComponent as Comment} from "../../assets/image/icon_comment.svg";
import {ReactComponent as See} from "../../assets/image/icon_see.svg";
import {ReactComponent as Like} from "../../assets/image/icon_like.svg";
import Level from "../common/LevelComponents";
import {useNavigate} from "react-router-dom";


const BasicBoardList = ({boardList = []}) => {

    const navigate = useNavigate();

    return (
        <div className={BoardListStyle.basicContainer}>
            {boardList.map((board, index) => (
                <div className={BoardListStyle.basicList}>
                    <img
                        src={board.filePath}
                        onError={(e) => {
                            e.target.src = profileImg;
                        }}  // 이미지 로드 실패 시 기본 이미지로 대체
                        alt="Profile"
                    />
                    <div className={BoardListStyle.detail}>
                        <div>
                            <span>
                                <Level level={board.userLevel} />
                                <span className={BoardListStyle.name}>{board.userName}</span>
                            </span>
                            <span>{board.insert}</span>
                        </div>
                        <div className={BoardListStyle.title} onClick={() => {
                            navigate(`/board/${board.boardId}`);
                        }}>{board.boardTitle}</div>
                        <div>
                            <ListTag tagList={board.tagList} />
                            <span>
                            <span className={BoardListStyle.listCnt}><Like width={24 + 7} height={24} /> {board.likeCnt}</span>
                            <span className={BoardListStyle.listCnt}><See width={24 + 7}
                                                                          height={24} /> {board.vcnt}</span>
                            <span className={BoardListStyle.listCnt}><Comment width={24 + 7}
                                                                              height={24} /> {board.commentCnt}</span>
                        </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BasicBoardList;

