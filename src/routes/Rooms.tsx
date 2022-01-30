import { useEffect, useState, ChangeEvent } from 'react';
import { useQueries } from 'react-query';
import Box from '../layouts/Box';
import { fetchLocations } from '../utils/fetching';
import RoomBox from '../components/Rooms/RoomBox';
import axios from 'axios';
interface PropsI {}
const Rooms = ({}: PropsI) => {
	const [filteredRooms, setFilteredRooms] = useState<RoomI[]>([]);
	const results = useQueries([{ queryKey: ['locations'], queryFn: fetchLocations }]);
	const locations = results[0];
	const [rooms, setRooms] = useState<RoomI[]>([]);
	const handler = (e: ChangeEvent<HTMLSelectElement>) => {
		let location_id = parseInt(e.target.value);
		if (location_id === 0) {
			axios.get(`/pokoje`).then((data) => {
				setFilteredRooms(data.data);
			});
		}
		if (location_id && location_id !== 0) {
			axios.get(`/pokoje`, { params: { location_id: location_id } }).then((data) => {
				setFilteredRooms(data.data);
			});
		}
	};
	useEffect(() => {
		axios.get(`/pokoje`).then((data) => {
			setFilteredRooms(data.data);
		});
	}, []);

	return (
		<>
			<select onChange={(e) => handler(e)} className="dark:bg-zinc-700 my-2  w-full mb-8">
				<option value={0}>Wszystkie Lokalizacje</option>
				{locations.data &&
					locations?.data.map((cat: LocationI) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
			</select>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">{filteredRooms && filteredRooms?.map((room, index) => <RoomBox key={room.id} room={room} index={index} />)}</div>
		</>
	);
};

export default Rooms;
