import { type Editor } from '@tiptap/react';

import H1Icon from '@/public/svg/toolbar/h1.svg';
import H2Icon from '@/public/svg/toolbar/h2.svg';
import H3Icon from '@/public/svg/toolbar/h3.svg';
import H4Icon from '@/public/svg/toolbar/h4.svg';
import BoldIcon from '@/public/svg/toolbar/bold.svg';
import ItalicIcon from '@/public/svg/toolbar/italic.svg';
import StrikeIcon from '@/public/svg/toolbar/text-strike.svg';
import AlignLeftIcon from '@/public/svg/toolbar/align-left.svg';
import AlignCenterIcon from '@/public/svg/toolbar/align-center.svg';
import AlignRightIcon from '@/public/svg/toolbar/align-right.svg';
import LinkIcon from '@/public/svg/toolbar/link.svg';
import ToolbarButton from './ToolbarButton';
import ImageIcon from '@/public/svg/toolbar/image.svg';
import { useCallback } from 'react';
import { uploadImage } from '@/src/lib/action/admin/uploadImage';

interface ToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null || !editor) return;

    const imageUrl = await uploadImage(files[0]);
    editor.commands.setImage({
      src: imageUrl,
      alt: files[0].name,
      title: files[0].name,
    });
  };

  return (
    <section className="flex items-center gap-2 my-4 flex-wrap">
      <label className="relative inline-block w-6 h-6 mr-1">
        <input
          type="color"
          className="opacity-0 w-full h-full absolute left-0 top-0 cursor-pointer"
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            if (target) {
              target.nextElementSibling instanceof HTMLElement &&
                (target.nextElementSibling.style.backgroundColor =
                  target.value);
              editor.chain().focus().setColor(target.value).run();
            }
          }}
          value={editor.getAttributes('textStyle').color || '#000000'}
          data-testid="setColor"
        />
        <span
          className={`block w-full h-full rounded-full`}
          style={{
            backgroundColor:
              editor.getAttributes('textStyle').color || '#000000',
          }}
        />
      </label>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <H1Icon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <H2Icon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <H3Icon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive('heading', { level: 4 })}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <H4Icon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <BoldIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <ItalicIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <StrikeIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive('textAlign', { align: 'left' })}
      >
        <AlignLeftIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive('textAlign', { align: 'center' })}
      >
        <AlignCenterIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive('textAlign', { align: 'right' })}
      >
        <AlignRightIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          !editor.isActive('link')
            ? setLink()
            : editor.chain().focus().unsetLink().run()
        }
        isActive={editor.isActive('link')}
      >
        <LinkIcon />
      </ToolbarButton>
      <ToolbarButton>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
          <ImageIcon />
        </label>
      </ToolbarButton>
    </section>
  );
}
