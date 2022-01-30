import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Box from '../../layouts/Box';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

interface PropsI {}

const Login = ({}: PropsI) => {
	const router = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginI>();

	const onSubmit: SubmitHandler<LoginI> = (data) => {
		mutation.mutate(data);
	};

	const mutation = useMutation(
		(newData: LoginI) => {
			return axios.post('/auth/login', newData);
		},
		{
			onSuccess: (data) => {
				window.localStorage.setItem('key', data.data.token);
				router('/');
			},
			onError: () => {
				alert('Coś poszło nie tak');
			},
		}
	);

	return (
		<main className="mt-24">
			<Box className="box p-7 shadow-lg max-w-sm ">
				<h1 className=" mb-2 text-3xl font-semibold  text-center">Login </h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col max-w-sm">
					<label className="my-0" htmlFor="email">
						Email
					</label>
					<input {...register('email')} className=" mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700  my-0" type="text" name="email" />
					<label className="my-0" htmlFor="password">
						Hasło
					</label>

					<input {...register('password', { required: true })} className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="password" />

					<input type="submit" value="Login" className="cursor-pointer  duration-300 mt-3 bg-primary py-3 font-bold text-zinc-100 uppercase" />
				</form>
				<Link to="/auth/register">Register</Link>
			</Box>
		</main>
	);
};

export default Login;
