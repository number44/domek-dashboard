import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

//axios.defaults.baseURL = 'http://server818748.nazwa.pl/rarpanel/api';

if (window.location.host === 'localhost:3000' || window.location.host === 'localhost:5000') {
	// Dev
	axios.defaults.baseURL = 'http://localhost:8000/api';
} else {
	// Prod
	let newURL = window.location.protocol + '//' + window.location.host + '/api';
	axios.defaults.baseURL = newURL;
}
window.location.host + '/' + window.location.pathname + window.location.search;
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
