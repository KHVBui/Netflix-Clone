import {
	HandThumbUpIcon,
	PlusIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre } from "../types";

function Modal() {
	// useRecoilValue returns just the value, while useRecoilState returns the tuple
	// of the value and setter
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState("");
	const [genres, setGenres] = useState<Genre[]>([]);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		if (!movie) return;

		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					movie?.media_type === "tv" ? "tv" : "movie"
				}/${movie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`,
			)
				.then(response => response.json())
				.catch(err => console.log(err.message));

			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Element) => element.type === "Trailer",
				);
				setTrailer(data.videos?.results[index]?.key);
			}

			if (data?.genres) {
				setGenres(data.genres);
			}
		}

		fetchMovie();
	}, [movie]);

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<MuiModal
			className="fixes !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl
			overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
			open={showModal}
			onClose={handleClose}
		>
			<>
				{/* Close Button */}
				<button
					type="button"
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 
						border-none bg-[#181818] hover:bg-[#181818]"
					onClick={handleClose}
				>
					<XMarkIcon className="h-6 w-6" />
				</button>

				{/* Video Section*/}
				<div className="relative pt-[56.25%]">
					<ReactPlayer
						url={
							ReactPlayer.canPlay(`https://www.youtube.com/watch?v=${trailer}`)
								? `https://www.youtube.com/watch?v=${trailer}`
								: "https://www.youtube.com/shorts/EQZgYz6D4_c"
						}
						width="100%"
						height="100%"
						style={{ position: "absolute", top: "0", left: "0" }}
						playing
						loop
						muted={muted}
					/>
					<div
						className="absolute bottom-10 flex w-full items-center 
						justify-between px-10"
					>
						{/* Left button Section: Play, Add to List, Thumbs Up */}
						<div className="flex space-x-2">
							<button
								className="flex items-center gap-x-2 rounded bg-white px-8
									text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
								type="button"
							>
								<FaPlay className="h-7 w-7 text-black" />
								Play
							</button>

							<button className="modalButton" type="button">
								<PlusIcon className="h-7 w-7" />
							</button>

							<button className="modalButton" type="button">
								<HandThumbUpIcon className="h-7 w-7" />
							</button>
						</div>

						{/* Right button Section: Mute */}
						<button
							className="modalButton"
							type="button"
							onClick={() => setMuted(!muted)}
						>
							{muted ? (
								<SpeakerXMarkIcon className="h-6 w-6" />
							) : (
								<SpeakerWaveIcon className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Detail section */}
				{/* Background and overall padding */}
				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					{/* Space between text and font size */}
					<div className="space-y-6 text-lg">
						{/* Match %, Date, & HD */}
						<div className="flex items-center space-x-2 text-sm">
							{/* TODO: Implement match % based on user. Currently based on movie rating */}
							<p className="font-semibold text-green-400">
								{(movie?.vote_average ?? 0) % 10}% Match{" "}
							</p>

							{/* Release Date */}
							<p className="font-light">
								{movie?.release_date || movie?.first_air_date}
							</p>

							{/* HD Tag */}
							<div
								className="flex h-4 items-center justify-center rounded border
								border-white/40 px-1.5 text-xs"
							>
								HD
							</div>
						</div>

						{/* Overview, genres, OG Language, Votes */}
						{/* Fields set in a separate col on large screens */}
						<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
							{/* Overview */}
							<p className="w-5/6">{movie?.overview}</p>

							<div className="flex flex-col space-y-3 text-sm">
								{/* Genres */}
								<div>
									<span className="text-[gray]">Genres: </span>
									{genres.map(genre => genre.name).join(", ")}
								</div>

								{/* Original Language Setting */}
								<div>
									<span className="text-[gray]">Original language: </span>
									{movie?.original_language}
								</div>

								{/* Total Votes */}
								<div>
									<span className="text-[gray]">Total Votes: </span>
									{movie?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

export default Modal;
