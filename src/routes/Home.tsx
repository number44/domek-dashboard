import Box from '../layouts/Box';
import useStore from '../store/about';
interface PropsI {}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import useAuthStore from '../store/authStore';
import PricesForm from '../components/PricesForm';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input, Select } from '@mui/material';
const Home = ({}: PropsI) => {
	useEffect(() => {
		axios.get('/info').then((data) => {
			console.log('data.data.tel :', data.data.data);
			setValue('tel', data.data.data.tel);
			setValue('email', data.data.data.email);
		});
	}, []);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
	} = useForm({});

	const name = useAuthStore((state) => state.name);
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
		if (confirm('Cześć agata jesteś pewna że chcesz to zmienić ?')) {
			axios.post('/info', { tel: data.tel, email: data.email });
		}
	};

	return (
		<>
			<Box>Gagi : {name}</Box>
			<Box className="mt-8 max-w-md">
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <input step={0.0000001} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="number" {...register('lon', { required: true })} /> */}
					<label htmlFor="tel">nr tel</label>
					<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('tel', { required: true })} />
					{errors.tel && <p className=" w-full  text-red-800 ">numer min. 9 cyfrowy</p>}
					<div className="h-4"></div>
					<label htmlFor="email">
						email
						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('email', { required: true, minLength: 4 })} />
						{errors.email && <p className=" w-full  text-red-800 ">pole wymagane min.4</p>}
					</label>

					<input type="submit" value="Edytuj" className="bg-primary font-semibold cursor-pointer w-full   mt-4 hover:opacity-90 mb-4  text-zinc-100 px-3 py-2 rounded-sm" />
				</form>
			</Box>
		</>
	);
};

export default Home;
interface IFormInput {
	tel: number;
	email: string;
}
