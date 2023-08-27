import { motion } from "framer-motion";

export default function Button(props) {

	const button = {
		hover: {
			scale: 1.1,
		},
		tap: {
			scale: 0.9,
		},
		initial: {
			scale: 1.0,
		}
	}

	return (
		<motion.button
			className={props.className}
			onClick={props.onClick}
			variants={button}
			whileHover="hover"
			whileTap="tap"
		>
			{props.children}
		</motion.button>
	)
}