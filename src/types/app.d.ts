interface NoteI {
	id?: number;
	name: string;
	content?: string;
	slug?: string;
	category?: string;
	category_id?: number;
}
interface CategoryI {
	id?: number;
	name: string;
}

interface PlaceTypesI {
	id?: number;
	name?: string;
	icon?: string;
}
interface ImageI {
	name: string;
	url: string;
}
interface PlaceI {
	id?: number;
	name?: string;
	lat?: number;
	lon?: number;
	placetype?: string;
	placetype_id?: number;
}

interface CoordinatesI {
	lat: number | string;
	lon: number | string;
}
interface SearchResI extends SearchI {
	place_id?: number;
	lat?: string;
	lon?: string;
	display_name?: string;
	type?: string;
}

interface SearchI {
	search: string;
}
interface LocationI {
	id?: number;
	name: string;
	ename: string;
	lat: number;
	lon: number;
	thumbnail?: string;
	district: string;
}

interface PpropertyI {
	estate_id: string;
	label: string;
	room: ProomI[];
}
interface ProomI {
	room_id: string;
	title: string;
	price: PpriceI;
	availability: PavailabilityI;
}
interface PpriceI {
	per_month: string;
}
interface PavailabilityI {
	start_date: string;
}

interface RoomtypeI {
	id: number;
	name: string;
	ename: string;
}

interface DoubleI {
	locations: LocationI[];

	roomtype: RoomtypeI[];
}
interface UploadEditorStateI {
	uploadEditor: () => void;
	clean: () => void;
}
interface EditorI {
	setOptions({}): void;
	setContent(content: string, emitUpdate?: boolean): void;
	getHTML(): string;
	destroy(): void;
}

interface DistrictI {
	id: number;
	name: string;
	ename: string;
}

interface MediaI {
	id: number;
	name: string;
	url: string;
}

interface PricesI {
	id: number;
	a1: number;
	a2: number;
	b1: number;
	b2: number;
	c1: number;
	c2: number;
}

interface ReservationI {
	id: number;
	icon: string;
	title: string;
	etitle: string;
	text: string;
	etext: string;
}

interface PolicyI {
	id: number;
	text: string;
	etext: string;
}

interface InfoI {
	tel: string;
	email: string;
}

interface SlideI {
	id: number;
	header: string;
	description: string;
	// picture_id: number;
	picture: SlidePicureI;
}

interface PictureI {
	id: number;
	name: string;
	picture: string;
	picture_xs: string;
	picture_sm: string;
	picture_md: string;
	picture_lg: string;
	updated_at: string;
	created_at: string;
}
interface SlidePicureI {
	id: number;
	picture: string;
	picture_xs: string;
	picture_sm: string;
	picture_md: string;
	picture_lg: string;
}

interface SectionI {
	id: number;
	title: string;
	content: string;
	picture_1: number;
	picture_2: number;
	picture_3: number;
	picture_4: number;
}
