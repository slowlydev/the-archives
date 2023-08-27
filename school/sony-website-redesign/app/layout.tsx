import { Inter } from "@next/font/google";

import "../styles/globals.scss";

import Navbar from "../components/Navbar/Navbar";

import { ScreenSizeProvider } from "../lib/context/ScreenSizeProvider";
import Providers from "../lib/context/Providers";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter();

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={inter.className}>
			<head>
				<meta charSet="UTF-8" key="charset" />
				<meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
				<title>Sony</title>
			</head>
			<body>
				<Providers>
					<Navbar />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
