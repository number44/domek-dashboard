import { VscChromeClose } from 'react-icons/vsc';

import Box from '../../layouts/Box';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import PictureList from './PictureList';
import useStore from '../../store/galleryStore';
import { Dialog } from '@headlessui/react';
import { IoIosImages } from 'react-icons/io';
import { Link } from 'react-router-dom';
interface PropsI {}

const Gallery = ({}: PropsI) => {
	const { pictureUrl, isOpen, setIsOpen } = useStore();
	const params = useParams();
	if (!params.id) {
		return <Box>Error no data</Box>;
	}
	const id = params.id;

	return (
		<div>
			<Dialog className="fixed z-30 inset-0 overflow-y-auto flex-center" open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Overlay className="fixed inset-0 bg-white opacity-90  " />
				{/* <Dialog.Title>Deactivate account</Dialog.Title> */}
				<Dialog.Description className="  relative bg-slate-200 py-2 z-20">
					<img className="max-w-screen-lg w-full z-50" src={pictureUrl} alt="" />
				</Dialog.Description>
				<button onClick={() => setIsOpen(false)} className=" text-gray-800 text-4xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-8 top-8 hover:rotate-180 transition-transform duration-300 cursor-pointer z-10 ">
					<VscChromeClose />
				</button>
			</Dialog>
			<Box>
				<Link to={`/rooms/gallery/add/${id}`}>
					<motion.button whileHover={{ scale: 0.95 }} className="text-2xl w-full flex flex-col items-center  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						<h1 className="mb-2 uppercase">Dodaj</h1>
						<IoIosImages className="text-4xl" />
					</motion.button>
				</Link>
			</Box>
			<div className="h-8"></div>
			<PictureList />
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3  ">
				{data?.map((picture) => (
					<Picture key={picture.id} src={picture.picture_sm ? picture.picture_sm : ''} id={picture.id ? picture.id : 0} />
				))}
			</div> */}
			<div className="h-8"></div>
		</div>
	);
};

export default Gallery;

interface FileI {
	room_id: number;
	name: string;
	picture: Blob;
}
