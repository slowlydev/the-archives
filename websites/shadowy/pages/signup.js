import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

import Container from "../components/container";
import { useAuth } from "../auth";

export default function Signup(props) {

	const { user } = useAuth();
	const router = useRouter();

	firebaseClient()
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [username, setUsername] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	async function signupWithUsernameEmailPassword() {
		await firebase
			.auth()
			.createUserWithEmailAndPassword(email, pass)
			.then(function (firebaseUser) {
				firebaseUser.user.updateProfile({ displayName: username, photoURL: "/characters/blob_red.png" }).then(function () {
					router.push("/account");
				});
			})
			.catch(function (error) {
				setErrorMessage(error.message);
			});
	}

	useEffect(() => {
		router.prefetch("/account");
		if (user) {
			router.push("/account");
		}
	})

	return (
		<Container pageName="Sign up">
			<h1>Sign up for Shadowy</h1>
			<form autoComplete="on">
				<motion.input onChange={(e) => setUsername(e.target.value)} placeholder="Username" id="username" type="text" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
				<motion.input onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" type="email" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
				<motion.input onChange={(e) => setPass(e.target.value)} placeholder="Password" id="pass" type="password" autoComplete="current-password" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
			</form>
			<div className="flex">
				<motion.button disabled={email === "" || pass === "" || username === ""} onClick={signupWithUsernameEmailPassword} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Sign up</motion.button>
				<Link href="/">
					<a>
						<motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
					</a>
				</Link>
			</div>
			{errorMessage && (
				<p className="error">{errorMessage}</p>
			)}
		</Container>
	)
}