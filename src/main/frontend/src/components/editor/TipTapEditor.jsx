import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import extensions from "./TipTapExtentions"; // 확장 배열 가져오기
import styles from "../../assets/css/tiptapEditor/Editor.module.css";

const content = "<p>여기에 본문을 입력하세요.</p>";

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = prompt("이미지 URL을 입력하세요:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addVideo = () => {
        const url = prompt("동영상 URL을 입력하세요 (예: https://www.example.com/video.mp4):");
        if (url) {
            const isValidURL = url.match(/\.(mp4|webm|ogg)$/i); // 파일 확장자 검증
            if (isValidURL) {
                editor.chain().focus().setVideo({ src: url, controls: true }).run();
            } else {
                alert("유효한 동영상 URL을 입력하세요! (예: .mp4, .webm, .ogg)");
            }
        }
    };

    const addYouTube = () => {
        const url = prompt("YouTube 링크를 입력하세요 (예: https://www.youtube.com/watch?v=dQw4w9WgXcQ):");
        if (url) {
            const videoId = extractYouTubeId(url);
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                editor
                    .chain()
                    .focus()
                    .setYouTube({ src: embedUrl, width: 560, height: 315 })
                    .run();
            } else {
                alert("유효한 YouTube URL을 입력하세요!");
            }
        }
    };

    // YouTube URL에서 Video ID 추출
    const extractYouTubeId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/);
        return match ? match[1] || match[2] : null;
    };

    return (
        <div className={styles.menuBar}>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                ↶
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                ↷
            </button>
            <div className={styles.separator}></div>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? styles.active : ""}
            >
                <b>B</b>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? styles.active : ""}
            >
                <i>I</i>
            </button>
            <div className={styles.separator}></div>
            <button onClick={addImage}>이미지 추가</button>
            <button onClick={addVideo}>동영상 추가</button>
            <button onClick={addYouTube}>YouTube 추가</button>
        </div>
    );
};

const Tiptap = () => {
    return (
        <EditorProvider extensions={extensions} content={content}>
            <MenuBar />
        </EditorProvider>
    );
};

export default Tiptap;
