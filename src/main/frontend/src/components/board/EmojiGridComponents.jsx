import React, {useEffect, useState} from "react";
import MoreStyle from "../../assets/css/board/EmojiGrid.module.css";
import useFetch from "../../hooks/common/useFetch";

const EmojiGrid = ({
                       setIsAlert,
                       setAlertMessage,
                       setIsEmojiGridVisible,
                       handleSaveEmoticon
                   }) => {

    const [emoticons, setEmoticons] = useState([]);
    const [selectEmotionId, setSelectEmotionId] = useState(null);
    const [gridEmoticons, setGridEmoticons] = useState([]);
    const {data: emoticonsEvents, loading} = useFetch(`/api/v1/comment/emoticon`, {}, "get");

    useEffect(() => {
        if (emoticonsEvents && emoticonsEvents.statusCode === 200) {
            setEmoticons(emoticonsEvents.data);
            setSelectEmotionId(emoticonsEvents.data[0].itemId);
        } else if (emoticonsEvents) {
            setIsEmojiGridVisible(false);
            setIsAlert(true);
            setAlertMessage(emoticonsEvents.message);
        }
    }, [emoticonsEvents]);

    useEffect(() => {
        setGridEmoticons(emoticons.filter((emotion) => emotion.itemId === selectEmotionId));
    }, [selectEmotionId]);

    const handleChageEmoticon = (itemId) => {
        setSelectEmotionId(itemId);
    }

    return (
        <div className={MoreStyle.container}>
            <div className={MoreStyle.emojiRow}>
                {emoticons.map((emoji, index) =>
                    emoji.orderNo == 0
                        ? (<span key={index} className={MoreStyle.emoji} onClick={() => {handleChageEmoticon(emoji.itemId)}}>
                            <img src={emoji.filePath} alt="emoji" draggable={false} />
                        </span>)
                        : ""
                )}


            </div>
            <div className={MoreStyle.grid}>
                {gridEmoticons.map((emoticon, index) => (
                    <div key={index} className={MoreStyle.cell} onClick={() => {handleSaveEmoticon(emoticon.filePath)}}>
                        <img src={emoticon.filePath} alt="emoticon" draggable={false} />
                    </div>
                ))}
            </div>
            <button className={MoreStyle.closeButton} onClick={() => {setIsEmojiGridVisible(false)}}>닫기</button>
        </div>
    );
};

export default EmojiGrid;
