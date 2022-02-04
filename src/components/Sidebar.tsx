import { useState, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import Back from '../icons/Back';
import useStore from '../store/mode';
import SidebarLink from './SidebarLink';
import { BiCarousel, BiCategory } from 'react-icons/bi';
import { BsPlusLg, BsPinMapFill, BsCalendar2Check, BsInfoSquare } from 'react-icons/bs';
import { VscFileSymlinkDirectory } from 'react-icons/vsc';
import { MdSpeakerNotes, MdOutlineLocalPolice } from 'react-icons/md';
import useSideStore from '../store/sidebarStore';
import NoteSidebar from './Sidebars/NoteSidebar';
import MapSidebar from './Sidebars/MapSidebar';
import MediaSidebar from './Sidebars/MediaSidebar';
import RoomSidebar from './Sidebars/RoomSidebar';
import ReservationSidebar from './Sidebars/ReservationSidebar';
import { AiOutlineFieldTime, AiOutlineFacebook, AiFillFacebook, AiOutlineFileImage } from 'react-icons/ai';
import { GiBeerBottle } from 'react-icons/gi';
const reducer = () => {
	return {
		open: 1,
	};
};

interface PropsI {}
const Sidebar = ({}: PropsI) => {
	const [state, dispatch] = useReducer(reducer, {
		open: 1,
	});
	const darkmode = useStore((state) => state.darkmode);
	const sidebar = useSideStore((state) => state.sidebar);
	const toggleSide = useSideStore((state) => state.toggleSide);
	// const [sidebar, toggleSide] = useState<SideT>(null);
	// const toggleSide = (active: SideT) => toggleSide(active);

	return (
		<>
			<aside className=" flex flex-col fixed top-0 left-0 w-12 sm:w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 ">
				<NavLink onClick={() => toggleSide('slides')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/slides">
					<SidebarLink>
						<span className="hidden sm:block">Karuzela</span>
						<BiCarousel className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('sectiona')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/infos">
					<SidebarLink>
						<span className="hidden sm:block">Informacje</span>
						<BsInfoSquare className="text-2xl" />
					</SidebarLink>
				</NavLink>

				<NavLink onClick={() => toggleSide('sectionb')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/equipment">
					<SidebarLink>
						<span className="hidden sm:block">Wyposażenie</span>
						<GiBeerBottle className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('gallery')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/gallery">
					<SidebarLink>
						<span className="hidden sm:block">Galeria</span>
						<AiOutlineFileImage className="text-2xl" />
					</SidebarLink>
				</NavLink>

				<NavLink onClick={() => toggleSide('map')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/map">
					<SidebarLink>
						<span className="hidden sm:block">Mapa</span>
						<BsPinMapFill className="text-2xl" />
					</SidebarLink>
				</NavLink>

				{/* <NavLink onClick={() => toggleSide('notes')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/notes">
					<SidebarLink>
						<span className="hidden sm:block ">Notatki</span>
						<MdSpeakerNotes className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('media')} className={({ isActive }) => (isActive ? 'bg-slate-100 dark:bg-slate-700' : '')} to="/media">
					<SidebarLink>
						<span className="hidden sm:block">Pliki</span>
						<VscFileSymlinkDirectory className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('rooms')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/rooms">
					<SidebarLink>
						<span className="hidden sm:block">Pokoje</span>
						<GiHouseKeys className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('reservations')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/reservations">
					<SidebarLink>
						<span className="hidden sm:block">Rezerwacje</span>
						<BsCalendar2Check className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('policy')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/policy">
					<SidebarLink>
						<span className="hidden sm:block">Zasady</span>
						<MdOutlineLocalPolice className="text-2xl" />
					</SidebarLink>
				</NavLink>
				<NavLink onClick={() => toggleSide('olx')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/olx">
					<SidebarLink>
						<span className="hidden sm:block">Olx</span>
						<AiOutlineFieldTime className="text-2xl" />
					</SidebarLink>
				</NavLink>

				<NavLink onClick={() => toggleSide('facebook')} className={({ isActive }) => (isActive ? ' bg-slate-100 dark:bg-slate-700' : '')} to="/facebook">
					<SidebarLink>
						<span className="hidden sm:block">Facebook</span>
						<AiOutlineFacebook className="text-2xl" />
					</SidebarLink>
				</NavLink> */}
			</aside>
			{sidebar === 'notes' && <NoteSidebar />}
			{sidebar === 'map' && <MapSidebar />}
			{sidebar === 'media' && <MediaSidebar />}
			{sidebar === 'rooms' && <RoomSidebar />}
			{sidebar === 'reservations' && <ReservationSidebar />}
		</>
	);
};

export default Sidebar;
