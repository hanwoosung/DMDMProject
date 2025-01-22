import React, {useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {useParams} from "react-router-dom";

const FightZone = () => {
    const { roomNo } = useParams();
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const stompClient = useRef(null);
    const chatRoomId = useRef('');

    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: 'ws://localhost:8090/ws-connect',
            onConnect: (frame) => {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.current.subscribe(`/subscribe/chat.${chatRoomId.current}`, (message) => {
                    const body = JSON.parse(message.body);
                    const username = body.username;
                    const content = body.content;
                    console.log("응답..........."+body.content);
                    setMessages((prevMessages) => [...prevMessages, `${username}: ${content}`]);
                });
            },
            onWebSocketError: (error) => {
                console.error('Error with websocket', error);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        return () => {
            stompClient.current.deactivate();
        };
    }, []);

    const connect = () => {
        stompClient.current.activate();
    }

    const disconnect = () => {
        stompClient.current.deactivate();
        setConnected(false);
        console.log("Disconnected");
    }

    const sendChat = () => {
        if (!stompClient.current || !stompClient.current.connected) {
            console.log('연결 안됨요....');
            return;
        }

        if (chatRoomId.current && username && content) {
            console.log(`요청 => 주소:/publish/chat.${chatRoomId.current}, 바디: ${JSON.stringify({username, content})}`);
            stompClient.current.publish({
                destination: `/publish/chat.${chatRoomId.current}`,
                body: JSON.stringify({username, content}),
            });
            setContent('');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-inline">
                        <div className="form-group">
                            <div>{roomNo}: 이거 나옴요</div>
                            <label htmlFor="connect">WebSocket connection:</label>
                            <button
                                id="connect"
                                className="btn btn-default"
                                type="button"
                                onClick={connect}
                                disabled={connected}
                            >
                                Connect
                            </button>
                            <button
                                id="disconnect"
                                className="btn btn-default"
                                type="button"
                                onClick={disconnect}
                                disabled={!connected}
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-inline">
                        <div className="form-group">


                            <label htmlFor="chatRoomId">Chat Room ID</label>
                            <input
                                type="text"
                                id="chatRoomId"
                                className="form-control"
                                value={chatRoomId.current}
                                onChange={(e) => {
                                    chatRoomId.current = e.target.value;
                                }}
                            />


                            <label htmlFor="na">Name</label>
                            <input
                                type="text"
                                id="na"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="name">Content</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <button
                            id="send"
                            className="btn btn-default"
                            type="button"
                            onClick={sendChat}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table id="conversation" className="table table-striped">
                        <thead>
                        <tr>
                            <th>Chat messages</th>
                        </tr>
                        </thead>
                        <tbody id="greetings">
                        {messages.map((message, index) => (
                            <tr key={index}>
                                <td>{message}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FightZone;
