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

// import javascript from "highlight.js/lib/languages/javascript"; // 예시로 JavaScript 언어 추가
// import html from "highlight.js/lib/languages/xml"; // 예시로 HTML 추가

// lowlight 인스턴스 생성
const lowlight = createLowlight();

// lowlight에 언어 등록
// lowlight.registerLanguage("javascript", javascript);
// lowlight.registerLanguage("html", html);



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

// 확장 배열
const extensions = [
    StarterKit, // 기본 확장
    Underline, // 밑줄
    TextAlign.configure({
        types: ["heading", "paragraph"], // 텍스트 정렬 대상 지정
    }),
    Image, // 이미지 삽입
    DraggableTable.configure({
        resizable: true,
    }),
    TableRow, // 테이블 행
    TableCell, // 테이블 셀
    TableHeader, // 테이블 헤더
    CodeBlockLowlight.configure({
        lowlight, // 수정된 lowlight 인스턴스 사용
    }),
    Video, // 비디오 삽입
    YouTube, // YouTube 삽입
];

export default extensions;
