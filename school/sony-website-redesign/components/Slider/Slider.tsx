"use client";

import { AnimatePresence, motion, PanInfo, Variants, Transition } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import { wrap } from "popmotion";

import styles from "./Slider.module.scss";

type RequiredProps = {
	children: ReactNode;
	items: any[];
	contentClassName: string;
	selectedIndexUpdate: (index: number) => void;
};

type OptionalProps = {
	dots?: boolean;
	controls?: boolean;
	slideClassName?: string[];
	wrapperClassName?: string[];
};

const variants: Variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const transition: Transition = {
	x: { type: "spring", stiffness: 300, damping: 30 },
	opacity: { duration: 0.2 },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

export const Slider = ({
	items,
	children,
	slideClassName = [],
	wrapperClassName = [],
	contentClassName,
	selectedIndexUpdate,
}: RequiredProps & OptionalProps) => {
	const [[page, direction], setPage] = useState([0, 0]);

	const selectedIndex: number = wrap(0, items.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	const swipeEnd = (_event: MouseEvent, info: PanInfo) => {
		const swipe = swipePower(info.offset.x, info.velocity.x);

		if (swipe < -swipeConfidenceThreshold) {
			paginate(1);
		} else if (swipe > swipeConfidenceThreshold) {
			paginate(-1);
		}
	};

	useEffect(() => selectedIndexUpdate(selectedIndex), [selectedIndex]);

	return (
		<>
			<div className={classNames([styles.wrapper, ...wrapperClassName])}>
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						className={classNames([...slideClassName])}
						key={page}
						transition={transition}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={1}
						onDragEnd={swipeEnd}
					>
						{children}
					</motion.div>
				</AnimatePresence>

				<div className={styles.controls}>
					<div className={styles.prev} onClick={() => paginate(-1)}>
						<p>{"<"}</p>
					</div>

					<div className={contentClassName} />

					<div className={styles.next} onClick={() => paginate(1)}>
						<p>{">"}</p>
					</div>
				</div>
			</div>

			<div className={styles.dots}>
				{items.map((_, index) => (
					<motion.div
						className={styles.dot}
						animate={{
							scale: index === selectedIndex ? 1 : 0.5,
						}}
						key={`dot.${index}`}
						onClick={() => setPage([index, index > selectedIndex ? 1 : -1])}
					/>
				))}
			</div>
		</>
	);
};
