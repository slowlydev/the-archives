"use client";

import classNames from "classnames";
import { useState } from "react";

import styles from "./ContactCard.module.scss";

export default function ContactCard() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const submit = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/contact`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, message }),
		});
		if (res.status === 200) {
			const json = await res.json();
			alert(json.message);
		} else {
			alert("an error occurred, please try again");
		}
	};

	return (
		<div className={styles.wallet}>
			<div className={styles.card} />
			<div className={styles.card} />
			<div className={classNames([styles.card, styles.heroCard])}>
				<div className={styles.inputs}>
					<h2>Contact Card</h2>

					<label>Name</label>
					<input placeholder="Your name" onChange={(e) => setName(e.target.value)} />

					<label>Message</label>
					<textarea placeholder="Your message to us!" onChange={(e) => setMessage(e.target.value)} />
				</div>

				<button onClick={submit}>Submit</button>
			</div>
		</div>
	);
}
