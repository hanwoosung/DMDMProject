import LevelStyle from "../../assets/css/common/Level.module.css";

const Level = ({level}) => {

    let clazz = "zero";

    switch (level){
        case 0:
            clazz = "zero";
            break;
        default:
            clazz = "zero";
            break;
    }

    return(
        <span className={LevelStyle[clazz]}>
            Lv.{level}
        </span>
    )

}

export default Level;