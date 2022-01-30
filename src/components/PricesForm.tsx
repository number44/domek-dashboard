import axios from 'axios';
import React from 'react';
interface PropsI {
	prices: PricesI;
}
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '../layouts/Box';

const PricesForm = ({ prices }: PropsI) => {
	const { a1, a2, b1, b2, c1, c2 } = prices;
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<PricesI>({
		defaultValues: {
			a1,
			a2,
			b1,
			b2,
			c1,
			c2,
		},
	});
	const onSubmit: SubmitHandler<PricesI> = (data) => {
		const obj = {
			a1: data.a1,
			a2: data.a2,
			b1: data.b1,
			b2: data.b2,
			c1: data.c1,
			c2: data.c2,
		};
		if (confirm('Zmienić poziomy cen ?')) {
			axios.post('/prices/1', obj);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-3 items-center">
			Od-do (msc.)
			<input type="number" {...register('a1', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			<input type="number" {...register('a2', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			Od-do (msc.)
			<input type="number" {...register('b1', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			<input type="number" {...register('b2', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			Od-do (msc.)
			<input type="number" {...register('c1', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			<input type="number" {...register('c2', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" />
			<Box className="col-span-3 w-full">
				<button type="submit" className=" w-full	 hover:opacity-90  font-semibold cursor-pointer  bg-primary hover:opacity-9 text-zinc-100 px-3 py-2 rounded-sm">
					Edytuj
				</button>
			</Box>
		</form>
	);
};

export default PricesForm;
