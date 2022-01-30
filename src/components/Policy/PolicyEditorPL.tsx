import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import EditorMenu from './EditorMenu';
import useStore from '../../store/policyStore';

interface PropsI {
	text: string;
}
const PolicyEditorPl = forwardRef(({ text }: PropsI, ref) => {
	const changePolicyPl = useStore((state) => state.changePolicyPl);

	useImperativeHandle(ref, () => ({
		uploadEditor: () => {
			const data = editor?.getHTML();
			if (data) {
				changePolicyPl(data);
			}
		},
		clean: () => {},
	}));
	useEffect(() => {
		editor?.commands.clearContent();

		editor?.commands.insertContent(text);
	}, [text]);
	const editor = useEditor({
		extensions: [StarterKit],
		content: text,
	});
	return (
		<>
			<EditorMenu editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
});

export default PolicyEditorPl;
