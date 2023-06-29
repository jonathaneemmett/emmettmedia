import React from 'react';

export type StandardProps = {
	children: React.ReactNode;
};

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface AuthContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	token?: string | undefined;
	setToken?: (token: string | undefined) => void;
}
