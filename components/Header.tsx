import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/future/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className={`${isScrolled && `bg-[#141414]`}`}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<link rel="dns-prefetch" href="https://upload.wikimedia.org" />
				<Image
					src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
					alt="Netflix Logo"
					width={100}
					height={100}
				/>
				<ul className="hidden space-x-4 md:flex">
					<li className="headerLink">Home</li>
					<li className="headerLink">TV Shows</li>
					<li className="headerLink">Movies</li>
					<li className="headerLink">New & Popular</li>
					<li className="headerLink">My List</li>
				</ul>
			</div>

			<div className="test-sm flex items-center space-x-4 font-light">
				<MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
				<p className="hidden lg:inline">Kids</p>
				<BellIcon className="h-6 w-6" />
				<Link href="/account">
					<Image
						src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
						alt="Avatar Image"
						className="cursor-pointer rounded"
						width={30}
						height={30}
					/>
				</Link>
			</div>

			{/* <div className={styles["Header--fadeTop"]} /> */}
		</header>
	);
}

export default Header;
