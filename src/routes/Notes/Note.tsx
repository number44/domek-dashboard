import { useNavigate, useParams } from 'react-router-dom';
import Box from '../../layouts/Box';
import { useMutation, useQuery } from 'react-query';
import { fetchNote } from '../../utils/fetching';
import axios from 'axios';
import Loader from '../../components/Loader';
import qc from '../../utils/queryClient';
interface PropsI {}
const example = ({}: PropsI) => {
	const routes = useNavigate();
	const params = useParams();
	if (!params.id) {
		return <Box>Error no data</Box>;
	}
	const newId = parseInt(params.id);

	const { data, isError, isLoading, error } = useQuery<NoteI, Error>(['note', newId], () => fetchNote(newId));

	const handleDelete = () => {
		if (confirm('Na pewno chcesz usunąć?')) mutation.mutate(newId);
	};
	const mutation = useMutation(
		(id: number) => {
			return axios.delete(`/notes/${id}`);
		},
		{
			onSuccess: () => {
				qc.invalidateQueries('note');
				qc.invalidateQueries('notes');

				routes('/notes');
			},
		}
	);
	if (isLoading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}
	return (
		<>
			<Box className="mb-4 flex items-center justify-between">
				<h1 className="px-2 text-2xl uppercase">{data?.name}</h1>
				<div onClick={handleDelete} className="bg-primary rounded-sm px-3 py-2">
					Usuń
				</div>
			</Box>
			<Box>
				<div
					className="ProseMirror border-0"
					dangerouslySetInnerHTML={{
						__html: data?.content ? data.content : '',
					}}
				></div>
			</Box>
		</>
	);
};

export default example;
