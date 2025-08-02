import { FaStrikethrough } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaBold } from "react-icons/fa";
import { LuHighlighter } from "react-icons/lu";
import { ImParagraphLeft } from "react-icons/im";
import { ImParagraphCenter } from "react-icons/im";
import { ImParagraphRight } from "react-icons/im";
import { ImParagraphJustify } from "react-icons/im";
import { MdFormatListBulleted } from "react-icons/md";

const MenuBarTextEditor = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap p-2 justify-around items-center">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("paragraph") ? "is-active" : ""
          }`}
        >
          P
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
        >
          <FaBold size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
        >
          <FaItalic size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
        >
          <FaStrikethrough size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("highlight") ? "is-active" : ""
          }`}
        >
          <LuHighlighter size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive({ textAlign: "left" }) ? "is-active" : ""
          }`}
        >
          <ImParagraphLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }`}
        >
          <ImParagraphCenter size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive({ textAlign: "right" }) ? "is-active" : ""
          }`}
        >
          <ImParagraphRight size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }`}
        >
          <ImParagraphJustify size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`w-9 h-9 flex items-center justify-center border rounded ${
            editor.isActive("bulletList") ? "is-active" : ""
          }`}
        >
          <MdFormatListBulleted />
        </button>
      </div>
    </div>
  );
};

export default MenuBarTextEditor;
