import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchUser, signinUser, signupUser } from '../../services/authService';
import { getToken } from '../../services/fetch';
import { User } from '../../types/user.type';
import { timeout } from '../../utils/timeout.util';

const AuthContext = createContext<Values>({
	user: null,
	loading: true,
	signingUp: false,
	signingIn: false,
	signin: async () => {
		await timeout(0);
		return void 0;
	},
	signup: async () => {
		await timeout(0);
		return void 0;
	},
	clearUser: () => null,
});

type Props = {
	children: ReactNode;
};

type Values = {
	user: User | null;
	loading: boolean;
	signingUp: boolean;
	signingIn: boolean;
	signin: (username: string, password: string) => Promise<void>;
	signup: (username: string, password: string) => Promise<void>;
	clearUser: () => void;
};

const useAuth = (): Values => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }: Props): ReactElement => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [signingUp, setSigningUp] = useState<boolean>(false);
	const [signingIn, setSigningIn] = useState<boolean>(false);

	useEffect(() => {
		const controller = new AbortController();
		const fetch = async (): Promise<void> => {
			try {
				if (getToken()) {
					const user = await fetchUser(controller);
					setUser(user.data);
				}
			} catch {
				setUser(null);
			}
			setLoading(controller.signal.aborted);
		};
		fetch();
		return () => controller.abort();
	}, []);

	const signup = async (username: string, password: string): Promise<void> => {
		setSigningUp(true);
		await signupUser(username, password);
		const { data } = await signinUser(username, password);
		localStorage.setItem('access_token', data.access_token);
		const { data: userData } = await fetchUser();
		setUser(userData);
		setSigningUp(false);
	};

	const signin = async (username: string, password: string): Promise<void> => {
		setSigningIn(true);
		const { data } = await signinUser(username, password);
		localStorage.setItem('access_token', data.access_token);
		const { data: userData } = await fetchUser();
		setUser(userData);
		setSigningIn(false);
	};

	const clearUser = (): void => {
		localStorage.removeItem('access_token');
		setUser(null);
	};

	const value: Values = { user, loading, signingUp, signingIn, signin, signup, clearUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
