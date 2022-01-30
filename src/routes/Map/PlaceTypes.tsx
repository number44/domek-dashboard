import Box from '../../layouts/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { fetchMapCategories } from '../../utils/fetching';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import PlaceType from '../../components/Places/PlaceType';
import Alert from '../../components/Alert';

interface PropsI {}

const MapCategories = ({}: PropsI) => {
	const [fileF, setFileF] = useState(null);
	const [url, setUrl] = useState<string>('http://rar.server818748.nazwa.pl/storage/Rectangle.svg');
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<PlaceTypesI>();
	const onSubmit: SubmitHandler<any> = (data) => {
		mutation.mutate({ name: data.name, ename: data.ename, icon: data.icon[0] });

		// mutation.mutate()
		reset();
		setUrl('./Rectangle.svg');
	};

	const onChangeFile = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};

	const queryClient = useQueryClient();
	const { data, isError, isLoading, error } = useQuery<PlaceTypesI[], Error>('placetypes', fetchMapCategories);

	const mutation = useMutation(
		(newNote: any) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('name', newNote.name ? newNote.name : 'name');
			formData.append('ename', newNote.ename ? newNote.ename : 'name');
			formData.append('icon', fileF ? fileF : 'name');

			return axios.post('/placetypes', formData, config);
		},
		{ onSuccess: () => queryClient.invalidateQueries('placetypes') }
	);

	if (isError) {
		return <Box>{error?.message}</Box>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 	">
			<Box>
				<h4 className="font-bold">Utwórz nowe :</h4>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<input autoComplete="off" className="w-full mt-4 rounded-sm dark:bg-zinc-700" type="text" {...register('name', { required: true })} />
					<label htmlFor="name">Polska nazwa</label>
					{errors.name && <Alert>Polska nazwa wymagana required</Alert>}

					<input autoComplete="off" className="w-full mt-4 rounded-sm dark:bg-zinc-700" type="text" {...register('ename', { required: true })} />
					<label htmlFor="name">Angielska nazwa</label>
					{errors.ename && <Alert>Angielska nazwa wymagana</Alert>}
					{/* <input aria-label="dsdsds" className="w-full mt-4 rounded-lg" type="file" {...(register('icon'), { required: true })} /> */}
					<label className="icon-image bg-cyan-500 font-semibold cursor-pointer self-center my-3  mt-2 hover:bg-cyan-600 text-zinc-100  rounded-lg">
						<img className=" w-32 h-32 mx-auto rounded-sm dark:bg-slate-700 bg-slate-100" src={url} />
						<input type="file" {...register('icon', { required: true })} onChange={onChangeFile} className="hidden" name="image" />
					</label>
					{errors.icon && <Alert>icon is required</Alert>}

					<button type="submit" className="bg-primary font-semibold cursor-pointer   mt-2 hover:opacity-90 text-zinc-100 px-3 py-2 rounded-sm">
						Utwórz
					</button>
				</form>
			</Box>
			{isLoading && (
				<Box>
					<Loader />
				</Box>
			)}
			{data && data.map((el) => <PlaceType key={el.id} placeType={el} />)}
		</div>
	);
};

export default MapCategories;
