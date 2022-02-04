import { useCallback } from 'react';
import { AiOutlineLink, AiOutlineBold, AiOutlineItalic, AiOutlineUnorderedList } from 'react-icons/ai';
interface PropsEI {
	editor: any;
}

const EditorMenu = ({ editor }: PropsEI) => {
	if (!editor) {
		return null;
	}

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);
	return (
		<div className="flex justify-evenly dark:bg-slate-700 dark:text-white bg-slate-200 py-3 rounded-sm">
			<div onClick={setLink} className={`${editor.isActive('link') ? 'text-primary' : ''} cursor-pointer`}>
				<AiOutlineLink />
			</div>
			<div onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') ? 'text- text-primary	' : ''} cursor-pointer`}>
				<AiOutlineBold />
			</div>

			<div onClick={() => editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') ? 'text-primary' : ''} cursor-pointer`}>
				<AiOutlineItalic className="text-md" />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleStrike().run()} className={`${editor.isActive('strike') ? 'text-primary' : ''} cursor-pointer`}>
				<AiOutlineStrikethrough />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'text-primary' : ''}>
				<AiOutlineCode />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</div>
			<div onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</div> */}

			<div onClick={() => editor.chain().focus().setParagraph().run()} className={`${editor.isActive('paragraph') ? 'text-primary' : ''} cursor-pointer`}>
				P
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${editor.isActive('heading', { level: 1 }) ? 'text-primary' : ''} cursor-pointer`}>
				h1
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${editor.isActive('heading', { level: 2 }) ? 'text-primary' : ''} cursor-pointer`}>
				h2
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${editor.isActive('heading', { level: 3 }) ? 'text-primary' : ''} cursor-pointer`}>
				h3
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={`${editor.isActive('heading', { level: 4 }) ? 'text-primary' : ''} cursor-pointer`}>
				h4
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={`${editor.isActive('heading', { level: 5 }) ? 'text-primary' : ''} cursor-pointer`}>
				h5
			</div>
			<div onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={`${editor.isActive('heading', { level: 6 }) ? 'text-primary' : ''} cursor-pointer`}>
				h6
			</div>
			<div onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${editor.isActive('bulletList') ? 'text-primary' : ''} cursor-pointer`}>
				<AiOutlineUnorderedList />
			</div>
			{/* <div onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-primary' : ''}>
				ordered list
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'text-primary' : ''}>
				<BiCodeAlt />
			</div> */}
			{/* <div onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'text-primary' : ''}>
				<GrBlockQuote />
			</div> */}
			<div onClick={() => editor.chain().focus().setHorizontalRule().run()} className={`cursor-pointer hov hover:text-primary`}>
				hr
			</div>
			<div onClick={() => editor.chain().focus().setHardBreak().run()} className={`cursor-pointer hov hover:text-primary`}>
				br
			</div>
			{/* <div onClick={() => editor.chain().focus().undo().run()} className={`cursor-pointer hov hover:text-primary`}>
				<BiUndo />
			</div>
			<div onClick={() => editor.chain().focus().redo().run()} className={`cursor-pointer hov hover:text-primary`}>
				<BiRedo />
			</div> */}
		</div>
	);
};

export default EditorMenu;
