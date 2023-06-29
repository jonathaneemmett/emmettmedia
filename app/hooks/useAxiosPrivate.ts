'use client';

import { useEffect } from 'react';
import { axiosPrivate } from '../services/axios';
import { useAuth } from '../context/AuthContext';
import { useRefreshToken } from './useRefreshToken';

function useAxiosPrivate() {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				// Check if there is an authorization header
				if (config.headers && !config.headers['Authorization']) {
					// If not, add the authorization header
					config.headers['Authorization'] = `Bearer ${auth.token}`;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		const responseInterceptor = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				// if the error is a 403 and had not be retried yet
				if (error?.response?.status === 403 && !prevRequest.sent) {
					// Set the request as true, so it won't be retried again
					prevRequest.sent = true;

					const token = await refresh(); // gets a refresh token

					prevRequest.headers['Authorization'] = `Bearer ${token}`; // sets the new token

					// retry the request
					return axiosPrivate(prevRequest);
				}

				return Promise.reject(error);
			},
		);
		return () => {
			// Clean up
			axiosPrivate.interceptors.request.eject(requestInterceptor);
			axiosPrivate.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return axiosPrivate;
}

export { useAxiosPrivate };
