import { useEffect, useState } from "react";

const useSSE = (userId, onMessageCallback) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8090/sse/notifications?userId=${userId}`);

        eventSource.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                setNotifications((prev) => [...prev, parsedData]);

                if (onMessageCallback) {
                    onMessageCallback(parsedData);
                } else {
                    // 여기 뭐 넣징
                }
            } catch (error) {
                console.error("이벤트 데이터 파싱 오류:", error);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE 연결 오류:", err);
            eventSource.close();
        };

        return () => {
            console.log("EventSource 연결 종료.");
            eventSource.close();
        };
    }, [userId, onMessageCallback]);

    return notifications;
};

export default useSSE;
