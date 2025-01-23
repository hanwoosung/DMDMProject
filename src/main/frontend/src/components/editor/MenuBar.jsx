import React from "react";
import styles from "../../assets/css/tiptapEditor/Editor.module.css"; // 스타일 적용
import { Tooltip } from "react-tooltip";
import { FaBold, FaItalic, FaUndo, FaRedo, FaImage, FaYoutube, FaTable, FaTrash, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight, FaCode } from "react-icons/fa";
import useMenuBarHandler from "./MenuBarHandler";

const MenuBar = ({ editor }) => {

    const {
        handleSaveFile
    } = useMenuBarHandler();

    if (!editor) return null;

    // 이미지 업로드 처리 함수
    const uploadImage = (file) => {

        const formData = new FormData();
        formData.append("image", file);

        handleSaveFile(formData)
            .then((res) => {

            }).catch((res) => {
                console.log(res);
            });

        // try {
        //     const response = await fetch("http://localhost:5000/upload", {
        //         method: "POST",
        //         body: formData,
        //     });
        //     const data = await response.json();
        //
        //     if (data.url) {
        //         editor.chain().focus().setImage({ src: data.url }).run();
        //     } else {
        //         alert("Image upload failed!");
        //     }
        // } catch (error) {
        //     console.error("Error uploading image:", error);
        //     alert("An error occurred while uploading the image.");
        // }
    };

    const handleImageUpload = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.onchange = () => {
            const file = fileInput.files[0];
            if (file) {
                uploadImage(file);
            }
        };

        fileInput.click();
    };

    return (
        <div className={styles.menuBar}>
            {/* Undo */}
            <button data-tip="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                <FaUndo />
            </button>

            {/* Redo */}
            <button data-tip="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                <FaRedo />
            </button>

            <div className={styles.separator}></div>

            {/* Bold */}
            <button data-tip="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? styles.active : ""}>
                <FaBold />
            </button>

            {/* Italic */}
            <button data-tip="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? styles.active : ""}>
                <FaItalic />
            </button>

            <div className={styles.separator}></div>

            {/* Add Image */}
            <button data-tip="Upload Image" onClick={handleImageUpload}>
                <FaImage />
            </button>

            {/* Add YouTube */}
            <button data-tip="Add YouTube" onClick={() => {
                const url = prompt("Enter YouTube URL:");
                const videoId = url?.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/);
                if (videoId) {
                    editor.chain().focus().setYouTube({
                        src: `https://www.youtube.com/embed/${videoId[1] || videoId[2]}`,
                        width: 560,
                        height: 315,
                    }).run();
                } else {
                    alert("Enter a valid YouTube URL!");
                }
            }}>
                <FaYoutube />
            </button>

            <div className={styles.separator}></div>

            {/* Add Table */}
            <button data-tip="Add Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                <FaTable />
            </button>

            {/* Delete Table */}
            <button data-tip="Delete Table" onClick={() => editor.chain().focus().deleteTable().run()}>
                <FaTrash />
            </button>

            {/* Add Row */}
            <button data-tip="Add Row" onClick={() => editor.chain().focus().addRowAfter().run()}>
                <FaPlus />
            </button>

            {/* Delete Row */}
            <button data-tip="Delete Row" onClick={() => editor.chain().focus().deleteRow().run()}>
                <FaMinus />
            </button>

            <div className={styles.separator}></div>

            {/* Alignments */}
            <button data-tip="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? styles.active : ""}>
                <FaAlignLeft />
            </button>
            <button data-tip="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? styles.active : ""}>
                <FaAlignCenter />
            </button>
            <button data-tip="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? styles.active : ""}>
                <FaAlignRight />
            </button>

            <div className={styles.separator}></div>

            {/* Add Code Block */}
            <button data-tip="Add Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? styles.active : ""}>
                <FaCode />
            </button>

            <Tooltip anchorSelect="[data-tip]" />
        </div>
    );
};

export default MenuBar;
