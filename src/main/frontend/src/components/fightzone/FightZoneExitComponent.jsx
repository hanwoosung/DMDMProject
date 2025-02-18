import styles from "../../assets/css/FightZone.module.css";
import leftArrowIcon from "../../assets/image/icon_left_arrow.svg";
import React, {forwardRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const FightZoneExitComponent = forwardRef((props, ref) => {
    const {
        sendUser,
        receiveUser,
        chatUserId
    } = props
    const navigate = useNavigate();

    const gotoMain = (sendUser, receiveUser, chatUserId) => {
        let exit = true;
        if (chatUserId === sendUser || chatUserId === receiveUser) {
            exit = window.confirm("나가게 되면 패배처리됩니다. 나가시겠습니까?");
        }
        if (exit) {
            navigate(`/fight/list`)
        }
    }

    return (
        <div className={styles.exitBtn} onClick={
            () =>
                gotoMain(
                    sendUser,
                    receiveUser,
                    chatUserId.current
                )
        }>
            <img
                style={{height: 20}}
                src={leftArrowIcon}
                alt="leftArrowIcon"
            />
            <span className={styles.exitBtnName}>
                나가기
            </span>
        </div>
    )
});

export default FightZoneExitComponent