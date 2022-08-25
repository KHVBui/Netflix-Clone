import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});

		return () => {
			window.removeEventListener("scroll", {});
		};
	}, []);

	return (
		<div className={`nav ${show && "nav__black"}`}>
			<link rel="dns-prefetch" href="https://upload.wikimedia.org" />
			<img
				className="nav__logo"
				src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
				alt="Netflix Logo"
			/>

			<img
				className="nav__avatar"
				src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
				alt="Netflix Logo"
			/>

			<div className="nav--fadeTop" />
		</div>
	);
}

export default Nav;
