import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Membership from "../components/Membership";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";

interface Props {
	products: Product[];
}

function Account({ products }: Props) {
	console.log(products);
	const { user, logout } = useAuth();
	const subscription = useSubscription(user);

	return (
		<div>
			<Head>
				<title>Account Settings - Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="bg-[#141414]flex items-center space-x-2 md:space-x-10">
				<Link href="/">
					<Image
						src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
						alt="Netflix Logo"
						width={100}
						height={100}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<Link href="/account">
					<Image
						src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
						alt="Avatar Image"
						className="cursor-pointer rounded"
						width={30}
						height={30}
					/>
				</Link>
			</header>

			<main
				className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all
				md:px-10"
			>
				<div className="flex flex-col gap-x-4 md:flex-row md:items-center">
					<h1 className="text-3xl md:text-4xl">Account</h1>
					<div className="-ml-0.5 flex items-center gap-x-1.5">
						<Image
							className="h-7 w-7"
							src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg"
							width={100}
							height={100}
							alt=""
						/>
						<p className="text-[#555} text-xs font-semibold">
							Member since {subscription?.created}
						</p>
					</div>
				</div>

				<Membership />

				<div
					className="gap-x4 mt-6 grid grid-cols-1 border px-4 py-4
					md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0
					md:pb-0"
				>
					<h4 className="text-lg text-[gray]">Plan Details</h4>
					{/* Find the current plan */}
					<div className="col-span-2 font-medium">
						{
							products.filter(
								product => product.id === subscription?.product,
							)[0]?.name
						}
					</div>
					<p className="cursor-pointer text-blue-500 hover:underline md:text-right">
						Change plan
					</p>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
					<h4 className="text-lg text-[gray]">Settings</h4>
					<button
						type="button"
						className="col-span-3 cursor-pointer text-blue-500 hover:underline"
						onClick={logout}
					>
						Sign out of all devices
					</button>
				</div>
			</main>
		</div>
	);
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
	const products = await getProducts(payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then(res => res)
		.catch(error => console.log(error.message));

	return {
		props: {
			products,
		},
	};
};
