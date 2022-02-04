import './app.scss';
import Home from './routes/Home';

import useStore from './store/mode';
import { Routes, Route, HashRouter, useNavigate } from 'react-router-dom';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NotFound from './routes/NotFound';

import Layout from './layouts/Layout';
import Auth from './layouts/Auth';
import Places from './routes/Places';
import PlaceTypes from './routes/Map/PlaceTypes';
import CreatePlace from './routes/CreatePlace';
import Gallery from './routes/Gallery/Gallery';
import Drop from './routes/Gallery/Drop';
import Slides from './routes/Slides/Slides';
import Slide from './routes/Slides/Slide';

import AddSlide from './routes/Slides/AddSlide';
import SectionA from './routes/Sections/SectionA';
import SectionB from './routes/Sections/SectionB';

interface PropsI {}

const queryClient = new QueryClient();
const App = ({}: PropsI) => {
	const darkmode = useStore((state) => state.darkmode);
	return (
		<QueryClientProvider client={queryClient}>
			<div className={` ${darkmode ? 'dark' : ''}   `}>
				{/* Change for BrowserRouter if hash is not necessary */}
				<HashRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="/gallery" element={<Gallery />} />
							<Route path="/" element={<Home />} />
							<Route path="/gallery/add" element={<Drop />} />
							<Route path="/map/categories" element={<PlaceTypes />} />
							<Route path="/map" element={<Places />} />
							<Route path="/map/create" element={<CreatePlace />} />
							<Route path="/slides" element={<Slides />} />
							<Route path="/slides/add" element={<AddSlide />} />
							<Route path="/slides/:id" element={<Slide />} />
							<Route path="/infos" element={<SectionA />} />
							<Route path="/equipment" element={<SectionB />} />

							{/* <Route path="/about" element={<About />} />
							<Route path="/notes" element={<Notes />} />
							<Route path="/notes/create" element={<CreateNote />} />
							<Route path="/note/:id" element={<Note />} />
							<Route path="/notes/categories" element={<NoteCategories />} />

							<Route path="/media" element={<Media />} />
							<Route path="/media/add" element={<CreateMedia />} />

							<Route path="/rooms" element={<Rooms />} />

							<Route path="/locations" element={<Locations />} />
							<Route path="/locations/create" element={<CreateLocation />} />
							<Route path="/rooms/create" element={<RoomCreate />} />
							<Route path="/rooms/:id" element={<Room />} />
							<Route path="/rooms/gallery/:id" element={<Gallery />} />

							<Route path="/roomtypes/" element={<Roomtypes />} />
							<Route path="/roomtypes/:id" element={<Roomtype />} />
							<Route path="/rooms/gallery/add/:id" element={<Drop />} />
							<Route path="/roomtype/create" element={<RoomtypeCreate />} />

							<Route path="districts/" element={<Districts />} />
							<Route path="districts/:id" element={<District />} />
							<Route path="district/create" element={<DistrictCreate />} />

							<Route path="/locations/:id" element={<Location />} />
							<Route path="/son" element={<Son />} />
							<Route path="/olx" element={<Olx />} />
							<Route path="/facebook" element={<Facebook />} />

							<Route path="/reservations" element={<Reservations />} />
							<Route path="/reservations/create" element={<CreateReservation />} />
							<Route path="/policy" element={<Policy />} /> */}

							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="/auth" element={<Auth />}>
							<Route path="/auth/login" element={<Login />} />
							<Route path="/auth/register" element={<Register />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</HashRouter>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
