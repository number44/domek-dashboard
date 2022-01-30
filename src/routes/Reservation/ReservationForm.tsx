import { Tab } from '@headlessui/react';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Box from '../../layouts/Box';
import { fetchReservations } from '../../utils/fetching';
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from '../../components/Alert';
import axios from 'axios';
import queryClient from '../../utils/queryClient';
import PolicyList from './ReservationList';
interface PropsI {}
const Policy = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<ReservationI[], Error>('reservations', fetchReservations);
	const [fileF, setFileF] = useState(null);
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<ReservationI>();
	const onChangeFile = (e: React.ChangeEvent<any>) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};
	const qc = useQueryClient();

	const onSubmit: SubmitHandler<ReservationI> = (data) => {
		const obj = {
			etext: data.etext,
			text: data.text,
		};
		mutation.mutate(obj);
	};

	const mutation = useMutation(
		(newData: PolicyFormI) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};

			const formData = new FormData();
			formData.append('text', newData.text);
			formData.append('etext', newData.etext);
			if (fileF) {
				formData.append('icon', fileF);
			}

			return axios.post('/reservations', formData, config);
		},
		{
			onSuccess: () => {
				qc.invalidateQueries('reservations');
			},
		}
	);

	if (isError) {
		return <Box>{error?.message}</Box>;
	}

	if (isLoading) {
		return <Box>{error?.message}</Box>;
	}

	return (
		<div>
			<form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
				<div className=" relative h-32 w-36 flex-center bg-white rounded dark:bg-slate-800 shadow-sm">
					<label className=" icon-image h-32 w-32 overflow-hidden   font-semibold cursor-pointer self-center  text-zinc-100  rounded-lg">
						<img className="  w-full h-full over  dark:bg-slate-700 object-cover bg-slate-100" src={url} />
						<input type="file" {...register('icon', { required: true })} onChange={onChangeFile} className="hidden" name="image" />
					</label>
				</div>
				{errors.icon && <Alert>icon is required</Alert>}
				<Box>
					<Tab.Group>
						<Tab.List className={`grid grid-cols-2`}>
							<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''}  text-center cursor-pointer transition-colors duration-300`}>PL</div>}</Tab>
							<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''}  text-center cursor-pointer transition-colors duration-300`}>EN</div>}</Tab>
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel>
								<textarea className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" {...register('text')} cols={10} rows={5}></textarea>
								{errors.etext && <Alert>icon is required</Alert>}
							</Tab.Panel>
							<Tab.Panel>
								<textarea className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" {...register('etext')} cols={10} rows={5}></textarea>
								{errors.text && <Alert>icon is required</Alert>}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
					<button type="submit" className=" w-full  py-2  mt-4  hover:opacity-95 bg-primary text-slate-100">
						Wyślij
					</button>
				</Box>
			</form>
			<PolicyList />
		</div>
	);
};

export default Policy;

interface PolicyFormI {
	text: string;
	etext: string;
}
