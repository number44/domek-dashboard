import { fetchRoomtype } from '../../utils/fetching';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '../../layouts/Box';
import { useMutation, useQuery } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import queryClient from '../../utils/queryClient';
import axios from 'axios';
import { useEffect } from 'react';

interface PropsI {}
const Roomtype = ({}: PropsI) => {
	const routes = useNavigate();
	const params = useParams();
	if (!params.id) {
		return <Box>Error no data</Box>;
	}
	const newId = parseInt(params.id);
	const { data, isError, isLoading, error } = useQuery<RoomtypeI, Error>(['roomtypes', newId], () => fetchRoomtype(newId));

	useEffect(() => {
		if (data?.name && data?.ename) {
			setValue('name', data?.name);
			setValue('ename', data?.ename);
		}
	}, [data]);
	const {
		reset,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RoomtypeI>({
		defaultValues: {
			name: data?.name,
			ename: data?.ename,
		},
	});
	const onSubmit: SubmitHandler<RoomtypeI> = (data) => {
		mutation.mutate(data);
	};
	const mutation = useMutation(
		(newData: RoomtypeI) => {
			return axios.post(`/roomtypes/${newId}`, newData);
		},
		{
			onSuccess: async () => {
				await queryClient.refetchQueries('roomtypes');
				await queryClient.invalidateQueries('roomtypes');
				reset();
				routes('/roomtypes');
			},
			onError: (err) => {
				alert('coś poszło nie tak');
			},
		}
	);

	if (isError) {
		return (
			<>
				<Box>Error : {error?.message}</Box>
			</>
		);
	}
	if (isLoading) {
		return (
			<>
				<Box>Loading...</Box>
			</>
		);
	}
	return (
		<div>
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">
						Polish Name
						<input {...register('name', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					</label>
					<label htmlFor="ename">English Name</label>
					<input {...register('ename', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto mb-8 w-full  mt-2  rounded-sm dark:bg-zinc-700" />
					<button type="submit" className="w-full hover:opacity-90  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
						Edit
					</button>
				</form>
			</Box>
		</div>
	);
};

export default Roomtype;
