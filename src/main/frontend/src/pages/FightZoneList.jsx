import styles from '../assets/css/FightZoneList.module.css';
import FightHeader from "../components/layout/FightHeader";
import leftFighterImg from "../assets/image/ex_profile.png";
import rightFighterImg from "../assets/image/ex_chiwawa.jpg";
import SmallBtn from "../components/common/SmallBtnComponents";

// todo useEffect에서 페이징 값을 받으면 이에 대한 배열요소 6개를 가져옴
const fightRooms = [
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "HTML이 프로그래밍 언어겠냐?",
        spectators: "000명",
        vote: {challenger: 50, opponent: 50}
    },
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "빈자리", level: "?", type: "???", image: rightFighterImg},
        title: "강 다 덤벼라",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "임마 왜 안옴?",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "임마 왜 안옴?",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "임마 왜 안옴?",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
    {
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "임마 왜 안옴?",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
];

const FightZoneList = () => {

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

    return (
        <div className={styles.flexColumn} style={{background: "#FFFBF4"}}>
            <FightHeader/>
            <div className={styles.fightRoomContainer}>
                <div className={styles.fightRoomTitle}>
                    <div className={styles.title}>투기장 목록</div>
                    <SmallBtn title={"방 생성"}/>
                </div>
                <div className={styles.fightRooms}>
                    {fightRooms.map((room, index) => (
                        <div key={index} className={styles.fightRoomCard}>
                            <div className={styles.fightersInfo}>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel} style={{background: "#ffd633"}}>Lv.{room.challenger.level}</span>
                                        <span
                                            className={styles.fighterType} style={getBadgeStyle("#ffd633", "#000")}>{room.challenger.type}</span>
                                    </div>
                                    <img className={styles.profileImg} src={room.challenger.image}
                                         alt={room.challenger.name} style={{border: "3px solid #300CFF"}}/>
                                    <p className={styles.fighterName}>{room.challenger.name}</p>
                                </div>
                                <span className={styles.vsText}>VS</span>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel} style={{background: "#ff4343"}}>Lv.{room.opponent.level}</span>
                                        <span
                                            className={styles.fighterType} style={getBadgeStyle("#ff3535", "#000")}>{room.opponent.type}</span>
                                    </div>
                                    <img className={styles.profileImg} src={room.opponent.image}
                                         alt={room.opponent.name} style={{border: "3px solid #FF0000"}}/>
                                    <p className={styles.fighterName}>{room.opponent.name}</p>
                                </div>
                            </div>
                            <div className={styles.chatRoomInfo}>
                                <div className={styles.fightTitle}>{room.title}</div>
                                <p className={styles.spectators}>관전자 {room.spectators}</p>
                                <p>실시간 투표 현황</p>
                                <div className={styles.voteBar}>
                                    {room.vote.challenger !== null ? (
                                        <>
                                            <div className={styles.vote}
                                                 style={{width: `${room.vote.challenger}%`, backgroundColor: "blue"}}>
                                                {room.vote.challenger}%
                                            </div>
                                            <div className={styles.vote}
                                                 style={{width: `${room.vote.opponent}%`, backgroundColor: "red"}}>
                                                {room.vote.opponent}%
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.votePending}>???%</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/*<PagingButtons*/}
            {/*    currentPage = {null}*/}
            {/*    pageSize = {null}*/}
            {/*    pageBthSize = {null}*/}
            {/*    onPageChange = {null}*/}
            {/*    // pagingData={{, , , , }}*/}
            {/*/>*/}
        </div>
    )
}
export default FightZoneList;