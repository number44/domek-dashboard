import Box from '../../layouts/Box';
import { BsPlusLg } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchSlides } from '../../utils/fetching';
import Loader from '../../components/Loader';
import { useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
interface PropsI {}
const Slider = ({}: PropsI) => {
	const { data, isError, isLoading, error } = useQuery<SlideI[], Error>('slides', fetchSlides);
	const qc = useQueryClient();
	const handleDelete = (id: number) => {
		mutation.mutate(id);
	};
	const mutation = useMutation(
		(dId: number) => {
			return axios.delete(`/slides/${dId}`);
		},
		{
			onSuccess: () => {
				qc.invalidateQueries('slides');
			},
		}
	);
	if (isError) {
		return <Box>Error</Box>;
	}
	if (isLoading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 cursor-pointer">
			<Link to={`/slides/add`}>
				<motion.div className="h-full flex-center" whileHover={{ scale: 0.9 }}>
					<Box className="h-full flex-center">
						<div className="flex items-center justify-between p-8">
							<BsPlusLg />
						</div>
					</Box>
				</motion.div>
			</Link>
			{data?.map((slide) => (
				<AnimatePresence key={slide.id}>
					<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
						<Box className="pt-12 relative	">
							<div onClick={() => handleDelete(slide.id)} className="text-gray-800 text-2xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-2 top-2 hover:rotate-180 transition-transform duration-300 cursor-pointer  ">
								<VscChromeClose className="text-2xl" />
							</div>
							<Link to={`/slides/${slide.id}`}>
								<div className="aspect-[4/3]">
									<img className="w-full h-full object-cover" src={slide.picture.picture_md} alt="" />
								</div>
							</Link>
						</Box>
					</motion.div>
				</AnimatePresence>
			))}
		</div>
	);
};

export default Slider;
