'use client';
import { createContext, useContext, useState } from 'react';
import { StandardProps, User } from '@/types';

interface Auth {
	user: User | { id: string; name: string; email: string };
	token: string;
}

interface AuthContext {
	auth: Auth;
	setCurrentAuth: (user: User, token: string) => void;
}

const initialState = {
	user: { id: '', name: '', email: '' },
	token: '',
};

const AuthContext = createContext<AuthContext>({
	auth: initialState,
	setCurrentAuth: () => {},
});

export const AuthProvider = ({ children }: StandardProps) => {
	const [auth, setAuth] = useState(initialState);

	function setCurrentAuth(user: User, token: string) {
		if (!user || !token) {
			setAuth(initialState);
			return;
		}

		setAuth({ user, token });
	}

	return (
		<AuthContext.Provider value={{ auth, setCurrentAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
