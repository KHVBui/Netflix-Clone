import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		// Higher order component
		<AuthProvider>
			<Component {...pageProps} />;
		</AuthProvider>
	);
}

export default MyApp;
