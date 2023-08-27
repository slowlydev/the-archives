import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import Image from "next/image";
import Link from "next/link";

import Container from "../components/container";

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

const exit = {
	y: 80,
	opacity: 0,
	transition: {
		duration: 0.6,
		ease: easing
	}
};

export default function Index(props) {
	const [allPatchNotes, setAllPatchNotes] = useState({});

	const [infoMessage, setInfoMessage] = useState("");

	const [helpGUI, setHelpGUI] = useState(false);
	const [patchGUI, setPatchGUI] = useState(false);

	const toggleHelp = () => setHelpGUI(!helpGUI);
	const togglePatch = () => setPatchGUI(!patchGUI);

	useEffect(() => {
		firebase.database().ref("info/changelog").on("value", function (data) { try { setAllPatchNotes(data.val()) } catch (err) { console.log(err) } });
		firebase.database().ref("info").on("value", function (data) { try { setInfoMessage(data.val()) } catch (err) { console.log(err) } });
	}, [])

	const patchNotes = [];
	for (const key in allPatchNotes) {
		patchNotes.push({
			title: allPatchNotes[key].title,
			date: allPatchNotes[key].date,
			message: allPatchNotes[key].message
		})
	}
	patchNotes.sort(sortItems);

	function sortItems(first, second) {
		if (first.date > second.date) {
			return -1;
		}
		if (first.date < second.date) {
			return 1;
		}
		return 0;
	}

	function calculate_age(dob) {
		var diff_ms = Date.now() - dob.getTime();
		var age_dt = new Date(diff_ms);

		return Math.abs(age_dt.getUTCFullYear() - 1970);
	}

	return (
		<Container accountBtn signOutBtn pageName="Home">
			<div className="landing-header">
				<h2>Welcome to Shadowy</h2>
				<h3>A 2D Platformer but be fast</h3>
			</div>
			<div className="flex">
				<Link href="/login">
					<a>
						<motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Login</motion.button>
					</a>
				</Link>
				<Link href="/signup">
					<a>
						<motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Sign up</motion.button>
					</a>
				</Link>
			</div>
			<div className="flex">
				<div className="help" onClick={toggleHelp}>
					<p>What is this?</p>
					<Image src="/assets/ios-help-circle.png" width="30" height="30" alt="questionmark" />
				</div>
				<div className="help" onClick={togglePatch}>
					<p>Patch Notes</p>
					<Image src="/assets/ios-albums.png" width="34" height="30" alt="album" />
				</div>
			</div>
			<AnimatePresence>
				{infoMessage.msg && (
					<motion.div className="info-message-toast" initial="initial" animate="animate" variants={fadeInUp} exit={{ y: -80, opacity: 1, transition: { duration: 1.2, ease: easing } }}>
						<div className="img">
							<Image src="/slowlydev_logo_nobg.png" layout="fill" alt="developer profile picture" />
						</div>
						<div className="text">
							<p className="strong">Message from Slowlydev</p>
							<p>{infoMessage.msg}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{helpGUI &&
					<div className="blur">
						<motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
							<h2>What is this and how does it work?</h2>
							<p>This is a schoolproject of Slowlydev, he is {calculate_age(new Date(2005, 3, 14))} years old.</p>
							<p>I hope u enjoy the game, new levels will be added over time!</p>
							<motion.button onClick={toggleHelp} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
						</motion.div>
					</div>
				}
			</AnimatePresence>
			<AnimatePresence>
				{patchGUI &&
					<div className="blur">
						<motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
							<h2>Patch Notes</h2>
							<motion.button onClick={togglePatch} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
							<div className="all-patch-container">
								{patchNotes.map(patchNote => (
									<div className="patch">
										<h3>{patchNote.title}</h3>
										<p className="strong">{patchNote.date}</p>
										<p className="patch-message">{patchNote.message}</p>
									</div>
								))}
							</div>
							<motion.button onClick={() => setHelpGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
						</motion.div>
					</div>
				}
			</AnimatePresence>
		</Container>
	)
}
