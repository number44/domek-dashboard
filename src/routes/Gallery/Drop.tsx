import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';
import Box from '../../layouts/Box';
import { BiImageAdd } from 'react-icons/bi';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import queryClient from '../../utils/queryClient';
import { useMutation } from 'react-query';
import axios from 'axios';
import Loader from '../../components/Loader';
interface PropsI {}
const Drop = ({}: PropsI) => {
	const [myFiles, setMyFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const onDrop = useCallback(
		(acceptedFiles) => {
			setMyFiles([...myFiles, ...acceptedFiles]);
		},
		[myFiles]
	);
	const routes = useNavigate();
	const [imgId, setImgId] = useState<number>(0);
	const [urls, setUrls] = useState<ImageI[]>([]);
	const [files, setFiles] = useState<File[] | null>(null);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop,
	});
	const removeFile = (file: File) => () => {
		const newFiles = [...myFiles];
		newFiles.splice(newFiles.indexOf(file), 1);
		setMyFiles(newFiles);
	};

	const removeAll = () => {
		setMyFiles([]);
	};
	const sendHandler = async () => {
		setFiles([]);

		mutation.mutate(myFiles);
	};
	const mutation = useMutation(
		(data: File[]) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};

			const getFiles = data.map((file) => {
				const formData = new FormData();

				formData.append('name', file.name.replace(/\.[^/.]+$/, ''));
				formData.append('picture', file);

				return axios.post('/pictures', formData, config);
			});

			setLoading(true);

			return axios.all(getFiles);
		},
		{
			onSuccess: () => {
				setLoading(false);
				queryClient.invalidateQueries('pictures');
				routes(-1);
			},
		}
	);
	const cancelHandler = () => {
		removeAll();
	};
	return (
		<div>
			<Box>
				<section className="h-64 items-stretch justify-between  	    flex-col  border-4 border-slate-300 border-dotted cursor-pointer">
					<div {...getRootProps({ className: 'dropzone' })} className=" h-full flex-center">
						<input {...getInputProps()} />
						<div className="flex flex-col  h-full flex-center  w-full">
							<BiImageAdd className="f text-5xl mb-2 mx-auto" />
							<p>Przeciągnij lub kliknij aby dodać zdjęcia</p>
						</div>
					</div>
				</section>
			</Box>
			<div className="h-8"></div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
				{urls.map((i, index) => (
					<Box className=" w-full aspect-[12/8]" key={index}>
						<img className="w-full h-full object-cover" src={i.url} alt="" />
					</Box>
				))}
			</div>
			<div className="h-8"></div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-8">
				{myFiles.map((f, index) => (
					<Box key={index} className=" aspect-">
						<img className="aspect-[4/3]" src={URL.createObjectURL(f)} alt="" />
					</Box>
				))}
			</div>
			<Box className="text-2xl w-full py-4   items-center grid grid-cols-1 sm:grid-cols-2 gap-3  font-semibold cursor-pointer">
				<motion.div onClick={sendHandler} whileHover={{ scale: 0.95 }} className="flex-center bg-primary hover:opacity-9  text-zinc-100  text-center py-2 rounded-sm">
					{loading ? <Loader /> : <div className="h-12  flex-center">Dodaj </div>}
				</motion.div>
				<motion.div onClick={cancelHandler} whileHover={{ scale: 0.95 }} className=" bg-white hover:opacity-9  text-primary  text-center py-2 rounded-sm">
					<div className="h-12 flex-center">Wyczyść</div>
				</motion.div>
			</Box>
		</div>
	);
};

export default Drop;
