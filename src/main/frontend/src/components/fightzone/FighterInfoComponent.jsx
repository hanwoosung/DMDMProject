import styles from "../../assets/css/FightZone.module.css";
import leftFighterImg from "../../assets/image/ex_profile.png";
import SmallBtn from "../common/SmallBtnComponents";
import rightFighterImg from "../../assets/image/ex_chiwawa.jpg";
import React, {forwardRef} from "react";

const FighterInfoComponent = forwardRef((props, ref) => {

    const {selectedVote, setSelectedVote, roomTimer, rightPercent, leftPercent, timeStopper, timeStarter} = props

    //투표 버튼 이벤트
    const handleVote = (candidate) => {
        setSelectedVote(selectedVote === candidate ? null : candidate);
    };

    // 뱃지 스타일 결정
    const getBadgeStyle = (fontColor, borderColor) => ({
        fontSize: '14px',
        fontWeight: 800,
        color: fontColor,
        textShadow: `
        1px 1px 0 ${borderColor},
        -1px -1px 0 ${borderColor},
        -1px 1px 0 ${borderColor},
        1px -1px 0 ${borderColor},
        0px 1px 0 ${borderColor},
        0px -1px 0 ${borderColor},
        1px 0px 0 ${borderColor},
        -1px 0px 0 ${borderColor}
    `,
    });

    // 채팅방 제한시간
    const fightTimerComp = () => {
        let hour = Math.floor(roomTimer / 3600)
        let min = Math.floor(roomTimer % 3600 / 60)
        let sec = roomTimer % 60

        return (
            <div className={styles.timeCount}>
                <span>{zeroInsert(hour)}</span>
                <span>:</span>
                <span>{zeroInsert(min)}</span>
                <span>:</span>
                <span>{zeroInsert(sec)}</span>
            </div>
        )
    }

    const zeroInsert = (num) => {
        return num < 10 ? `0${num}` : num
    }

    const fightPercentComp = () => {
        let leftWidth = 50;

        if (leftPercent !== 0 || rightPercent !== 0) {
            leftWidth = Math.floor(leftPercent / (leftPercent + rightPercent) * 100);
        }

        return (
            <div className={styles.percentBox}>
                <div className={styles.leftPercent} style={{width: `${leftWidth}%`}}>{leftWidth}%</div>
                <div className={styles.rightPercent} style={{width: `${100 - leftWidth}%`}}>{100 - leftWidth}%</div>
            </div>
        )
    }

    return (
        <div className={styles.fighterInfoContainer}>
            <div className={styles.fighterInfo}>
                <div className={styles.flexRow} style={{gap: 10}}>
                    <div className={styles.fighterBadge} style={{background: "#ffd633"}}>Lv. 6</div>
                    <div className={styles.fighterLevel}
                         style={getBadgeStyle("#ffd633", "#000")}
                    >신입 유저
                    </div>
                </div>
                <img src={leftFighterImg} alt="프로필사진"
                     className={styles.fighterImage}
                     style={{border: "3px solid #300CFF"}}/>
                <div className={styles.fighterName}>도지</div>
                <button className={selectedVote === "LEFT" ?
                    styles.leftVoteBtn :
                    styles.leftNoVoteBtn}
                        onClick={() => handleVote("LEFT")}
                >
                    투표하기
                </button>
            </div>
            <div className={styles.fightStatus}>
                <div className={styles.fightTitle}>HTML이 프로그래밍 언어겠냐?</div>

                <SmallBtn title={"토론 시작"} style={{fontSize: 18, width: 150}}
                          onClick={() => timeStarter()}/>
                <SmallBtn width={100} title={"마감"} onClick={() => timeStopper()}/>
                {fightTimerComp()}
                {fightPercentComp()}
            </div>
            <div className={styles.fighterInfo}>
                <div className={styles.flexRow} style={{gap: 10}}>
                    <div className={styles.fighterBadge} style={{background: "#ff3333"}}>Lv. 80</div>
                    <div className={styles.fighterLevel}
                         style={getBadgeStyle("#ff3333", "#000")}
                    >뉴비 절단기
                    </div>
                </div>
                <img src={rightFighterImg} alt="프로필 사진"
                     className={styles.fighterImage}
                     style={{border: "3px solid #FF0000"}}/>
                <div className={styles.fighterName}>코큰 댕댕이</div>
                <button className={selectedVote === "RIGHT" ?
                    styles.rightVoteBtn :
                    styles.rightNoVoteBtn
                }
                        onClick={() => handleVote("RIGHT")}
                >
                    투표하기
                </button>
            </div>
        </div>
    )
});

export default FighterInfoComponent