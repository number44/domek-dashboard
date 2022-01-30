import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import EditorMenu from './EditorMenu';
import useStore from '../../store/policyStore';

interface PropsI {
	text: string;
}
const PolicyEditorEn = forwardRef(({ text }: PropsI, ref) => {
	const editPolicy = useStore((state) => state.editPolicy);
	const changePolicyEn = useStore((state) => state.changePolicyEn);

	useImperativeHandle(ref, () => ({
		uploadEditor: () => {
			const data = editor?.getHTML();
			if (data) {
				changePolicyEn(data);
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

export default PolicyEditorEn;
