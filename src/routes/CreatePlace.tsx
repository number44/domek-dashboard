import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { useForm, SubmitHandler } from 'react-hook-form';
import SearchMap from '../components/Places/SearchMap';
import Box from '../layouts/Box';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import useStore from '../store/coordinates';
import { fetchMapCategories } from '../utils/fetching';
import axios from 'axios';
import queryClient from '../utils/queryClient';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'leaflet';
interface PropsI {}
const CreatePlace = ({}: PropsI) => {
	const routes = useNavigate();
	const lat = useStore((state) => state.lat);
	const lon = useStore((state) => state.lon);
	const { data } = useQuery<PlaceTypesI[], Error>('placetypes', fetchMapCategories);
	const changeCoordinates = useStore((state) => state.changeCoordinates);

	useEffect(() => {
		changeCoordinates(51.759445, 19.457216);
	}, []);
	const myIcon = new Icon({
		iconUrl: 'https://domekwgorachsowich.pl/assets/marker-primary.svg',
		iconSize: [38, 50], // size of the icon
		// shadowSize: [50, 64], // size of the shadow
		iconAnchor: [14, 50], // point of the icon which will correspond to marker's location
		// shadowAnchor: [4, 62], // the same for the shadow
		// popupAnchor: [-3, -76],
	});

	useEffect(() => {
		setValue('lat', lat);
		setValue('lon', lon);
		setValue('placetype_id', 0);
	}, [lat, lon]);
	const {
		reset,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<PlaceI>({
		defaultValues: {
			lat: lat,
			lon: lon,
		},
	});
	const onSubmit: SubmitHandler<PlaceI> = (data) => {
		if (confirm('Create ?')) {
			if (data.name && data.lat && data.lon && data.placetype_id) {
				mutation.mutate({
					name: data.name,
					lat: data.lat,
					lon: data.lon,
					placetype_id: data.placetype_id,
				});
			}
		}
	};
	const mutation = useMutation(
		(formdata: PlaceI) => {
			return axios.post('/places', formdata);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('places');
				routes('/map');
			},
		}
	);
	return (
		<>
			<Box>
				<div className=" w-full z-10 cursor-pointer">
					<MapContainer className="h-96 z-10" center={[lat, lon]} zoom={13}>
						<RefreshMap lat={lat} lon={lon} zoom={13} />
						<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker icon={myIcon} position={[lat, lon]}>
							<Popup>New Place</Popup>
						</Marker>
					</MapContainer>
				</div>
			</Box>
			<SearchMap />
			<div className="py-4">
				<Box>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-sm mx-auto">
						<label htmlFor="name">Nazwa</label>
						<input autoComplete="off" className="mx-auto w-full  mt-2  rounded-sm dark:bg-zinc-700" type="text" {...register('name', { required: true, minLength: 4 })} />
						{errors.name && <p className=" w-full  text-red-800 ">Min. cztery znaki</p>}

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

						<label className="mt-2" htmlFor="placetype_id">
							Kategoria miejsca
						</label>

						<select className="dark:bg-zinc-700 my-2  w-full" {...register('placetype_id', { required: true })}>
							{data &&
								data?.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
						{errors.placetype_id && <p className=" w-full  text-red-800 ">Pole wymagane</p>}

						<input type="submit" value="Utwórz" className="bg-primary font-semibold cursor-pointer w-full   mt-4 hover:opacity-90 mb-4  text-zinc-100 px-3 py-2 rounded-sm" />
					</form>
				</Box>
			</div>
		</>
	);
};

export default CreatePlace;
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
