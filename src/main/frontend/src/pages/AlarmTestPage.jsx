import React, { useEffect, useState } from "react";

const AlarmTestPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8090/sse/notifications?userId=user456");
        console.log(eventSource);
        console.log("EventSource readyState:", eventSource.readyState);

        eventSource.onmessage = (event) => {
            console.log("Received event:", event.data);
            // setNotifications((prev) => [...prev, event.data]); // 알림 추가
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
