import logo from "../../assets/image/img_logo.jpg";
import profile from "../../assets/image/ex_profile.png";

import {ReactComponent as Message} from "../../assets/image/icon_message.svg";
import {ReactComponent as OpenMessage} from "../../assets/image/icon_open_message.svg";
import {ReactComponent as Notification} from "../../assets/image/icon_notification.svg";
import {ReactComponent as DarkMode} from "../../assets/image/icon_dark_mode.svg";
import {ReactComponent as Logout} from "../../assets/image/icon_logout.svg";
import {ReactComponent as Info} from "../../assets/image/icon_info.svg";
import {ReactComponent as Emoticon} from "../../assets/image/icon_emoticon.svg";
import {ReactComponent as Edit} from "../../assets/image/icon_edit.svg";
import {ReactComponent as More} from "../../assets/image/icon_more.svg";
import {ReactComponent as Colosseum} from "../../assets/image/icon_colosseum.svg";
import {ReactComponent as MoreView} from "../../assets/image/icon_more_view.svg";
import styles from "../../assets/css/Header.module.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLogin} from "../../contexts/AuthContext";
import useApi from "../../hooks/common/useApi";

const Header = () => {

    const {get, post, put, del, apiLoading, error} = useApi();

    const [isHovered, setIsHovered] = useState(false);
    const [activeOption, setActiveOption] = useState(null);
    const [popupView, setPopupView] = useState(null);
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const {isLoggedIn, loginUser, profileImage} = useLogin();

    const togglePopupView = (clicked) => {
        setPopupView(clicked === popupView ? null : clicked);
    }
    const handleToggleOption = (id) => {
        setActiveOption((prev) => (prev === id ? null : id));
    };

    const [alarms, setAlarms] = useState([]);
    const [messages, setMessages] = useState([]);

    // todo 빈공간 클릭시 삭제 버튼 숨기기
    useEffect(() => {
        popupView === null && setActiveOption(null);

        if (popupView === "message") {
            handleLoadMessage();
        }

        if (popupView === "notification") {
            handleLoadAlarm();
        }
    }, [popupView])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setPopupView(null);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const gotoFightZone = () => {
        let roomNo = prompt('(테스팅)방번호 입력', '');
        navigate(`/fight-zone/${roomNo}`)
    };

    const goLogout = () => {
        navigate("/logout")
    }

    const goLogin = () => {
        navigate("/login")
    }

    const goJoin = () => {
        navigate("/sign-up")
    }

    const goBoard = (boardType) => {
        navigate(`/board-list/${boardType}`)
    }

    const goEdit = () => {
        navigate("/user-edit")
    }

    const handleLoadAlarm = () => {

        get("/api/v1/alarm", {
            headers: {"Content-Type": "application/json"},
        }).then((res) => {

            if (res.statusCode !== 200) {
                return;
            }

            setAlarms(res.data);

        }).catch((res) => {
            console.log(res);
        });

    }

    const handleLoadMessage = () => {

        get("/api/v1/message/all", {
            headers: {"Content-Type": "application/json"},
        }).then((res) => {

            if (res.statusCode !== 200) {
                return;
            }

            setMessages(res.data);

        }).catch((res) => {
            console.log(res);
        });

    }

    const handleReadAlarm = (alarmIds) => {

        post("/api/v1/alarm/read", {
            headers: {"Content-Type": "application/json"},
            body:alarmIds
        }).then((res) => {

            if (res.statusCode !== 200) {
                return;
            }

            handleLoadAlarm();
        }).catch((res) => {
            console.log(res);
        });

    }



    return (
        <header>
            <div className={styles.flexContainer}>
                <div className={styles.flexRow}>
                    <img src={logo} className={styles.logoBtn} alt="logo"
                         onClick={() => navigate("/")}
                    />
                    <div className={styles.profileFlexColumn}>
                        <div className={styles.menuDetailFlexRow}
                             onMouseEnter={() => setIsHovered(true)}
                             onMouseLeave={() => setIsHovered(false)}>
                            <div className={styles.titleHeadBtn}>커뮤니티</div>
                            <div className={styles.titleHeadBtn}>인기글</div>
                            <div className={styles.titleHeadBtn} onClick={gotoFightZone}>투기장</div>
                            <div className={styles.titleHeadBtn}>취업</div>
                            <div className={styles.titleHeadBtn}>공지사항</div>
                            <div className={styles.titleHeadBtn}>이벤트</div>
                            <div className={styles.titleHeadBtn}>고객센터</div>
                        </div>

                        <div className={styles.headerDetail} style={{display: isHovered ? "flex" : "none"}}
                             onMouseEnter={() => setIsHovered(true)}
                             onMouseLeave={() => setIsHovered(false)}>
                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>커뮤니티</div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("COMMUNITY")
                                }}>커뮤니티
                                </div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("QNA")
                                }}>Q & A
                                </div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("KNOW")
                                }}>지식
                                </div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("STUDY")
                                }}>스터디
                                </div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>인기글</div>
                                <div className={styles.headBtn}>주간 인기</div>
                                <div className={styles.headBtn}>일간 인기</div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>투기장</div>
                                <div className={styles.headBtn}>투기장</div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>취업</div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("EMPLO_TALK")
                                }}>취업얘기
                                </div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("EMPLO")
                                }}>채용
                                </div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>공지사항</div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("NOTICE")
                                }}>공지사항
                                </div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>이벤트</div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("EVENT")
                                }}>이벤트
                                </div>
                            </div>

                            <div className={styles.verticalLine} />

                            <div className={styles.headerFlexColumn}>
                                <div className={styles.detailTitleBtn}>고객센터</div>
                                <div className={styles.headBtn} onClick={() => {
                                    goBoard("SUPPORT")
                                }}>고객센터
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.menuFlexColumn} ref={popupRef}>

                    <div className={styles.profileFlexRow}>
                        {isLoggedIn &&
                            (
                                <Message className={styles.iconSize}
                                         onClick={() => {
                                             togglePopupView("message")
                                         }}
                                />
                            )}
                        {isLoggedIn &&
                            (
                                <Notification className={styles.iconSize}
                                              onClick={() => {
                                                  togglePopupView("notification")
                                              }}
                                />
                            )}
                        <DarkMode className={styles.iconSize} />
                        {isLoggedIn ? (
                            <div className={styles.profileContainer}>
                                {profileImage ? (
                                        <img src={`${profileImage}`}
                                             alt="User Profile"
                                             className={styles.profileImage}
                                             onClick={() => {
                                                 togglePopupView("profile");
                                             }}
                                        />
                                    ) :
                                    (<img src={`${profile}`}
                                          alt="User Profile"
                                          className={styles.profileImage}
                                          onClick={() => {
                                              togglePopupView("profile");
                                          }}
                                    />)
                                }
                                <span className={styles.profileName}>{loginUser}</span>
                            </div>
                        ) : (
                            <div className={styles.loginAndJoinBox}>
                                <div onClick={goLogin} className={styles.login}> 로그인</div>
                                <div onClick={goJoin} className={styles.join}> 회원가입</div>
                            </div>
                        )}
                    </div>

                    <div className={styles.headPopupList}
                         style={{display: popupView === "message" ? "flex" : "none"}}
                    >
                        <div className={styles.notifyTitle}>
                            <OpenMessage style={{width: 16, height: 16}} />
                            <div style={{marginLeft: 10}}>쪽지</div>
                        </div>
                        <hr className={styles.profileLine} />
                        <div className={styles.notifyContent}>
                            <div className={styles.notifyBtn}>
                                <div className={styles.headBtn}>모두 읽음</div>
                                {/*<div className={styles.headBtn}>모두 삭제</div>*/}
                            </div>
                            {/*테스트 데이터 넣었습니다. 배열 빼고 넣으세요*/}
                            {messages.map((message) => (
                                <div key={message.messageId} className={styles.flexColumn}>
                                    <div className={styles.notifyItem} style={{gap: 10}}>
                                        <img src={message.filePath} alt="profile" style={{borderRadius: 100}} />
                                        <div className={styles.flexColumn} style={{gap: 3, flex: 1}}>
                                            <div className={styles.flexRow} style={{justifyContent: "space-between"}}>
                                                <div>{message.sendUserName}</div>
                                                <div>
                                                    {new Date(message.insertDt).toLocaleDateString('ko-KR')}
                                                </div>
                                            </div>
                                            <div style={{color: "gray"}}>님이 당신에게 쪽지를 보냈습니다.</div>
                                        </div>
                                    </div>
                                    <hr className={styles.profileItemLine} />
                                </div>
                            ))}

                            {/*{["구구", "멍멍", "두루미"].map((item, index) => (*/}
                            {/*    <div key={index} className={styles.flexColumn}>*/}
                            {/*        <div className={styles.notifyItem} style={{gap: 10}}>*/}
                            {/*            <img src={profile} alt="profile" style={{borderRadius: 100}} />*/}
                            {/*            <div className={styles.flexColumn} style={{gap: 3}}>*/}
                            {/*                <div className={styles.flexRow} style={{justifyContent: "space-between"}}>*/}
                            {/*                    <div>{item}</div>*/}
                            {/*                    <div>YYYY-MM-DD</div>*/}
                            {/*                </div>*/}
                            {/*                <div style={{color: "gray"}}>님이 당신에게 쪽지를 보냈습니다.</div>*/}
                            {/*            </div>*/}
                            {/*            <div className={styles.moreOptionBtn}>*/}
                            {/*                <More className={styles.iconSize} onClick={() => {*/}
                            {/*                    handleToggleOption(index)*/}
                            {/*                }} />*/}
                            {/*                <div*/}
                            {/*                    className={styles.optionList}*/}
                            {/*                    style={{display: activeOption === index ? "flex" : "none"}}*/}
                            {/*                >*/}
                            {/*                    <div className={styles.optionItem}>삭제</div>*/}
                            {/*                    <hr />*/}
                            {/*                    <div className={styles.optionItem}>읽음</div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <hr className={styles.profileItemLine} />*/}
                            {/*    </div>*/}
                            {/*))}*/}


                        </div>
                        {/*<MoreView className={styles.moreViewBtn} />*/}
                    </div>

                    <div className={styles.headPopupList}
                         style={{display: popupView === "notification" ? "flex" : "none"}}
                    >
                        <div className={styles.notifyTitle}>
                            <Notification style={{width: 16, height: 16}} />
                            <div style={{marginLeft: 10}}>알림</div>
                        </div>
                        <hr className={styles.profileLine} />
                        <div className={styles.notifyContent}>
                            <div className={styles.notifyBtn}>
                                <div className={styles.headBtn} onClick={() => {handleReadAlarm(alarms.map((alarm) => {return alarm.alarmId}))}}>모두 읽음</div>
                                {/*<div className={styles.headBtn}>모두 삭제</div>*/}
                            </div>

                            {alarms.map((alarm) => (
                                <div className={styles.notifyItem} style={{gap: 10}} onClick={() => {handleReadAlarm([alarm.alarmId])}}>
                                    <img src={profile} alt="profile" style={{borderRadius: 100}} />
                                    <div className={styles.flexColumn} style={{gap: 3}}>
                                        <div className={styles.flexRow} style={{justifyContent: "space-between"}}>
                                            <div className={styles.flexRow}>
                                                <div>{alarm.userName}</div>
                                                {alarm.alarmType === "FIGHT" ?
                                                    <Colosseum width="18" height="18" style={{marginLeft: 5}} /> : ""}
                                            </div>
                                            <div>{alarm.insertDt}</div>
                                        </div>
                                        <div style={{color: "gray"}}>{alarm.alarmContent}</div>
                                    </div>

                                    <hr />
                                </div>
                            ))}


                        </div>
                        {/*<MoreView className={styles.moreViewBtn} />*/}
                    </div>

                    <div className={styles.profileDetail}
                         style={{display: popupView === "profile" ? "flex" : "none"}}
                    >
                        <div style={{fontWeight: "bold"}}>내 계정</div>
                        <div className={styles.flexRow}>
                            <Info className={styles.profileIcon} />
                            <div className={styles.profileDetailSpan}>프로필</div>
                        </div>
                        <div className={styles.flexRow}>
                            <Edit className={styles.profileIcon} />
                            <div className={styles.profileDetailSpan} onClick={goEdit}>정보수정</div>
                        </div>
                        <div className={styles.flexRow}>
                            <Emoticon className={styles.profileIcon} />
                            <div className={styles.profileDetailSpan}>이모티콘</div>
                        </div>
                        <hr className={styles.profileDetailLine} />
                        <div className={styles.flexRow}>
                            <Logout className={styles.profileIcon} />
                            <div className={styles.profileDetailSpan} onClick={goLogout}>로그아웃</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;