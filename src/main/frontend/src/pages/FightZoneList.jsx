import {useNavigate} from "react-router-dom";
import styles from '../assets/css/FightZoneList.module.css';
import FightHeader from "../components/layout/FightHeader";
import SmallBtn from "../components/common/SmallBtnComponents";
import BigBtn from "../components/common/BigBtnComponents";
import useApi from "../hooks/common/useApi";
import leftFighterImg from "../assets/image/ex_profile.png";
import rightFighterImg from "../assets/image/ex_chiwawa.jpg";

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
    const {get,post,put} = useApi();

    const navigate = useNavigate();

    const gotoFightZone = () => {
        let roomNo = prompt('(테스팅)방번호 입력', '');
        if (roomNo) {
            navigate(`/fight-zone/${roomNo}`)
        }
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

    const exRoomMaker = async () => {
        const receiveId = prompt("상대 id를 입력하세요")
        const title = prompt("제목을 입력하세요")

        if (!title || !receiveId) {
            console.log("빈값발생")
            return
        }


        const response = await post(`/api/v1/chat-room`, {
            body: {
                fightTitle: title,
                sendUserId: window.localStorage.getItem("userId"),
                receiveUserId: receiveId
            },
        })

        console.log(response);

        // navigate(`/fight-zone/${receiveId}`)
    }

    return (
        <div className={styles.flexColumn} style={{background: "#FFFBF4"}}>
            <FightHeader/>
            <div className={styles.fightRoomContainer}>
                <div className={styles.fightRoomTitle}>
                    <div className={styles.title}>투기장 목록</div>
                    <div>
                        {/*여기서는 상대를 지목하는 confirm 하나 생성(하나는 자기 id)*/}
                        <SmallBtn title={"방 생성(상대 선언)"} onClick={exRoomMaker}/>
                        {/*상대 없이 바로 방 생성하는 버튼*/}
                        <SmallBtn title={"방 생성"}/>
                    </div>
                </div>
                <BigBtn title={"수동 입력하기(임시)"} onClick={gotoFightZone}/>
                <div className={styles.fightRooms}>
                    {fightRooms.map((room, index) => (
                        <div key={index} className={styles.fightRoomCard}>
                            <div className={styles.fightersInfo}>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel}
                                              style={{background: "#ffd633"}}>Lv.{room.challenger.level}</span>
                                        <span
                                            className={styles.fighterType}
                                            style={getBadgeStyle("#ffd633", "#000")}>{room.challenger.type}</span>
                                    </div>
                                    <img className={styles.profileImg} src={room.challenger.image}
                                         alt={room.challenger.name} style={{border: "3px solid #300CFF"}}/>
                                    <p className={styles.fighterName}>{room.challenger.name}</p>
                                </div>
                                <span className={styles.vsText}>VS</span>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel}
                                              style={{background: "#ff4343"}}>Lv.{room.opponent.level}</span>
                                        <span
                                            className={styles.fighterType}
                                            style={getBadgeStyle("#ff3535", "#000")}>{room.opponent.type}</span>
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