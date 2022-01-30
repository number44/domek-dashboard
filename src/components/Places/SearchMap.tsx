import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import PlaceChoice from './PlaceChoice';
import Box from '../../layouts/Box';
import useStore from '../../store/coordinates';
interface PropsI {}
const SearchMap = ({}: PropsI) => {
	const queryClient = useQueryClient();
	const [searchResults, setSearchResult] = useState<SearchResI[] | null>(null);
	const {
		reset,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SearchI>();
	const onSubmit: SubmitHandler<SearchI> = (data) => {
		mutation.mutate({ search: data.search });
	};
	const mutation = useMutation(
		(Search: SearchI) => {
			return axios.post('/search', Search);
		},
		{
			onSuccess: (data) => {
				const newData = data.data.map((el: SearchResI) => {
					return {
						place_id: el.place_id,
						lat: el.lat,
						lon: el.lon,
						display_name: el.display_name,
						type: el.type,
					};
				});
				setSearchResult(newData);
				queryClient.invalidateQueries('categories');
			},
		}
	);

	const handlePlaceChoice = () => {};
	return (
		<section className="my-2">
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input autoComplete="off" type="text" {...register('search', { required: true, min: 4, minLength: 4 })} className=" mx-auto w-full  mt-4 mb-4 rounded-sm dark:bg-zinc-700" />
					{errors.search && <span className="text-primary">Field is required . Min Length 4 characters</span>}
					<input type="submit" value="Szukaj" className="bg-primary font-semibold cursor-pointer w-full   mt-4 hover:opacity-90 mb-4  text-zinc-100 px-3 py-2 rounded-sm" />
				</form>
			</Box>
			<div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-3 my-2 " onClick={handlePlaceChoice}>
				{searchResults && searchResults.map((placeRes) => <PlaceChoice key={placeRes.place_id} place={placeRes} />)}
			</div>
		</section>
	);
};

export default SearchMap;
