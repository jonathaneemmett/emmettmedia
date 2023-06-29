'use client';
import axios from '../services/axios';
import { useAuth } from '../context/AuthContext';

function useRefreshToken() {
	const { setCurrentAuth } = useAuth();

	async function refresh() {
		const res = await axios.post('/api/auth/refresh', {
			withCredentials: true,
		});

		const data = res.data;

		setCurrentAuth(data.user, data.token);
	}

	return refresh;
}

export { useRefreshToken };
