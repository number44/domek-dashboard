import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '../../layouts/Box';
import { fetchLocation } from '../../utils/fetching';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import queryClient from '../../utils/queryClient';
import SearchMap from '../../components/Places/SearchMap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import useStore from '../../store/coordinates';
interface PropsI {}
const Location = ({}: PropsI) => {
	const lat = useStore((state) => state.lat);
	const lon = useStore((state) => state.lon);
	const [url, setUrl] = useState<string>('./Rectangle.svg');
	const [fileF, setFileF] = useState(null);
	const changeCoordinates = useStore((state) => state.changeCoordinates);
	const params = useParams();
	const routes = useNavigate();
	if (!params.id) {
		return <Box>Error no data</Box>;
	}
	const {
		reset,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<LocationI>({
		defaultValues: {
			lat: lat,
			lon: lon,
		},
	});
	const newId = parseInt(params.id);
	const { data, isError, isLoading, error } = useQuery<LocationI, Error>(['location', newId], () => fetchLocation(newId));
	useEffect(() => {
		if (data?.lat && data.lon) {
			changeCoordinates(data?.lat, data?.lon);
			setValue('lat', lat);
			setValue('lon', lon);
			setValue('name', data.name);
			setValue('ename', data.ename);
			setValue('thumbnail', data.thumbnail);
			if (data.thumbnail) {
				setUrl(data.thumbnail);
			}
		}
	}, [data]);
	const onSubmit: SubmitHandler<LocationI> = (data) => {
		mutationUpdate.mutate(data);
	};

	const mutationUpdate = useMutation(
		(newNote: any) => {
			const config = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('name', newNote.name ? newNote.name : 'name');
			formData.append('ename', newNote.ename ? newNote.ename : 'ename');
			if (fileF) {
				formData.append('thumbnail', fileF ? fileF : 'thumbnail');
			}

			return axios.post(`/locations/${data?.id}`, formData, config);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('locations');
				routes('/locations');
			},
		}
	);
	const onChangeFile = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setFileF(e.target.files[0]);
		setUrl(url);
	};
	const mutationDelete = useMutation(
		(id: number) => {
			return axios.delete(`/locations/${id}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('location');
				routes('/locations');
			},
		}
	);
	const handleDelete = () => {
		if (confirm('Czy jesteś absolutnie pewien / pewna ? Ta akcja skasuje wszystkie pokoje należące do tej lokalizacji ')) {
			mutationDelete.mutate(newId);
		}
	};
	return (
		<div>
			<Box>
				<div className="relative pr-4 pt-8">
					<div onClick={handleDelete} className="text-gray-800 text-2xl  dark:text-gray-200  w-8  h-8 flex-center top-0 right-0 hover:rotate-180 absolute transition-transform duration-300 cursor-pointer  trn -translate-y-2">
						<VscChromeClose />
					</div>
				</div>
				<div className=" w-full z-10 cursor-pointer">
					<MapContainer className="h-96 z-10" center={[lat, lon]} zoom={13}>
						<RefreshMap lat={lat} lon={lon} zoom={13} />
						<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={[lat, lon]}>
							<Popup>Nowa Lokalizacja</Popup>
						</Marker>
					</MapContainer>
				</div>
			</Box>
			<SearchMap />
			<div className="py-4 ">
				<Box>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-sm mx-auto">
						<label className="icon-image bg-cyan-500 font-semibold cursor-pointer self-center my-3  mt-2 hover:bg-cyan-600 text-zinc-100  rounded-lg">
							<img className=" w-96 aspect-video  object-cover mx-auto rounded-sm dark:bg-slate-700 bg-slate-100" src={url} />
							<input type="file" {...register('thumbnail', { required: false })} onChange={onChangeFile} className="hidden" name="image" />
						</label>
						{errors.thumbnail && <div className=" w-full  text-center text-red-800">Zdjęcie wymagane</div>}
						<label htmlFor="name">Polska nazwa</label>
						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('name', { required: true, minLength: 4 })} />
						{errors.name && <p className=" w-full  text-red-800 ">Musi zawierać min. 4 znaki</p>}

						<label className="mt-2" htmlFor="name">
							Angielska nazwa
						</label>

						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('ename', { required: true, minLength: 4 })} />
						{errors.ename && <p className=" w-full  text-red-800 ">Create name min 4 characters</p>}

						<label className="mt-2" htmlFor="lat">
							Latitude
						</label>

						<input step={0.0000001} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="number" {...register('lat', { required: true })} />
						{errors.lat && <p className=" w-full  text-red-800 ">Add latitude</p>}

						<label className="mt-2" htmlFor="lon">
							Longitude
						</label>
						<input step={0.0000001} autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="number" {...register('lon', { required: true })} />
						{errors.lon && <p className=" w-full  text-red-800 ">Add longitude</p>}

						<input type="submit" value="Create" className="bg-primary font-semibold cursor-pointer w-full   mt-4 hover:opacity-90 mb-4  text-zinc-100 px-3 py-2 rounded-sm" />
					</form>
				</Box>
			</div>
		</div>
	);
};

export default Location;
interface PropsII {
	lat: number;
	lon: number;
	zoom: number;
}
const RefreshMap = ({ lat, lon, zoom }: PropsII) => {
	const map = useMap();
	map.setView([lat, lon], zoom);
	return null;
};
