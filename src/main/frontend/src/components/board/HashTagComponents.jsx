import {useState} from "react";
import Input from "../common/InputComponents";
import Tag from "./TagComponents";

const HashTag = ({hashTags = [], onAdd, onRemove}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            onAdd(inputValue.trim());
            setInputValue(""); // 입력 필드 초기화
        }
    };

    return (
        <div>
            {hashTags.map((tag) => (
                <Tag
                    key={tag}
                    value={tag}
                    onRemove={() => onRemove(tag)} // 태그 삭제 핸들러
                />
            ))}
            <Input
                style={{border: 0}}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="해시태그 추가"
                maxLength={10}
            />
        </div>
    );
};

export default HashTag;
