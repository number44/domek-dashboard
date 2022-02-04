import Box from '../../layouts/Box';
interface PropsI {}
import { Dialog } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import TLink from '@tiptap/extension-link';
import { useQuery, useQueries } from 'react-query';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu';
import { useEffect, useReducer, useState } from 'react';
import { fetchPictures } from '../../utils/fetching';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import Loader from '../../components/Loader';

const initialState: StateI = {
	imgId1: 0,
	imgUrl1: 'https://via.placeholder.com/468x60?text=+',
	imgId2: 0,
	imgUrl2: 'https://via.placeholder.com/468x60?text=+',
	imgId3: 0,
	imgUrl3: 'https://via.placeholder.com/468x60?text=+',
	imgId4: 0,
	imgUrl4: 'https://via.placeholder.com/468x60?text=+',
};
const reducer = (state: StateI, action: ActionI): StateI => {
	switch (action.type) {
		case '1':
			return { ...state, imgId1: action.payload.id, imgUrl1: action.payload.url };
		case '2':
			return { ...state, imgId2: action.payload.id, imgUrl2: action.payload.url };

		case '3':
			return { ...state, imgId3: action.payload.id, imgUrl3: action.payload.url };

		case '4':
			return { ...state, imgId4: action.payload.id, imgUrl4: action.payload.url };

		default:
			return state;
	}
};

const SectionA = ({}: PropsI) => {
	const [activeImg, setActiveImg] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);
	const { data, isError, isLoading, error } = useQuery<PictureI[], Error>('picrures', fetchPictures);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormI>();
	const onSubmit: SubmitHandler<FormI> = (data) => {
		if (confirm('zapisać zmiany ?')) {
			setLoading(true);
			axios.post('/sections/2', { title: data.title, content: editor?.getHTML(), picture_1: state.imgId1, picture_2: state.imgId2, picture_3: state.imgId3, picture_4: state.imgId4 }).then((data) => {
				setLoading(false);
			});
		}
	};

	const editor = useEditor({
		extensions: [StarterKit, TLink],
		content: '',
		editorProps: {
			attributes: {
				class: 'dark:prose-invert prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 mt-4',
			},
		},
	});
	const handler = (picture_id: number, picture_url: string) => {
		dispatch({ type: activeImg.toString(), payload: { id: picture_id, url: picture_url } });
		setIsOpen(false);
	};
	const handleOpen = (imgNr: number) => {
		setActiveImg(imgNr);
		setIsOpen(true);
	};
	const handleOpen1 = () => {
		// setActiveImg(imgNr);
		setIsOpen(true);
	};

	useEffect(() => {
		axios
			.get('/sections/2')
			.then((res) => {
				const dataSection: SectionI = res.data.data;
				editor?.commands.setContent(dataSection.content);
				setValue('title', dataSection.title);
				const img1 = data?.find((d) => d.id === dataSection.picture_1);
				const img2 = data?.find((d) => d.id === dataSection.picture_2);
				const img3 = data?.find((d) => d.id === dataSection.picture_3);
				const img4 = data?.find((d) => d.id === dataSection.picture_4);

				dispatch({ type: '1', payload: { id: dataSection.picture_1, url: img1 ? img1?.picture_lg : state.imgUrl1 } });
				dispatch({ type: '2', payload: { id: dataSection.picture_2, url: img2 ? img2?.picture_lg : state.imgUrl2 } });
				dispatch({ type: '3', payload: { id: dataSection.picture_3, url: img3 ? img3?.picture_lg : state.imgUrl3 } });
				dispatch({ type: '4', payload: { id: dataSection.picture_4, url: img4 ? img4?.picture_lg : state.imgUrl4 } });
			})
			.catch((error) => console.log('errot :', error));
	}, [editor, data]);
	if (isError) {
		return <Box>Error</Box>;
	}
	if (isLoading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}

	return (
		<>
			{isOpen && (
				<Dialog className="fixed z-30 inset-0 overflow-y-auto flex-center" open={isOpen} onClose={() => setIsOpen(false)}>
					<Dialog.Overlay className="fixed inset-0 bg-white opacity-90  " />
					{/* <Dialog.Title>Deactivate account</Dialog.Title> */}
					<Dialog.Description as="div" className="  relative  py-2 p-12 z-20">
						<div className="mt-48 grid grid-cols-2 h-screen sm:grid-cols-4 gap-3">
							{data?.map((pic) => (
								<div key={pic.id} onClick={() => handler(pic.id, pic.picture_lg)} className="aspect-[12/8]">
									<img className="object-cover w-full h-full" src={pic.picture_md} alt="" />
								</div>
							))}
						</div>
					</Dialog.Description>
					<button onClick={() => setIsOpen(false)} className=" outline-0 rounded-full  text-gray-800 text-4xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-8 top-8 hover:rotate-180 transition-transform duration-300 cursor-pointer z-50 ">
						<VscChromeClose />
					</button>
				</Dialog>
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<label htmlFor="title">Nagłówek</label>

					<input {...register('title', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					{errors.title && <Alert>Polex wymagene</Alert>}
				</Box>
				<div className="h-8"></div>
				<Box>
					<EditorMenu editor={editor} />
					<EditorContent editor={editor} />
				</Box>
				<p className="opacity-80 text-xs">* enter - następny paragraf</p>
				<p className="opacity-80 text-xs">* ctrl + enter - następna linia</p>
				<div className=" mt-8 gap-3 grid grid-cols-2">
					{data && (
						<>
							<Box onClick={() => handleOpen(1)} className="text-4xl flex-center aspect-[6/3] rounded-lg hover:scale-95 transition-transform duration-150 cursor-pointer">
								<img className="objec object-cover h-full w-full" src={state.imgUrl1} alt="" />
							</Box>

							<Box onClick={() => handleOpen(2)} className="text-4xl flex-center aspect-[6/3] rounded-lg hover:scale-95 transition-transform duration-150 cursor-pointer">
								<img className="objec object-cover h-full w-full" src={state.imgUrl2} alt="" />
							</Box>
							<Box onClick={() => handleOpen(3)} className="text-4xl flex-center aspect-[6/3] rounded-lg hover:scale-95 transition-transform duration-150 cursor-pointer">
								<img className="objec object-cover h-full w-full" src={state.imgUrl3} alt="" />
							</Box>
							<Box onClick={() => handleOpen(4)} className="text-4xl flex-center aspect-[6/3] rounded-lg hover:scale-95 transition-transform duration-150 cursor-pointer">
								<img className="objec object-cover h-full w-full" src={state.imgUrl4} alt="" />
							</Box>
						</>
					)}
				</div>
				<Box className="mt-6">
					<button type="submit" className="   w-full hover:opacity-90  font-semibold cursor-pointer   bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						{loading ? <Loader /> : 'Edytuj'}
					</button>
				</Box>
			</form>
		</>
	);
};

export default SectionA;

interface FormI {
	title: string;
}

interface StateI {
	imgId1: number;
	imgUrl1: string;
	imgId2: number;
	imgUrl2: string;
	imgId3: number;
	imgUrl3: string;
	imgId4: number;
	imgUrl4: string;
}

interface ActionI {
	type: string;
	payload: PayloadI;
}
interface PayloadI {
	id: number;
	url: string;
}
type ReducerT<StateI, ActionI> = (state: StateI, action: ActionI) => StateI;
type Reducer<S, A> = (prevState: S, action: A) => S;
