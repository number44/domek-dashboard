import React, { ReactChild, ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import useAuthStore from '../store/authStore';
interface PropsI {
	children: ReactNode;
}

const Layout = () => {
	const router = useNavigate();
	const setName = useAuthStore((state) => state.setName);
	const setEmail = useAuthStore((state) => state.setEmail);
	useEffect(() => {
		const xtoken = window.localStorage.getItem('key');
		if (xtoken) {
			axios.defaults.headers.common = { Authorization: `Bearer ${xtoken}` };
		}

		axios
			.get('me')
			.then((data) => {
				let name: string = data.data.user.name;
				let email = data.data.user.email;
				setName(name);
				setEmail(email);
			})
			.catch((err) => {
				router('/auth/login');
			});
	}, []);
	return (
		<>
			<Navbar />
			<Sidebar />
			<main className="  dark:bg-slate-700 bg-slate-100  text-slate-800 dark:text-slate-100 ml-12  sm:ml-48 px-4 pt-20 min-h-screen pb-8 ">
				<div className="max-w-5xl mx-auto">
					<Outlet />
				</div>
			</main>
		</>
	);
};

export default Layout;
