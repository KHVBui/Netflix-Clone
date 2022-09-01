import { useEffect, useState } from "react";
import styles from "../styles/Banner.module.css";
import axios from "./axios";
import requests from "./requests";

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const request = await axios.get(requests.fetchTrending);

				// Obtain one random Netflix original to be the banner
				setMovie(
					request.data.results[
						Math.floor(Math.random() * request.data.results.length)
					],
				);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
	}

	return (
		// Banner image
		<header
			className={styles.banner}
			style={{
				backgroundSize: "cover",
				backgroundImage: `url(
          "https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}"
        )`,
				backgroundPosition: "top center",
			}}
		>
			<img
				src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
				style={{ display: "none" }}
				alt="banner"
				onError={({ currentTarget }) => {
					setTimeout(() => {
						const imageTarget = currentTarget;
						imageTarget.backgroundImage = `url(
						"https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}"
					)`;
					}, 1000);
				}}
			/>

			<div className={styles.banner__contents}>
				{" "}
				{/* Text for banner */}
				{/* title */}
				<h1 className={styles.banner__title}>
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				{/* div > 2 buttons */}
				<div className={styles.banner__buttons}>
					<button className={styles.banner__button}>Play</button>
					<button className={styles.banner__button}>My List</button>
				</div>
				{/* description */}
				<h1 className={styles.banner__description} x>
					{truncate(movie?.overview, 150)}
				</h1>
			</div>

			<div className={styles["banner--fadeBottom"]} />
		</header>
	);
}

export default Banner;
