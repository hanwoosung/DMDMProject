import CommentStyle from "../../assets/css/board/Comment.module.css";
import {ReactComponent as DepthIcon} from "../../assets/image/icon_depth.svg";

const Depth = ({depth = 0, type = true}) => {
    return (
        <>
            {Array(depth)
                .fill()
                .map((_, index) => (
                    <span key={index} className={CommentStyle.depth}>
                        {(type && index === depth - 1) && <DepthIcon />}
                    </span>
                ))}
        </>
    );
}

export default Depth;