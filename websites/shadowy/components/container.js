import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

import firebase from "firebase/app";
import { useAuth } from "../auth";
import Header from "./header";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
	initial: {
		y: 80,
		opacity: 0,
		transition: { duration: 0.6, ease: easing }
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.6, ease: easing }
	}
};

const fadeInDown = {
	initial: {
		y: -200,
		opacity: 1,
		transition: { duration: 1.2, ease: easing }
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 1.2, ease: easing }
	}
};

export default function Container(props) {

	const { user } = useAuth();
	const router = useRouter();

	async function signOut() {
		await firebase.auth().signOut();
		router.push("/");
	}

	useEffect(() => {
		router.prefetch("/");
		router.prefetch("/account");
	});

	return (
		<div className="container">
			<Header pageName={props.pageName} />
			<div className="header">
				<h2>Shadowy</h2>
				<p>by Slowlydev</p>
			</div>
			<motion.div className={`${props.noscroll ? "noscroll " : ""}content`} initial="initial" animate="animate" variants={fadeInUp} exit={{ opacity: 0 }}>
				<AnimatePresence>
					{user && (props.accountBtn || props.signOutBtn) &&
						<motion.div className="signInToast" initial="initial" animate="animate" variants={fadeInDown} exit={{ y: -200, opacity: 1, transition: { duration: 1.2, ease: easing } }}>
							<div className="info-text">
								<p>Signed in with</p>
								<p className="strong">{user.email}</p>
							</div>

							{user && props.accountBtn && (
								<Link href="/account">
									<a>
										<motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Account</motion.button>
									</a>
								</Link>
							)}

							{user && props.signOutBtn && (
								<motion.button onClick={signOut} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Sign out</motion.button>
							)}
						</motion.div>
					}
				</AnimatePresence>
				{props.children}
			</motion.div>
		</div>
	)
}