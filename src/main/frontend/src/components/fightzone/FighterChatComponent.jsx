import styles from "../../assets/css/FightZone.module.css";
import leftFighterImg from "../../assets/image/ex_profile.png";
import rightFighterImg from "../../assets/image/ex_chiwawa.jpg";
import React, {forwardRef, useEffect} from "react";

const FighterChatComponent = forwardRef((props, ref) => {
    const {
        fighterMessages,
        fighterContent,
        setFighterContent,
        sendFighterChat,
        refs
    } = props;
    const {fighterMessageEnd, leftUser, rightUser, chatUserId} = refs;

    useEffect(() => {
        fighterMessageEnd.current.scrollIntoView();
    }, [fighterMessages]);

    return (
        <div className={styles.chatSection}>
            <div className={styles.chatMessages}>
                {fighterMessages.map((message, index) => {
                    if (message.username === leftUser.current) {
                        return (
                            <div key={index}
                                 className={styles.chatMessage}
                                 style={{alignSelf: "start"}}
                            >
                                <img
                                    className={styles.chatProfile}
                                    src={leftFighterImg}
                                    style={{border: "2px solid #300CFF"}}
                                    alt="fighterImg"
                                />
                                <span className={styles.fighterLeftContent}>{message.content}</span>
                            </div>
                        );
                    }

                    if (message.username === rightUser.current) {
                        return (
                            <div key={index}
                                 className={styles.chatMessage}
                                 style={{alignSelf: "end"}}
                            >
                                <span className={styles.fighterRightContent}>{message.content}</span>
                                <img
                                    className={styles.chatProfile}
                                    src={rightFighterImg}
                                    style={{border: "2px solid #FF0000"}}
                                    alt="fighterImg"
                                />
                            </div>
                        );
                    }

                    if (message.username === "NOTICE") {
                        return (
                            <div key={index}
                                 className={styles.chatMessage}
                                 style={{alignSelf: "center"}}
                            >
                                <span className={styles.fightNoticeContent}>{message.content}</span>
                            </div>
                        )
                    }

                    return null;
                })}
                <div ref={fighterMessageEnd}></div>
            </div>

            {(chatUserId.current === leftUser.current || chatUserId.current === rightUser.current) && (
            <div className={styles.chatInputContainer}>
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={fighterContent}
                    onChange={(e) => setFighterContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendFighterChat();
                        }
                    }}
                    maxLength={200}
                    className={styles.input}
                    style={{flex: 1}}
                />
            </div>
            )}
        </div>
    )
});

export default FighterChatComponent