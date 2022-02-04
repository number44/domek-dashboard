import Box from '../../layouts/Box';
import { Dialog } from '@headlessui/react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { useMutation, useQuery } from 'react-query';
import { fetchPictures } from '../../utils/fetching';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface PropsI {}

const AddSlide = ({}: PropsI) => {
	const [imgUrl, setImgUrl] = useState<string>('');
	const [imgId, setImgId] = useState<number>(0);
	const { data, isError, isLoading, error } = useQuery<PictureI[], Error>('picrures', fetchPictures);
	const router = useNavigate();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SlideI>();
	const onSubmit: SubmitHandler<SlideI> = (data) => {
		mutation.mutate({ description: data.description, header: data.header });
	};
	const mutation = useMutation(
		(newData: FormI) => {
			return axios.post('/slides', { header: newData.header, description: newData.description, picture_id: imgId });
		},
		{
			onSuccess: () => {
				router('/slides');
			},
			onError: () => {
				alert('coś poszło nie tak !!!!! Ratunku');
			},
		}
	);
	const handler = (picture_id: number, picture_url: string) => {
		setImgId(picture_id);
		setImgUrl(picture_url);
		setIsOpen(false);
	};
	return (
		<>
			<Dialog className="fixed z-30 inset-0 overflow-y-auto flex-center" open={isOpen} onClose={() => setIsOpen(false)}>
				<Dialog.Overlay className="fixed inset-0 bg-white opacity-90  " />
				{/* <Dialog.Title>Deactivate account</Dialog.Title> */}
				<Dialog.Description as="div" className="  relative  py-2 p-12 z-20">
					<div className=" mt-48 grid grid-cols-2 h-screen sm:grid-cols-4 gap-3">
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box>
					<label htmlFor="header">Nagłówek</label>

					<input {...register('header', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					{errors.header && <Alert>Polex wymagene</Alert>}
					<div className="h-4"></div>
					<label htmlFor="description">Opis</label>

					<input {...register('description', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					{errors.description && <Alert>Pole wymagene</Alert>}
				</Box>
				<div onClick={() => setIsOpen(true)} className=" max-w- max-w-md mt-4 mx-auto aspect-[4/3] rounded-sm cursor-pointer">
					<img className=" object-cover mx-auto w-full h-full" src={imgUrl ? imgUrl : 'https://via.placeholder.com/468x60?text=+'} alt="" />
				</div>
				<motion.button whileHover={{ scale: 0.95 }} type="submit" className=" mt-8 w-full hover:opacity-90  font-semibold cursor-pointer   bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
					Utwórz
				</motion.button>
			</form>
		</>
	);
};

export default AddSlide;

interface FormI {
	description: string;
	header: string;
}
