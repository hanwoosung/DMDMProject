import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight"; // 변경된 부분
import "highlight.js/styles/github.css"; // 코드 블록 스타일
import { Node } from "@tiptap/core"; // YouTube 확장 정의

import javascript from "highlight.js/lib/languages/javascript"; // 예시로 JavaScript 언어 추가
import html from "highlight.js/lib/languages/xml"; // 예시로 HTML 추가

// lowlight 인스턴스 생성
const lowlight = createLowlight();

// 기존 Image 확장을 커스터마이징하여 드래그 및 크기 조정 기능 추가
const ResizableDraggableImage = Image.extend({
    draggable: true,

    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: "auto" },
            height: { default: "auto" },
        };
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const img = document.createElement("img");
            img.src = node.attrs.src;
            img.alt = node.attrs.alt || "";
            img.title = node.attrs.title || "";
            img.style.width = node.attrs.width;
            img.style.height = node.attrs.height;
            img.style.cursor = "move";

            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.draggable = true;

            const resizeHandle = document.createElement("div");
            resizeHandle.style.width = "10px";
            resizeHandle.style.height = "10px";
            resizeHandle.style.background = "blue";
            resizeHandle.style.position = "absolute";
            resizeHandle.style.right = "0";
            resizeHandle.style.bottom = "0";
            resizeHandle.style.cursor = "nwse-resize";

            wrapper.appendChild(img);
            wrapper.appendChild(resizeHandle);

            // 드래그 시작 이벤트
            wrapper.addEventListener("dragstart", (event) => {
                event.dataTransfer.effectAllowed = "move";

                const dragData = {
                    attrs: node.attrs,
                    pos: getPos(),
                };

                event.dataTransfer.setData("application/json", JSON.stringify(dragData));
            });

            // 드롭 이벤트
            editor.view.dom.addEventListener("drop", (event) => {
                event.preventDefault();

                let draggedData;
                try {
                    const rawData = event.dataTransfer.getData("application/json");
                    draggedData = JSON.parse(rawData);
                } catch (error) {
                    console.error("Error parsing drag data:", error);
                    return;
                }

                const dropPos = editor.view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });

                if (!dropPos || !draggedData) return;

                // 위치를 기준으로 p 태그 내부로 이동
                const $dropPos = editor.state.doc.resolve(dropPos.pos);
                const paragraphPos = $dropPos.start($dropPos.depth - 1);

                editor
                    .chain()
                    .focus()
                    .deleteRange({ from: draggedData.pos, to: draggedData.pos + 1 }) // 기존 이미지 삭제
                    .insertContentAt(paragraphPos, {
                        type: "image",
                        attrs: draggedData.attrs,
                    }) // p 태그 내부에 삽입
                    .run();
            });

            // 크기 조정 로직
            const onResize = (event) => {
                event.preventDefault();
                let startX = event.clientX;
                let startY = event.clientY;
                const initialWidth = img.offsetWidth;
                const initialHeight = img.offsetHeight;

                const onMove = (moveEvent) => {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;

                    const newWidth = Math.max(50, initialWidth + dx);
                    const newHeight = Math.max(50, initialHeight + dy);

                    img.style.width = `${newWidth}px`;
                    img.style.height = `${newHeight}px`;

                    editor.commands.updateAttributes("image", {
                        width: `${newWidth}px`,
                        height: `${newHeight}px`,
                    });
                };

                const onStop = () => {
                    document.removeEventListener("mousemove", onMove);
                    document.removeEventListener("mouseup", onStop);
                };

                document.addEventListener("mousemove", onMove);
                document.addEventListener("mouseup", onStop);
            };

            resizeHandle.addEventListener("mousedown", onResize);

            return {
                dom: wrapper,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== "image") {
                        return false;
                    }
                    img.src = updatedNode.attrs.src;
                    img.alt = updatedNode.attrs.alt;
                    img.title = updatedNode.attrs.title;
                    img.style.width = updatedNode.attrs.width;
                    img.style.height = updatedNode.attrs.height;
                    return true;
                },
            };
        };
    },
});


const YouTube = Node.create({
    name: "youtube",
    group: "block",
    draggable: true, // 드래그 가능
    addAttributes() {
        return {
            src: { default: null },
            width: { default: 560 },
            height: { default: 315 },
            frameborder: { default: 0 },
            allow: {
                default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            },
            allowfullscreen: { default: true },
        };
    },
    parseHTML() {
        return [{ tag: "iframe[src]" }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["iframe", HTMLAttributes];
    },
    addCommands() {
        return {
            setYouTube:
                (options) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        });
                    },
        };
    },
});

// Video 확장 정의
const Video = Node.create({
    name: "video",
    group: "block",
    selectable: true,
    draggable: true, // 드래그 가능
    addAttributes() {
        return {
            src: { default: null },
            controls: { default: true },
            autoplay: { default: false },
            loop: { default: false },
        };
    },
    parseHTML() {
        return [{ tag: "video" }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["video", { ...HTMLAttributes, controls: true }];
    },
    addCommands() {
        return {
            setVideo:
                (options) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        });
                    },
        };
    },
});

// 테이블 확장: 드래그 가능하도록 오버라이드
const DraggableTable = Table.extend({
    draggable: true, // 테이블 전체를 드래그 가능하게 설정
});

const extensions = [
    StarterKit, // 기본 확장
    Underline, // 밑줄
    TextAlign.configure({
        types: ["heading", "paragraph"], // 텍스트 정렬 대상 지정
    }),
    ResizableDraggableImage, // 이미지 확장만 커스터마이징
    // DraggableTable,
    Table,
    TableRow,
    TableCell,
    TableHeader,
    CodeBlockLowlight.configure({
        lowlight,
    }),
    Video, // 비디오 삽입
    YouTube, // YouTube 삽입
];

export default extensions;