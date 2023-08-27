"use client";

import { motion, LayoutGroup, EventInfo, AnimatePresence } from "framer-motion";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

import { useScreenSize } from "../../lib/context/ScreenSizeProvider";

import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.module.scss";

import compassImage from "../../public/assets/compass.svg";
import closeImage from "../../public/assets/x.svg";

interface Page {
	name: string;
	path: string;
	segment: string | undefined;
}

interface Props {
	page: Page;
	isSelected: boolean;
	onHoverStart: (event: MouseEvent, info: EventInfo) => void;
	onHoverEnd: (event: MouseEvent, info: EventInfo) => void;
}

const pages: Page[] = [
	{
		name: "Home",
		segment: undefined,
		path: "/",
	},
	{
		name: "Products",
		segment: "products",
		path: "/products",
	},
	{
		name: "Images",
		segment: "images",
		path: "/images",
	},
];

export default function Navbar() {
	const { mobile } = useScreenSize();

	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={styles.wrapper}>
			<div className={styles.navbar}>
				<p className={styles.heroText}>Sony</p>

				{!mobile && (
					<>
						<NavOptions />
						<button></button>
					</>
				)}

				{mobile && !open && <Image className={styles.mobileToggle} src={compassImage} alt="open navigation button" onClick={() => setOpen(true)} />}
				{mobile && open && <Image className={styles.mobileToggle} src={closeImage} alt="close navigation button" onClick={() => setOpen(false)} />}
			</div>

			<AnimatePresence>
				{mobile && open && (
					<motion.div className={styles.mobile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						{pages.map((page, index) => (
							<Link key={`nav.mobile.${index}`} href={page.path} onClick={() => setOpen(false)}>
								{page.name}
							</Link>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function NavOptions() {
	const [segment] = useSelectedLayoutSegments();

	function getCurrentPage() {
		try {
			return pages.find((page) => page.segment === segment)?.name;
		} catch (_) {
			return pages[0].name;
		}
	}

	const [selected, setSelected] = useState(getCurrentPage());

	return (
		<LayoutGroup>
			<motion.div className={styles.navItemContainer}>
				{pages.map((page, index) => (
					<NavItem
						key={`navItem.${index}`}
						page={page}
						isSelected={selected === page.name}
						onHoverStart={() => setSelected(page.name)}
						onHoverEnd={() => setSelected(getCurrentPage())}
					/>
				))}
			</motion.div>
		</LayoutGroup>
	);
}

function NavItem({ page, isSelected, onHoverStart, onHoverEnd }: Props) {
	return (
		<Link href={page.path}>
			<motion.div className={styles.navItem} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd}>
				<p>{page.name}</p>

				{isSelected && (
					<motion.div layoutId="hover" className={styles.navItemBackground} initial={false} transition={{ duration: 1.5, type: "spring", mass: 0.6 }}>
						<p>{page.name}</p>
					</motion.div>
				)}
			</motion.div>
		</Link>
	);
}
