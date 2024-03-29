import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

interface IAuth {
	user: User | null;
	signUp: (email: string, password: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	customError: string | null;
	loading: boolean;
}

const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	customError: null,
	loading: false,
});

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [customError, setCustomError] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	useEffect(
		() =>
			onAuthStateChanged(auth, currentUser => {
				if (currentUser) {
					// Logged in...
					setUser(currentUser);
					setLoading(false);
				} else {
					// Not logged in...
					setUser(null);
					setLoading(true);
					router.push("/login");
				}

				setInitialLoading(false);
			}),
		[auth],
	);

	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user);
				router.push("/");
				setLoading(false);
			})
			.catch(error => alert(error.message)) // eslint-disable-line no-alert
			.finally(() => setLoading(false));
	};
	const signIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setUser(userCredential.user);
				router.push("/");
				setLoading(false);
			})
			.catch(error => alert(error.message)) // eslint-disable-line no-alert
			.finally(() => setLoading(false));
	};
	const logout = async () => {
		setLoading(true);

		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch(error => alert(error.message)) // eslint-disable-line no-alert
			.finally(() => setLoading(false));
	};

	const memoedValue = useMemo(
		() => ({
			user,
			signUp,
			signIn,
			loading,
			logout,
			customError,
		}),
		[user, loading],
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
