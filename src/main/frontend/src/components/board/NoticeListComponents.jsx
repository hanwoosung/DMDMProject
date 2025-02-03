import useFetch from "../../hooks/common/useFetch";
import {ReactComponent as NoticeIcon} from "../../assets/image/icon_notice.svg";
import BoardListStyle from "../../assets/css/board/BoardList.module.css";
import {useEffect, useState} from "react";

const NoticeList = () => {
    const {data: fetchedEvents, loading} = useFetch(`/api/v1/board/NOTICE`, {}, "get");
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // fetchedEvents 로드 후 기본 화면 설정
        if (fetchedEvents?.statusCode === 200) {
            setNotices(fetchedEvents.data);
        }
    }, [fetchedEvents]);

    return (
        <div className={BoardListStyle.noticeContainer}>
            {notices.length > 0 ? (
                notices.map((notice, index) => (
                    <div key={index} className={BoardListStyle.noticeList}>
                        <span>
                            <NoticeIcon />
                            {"[공지]"}
                        </span>
                        <span>{notice.boardTitle}</span>
                    </div>
                ))
            ) : ("")
            }
        </div>
    );
};

export default NoticeList;
