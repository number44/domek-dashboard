import Box from '../../layouts/Box';
import { AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchLocations } from '../../utils/fetching';
import { useEffect } from 'react';

interface PropsI {}
const Locations = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<LocationI[], Error>('locations', fetchLocations);
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
		<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
			<Link to="/locations/create">
				<motion.div className="cursor-pointer flex-cemter h-full  w-full" whileHover={{ scale: 0.95 }} whileTap={{ scale: 0.95 }}>
					<Box>
						<div className=" cursor-pointer box h-full  mx-auto p-8 flex-center">
							<AiOutlinePlus className="text-4xl" />
						</div>
					</Box>
				</motion.div>
			</Link>

			{data &&
				data?.map((location) => (
					<Link key={location.id} to={`/locations/${location.id}`}>
						<motion.div whileHover={{ scale: 0.95 }} className="cursor-pointer">
							<Box>
								<img className=" aspect-video" src={location.thumbnail} alt="" />
								<h2 className="text-lg text-slate-800 dark:text-slate-200 mt-2">{location.name}</h2>
							</Box>
						</motion.div>
					</Link>
				))}
		</section>
	);
};

export default Locations;
