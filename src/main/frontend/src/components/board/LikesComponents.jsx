import LikesStyle from "../../assets/css/board/Likes.module.css";

import {ReactComponent as Good} from "../../assets/image/icon_good.svg";
import {ReactComponent as Hate} from "../../assets/image/icon_Hate.svg";

const Likes = ({
                   type = "good",
                   cnt = 0,
                   status = "",
                   onClick,
               }) => {

    let clazz = "container";
    if (status !== "") clazz = "containerOn"

    return (
        <span className={LikesStyle[clazz]} onClick={onClick}>
            {type === "good" ? (
                <Good />
            ) : (
                <Hate />
            )}
            <span>{cnt}</span>
        </span>
    );
};


export default Likes;