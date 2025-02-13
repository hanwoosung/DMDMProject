import styles from "../../assets/css/FightZone.module.css";
import leftArrowIcon from "../../assets/image/icon_left_arrow.svg";
import React, {forwardRef} from "react";
import {useNavigate} from "react-router-dom";

const FightZoneExitComponent = forwardRef((props, ref) => {
    const {
        leftUser,
        rightUser,
        chatUserId
    } = props
    const navigate = useNavigate();

    const gotoMain = (leftUser, rightUser, chatUserId) => {
        let exit = true;
        if (chatUserId === leftUser || chatUserId === rightUser) {
            exit = window.confirm("나가게 되면 패배처리됩니다. 나가시겠습니까?");
        }
        if (exit) {
            navigate(`/`)
        }
    }

    return (
        <div className={styles.exitBtn} onClick={
            () =>
                gotoMain(
                    leftUser.current,
                    rightUser.current,
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