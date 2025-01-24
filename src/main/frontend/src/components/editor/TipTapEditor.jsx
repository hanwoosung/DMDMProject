import React, {useEffect} from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import extensions from "./TipTapExtentions"; // 확장 배열
import styles from "../../assets/css/tiptapEditor/Editor.module.css"; // 스타일 적용
import MenuBar from "./MenuBar"; // 메뉴바 컴포넌트

const TipTapEditor = ({onEditorReady, setFiles, content}) => {

    const editor = useEditor({
        extensions,
        content: content, // 초기 콘텐츠
    });

    // 에디터 객체를 부모 컴포넌트로 전달
    useEffect(() => {
        if (editor && onEditorReady) {
            onEditorReady(editor);
        }
    }, [editor, onEditorReady]);

    return (
        <div className={styles.editorContainer}>
            <MenuBar editor={editor} setFiles={setFiles}/>
            <EditorContent editor={editor} className={styles.editorContent} />
        </div>
    );
};

export default TipTapEditor;
