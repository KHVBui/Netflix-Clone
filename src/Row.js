import movieTrailer from "movie-trailer";
import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "../styles/Row.module.css";
import axios from "./axios";

const base_url = "https://image.tmdb.org/t/p/";
const backdrop_size = "w300";
const poster_size = "w185";

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
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{/* several row__poster(s) */}

				{movies.map(movie =>
					movie.backdrop_path !== null ? (
						<img
							key={movie.id} // re-renders individual movies instead of whole row
							onClick={() => handleClick(movie)}
							className={`row__poster ${isLargeRow && "row__posterLarge"}`}
							src={`${base_url}${isLargeRow ? poster_size : backdrop_size}${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							loading={isLargeRow ? "eager" : "lazy"}
							alt={movie.name}
							style={
								isLargeRow
									? { height: "25rem", width: "17rem" }
									: { height: "10rem", width: "18rem" }
							}
							onError={({ currentTarget }) => {
								setTimeout(() => {
									currentTarget.src = `${base_url}${
										isLargeRow ? poster_size : backdrop_size
									}${isLargeRow ? movie.poster_path : movie.backdrop_path}`;
								}, 1000);
							}}
						/>
					) : null,
				)}
			</div>
			{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
