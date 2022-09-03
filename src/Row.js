import movieTrailer from "movie-trailer";
import Image from "next/image";
import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import styles from "../styles/Row.module.css";
import axios from "./axios";

const BASE_URL = "https://image.tmdb.org/t/p/";
const BACKDROP_SIZE = "w300";
const POSTER_SIZE = "w185";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	// A snippet of code which runs based on a specific condition/variable
	useEffect(() => {
		// Have to format async function like this in useEffect
		async function fetchData() {
			try {
				const request = await axios.get(fetchUrl);
				setMovies(request.data.results);
				return request;
			} catch (error) {
				console.log(error);
				return error;
			}
		}

		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	const handleClick = movie => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(
				movie?.title || movie?.name || movie?.original_name || movie?.id || "",
			)
				.then(url => {
					console.log(`url is ${url}`);
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch(error => console.log(error));
		}
	};

	return (
		<div className={styles.row}>
			<h2>{title}</h2>

			<div className={styles.row__posters}>
				{/* several row__poster(s) */}

				{movies.map(movie =>
					movie.backdrop_path !== null ? (
						<div
							className={`${styles.row__poster} ${
								isLargeRow && styles.row__posterLarge
							}`}
							role="button"
							onClick={() => handleClick(movie)}
							tabIndex="0"
							key={movie.id} // re-renders individual movies instead of whole row
						>
							<Image
								src={`${BASE_URL}${isLargeRow ? POSTER_SIZE : BACKDROP_SIZE}${
									isLargeRow ? movie.poster_path : movie.backdrop_path
								}`}
								priority={isLargeRow ? "true" : "false"}
								alt={movie.name}
								layout="fixed"
								width={isLargeRow ? "170" : "180"}
								height={isLargeRow ? "250" : "100"}
								onError={({ currentTarget }) => {
									setTimeout(() => {
										const imageTarget = currentTarget;
										imageTarget.src = `${BASE_URL}${
											isLargeRow ? POSTER_SIZE : BACKDROP_SIZE
										}${isLargeRow ? movie.poster_path : movie.backdrop_path}`;
									}, 1000); // tries to reload the image if there's an error
								}}
							/>
						</div>
					) : null,
				)}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
