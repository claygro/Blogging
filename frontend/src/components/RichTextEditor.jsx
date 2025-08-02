import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

import MenuBarTextEditor from "./MenuBarTextEditor";

const extensions = [
  StarterKit.configure({
    bulletList: false, // disable default
  }),
  BulletList,
  ListItem,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Paragraph,
  Highlight,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const RichTextEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions,
    // content: "<h1>Hello World!</h1><p>This is a paragraph.</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-gray-300 rounded-md bg-white p-4 outline-none",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange({
        target: {
          name: "blogs",
          value: html,
        },
      });
    },
  });

  return (
    <div>
      <MenuBarTextEditor editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
