import styles from '../assets/css/FightZoneList.module.css';
import FightHeader from "../components/layout/FightHeader";
import leftFighterImg from "../assets/image/ex_profile.png";
import rightFighterImg from "../assets/image/ex_chiwawa.jpg";
import SmallBtn from "../components/common/SmallBtnComponents";

const fightRooms = [
    {
        id: 1,
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "HTML이 프로그래밍 언어겠냐?",
        spectators: "000명",
        vote: {challenger: 50, opponent: 50}
    },
    {
        id: 2,
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "빈자리", level: "?", type: "???", image: rightFighterImg},
        title: "강 다 덤벼라",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
    {
        id: 3,
        challenger: {name: "도지", level: 6, type: "선량 투사", image: leftFighterImg},
        opponent: {name: "코가 길어 슬픈 원숭이", level: 80, type: "늑대 챌린저", image: rightFighterImg},
        title: "엄마 왜 안옴?",
        spectators: "000명",
        vote: {challenger: null, opponent: null}
    },
];

const FightZoneList = () => {
    return (
        <div className={styles.flexColumn} style={{background: "#FFFBF4"}}>
            <FightHeader/>
            <div className={styles.fightRoomContainer}>
                <div className={styles.fightRoomTitle}>
                    <div className={styles.title}>투기장 목록</div>
                    <SmallBtn title={"방 생성"}/>
                </div>
                <div className={styles.fightRooms}>
                    {fightRooms.map((room) => (
                        <div key={room.id} className={styles.fightRoomCard}>
                            <div className={styles.fightInfo}>
                                <div className={styles.fighter}>
                                    <img className={styles.profileImg} src={room.challenger.image}
                                         alt={room.challenger.name}/>
                                    <p className={styles.fighterName}>{room.challenger.name}</p>
                                    <span className={styles.fighterLevel}>Lv.{room.challenger.level}</span>
                                    <span
                                        className={`${styles.fighterType} ${styles.green}`}>{room.challenger.type}</span>
                                </div>
                                <span className={styles.vsText}>VS</span>
                                <div className={styles.fighter}>
                                    <img className={styles.profileImg} src={room.opponent.image}
                                         alt={room.opponent.name}/>
                                    <p className={styles.fighterName}>{room.opponent.name}</p>
                                    <span className={styles.fighterLevel}>Lv.{room.opponent.level}</span>
                                    <span className={`${styles.fighterType} ${styles.red}`}>{room.opponent.type}</span>
                                </div>
                            </div>
                            <div className={styles.fightTitle}>{room.title}</div>
                            <p className={styles.spectators}>관전자 {room.spectators}</p>
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
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FightZoneList;