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
    const chatUserId = useRef(window.localStorage.getItem("userId"));
    const chatUserName = useRef(window.localStorage.getItem("name"));
    const accessToken = useRef(window.localStorage.getItem("access"));

    const leftUser = useRef("cgh9694");
    const rightUser = useRef("asdf");

    const isFirstRender = useRef(true); // 첫 렌더링 여부 추적

    const fighterMessageEnd = useRef();
    const observerMessageEnd = useRef();

    const [fighterMessages, setFighterMessages] = useState([]);
    const [fighterName, setFighterName] = useState('');
    const [fighterContent, setFighterContent] = useState('');

    const [observerMessages, setObserverMessages] = useState([]);
    const [observerContent, setObserverContent] = useState('');
    const [observerUsers, setObserverUsers] = useState([]);

    const [selectedVote, setSelectedVote] = useState(null);

    const [leftPercent, setLeftPercent] = useState(0);
    const [rightPercent, setRightPercent] = useState(0);

    const [roomTimer, setRoomTimer] = useState(3600);

    // 방 접속시 연결 및 구독설정
    useEffect(() => {

        //첫 렌더링 시 유저 정보를 반환하는 api 만들기
        stompClient.current = new Client({
            // 첫 connect일시 jwt 검증용 토큰
            connectHeaders: {
                access: accessToken.current
            },
            brokerURL: 'ws://localhost:8090/ws-connect',
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                // 토론자 채팅 구독
                stompClient.current.subscribe(`/subscribe/fighter.${roomNo}`, (message) => {
                        const body = JSON.parse(message.body);
                        setFighterMessages((prevMessages) => [...prevMessages, body]);
                    },
                    {access: accessToken.current}
                );

                // 관전자 채팅 구독
                stompClient.current.subscribe(`/subscribe/observer.${roomNo}`, (message) => {
                        const body = JSON.parse(message.body);
                        setObserverMessages((prevMessages) => [...prevMessages, body]);
                    },
                    {access: accessToken.current}
                );

                //투표 구독
                stompClient.current.subscribe(`/subscribe/vote.${roomNo}`, (message) => {
                        const body = JSON.parse(message.body);
                        console.log("투표 결과")
                        console.log(body)
                        setLeftPercent(body.leftVote);
                        setRightPercent(body.rightVote);
                    },
                    {access: accessToken.current}
                );

                // 관전자 유저 리스트 구독
                stompClient.current.subscribe(`/subscribe/chatRoom.${roomNo}`, (message) => {
                        const body = JSON.parse(message.body);
                        console.log(body);
                        setObserverUsers(body);
                    },
                    {access: accessToken.current}
                );

                // 타이머 구독
                stompClient.current.subscribe(`/subscribe/timer.${roomNo}`, (message) => {
                        const body = JSON.parse(message.body);
                        setRoomTimer(body);
                    },
                    {access: accessToken.current}
                )

                // 연결 신호 보내기
                stompClient.current.publish({
                    destination: `/publish/chatRoom/join/${roomNo}`,
                    body: JSON.stringify({username: chatUserId.current, nickname: chatUserName.current}),
                    headers: {access: accessToken.current},
                })

                // 투표 현황 반환
                stompClient.current.publish({
                    destination: `/publish/vote.${roomNo}`,
                    body: "",
                    headers: {access: accessToken.current},
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

    const leaveUser = () => {
        if (stompClient.current) {
            stompClient.current.publish({
                destination: `/publish/chatRoom/leave/${roomNo}`,
                body: JSON.stringify({username: chatUserId.current, nickname: chatUserName.current}),
                headers: {access: accessToken.current},
            });

            stompClient.current.deactivate();
        }
    }

    const sendVote = (vote) => {
        stompClient.current.publish({
            destination: `/publish/vote.${roomNo}`,
            body: JSON.stringify({username: chatUserId.current, vote: vote}),
            headers: {access: accessToken.current},
        })
    }

    const sendFighterChat = () => {
        if (fighterContent) {
            stompClient.current.publish({
                destination: `/publish/fighter.${roomNo}`,
                body: JSON.stringify({username: chatUserId.current, content: fighterContent}),
                headers: {access: accessToken.current},
            });
            setFighterContent('');
        }
    };

    const sendObserverChat = () => {
        if (observerContent) {
            stompClient.current.publish({
                destination: `/publish/observer.${roomNo}`,
                body: JSON.stringify({username: chatUserId.current, content: observerContent}),
                headers: {access: accessToken.current},
            });
            setObserverContent('');
        }
    };

    const exampleTimer = (username, request) => {
        console.log(username)
        if (!username) {
            console.log("이름을 넣어주세요");
            return;
        }

        stompClient.current.publish({
            destination: `/publish/example/timer.${roomNo}`,
            body: JSON.stringify({
                username: username,
                request: request
            }),
            headers: {access: accessToken.current},
        })
    }

    //추후 리팩토링용 함수
    const publishMsg = (destination, body) => {
        stompClient.current.publish({
            destination: destination,
            body: JSON.stringify(body),
            headers: {access: accessToken.current},
        })
    }

    const subscribeMsg = (destination, callback) => {
        stompClient.current.subscribe(
            destination, (message) => {
                const body = JSON.parse(message.body);
                callback(body);
            },
            {access: accessToken.current}
        );
    }

    return (
        <div className={styles.fightBoard}>
            <div className={styles.fightZone}>
                {/* 토론자 채팅 공간 */}
                <div className={styles.fighterSection}>
                    <FighterInfo
                        selectedVote={selectedVote}
                        setSelectedVote={setSelectedVote}
                        roomTimer={roomTimer}
                        leftPercent={leftPercent}
                        rightPercent={rightPercent}
                        chatUserId={chatUserId}
                        exampleTimer={exampleTimer}
                        refs={{leftUser, rightUser, chatUserId}}
                    />

                    {/*토론자 채팅 섹션*/}
                    <FighterChat
                        fighterContent={fighterContent}
                        setFighterContent={setFighterContent}
                        fighterMessages={fighterMessages}
                        sendFighterChat={sendFighterChat}
                        refs={{fighterMessageEnd, leftUser, rightUser, chatUserId}}
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
                        observerMessages={observerMessages}
                        observerContent={observerContent}
                        setObserverContent={setObserverContent}
                        sendObserverChat={sendObserverChat}
                        refs={{observerMessageEnd, leftUser, rightUser, chatUserId}}
                    />
                </div>
            </div>
        </div>
    );
};

export default FightZone;
