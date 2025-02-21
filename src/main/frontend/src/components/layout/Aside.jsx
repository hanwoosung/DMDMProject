import styles from "../../assets/css/Aside.module.css";
import {ReactComponent as Info} from "../../assets/image/icon_info.svg";
import {ReactComponent as Edit} from "../../assets/image/icon_edit.svg";
import {ReactComponent as PasswordEdit} from "../../assets/image/icon_lock.svg";
import {ReactComponent as Emoticon} from "../../assets/image/icon_emoticon.svg";
import {ReactComponent as Speech} from "../../assets/image/icon_speech_bubble.svg";
import {ReactComponent as BlackList} from "../../assets/image/icon_black_list.svg";
import {useLocation, useNavigate} from "react-router-dom";

const Aside = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside>
            <div className={styles.asideItem}>
                <div className={styles.sideTitle}>마이 페이지</div>
                <div className={styles.flexColumn}>
                    <div className={styles.flexRow}>
                        <Info className={styles.iconSize} />
                        <div>회원정보</div>
                    </div>
                    <div className={`${styles.flexRow} ${location.pathname === "/user-edit" ? styles.selected : ""}`}
                         onClick={() => navigate("/user-edit")}>
                        <Edit className={styles.iconSize} />
                        <div>정보 수정</div>
                    </div>
                    <div className={styles.flexRow}>
                        <PasswordEdit className={styles.iconSize} />
                        <div>비밀번호 변경</div>
                    </div>
                    <div className={styles.flexRow}>
                        <Emoticon className={styles.iconSize} />
                        <div>이모티콘</div>
                    </div>
                    <div className={styles.flexRow}>
                        <Speech className={styles.iconSize} />
                        <div>쪽지리스트</div>
                    </div>
                    <div className={styles.flexRow}>
                        <BlackList className={styles.iconSize} />
                        <div>블랙리스트</div>
                    </div>
                </div>
                <hr className={styles.horizontalLine} />
            </div>
            <div className={styles.verticalLine}></div>
        </aside>
    )
}
export default Aside;