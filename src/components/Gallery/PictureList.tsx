import { useEffect, useLayoutEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HBox from '../../layouts/HBox';
import Box from '../../layouts/Box';

import { fetchPictures } from '../../utils/fetching';
import useStore from '../../store/galleryStore';

interface PropsI {}
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import Loader from '../../components/Loader';
const PictureList = ({}: PropsI) => {
	const { changePictureUrl, pictureUrl, isOpen, setIsOpen } = useStore();
	const qc = useQueryClient();
	const { data, isError, error, isLoading } = useQuery<PictureI[], Error>('pictures', fetchPictures);
	const [files, setFiles] = useState<PictureI[]>([]);
	const [galleryData, setGalleryData] = useState([]);
	const queryClient = useQueryClient();
	useEffect(() => {
		if (data) {
		}
	}, [data]);
	useEffect(() => {}, []);

	const handler = (f: PictureI) => {
		setIsOpen(true);
		if (f.picture) {
			changePictureUrl(f.picture);
		}
	};
	const mutation = useMutation(
		(newId: number) => {
			return axios.delete(`pictures/${newId}`);
		},
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries('pictures');
			},
		}
	);
	const handleDelete = async (id: number) => {
		if (confirm('Na pewno skasować ?') && id !== 0) {
			await mutation.mutate(id);
		}
	};

	if (isError) {
		return <h1>Error</h1>;
	}
	if (isLoading) {
		return <Loader />;
	}
	return (
		<div>
			<div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3  ">
				{data?.map((f, index) => (
					<Box key={f.id} className="relative pt-10">
						<div onClick={() => handleDelete(f.id ? f.id : 0)} className=" text-gray-800 text-2xl  dark:text-gray-200 absolute w-8 h-8 flex-center right-2 top-2 hover:rotate-180 transition-transform duration-300 cursor-pointer z-10 ">
							<VscChromeClose />
						</div>
						<figure onClick={() => handler(f)} className="aspect-video  relative overflow-hidden">
							<img src={f.picture_sm} alt="" className=" object object-contain absolute-center " />
						</figure>
					</Box>
				))}
			</div>
		</div>
	);
};

export default PictureList;
