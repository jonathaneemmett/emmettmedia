import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const HEADERS = {
	'Content-Type': 'application/json',
};

export default axios.create({
	baseURL: BASE_URL,
});

/* Axios Private */
export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
	withCredentials: true,
});
