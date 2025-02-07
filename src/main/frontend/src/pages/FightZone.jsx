import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Client} from '@stomp/stompjs';
import ObserverChat from '../components/fightzone/ObserverChatComponent';
import ObserverUsers from '../components/fightzone/ObserverUserComponent';
import FighterChat from '../components/fightzone/FighterChatComponent';
import FighterInfo from '../components/fightzone/FighterInfoComponent';
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

    const [timerStart, setTimerStart] = useState(false);
    const [timerExtend, setTimerExtend] = useState(false);
    const [timerEnd, setTimerEnd] = useState(false);

    const [roomTimer, setRoomTimer] = useState(3600);

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

                //투표 구독
                stompClient.current.subscribe(`/subscribe/vote.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    console.log("투표 결과")
                    console.log(body)
                    setLeftPercent(body.leftVote);
                    setRightPercent(body.rightVote);
                });

                // 관전자 유저 리스트 구독
                stompClient.current.subscribe(`/subscribe/chatRoom.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    console.log(body);
                    setObserverUsers(body);
                });

                // 타이머 구독
                stompClient.current.subscribe(`/subscribe/timer.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    setRoomTimer(body);
                })

                // 연결 신호 보내기
                stompClient.current.publish({
                    destination: `/publish/chatRoom/join/${roomNo}`,
                    body: JSON.stringify({username: `user${exUserName}`, nickname: "닉넴닉넴"}),
                })

                // 투표 현황 반환
                stompClient.current.publish({
                    destination: `/publish/vote.${roomNo}`,
                    body: ""
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
        if (roomTimer === 0) {
            alert("토론이 종료되었습니다!");
        }
    }, [roomTimer])

    useEffect(() => {
        fighterMessageEnd.current.scrollIntoView();
    }, [fighterMessages]);

    const leaveUser = () => {
        if (stompClient.current) {
            stompClient.current.publish({
                destination: `/publish/chatRoom/leave/${roomNo}`,
                body: JSON.stringify({username: `user${exUserName}`, nickname: "닉넴닉넴"}),
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

    const timeStarter = () => {
        console.log('토론 시작됨')
        stompClient.current.publish({
            destination: `/publish/timer.${roomNo}/start`,
        })
    }


    const timeStopper = () => {
        console.log(`토론 중지`)
        stompClient.current.publish({
            destination: `/publish/timer.${roomNo}/stop`,
        })
    }

    const timeExtend = () => {
        console.log(`토론 연장`)
        stompClient.current.publish({
            destination: `/publish/timer.${roomNo}/extend`,
        })
    }

    const timerToggleStarter = () => {
        console.log('토론 시작됨')
        stompClient.current.publish({
            destination: `/publish/timer.${roomNo}/start`,
            body: JSON.stringify({username: fighterName})
        })
    }

    //timerStarter
    const toggleBtnComp = (title, setState) => {
        return (
            <button className={timerStart ?
                styles.inactiveBtn :
                styles.activeBtn}
                    onClick={() => setState(prevState => !prevState)}
            >
                {title}
            </button>
        )
    }

    //테스트) new 요청
    const exampleTimer = (username,request) =>{
        console.log(username)
        if (!username) {
            console.log("이름을 넣어줘야함.");
            return;
        }

        console.log(`${username}가 ${request} 요청`);
        stompClient.current.publish({
            destination: `/publish/example/timer.${roomNo}`,
            body: JSON.stringify({
                username: username,
                request: request
            })
        })
    }

    return (
        <div className={styles.fightBoard}>
            <div className={styles.fightZone}>
                {/* 토론자 채팅 공간 */}
                <div className={styles.fighterSection}>
                    <FighterInfo
                        selectedVote = {selectedVote}
                        setSelectedVote = {setSelectedVote}
                        roomTimer = {roomTimer}
                        fighterName = {fighterName}
                        leftPercent = {leftPercent}
                        rightPercent = {rightPercent}
                        timeStarter = {timeStarter}
                        timeStopper = {timeStopper}
                        exampleTimer = {exampleTimer}
                    />

                    {/*토론자 채팅 섹션*/}
                    <FighterChat
                        rightUser={rightUser}
                        leftUser={leftUser}
                        fighterName={fighterName}
                        setFighterName={setFighterName}
                        fighterContent={fighterContent}
                        setFighterContent={setFighterContent}
                        fighterMessages={fighterMessages}
                        sendFighterChat={sendFighterChat}
                        timeExtend={timeExtend}
                        refs={{fighterMessageEnd, leftUser, rightUser}}
                    />
                </div>

                {/* 관전자 채팅 공간 */}
                <div className={styles.observerSection}>
                    {/* 관전자 목록 공간 */}
                    <ObserverUsers
                        observerUsers={observerUsers}
                        roomNo={roomNo}
                    />
                    <ObserverChat
                        ref={observerMessageEnd}
                        observerMessageEnd={observerMessageEnd}
                        observerMessages={observerMessages}
                        observerName={observerName}
                        setObserverName={setObserverName}
                        observerContent={observerContent}
                        setObserverContent={setObserverContent}
                        sendObserverChat={sendObserverChat}
                    />
                </div>
            </div>
        </div>
    );
};

export default FightZone;
