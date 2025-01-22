import React, {useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import {useParams} from "react-router-dom";

const FightZone = () => {
    const {roomNo} = useParams();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const stompClient = useRef(null);

    useEffect(() => {
        stompClient.current = new Client({
            brokerURL: 'ws://localhost:8090/ws-connect',
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                stompClient.current.subscribe(`/subscribe/chat.${roomNo}`, (message) => {
                    const body = JSON.parse(message.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        `${body.username}: ${body.content}`
                    ]);
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

        stompClient.current.activate();

        return () => {
            stompClient.current.deactivate();
        };
    }, []);

    const sendChat = () => {
        if (!stompClient.current || !stompClient.current.connected) {
            console.log('연결 안됨요....');
            return;
        }

        if (username && content) {
            stompClient.current.publish({
                destination: `/publish/chat.${roomNo}`,
                body: JSON.stringify({username, content}),
            });
            setContent('');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div>{roomNo}: 현재 방 주소</div>
                </div>
                <div className="col-md-6">
                    <div className="form-inline">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <br/>
                            <label htmlFor="content">Content</label>
                            <input
                                type="text"
                                id="content"
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
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FightZone;
