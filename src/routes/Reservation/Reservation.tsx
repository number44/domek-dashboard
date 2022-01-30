import { Tab } from '@headlessui/react';

import { useEffect, useState } from 'react';
import Box from '../../layouts/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import Alert from '../../components/Alert';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import queryClient from '../../utils/queryClient';

interface PropsI {
	data: ReservationI;
}
const Reservation = ({ data }: PropsI) => {
	const [fileF, setFileF] = useState(null);
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const qc = useQueryClient();
	useEffect(() => {
		setUrl(data.icon);
	}, []);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<ReservationI>({
		defaultValues: {
			title: data.title,
			etitle: data.etitle,
			text: data.text,
			etext: data.etext,
		},
	});
	const onSubmit = (fData: ReservationI) => {
		const obj = {
			title: fData.title,
			etitle: fData.etitle,
			text: fData.text,
			etext: fData.etext,
		};
		if (confirm('zmienić dane ?')) {
			mutation.mutate(obj);
		}
	};
	const mutation = useMutation(
		(newData: FormI) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('title', newData.title);
			formData.append('etitle', newData.etitle);
			formData.append('text', newData.text);
			formData.append('etext', newData.etext);
			if (fileF) {
				formData.append('icon', fileF);
			}
			axios.post(`/reservations/${data.id}`, formData, config);
			return new Promise((resolve, reject) => {});
		},
		{
			onSuccess: () => {
				qc.invalidateQueries('policies');
			},
		}
	);
	const onChangeFile = (e: React.ChangeEvent<any>) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};

	return (
		<form className="flex justify-center  gap-3 my-3" onSubmit={handleSubmit(onSubmit)}>
			<div className=" relative h-20 w-20 flex-center bg-white  rounded-full dark:bg-slate-800 shadow-sm">
				<label className="h-20 w-20  icon-image  overflow-hidden rounded-full   font-semibold cursor-pointer self-center  text-zinc-100  ">
					<img className="  w-full h-full over  dark:bg-slate-700 object-cover bg-slate-100" src={url} />
					<input type="file" {...register('icon')} onChange={onChangeFile} className="hidden" name="image" />
				</label>
			</div>
			{errors.icon && <Alert>icon is required</Alert>}
			<Box className="flex flex-col ">
				<div className="flex flex-col md:flex-row md:gap-3   justify-between mb-3">
					<label className="w-full" htmlFor="title">
						Polska Nazwa
						<input {...register('title', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  md:mt-2  rounded-sm dark:bg-zinc-700" />
					</label>
					<div className="h-4 md:h-8"></div>
					<label className="w-full" htmlFor="etitle">
						Angielska nazwa
						<input {...register('etitle', { required: true, minLength: 3 })} autoComplete="off" type="text" className="mx-auto w-full  md:mt-2  rounded-sm dark:bg-zinc-700" />
					</label>
				</div>

				<Tab.Group>
					<Tab.List className={`grid grid-cols-2`}>
						<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''}  text-center cursor-pointer transition-colors duration-300`}>PL</div>}</Tab>
						<Tab as={'div'}>{({ selected }) => <div className={`${selected ? 'dark:bg-slate-700 bg-slate-100' : ''}  text-center cursor-pointer transition-colors duration-300`}>EN</div>}</Tab>
					</Tab.List>
					<Tab.Panels>
						<Tab.Panel>
							<textarea className="mx-auto w-full  mt-1  rounded-sm dark:bg-zinc-700" {...register('text')}></textarea>
							{errors.etext && <Alert>icon is required</Alert>}
						</Tab.Panel>
						<Tab.Panel>
							<textarea className="mx-auto w-full  mt-1  rounded-sm dark:bg-zinc-700" {...register('etext')}></textarea>
							{errors.text && <Alert>icon is required</Alert>}
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
				<button type="submit" className=" py-1 px-3 w-full mx-auto   mt-4  hover:opacity-95 bg-primary text-slate-100">
					Wyślij
				</button>
			</Box>
		</form>
	);
};

export default Reservation;

interface FormI {
	title: string;
	etitle: string;
	text: string;
	etext: string;
}
