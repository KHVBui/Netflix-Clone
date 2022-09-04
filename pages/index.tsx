import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
// import Banner from "../src/Banner";
// import requests from "../src/requests";
// import Row from "../src/Row";

const Home: NextPage = () => {
	return (
		<div className="relative h-screen">
			<Head>
				<title>Home - Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="app">
				{/* <Banner />
				<link rel="dns-prefetch" href="https://api.themoviedb.org" />
				<Row title="TOP RATED" fetchUrl={requests.fetchTopRated} isLargeRow />
				<Row title="Trending Now" fetchUrl={requests.fetchTrending} />
				<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
				<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
				<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
				<Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} />
				<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
				<Row title="Family Movies" fetchUrl={requests.fetchFamilyMovies} /> */}
			</main>
		</div>
	);
};

export default Home;
