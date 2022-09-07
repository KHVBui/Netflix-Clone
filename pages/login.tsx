import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
	email: string;
	password: string;
}

function Login() {
	const [login, setLogin] = useState(false);
	const { signIn, signUp } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};

	return (
		<div
			className="relative flex h-screen w-screen flex-col bg-black md:items-center
			md:justify-center md:bg-transparent"
		>
			<Head>
				<title>Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Image
				src="https://rb.gy/p2hphi"
				layout="fill"
				className="-z-10 !hidden opacity-60 sm:!inline"
				objectFit="cover"
			/>
			<div
				className="absolute left-4 top-4 flex cursor-pointer object-contain
				md:left-10 md:top-6"
			>
				<Image
					src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
					alt="Netflix Logo"
					width={1024 * 0.15}
					height={276.742 * 0.15}
				/>
			</div>

			<form
				className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 
				md:mt-8 md:max-w-md md:px-14"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-4xl font-semibold">Sign In</h1>
				<div className="space-y-4">
					<label className="inline-block w-full" htmlFor="email">
						<input
							id="email"
							type="email"
							placeholder='Email (Use "test@gmail.com")'
							className="input"
							{...register("email", { required: true })}
						/>
						{errors.email && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Please enter a valid email.
							</p>
						)}
					</label>
					<label className="inline-block w-full" htmlFor="password">
						<input
							id="password"
							type="password"
							placeholder='Password (Use "tester")'
							className="input"
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Your password must contain between 6 and 60 characters.
							</p>
						)}
					</label>
				</div>

				<button
					type="submit"
					className="w-full rounded bg-[#e50914] py-3 font-semibold"
					onClick={() => setLogin(true)}
				>
					Sign In
				</button>

				<div className="text-[gray]">
					New to Netflix?{" "}
					<button
						type="submit"
						className="text-white hover:underline"
						onClick={() => setLogin(false)}
					>
						Sign up now
					</button>
					<p>
						<br />
						Note: Firebase Authentication is used so account is saved but
						passwords are not revealed to site owner
					</p>
				</div>
			</form>
		</div>
	);
}

export default Login;
