import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />; // eslint-disable-line react/jsx-props-no-spreading
}

export default MyApp;
