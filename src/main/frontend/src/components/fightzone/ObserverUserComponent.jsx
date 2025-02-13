import styles from "../../assets/css/FightZone.module.css";
import React from "react";

const ObserverUserComponent = (props) => {
  return(
      <div className={styles.userSection}>
          <div className={styles.chatTitle}>현재 관전자 리스트({props.observerUsers.length}) // 방 번호: {props.roomNo}</div>
          <div className={styles.userList}>
              {props.observerUsers.map((user, index) => (
                  <div key={index} className={styles.userItem}>
                      <span>{user.username}</span>
                      <span>({user.nickname})</span>
                  </div>
              ))}
          </div>
      </div>
  )
}

export default ObserverUserComponent