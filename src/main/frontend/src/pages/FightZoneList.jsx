import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from '../assets/css/FightZoneList.module.css';
import FightHeader from "../components/layout/FightHeader";
import useApi from "../hooks/common/useApi";
import leftFighterImg from "../assets/image/ex_profile.png";
import rightFighterImg from "../assets/image/ex_chiwawa.jpg";
import SmallBtn from "../components/common/SmallBtnComponents";

const FightZoneList = () => {
    const {get, post} = useApi();
    const navigate = useNavigate();

    const [fightRooms, setFightRooms] = useState([]);

    useEffect(() => {
        const fetchFightRooms = async () => {
            try {
                const response = await get(`/api/v1/chat-room`, {
                    params: {
                        startIdx: 0,
                        amount: 6
                    }
                });

                if (response?.data) {
                    console.log(response.data);
                    setFightRooms(response.data);
                }
            } catch (error) {
                console.error("투기장 목록을 불러오는 중 오류 발생:", error);
            }
        };

        fetchFightRooms();
    }, []);

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

        if (response.statusCode !== 201) {
            alert(response.data)
        }

        navigate(`/fight-zone/${response.data}`)
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
                <div className={styles.fightRooms}>
                    {fightRooms.map((room, index) => (
                        <div key={index} className={styles.fightRoomCard}
                             onClick={() => navigate(`/fight-zone/${room.fightId}`)}>
                            <div className={styles.fightersInfo}>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel} style={{background: "#ffd633"}}>
                                            Lv. {room.sendLevel}
                                        </span>
                                        {room.sendBadge && <span
                                            className={styles.fighterType}
                                            style={getBadgeStyle("#ffd633", "#000")}
                                        >
                                            {room.sendBadge}
                                        </span>}
                                    </div>
                                    <img
                                        className={styles.profileImg}
                                        src={leftFighterImg}
                                        alt={room.sendUserId}
                                        style={{border: "3px solid #300CFF"}}
                                    />
                                    <p className={styles.fighterName}>{room.sendName}</p>
                                </div>
                                <span className={styles.vsText}>VS</span>
                                <div className={styles.fighter}>
                                    <div className={styles.fighterInfo}>
                                        <span className={styles.fighterLevel} style={{background: "#ffd633"}}>
                                            Lv. {room.receiveLevel}
                                        </span>
                                        {room.receiveBadge && <span
                                            className={styles.fighterType}
                                            style={getBadgeStyle("#ffd633", "#000")}
                                        >
                                            {room.receiveBadge}
                                        </span>}
                                    </div>
                                    <img
                                        className={styles.profileImg}
                                        src={rightFighterImg}
                                        alt={room.receiveUserId}
                                        style={{border: "3px solid #FF0000"}}
                                    />
                                    <p className={styles.fighterName}>{room.receiveName}</p>
                                </div>
                            </div>
                            <div className={styles.chatRoomInfo}>
                                <div className={styles.fightTitle}>{room.fightTitle}</div>
                                <p className={styles.spectators}>방 ID: {room.fightId}</p>
                                {/*{room.vote.challenger !== null ? (*/}
                                {/*    <>*/}
                                {/*        <div className={styles.vote}*/}
                                {/*             style={{width: `${room.vote.challenger}%`, backgroundColor: "blue"}}>*/}
                                {/*            {room.vote.challenger}%*/}
                                {/*        </div>*/}
                                {/*        <div className={styles.vote}*/}
                                {/*             style={{width: `${room.vote.opponent}%`, backgroundColor: "red"}}>*/}
                                {/*            {room.vote.opponent}%*/}
                                {/*        </div>*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <div className={styles.votePending}>???%</div>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FightZoneList;
