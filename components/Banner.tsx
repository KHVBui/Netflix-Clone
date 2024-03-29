import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import baseUrl from "../constants/movie";
import { Movie } from "../types";

interface Props {
	netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	useEffect(() => {
		// Obtain one random Netflix original to be the banner
		setMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)],
		);
	}, [netflixOriginals]);

	return (
		<div
			className="flex flex-col space-y-2 py-16 md:space-y-4 
			lg:h-[65vh] lg:justify-end lg:pb-12"
		>
			{/* Banner image */}
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					alt="banner"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			{/* Movie title */}
			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{movie?.title || movie?.name || movie?.original_name}
			</h1>
			{/* Movie Overview */}
			<p
				className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg
				lg:max-w-2xl lg:text-2xl"
			>
				{movie?.overview}
			</p>
			{/* Banner buttons */}
			<div className="flex space-x-3">
				<button className="bannerButton bg-white text-black" type="button">
					<FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
					Play
				</button>
				<button
					className="bannerButton bg-[gray]/70"
					type="button"
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					<InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
				</button>
			</div>
		</div>
	);
}

export default Banner;
