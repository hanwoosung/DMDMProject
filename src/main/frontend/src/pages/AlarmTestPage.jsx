import React, { useEffect, useState } from "react";
import useSSE from "../hooks/common/useSSE";

const AlarmTestPage = () => {
    const notifications = useSSE("user456", (data) => {
        alert(data.message);
    });

    return (
        <div>
            <h1>Real-time Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default AlarmTestPage;