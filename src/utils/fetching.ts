import axios from 'axios';

async function fetchNotes() {
	const { data } = await axios.get(`/notes`);
	return data.data;
}
async function fetchNote(id: number) {
	const { data } = await axios.get(`/notes/${id}`);
	return data.data;
}
async function fetchCategories() {
	const { data } = await axios.get(`/categories`);
	return data.data;
}

async function fetchMapCategories() {
	const { data } = await axios.get('/placetypes');
	return data;
}
async function fetchPlaces() {
	const { data } = await axios.get(`/places`);
	return data.data;
}
async function fetchLocations() {
	const { data } = await axios.get(`/locations`);
	return data;
}
async function fetchDistricts() {
	const { data } = await axios.get(`/districts`);
	return data.data;
}
async function fetchDistrict(id: number) {
	const { data } = await axios.get(`/districts/${id}`);
	return data.data;
}

async function fetchLocation(id: number) {
	const { data } = await axios.get(`/locations/${id}`);
	return data.data;
}
async function fetchRooms() {
	const { data } = await axios.get('/rooms');
	return data;
}
async function fetchRoom(id: number) {
	const { data } = await axios.get(`/rooms/${id}`);
	return data;
}
async function fetchRoomtypes() {
	const { data } = await axios.get('/roomtypes');
	return data.data;
}
async function fetchRoomtype(id: number) {
	const { data } = await axios.get(`/roomtypes/${id}`);
	return data.data;
}

async function searchRooms(query: string) {
	const { data } = await axios.get(`/rooms/search/${query}`);
	return data.data;
}
async function fetchUsers() {
	const { data } = await axios.get('/auth/users');
	return data;
}
async function fetchMedia() {
	const { data } = await axios.get('/files');
	return data;
}
async function fetchFilteredRooms() {
	const { data } = await axios.get('/rooms');
	return data;
}

async function fetchPrices() {
	const { data } = await axios.get('/prices/1');
	return data.data;
}

async function fetchReservations() {
	const { data } = await axios.get('/reservations');
	return data;
}

async function fetchPolicy() {
	const { data } = await axios.get('/policies/1');
	return data.data;
}

// gagi
async function fetchSlides() {
	const { data } = await axios.get('/slides');
	return data.data;
}
async function fetchPictures() {
	const { data } = await axios.get('/pictures');
	return data;
}
async function fetchSlide(id: number) {
	const { data } = await axios.get(`/slide/${id}`);
	return data;
}

export {
	fetchSlide,
	fetchPictures,
	fetchSlides,
	//gagi
	fetchFilteredRooms,
	fetchPolicy,
	fetchReservations,
	fetchPrices,
	fetchMedia,
	fetchNote,
	fetchDistrict,
	fetchDistricts,
	fetchRoomtype,
	searchRooms,
	fetchRooms,
	fetchRoomtypes,
	fetchRoom,
	fetchNotes,
	fetchCategories,
	fetchMapCategories,
	fetchLocations,
	fetchLocation,
	fetchPlaces,
};
