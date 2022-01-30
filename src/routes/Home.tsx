import Box from '../layouts/Box';
import useStore from '../store/about';
interface PropsI {}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import useAuthStore from '../store/authStore';
import PricesForm from '../components/PricesForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Home = ({}: PropsI) => {
	const aboutPl = useStore((state) => state.aboutPl);
	const aboutEn = useStore((state) => state.aboutEn);
	const changePl = useStore((state) => state.changeAboutPl);
	const name = useAuthStore((state) => state.name);
	const [prices, setPrices] = useState<PricesI>();
	useEffect(() => {
		axios.get('/prices/1').then((res) => {
			setPrices(res.data.data);
		});
	}, []);
	return (
		<div>
			<Link to="/auth/register">
				<Box className="mb-8  text-lg uppercase font-semibold">Witam , {name} </Box>
			</Link>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/locations/create`}>
						<Box>
							<div className="flex items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Dodaj Lokalizację</h2>
								<BsPlusLg />
							</div>
						</Box>
					</Link>
				</motion.div>
				<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/rooms/create`}>
						<Box>
							<div className="flex items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Dodaj Pokój</h2>
								<BsPlusLg />
							</div>
						</Box>
					</Link>
				</motion.div>
				<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/map/categories`}>
						<Box>
							<div className="flex items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Dodaj typ miejsca</h2>
								<BsPlusLg />
							</div>
						</Box>
					</Link>
				</motion.div>
				<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/map/create`}>
						<Box>
							<div className="flex items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Dodaj Miejsce</h2>
								<BsPlusLg />
							</div>
						</Box>
					</Link>
				</motion.div>
				<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
					<Link to={`/media`}>
						<Box>
							<div className="flex items-center justify-between p-8">
								<h2 className="text-lg text-slate-800 dark:text-slate-200 ">Pliki</h2>
								<BsPlusLg />
							</div>
						</Box>
					</Link>
				</motion.div>
			</div>
			<div className="h-8"></div>
			<Box className="max-w-sm mx-auto">
				<h1>Poziomy Cen</h1>
			</Box>
			<div className="h-8"></div>
			<Box className="max-w-sm mx-auto">{prices && <PricesForm prices={prices} />}</Box>
		</div>
	);
};

export default Home;
