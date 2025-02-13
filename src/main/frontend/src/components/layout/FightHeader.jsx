import styles from '../../assets/css/FightListHeader.module.css';
import {ReactComponent as Colosseum} from "../../assets/image/icon_colosseum.svg";
import profile from "../../assets/image/ex_profile.png";

const FightHeader = () => {
    return (
        <header>
            <div className={styles.headMenu}>
                <div className={styles.titleBtn}>
                    <Colosseum className={styles.iconSize}/>
                    <div className={styles.titleText}>투기장</div>
                </div>
                <div className={styles.profileContainer}>
                    <img className={styles.profileImg} src={profile} alt="profile"/>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileName}>도지도지도지코인</div>
                        <div className={styles.profileLevelInfo}>
                            <div className={styles.profileLevel}>
                                <span>Lv. </span>
                                <span>6</span>
                            </div>
                            <div className={styles.levelBar}>
                                <div className={styles.leveGraphAndPercent}>
                                    <div className={styles.levelGraphContainer}>
                                        <div className={styles.levelTotalGraph}/>
                                        <div className={styles.levelProgressGraph} style={{width: "45%"}}/>
                                    </div>
                                    <div className={styles.levelPercent}>
                                        <span>00 </span>
                                        <span>%</span>
                                    </div>
                                </div>
                                <div className={styles.expContainer}>
                                    <span>000</span>
                                    <span>/</span>
                                    <span>00000 EXP</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileWinLose}>
                            <div>
                                <span style={{fontWeight: "bold"}}>00</span>
                                <span> 승</span>
                            </div>
                            <div>
                                <span style={{fontWeight: "bold"}}>00</span>
                                <span> 패</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default FightHeader