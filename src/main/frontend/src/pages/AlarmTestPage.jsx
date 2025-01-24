import React, { useEffect, useState } from "react";
import {data} from "react-router-dom";

const AlarmTestPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8090/sse/notifications?userId=user456");
        console.log(eventSource);
        console.log("EventSource readyState:", eventSource.readyState);

        eventSource.onmessage = (event) => {
            console.log("Received event:", event.data);
            console.log(event.data);
            const obj = JSON.parse(event.data);
            console.log(obj);
            // setNotifications((prev) => [...prev, event.data]); // 알림 추가
            alert(obj.message);
        };

        eventSource.onerror = (err) => {
            console.error("SSE connection error:", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1>Real-time Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default AlarmTestPage;
