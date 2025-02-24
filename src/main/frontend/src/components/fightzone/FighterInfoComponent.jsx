import styles from "../../assets/css/FightZone.module.css";
import leftFighterImg from "../../assets/image/ex_profile.png";
import SmallBtn from "../common/SmallBtnComponents";
import rightFighterImg from "../../assets/image/ex_chiwawa.jpg";
import React, {forwardRef, useEffect} from "react";

const FighterInfoComponent = forwardRef((props, ref) => {
    const {
        selectedVote,
        setSelectedVote,
        roomTimer,
        rightPercent,
        leftPercent,
        exampleTimer,
        roomInfo,
        sendUserExist,
        receiveUserExist,
        refs
    } = props

    const {chatUserId} = refs

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
                <span>남은 시간 </span>
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

    useEffect(() => {
        console.log(sendUserExist + "결과에용............");
    }, [sendUserExist]);

    return (
        <div className={styles.fighterInfoContainer}>
            <div className={styles.fighterInfo}>
                <div className={styles.flexRow} style={{gap: 10}}>
                    <div className={styles.fighterBadge} style={{background: "#ffd633"}}>Lv. {roomInfo.sendLevel}</div>
                    {roomInfo.sendBadge && <div className={styles.fighterLevel}
                                                style={getBadgeStyle("#ffd633", "#000")}
                    >{roomInfo.sendBadge}
                    </div>}
                </div>
                <div>
                    <img src={leftFighterImg} alt="프로필사진"
                         className={styles.fighterImage}
                         style={{border: "3px solid #300CFF"}}/>
                </div>
                <div className={styles.fighterName}>{roomInfo.sendName}</div>
                <button className={selectedVote === "LEFT" ?
                    styles.leftVoteBtn :
                    styles.leftNoVoteBtn}
                        onClick={() => handleVote("LEFT")}
                >
                    투표하기
                </button>
            </div>
            <div className={styles.fightStatus}>
                <div className={styles.fightTitle}>{roomInfo.fightTitle}</div>
                {(chatUserId.current === roomInfo.sendId || chatUserId.current === roomInfo.receiveId) && (
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <SmallBtn title={"토론 시작"} onClick={() => exampleTimer(chatUserId.current, "START")}/>
                        <SmallBtn title={"마감"} onClick={() => exampleTimer(chatUserId.current, "END")}/>
                        <SmallBtn title={"시간 추가"} onClick={() => exampleTimer(chatUserId.current, "EXTEND")}/>
                    </div>
                )}
                {fightTimerComp()}
                {fightPercentComp()}
            </div>
            <div className={styles.fighterInfo}>
                <div className={styles.flexRow} style={{gap: 10}}>
                    <div className={styles.fighterBadge}
                         style={{background: "#ff3333"}}>Lv. {roomInfo.receiveLevel}</div>
                    {roomInfo.receiveBadge && <div className={styles.fighterLevel}
                                                   style={getBadgeStyle("#ff3333", "#000")}
                    >{roomInfo.receiveBadge}
                    </div>}
                </div>
                <div>
                    <img src={rightFighterImg} alt="프로필 사진"
                         className={styles.fighterImage}
                         style={{border: "3px solid #FF0000"}}/>
                </div>
                <div className={styles.fighterName}>{roomInfo.receiveName}</div>
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