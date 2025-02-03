import BoardListStyle from "../../assets/css/board/BoardList.module.css";
import profileImg from "../../assets/image/ex_profile.png";
import Tag from "./TagComponents";
import ListTag from "./ListTagComponents";

const BasicBoardList = () => {

    return (
        <div className={BoardListStyle.basicContainer}>
            <div className={BoardListStyle.basicList}>
                <img
                    src="/assets/image/non_existent_image.png"  // 잘못된 이미지 경로
                    onError={(e) => {
                        e.target.src = profileImg;
                    }}  // 이미지 로드 실패 시 기본 이미지로 대체
                    alt="Profile"
                />
                <div className={BoardListStyle.detail}>
                    <div>aa</div>
                    <div className={BoardListStyle.title}>제목임당~ 제목임당~ 제목임당~ 제목임당~ 제목임당~ 제목임당~ 제목임당~ 제목임당~</div>
                    <div><ListTag /></div>
                </div>
            </div>
        </div>
    );
}

export default BasicBoardList;

