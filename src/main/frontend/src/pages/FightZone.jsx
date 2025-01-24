import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Client} from '@stomp/stompjs';
import SmallBtn from "../components/common/SmallBtnComponents";
import leftFighterImg from "../assets/image/ex_profile.png";
import rightFighterImg from "../assets/image/ex_chiwawa.jpg";
import styles from '../assets/css/FightZone.module.css';

const FightZone = () => {
    const {roomNo} = useParams();
    const stompClient = useRef(null);
    const exUserName = 'user47282';

    const leftUser = useRef("doge");
    const rightUser = useRef("nose");

    const isFirstRender = useRef(true); // 첫 렌더링 여부 추적

    const fighterMessageEnd = useRef();
    const observerMessageEnd = useRef();

    const [fighterMessages, setFighterMessages] = useState([]);
    const [fighterName, setFighterName] = useState('');
    const [fighterContent, setFighterContent] = useState('');

    const [observerMessages, setObserverMessages] = useState([]);
    const [observerName, setObserverName] = useState('');
    const [observerContent, setObserverContent] = useState('');
    const [observerUsers, setObserverUsers] = useState([]);

    const [selectedVote, setSelectedVote] = useState(null);

    const [leftPercent, setLeftPercent] = useState(0);
    const [rightPercent, setRightPercent] = useState(0);

    // 방 접속시 연결 및 구독설정
    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: 'ws://localhost:8090/ws-connect',
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                // 토론자 채팅 구독
                stompClient.current.subscribe(`/subscribe/fighter.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    setFighterMessages((prevMessages) => [...prevMessages, body]);
                });

                // 관전자 채팅 구독
                stompClient.current.subscribe(`/subscribe/observer.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    setObserverMessages((prevMessages) => [...prevMessages, body]);
                });

                stompClient.current.subscribe(`/subscribe/vote.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    setLeftPercent(body.leftVote);
                    setRightPercent(body.rightVote);
                });

                // 관전자 유저 리스트 구독
                stompClient.current.subscribe(`/subscribe/chatRoom.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    console.log(body);
                    setObserverUsers(body);
                });

                stompClient.current.publish({
                    destination: `/publish/chatRoom/join/${roomNo}`,
                    body: JSON.stringify({username: `user${exUserName}`, nickname: "닉넴닉넴"}),
                })
            },
            onWebSocketError: (error) => {
                console.error('Error with websocket', error);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.current.activate();
        window.addEventListener('beforeunload', leaveUser);

        return () => {
            stompClient.current.deactivate();
            window.removeEventListener('beforeunload', leaveUser);
        };
    //불필요한 재렌더링 방지. 혹여나 오류 발생시 roomNo 집어넣기
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        sendVote(selectedVote)
    }, [selectedVote]);

    useEffect(() => {
        fighterMessageEnd.current.scrollIntoView();
    }, [fighterMessages]);

    useEffect(() => {
        observerMessageEnd.current.scrollIntoView();
    }, [observerMessages]);

    const leaveUser = () => {
        if (stompClient.current) {
            stompClient.current.publish({
                destination: `/publish/chatRoom/leave/${roomNo}`,
                body: JSON.stringify({ username: `user${exUserName}`, nickname: "닉넴닉넴" }),
            });

            stompClient.current.deactivate();
        }
    }

    const sendVote = (vote) => {
        if (observerName.length === 0) return;

        stompClient.current.publish({
            destination: `/publish/vote.${roomNo}`,
            body: JSON.stringify({username: observerName, vote: vote}),
        })
    }

    //투표 버튼 이벤트
    const handleVote = (candidate) => {
        setSelectedVote(selectedVote === candidate ? null : candidate);
    };

    const sendFighterChat = () => {
        if (fighterName && fighterContent) {
            stompClient.current.publish({
                destination: `/publish/fighter.${roomNo}`,
                body: JSON.stringify({username: fighterName, content: fighterContent}),
            });
            setFighterContent('');
        }
    };

    const sendObserverChat = () => {
        if (observerName && observerContent) {
            stompClient.current.publish({
                destination: `/publish/observer.${roomNo}`,
                body: JSON.stringify({username: observerName, content: observerContent}),
            });
            setObserverContent('');
        }
    };

    const fightPercent = () => {
        if (leftPercent === 0 && rightPercent === 0) {
            return;
        }

        const leftWidth = Math.floor(leftPercent / (leftPercent + rightPercent) * 100);

        return (
            <div className={styles.percentBox}>
                <div className={styles.leftPercent} style={{width: `${leftWidth}%`}}>{leftWidth}%</div>
                <div className={styles.rightPercent} style={{width: `${100 - leftWidth}%`}}>{100 - leftWidth}%</div>
            </div>
        )
    }

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
        <div className={styles.fightBoard}>
            <div className={styles.fightZone}>
                {/* 토론자 채팅 공간 */}
                <div className={styles.fighterSection}>
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
                            <SmallBtn title={"토론 시작"} style={{fontSize: 18, width: 150}}/>
                            <SmallBtn width={100} title={"마감"} style={{display: "none"}}/>
                            <div className={styles.timeCount}>남은시간 00:00:00</div>
                            {fightPercent()}
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

                    <div className={styles.chatSection}>
                        <div className={styles.chatMessages}>
                            {fighterMessages.map((message, index) => {
                                if (message.username === leftUser.current) {
                                    return (
                                        <div key={index}
                                             className={styles.chatMessage}
                                             style={{alignSelf: "start"}}
                                        >
                                            <img
                                                className={styles.chatProfile}
                                                src={leftFighterImg}
                                                style={{border: "2px solid #300CFF"}}
                                                alt="fighterImg"
                                            />
                                            <span className={styles.fighterLeftContent}>{message.content}</span>
                                        </div>
                                    );
                                }

                                if (message.username === rightUser.current) {
                                    return (
                                        <div key={index}
                                             className={styles.chatMessage}
                                             style={{alignSelf: "end"}}
                                        >
                                            <span className={styles.fighterRightContent}>{message.content}</span>
                                            <img
                                                className={styles.chatProfile}
                                                src={rightFighterImg}
                                                style={{border: "2px solid #FF0000"}}
                                                alt="fighterImg"
                                            />
                                        </div>
                                    );
                                }

                                return null;
                            })}
                            <div ref={fighterMessageEnd}></div>
                        </div>

                        <div className={styles.chatInputContainer}>
                            <input
                                type="text"
                                placeholder="사용자 이름"
                                value={fighterName}
                                onChange={(e) => setFighterName(e.target.value)}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요"
                                value={fighterContent}
                                onChange={(e) => setFighterContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendFighterChat();
                                    }
                                }}
                                className={styles.input}
                                style={{flex: 1}}
                            />
                            <SmallBtn title={"시간연장"}/>
                        </div>
                    </div>
                </div>

                {/* 관전자 채팅 공간 */}
                <div className={styles.observerSection}>
                    {/* 관전자 목록 공간 */}
                    <div className={styles.userSection}>
                        <div className={styles.chatTitle}>현재 관전자 리스트({observerUsers.length}) // 방 번호: {roomNo}</div>
                        <div className={styles.userList}>
                            {observerUsers.map((user, index) => (
                                <div key={index} className={styles.userItem}>
                                    <span>{user.username}/</span>
                                    <span>{user.nickname}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.observerChatSection}>
                        <div className={styles.chatMessages}>
                            {observerMessages.map((message, index) => (
                                <div key={index} className={styles.chatMessage}>
                                    <span className={styles.username}>{message.username}:</span>
                                    <span>{message.content}</span>
                                </div>
                            ))}
                            <div ref={observerMessageEnd}></div>
                        </div>
                        <div className={styles.chatInputContainer}>
                            <input
                                type="text"
                                placeholder="사용자 이름"
                                value={observerName}
                                onChange={(e) => setObserverName(e.target.value)}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="메시지를 입력하세요"
                                value={observerContent}
                                onChange={(e) => setObserverContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendObserverChat();
                                    }
                                }}
                                style={{flex: 1}}
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FightZone;
