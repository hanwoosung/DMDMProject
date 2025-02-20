import LikesStyle from "../../assets/css/board/Likes.module.css";

import {ReactComponent as Good} from "../../assets/image/icon_good.svg";
import {ReactComponent as Hate} from "../../assets/image/icon_Hate.svg";

const CommentLikes = ({
                          type = "good",
                          cnt = 0,
                          status = "",
                          onClick
                      }) => {

    let clazz = "CommentContainer";
    if (status !== "") clazz = "CommentContainerOn"

    return (
        <span className={LikesStyle[clazz]}
              onClick={onClick}>
            {type === "good" ? (
                <Good width={24} height={24} />
            ) : (
                <Hate width={24} height={24} />
            )}
            <span>{cnt}</span>
        </span>
    );
};


export default CommentLikes;