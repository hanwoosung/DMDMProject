import {ReactComponent as Logo} from "../../assets/image/img_logo.svg";
import {ReactComponent as Message} from "../../assets/image/icon_message.svg";
import {ReactComponent as Notification} from "../../assets/image/icon_notification.svg";
import {ReactComponent as DarkMode} from "../../assets/image/icon_dark_mode.svg";
import {ReactComponent as Profile} from "../../assets/image/icon_profile.svg";
import {ReactComponent as Logout} from "../../assets/image/icon_logout.svg";
import {ReactComponent as Info} from "../../assets/image/icon_info.svg";
import {ReactComponent as Emoticon} from "../../assets/image/icon_emoticon.svg";
import {ReactComponent as Edit} from "../../assets/image/icon_edit.svg";
import styles from "../../assets/css/Header.module.css";
import {useState} from "react";

const Header = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [profileClick, setProfileClick] = useState(false);

    //todo 내정보 외부 클릭시 꺼지도록하기.

    return (
        <header>
            <div className={styles.flexContainer}>
                <div className={styles.flexRow} style={{gap: 70}}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                    <Logo width={90} height={90} alt="logo" src={Logo}/>
                    <div className={styles.titleHeadBtn}>커뮤니티</div>
                    <div className={styles.titleHeadBtn}>인기글</div>
                    <div className={styles.titleHeadBtn}>투기장</div>
                    <div className={styles.titleHeadBtn}>취업</div>
                    <div className={styles.titleHeadBtn}>공지사항</div>
                    <div className={styles.titleHeadBtn}>이벤트</div>
                    <div className={styles.titleHeadBtn}>고객센터</div>
                </div>
                <div className={styles.flexRow} style={{gap: 50}}>
                    {/*<Colosseum className={styles.iconSize}/>*/}
                    <Message className={styles.iconSize}/>
                    <Notification className={styles.iconSize}/>
                    <DarkMode className={styles.iconSize}/>
                    <Profile className={styles.iconSize} onClick={() => {setProfileClick((c) => !c)}}/>
                </div>
            </div>

            <div className={styles.headerDetail} style={{display: isHovered ? "flex" : "none"}}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>커뮤니티</div>
                    <div className={styles.headBtn}>커뮤니티</div>
                    <div className={styles.headBtn}>Q & A</div>
                    <div className={styles.headBtn}>지식</div>
                    <div className={styles.headBtn}>스터디</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>인기글</div>
                    <div className={styles.headBtn}>주간 인기</div>
                    <div className={styles.headBtn}>일간 인기</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>투기장</div>
                    <div className={styles.headBtn}>투기장</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>취업</div>
                    <div className={styles.headBtn}>취업얘기</div>
                    <div className={styles.headBtn}>채용</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>공지사항</div>
                    <div className={styles.headBtn}>공지사항</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>이벤트</div>
                    <div className={styles.headBtn}>이벤트</div>
                </div>

                <div className={styles.verticalLine}/>

                <div className={styles.headerFlexColumn}>
                    <div className={styles.detailTitleBtn}>고객센터</div>
                    <div className={styles.headBtn}>고객센터</div>
                </div>
            </div>
            <div className={styles.profileDetail} style={{display: profileClick ? "flex" : "none"}}>
                <div style={{fontWeight: "bold"}}>내 계정</div>
                <div className={styles.flexRow}>
                    <Info className={styles.profileIcon}/>
                    <div className={styles.profileDetailSpan}>프로필</div>
                </div>
                <div className={styles.flexRow}>
                    <Edit className={styles.profileIcon}/>
                    <div className={styles.profileDetailSpan}>정보수정</div>
                </div>
                <div className={styles.flexRow}>
                    <Emoticon className={styles.profileIcon}/>
                    <div className={styles.profileDetailSpan}>이모티콘</div>
                </div>
                <hr className={styles.profileDetailLine}/>
                <div className={styles.flexRow}>
                    <Logout className={styles.profileIcon}/>
                    <div className={styles.profileDetailSpan}>로그아웃</div>
                </div>
            </div>
        </header>
    )
}

export default Header;