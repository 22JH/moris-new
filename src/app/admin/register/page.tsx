'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useState } from 'react';
import DetailPopup from './_component/DetailPopup';
import { usePopupStore } from '@/src/lib/stores/popup/PopupStoreProvider';
import Toolbar from '@/src/components/editor/Toolbar';
import CheckIcon from '@/public/svg/check.svg';

import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import ImageResize from '@/tiptap-extension-resize-image/lib';

export default function Register() {
  const [text, setText] = useState('');
  const { openPopup } = usePopupStore((state) => state);
  const [title, setTitle] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image.configure({ inline: true, allowBase64: true }),
      ImageResize,
      Text,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: text,
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
  });

  return (
    <main className="px-6 xl:px-0 pb-5">
      <input
        type="text"
        placeholder="제목쓰셈"
        className="w-full text-[24px] mt-2 outline-none font-bold"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        autoFocus
      />
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        placeholder="내용쓰셈"
        className="border"
      />
      <button
        className={`fixed p-3 bottom-6 right-6 md:right-10 md:bottom-10 lg:right-20 lg:bottom-20 xl:right-32 xl:bottom-20 rounded-full bg-[rgb(159,125,73)] ${
          !title ? 'opacity-50' : ''
        }`}
        onClick={() => {
          if (!title || !editor?.getHTML()) {
            return;
          }
          openPopup(DetailPopup, {
            title,
            content: editor?.getHTML(),
          });
        }}
      >
        <CheckIcon />
      </button>
    </main>
  );
}
