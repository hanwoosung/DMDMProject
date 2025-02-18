import styles from "../../assets/css/FightZone.module.css";
import React, {forwardRef, useEffect} from "react";

const ObserverChatComponent = forwardRef((props, ref) => {

    const {observerMessages, observerContent, setObserverContent, sendObserverChat, sendUser, receiveUser, refs} = props;
    const {observerMessageEnd, chatUserId} = refs;

    useEffect(() => {
        observerMessageEnd.current.scrollIntoView();
    }, [observerMessages]);

    return (
        <div className={styles.observerChatSection}>
            <div className={styles.chatMessages}>
                {observerMessages.map((message, index) => (
                    <div key={index} className={styles.chatMessage}>
                        <span className={styles.username}>{message.username}:</span>
                        <span className={styles.userContent}>{message.content}</span>
                    </div>
                ))}
                <div ref={observerMessageEnd}></div>
            </div>

            {!(chatUserId.current === sendUser || chatUserId.current === receiveUser) && (
                <div className={styles.chatInputContainer}>
                    <div>
                        {chatUserId.current}
                    </div>
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
                        maxLength={200}
                        className={styles.input}
                    />
                </div>
            )}
        </div>
    )
});

export default ObserverChatComponent