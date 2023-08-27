import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

import Container from "../components/container";
import { useAuth } from "../auth";

export default function Login(props) {

	const { user } = useAuth();
	const router = useRouter();

	firebaseClient()
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	async function loginWithPassword() {
		setErrorMessage("");
		await firebase
			.auth()
			.signInWithEmailAndPassword(email, pass)
			.then(function () {
				router.push("/account");
			})
			.catch(function (error) {
				setErrorMessage(error.message);
			});
	}

	async function sendPasswordEmail() {
		setErrorMessage("");
		await firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(function () {
				setErrorMessage("Email to reset Password has been sent!")
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
		<Container pageName="Login">
			<h1>Login to Shadowy</h1>
			<form autoComplete="on">
				<motion.input onChange={(e) => setEmail(e.target.value)} autoComplete="current-username" placeholder="Email" id="email" type="email" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
				<motion.input onChange={(e) => setPass(e.target.value)} autoComplete="current-password" placeholder="Password" id="pass" type="password" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
			</form>
			<motion.button disabled={email === ""} onClick={sendPasswordEmail} className="settings open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>forgot password?</motion.button>
			<div className="flex">
				<motion.button disabled={email === "" || pass === ""} onClick={loginWithPassword} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Login</motion.button>
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