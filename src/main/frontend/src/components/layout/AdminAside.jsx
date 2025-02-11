import styles from "../../assets/css/Aside.module.css";
import {ReactComponent as Info} from "../../assets/image/icon_info.svg";
import {ReactComponent as Edit} from "../../assets/image/icon_edit.svg";
import {ReactComponent as PasswordEdit} from "../../assets/image/icon_lock.svg";
import {ReactComponent as Emoticon} from "../../assets/image/icon_emoticon.svg";
import {ReactComponent as Speech} from "../../assets/image/icon_speech_bubble.svg";
import {ReactComponent as BlackList} from "../../assets/image/icon_black_list.svg";

const AdminAside = () => {
    return (
        <aside>
            <div className={styles.asideItem}>
                <div className={styles.sideTitle}>관리자 페이지</div>
                <div className={styles.flexColumn}>
                    <div className={styles.flexRow}>
                        <Info className={styles.iconSize}/>
                        <div>신고내역 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <Edit className={styles.iconSize}/>
                        <div>회원관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <PasswordEdit className={styles.iconSize}/>
                        <div>게시물 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <Emoticon className={styles.iconSize}/>
                        <div>이모티콘 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <Speech className={styles.iconSize}/>
                        <div>공지사항 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <BlackList className={styles.iconSize}/>
                        <div>이벤트 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <BlackList className={styles.iconSize}/>
                        <div>배너 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <BlackList className={styles.iconSize}/>
                        <div>공통코드 관리</div>
                    </div>
                    <div className={styles.flexRow}>
                        <BlackList className={styles.iconSize}/>
                        <div>가입약관 관리</div>
                    </div>
                </div>
                <hr className={styles.horizontalLine}/>
            </div>
            <div className={styles.verticalLine}></div>
        </aside>
    )
}
export default AdminAside;