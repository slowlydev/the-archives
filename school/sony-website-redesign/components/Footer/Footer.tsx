import Link from "next/link";

import styles from "./Footer.module.scss";

const links = [
	{
		label: "Imprint",
		path: "/imprint",
	},
	{
		label: "About",
		path: "/about",
	},
];

export default function Footer() {
	var date = new Date();
	var yearNow = date.getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.links}>
				{links.map((link) => (
					<Link href={link.path} key={`footer.link.${link.label.toLowerCase()}`}>
						{link.label}
					</Link>
				))}
			</div>
			<p className={styles.notice}>
				© {yearNow} · Redesigned Sony Website made with ❤️ by <a href="https://slowlydev.vercel.app">Slowlydev</a>
			</p>
		</footer>
	);
}
