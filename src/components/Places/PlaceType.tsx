import { useEffect, useState } from 'react';
import Box from '../../layouts/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import Alert from '../Alert';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
interface PropsI {
	placeType: PlaceTypesI;
}

const PlaceType = ({ placeType }: PropsI) => {
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const [fileF, setFileF] = useState(null);

	useEffect(() => {
		if (placeType.icon) {
			setUrl(placeType.icon);
		}
	}, []);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<PlaceTypesI>({
		defaultValues: {
			name: placeType.name,
			icon: placeType.icon,
		},
	});
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<any> = (data) => {
		if (confirm('Na pewno edytować ?')) {
			mutationUpdate.mutate({ name: data.name });
		}
	};
	const onChangeFile = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};
	const mutationUpdate = useMutation(
		(newNote: any) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('name', newNote.name ? newNote.name : 'name');
			if (fileF) {
				formData.append('icon', fileF ? fileF : 'icon');
			}

			return axios.post(`/placetypes/${placeType.id}`, formData, config);
		},
		{ onSuccess: () => queryClient.invalidateQueries('placetypes') }
	);

	const mutationDelete = useMutation(
		(id: number) => {
			return axios.delete(`/placetypes/${id}`);
		},
		{ onSuccess: () => queryClient.invalidateQueries('placetypes') }
	);
	const handleDelete = () => {
		if (confirm('Are you sure this will delete all children ? ')) {
			if (placeType.id) {
				mutationDelete.mutate(placeType.id);
			}
		}
	};
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div className="relative" key={placeType.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
				<div onClick={handleDelete} className="text-gray-800 text-2xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-2 top-2 hover:rotate-180 transition-transform duration-300 cursor-pointer ">
					<VscChromeClose />
				</div>
				<Box>
					<h4 className="font-bold">Edytuj :</h4>

					<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
						{errors.name && <Alert>polish name required</Alert>}

						<input type="text" {...register('name', { required: true })} className="w-full mt-4 rounded-sm dark:bg-zinc-700" />
						<label htmlFor="name">nazwa polska</label>

						<label className="icon-image bg-cyan-500 font-semibold cursor-pointer self-center my-3  mt-2 hover:bg-cyan-600 text-zinc-100  rounded-lg">
							<img className=" w-32 h-32 mx-auto rounded-sm dark:bg-slate-700 bg-slate-100" src={url} />
							<input type="file" {...register('icon', { required: false })} onChange={onChangeFile} className="hidden" name="image" />
						</label>
						<button type="submit" className="bg-primary font-semibold cursor-pointer    mt-2 hover:opacity-90 text-zinc-100 px-3 py-2 rounded-sm">
							Edytuj
						</button>
					</form>
				</Box>
			</motion.div>
		</AnimatePresence>
	);
};

export default PlaceType;
