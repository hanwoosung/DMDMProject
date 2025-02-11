import styles from "../../assets/css/FightZone.module.css";
import React, {forwardRef, useEffect} from "react";

const ObserverChatComponent = forwardRef((props, ref) => {

    useEffect(() => {
        ref.current.scrollIntoView();
    }, [props.observerMessages]);

    return(
        <div className={styles.observerChatSection}>
            <div className={styles.chatMessages}>
                {props.observerMessages.map((message, index) => (
                    <div key={index} className={styles.chatMessage}>
                        <span className={styles.username}>{message.username}:</span>
                        <span className={styles.userContent}>{message.content}</span>
                    </div>
                ))}
                <div ref={ref}></div>
            </div>
            <div className={styles.chatInputContainer}>
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={props.observerName}
                    onChange={(e) => props.setObserverName(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={props.observerContent}
                    onChange={(e) => props.setObserverContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            props.sendObserverChat();
                        }
                    }}
                    style={{flex: 1}}
                    maxLength={200}
                    className={styles.input}
                />
            </div>
        </div>
    )
});

export default ObserverChatComponent