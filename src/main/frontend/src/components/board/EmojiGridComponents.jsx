import React from "react";
import MoreStyle from "../../assets/css/board/EmojiGrid.module.css";

const EmojiGrid = () => {
    return (
        <div className={MoreStyle.container}>
            <div className={MoreStyle.emojiRow}>
                {Array(10).fill("😊").map((emoji, index) => (
                    <span key={index} className={MoreStyle.emoji}>
            {emoji}
          </span>
                ))}
            </div>
            <div className={MoreStyle.grid}>
                {Array(20).fill(null).map((_, index) => (
                    <div key={index} className={MoreStyle.cell}></div>
                ))}
            </div>
            <button className={MoreStyle.closeButton}>닫기</button>
        </div>
    );
};

export default EmojiGrid;
