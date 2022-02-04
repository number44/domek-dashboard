import { VscChromeClose } from 'react-icons/vsc';
import Box from '../../layouts/Box';
import queryClient from '../../utils/queryClient';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
interface PropsI {
	place: PlaceI;
}
const Place = ({ place }: PropsI) => {
	const mutationDelete = useMutation(
		(id: number) => {
			return axios.delete(`/places/${id}`);
		},
		{ onSuccess: () => queryClient.invalidateQueries('places') }
	);
	const handleDelete = () => {
		if (confirm('Are you sure this will delete all children ? ')) {
			if (place.id) {
				mutationDelete.mutate(place.id);
			}
		}
	};

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div className="relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
				<div key={place.id} className="relative">
					<Box>
						<div onClick={handleDelete} className="text-gray-800 text-2xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-2 top-2 hover:rotate-180 transition-transform duration-300 cursor-pointer ">
							<VscChromeClose />
						</div>

						<h1 className="my-2">PL : {place.name}</h1>
						<h1 className="my-2">lat : {place.lat}</h1>
						<h1 className="my-2">lon : {place.lon}</h1>
						<h1 className="my-2">Kategoria : {place.placetype}</h1>
					</Box>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Place;
