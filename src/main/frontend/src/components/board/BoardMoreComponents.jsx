import MoreStyle from "../../assets/css/board/More.module.css";

const BoardMore = ({status = false}) => {

    return (
        <div className={status ? MoreStyle.BoardContainerOn : MoreStyle.BoardContainer}>

        </div>
    );

}

export default BoardMore;