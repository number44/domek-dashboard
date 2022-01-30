import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '../../layouts/Box';
import { useMutation } from 'react-query';
import axios from 'axios';
interface PropsI {}
const Register = ({}: PropsI) => {
	const router = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterI>();
	const onSubmit: SubmitHandler<RegisterI> = (data) => {
		mutation.mutate(data);
	};

	const mutation = useMutation(
		(newData: RegisterI) => {
			return axios.post('/auth/register', newData);
		},
		{
			onSuccess: (data) => {
				window.localStorage.setItem('key', data.data.token);
				router('/');
			},
			onError: () => {
				alert('coś poszło nie tak');
			},
		}
	);

	return (
		<main className="">
			<Box className="box p-7 shadow-lg max-w-sm ">
				<h1 className=" mb-2 text-3xl font-semibold  text-center">Register </h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col max-w-sm">
					<label className="my-0" htmlFor="email">
						imię
					</label>
					<input {...register('name', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700  my-0  " type="text" />
					<label className="my-0" htmlFor="email">
						Email
					</label>
					<input {...register('email', { required: true })} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700  my-0  " type="text" />

					<label className="my-0" htmlFor="password">
						Hasło
					</label>

					<input {...register('password', { required: true })} className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="password" />
					<label className="my-0" htmlFor="password_confirmation">
						Powtórz hasło
					</label>

					<input {...register('password_confirmation', { required: true })} className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="password" />

					<input type="submit" value="Register" className="cursor-pointer mt-3 bg-primary py-3 font-bold text-zinc-100 uppercase" />
				</form>
				<Link to="/auth/login">Login</Link>
			</Box>
		</main>
	);
};

export default Register;
