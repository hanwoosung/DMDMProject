import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Node } from "@tiptap/core";

// YouTube 확장 정의
const YouTube = Node.create({
    name: "youtube",

    group: "block",

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: 560,
            },
            height: {
                default: 315,
            },
            frameborder: {
                default: 0,
            },
            allow: {
                default: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            },
            allowfullscreen: {
                default: true,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "iframe[src]",
            },
        ];
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

// 동영상 확장 정의
const Video = Node.create({
    name: "video",
    group: "block",
    selectable: true,
    draggable: true,
    addAttributes() {
        return {
            src: {
                default: null,
            },
            controls: {
                default: true,
            },
            autoplay: {
                default: false,
            },
            loop: {
                default: false,
            },
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

const extensions = [
    StarterKit,
    Underline,
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    Image,
    Video, // 비디오 확장
    YouTube, // YouTube 확장
];

export default extensions;
