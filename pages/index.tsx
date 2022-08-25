import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../src/Banner";
import Nav from "../src/Nav";
import requests from "../src/requests";
import Row from "../src/Row";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Home - Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			Let&apos;s build Netflix
			<div className="app">
				<Nav />
				<Banner />
				<Row title="TOP RATED" fetchUrl={requests.fetchTopRated} isLargeRow />
				<Row title="Trending Now" fetchUrl={requests.fetchTrending} />
				<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
				<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
				<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
				<Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} />
				<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
				<Row title="Family Movies" fetchUrl={requests.fetchFamilyMovies} />
			</div>
		</div>
	);
};

export default Home;
