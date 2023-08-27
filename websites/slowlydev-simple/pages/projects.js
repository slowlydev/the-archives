import Link from "next/link";
import { motion } from "framer-motion"

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.05
		}
	}
};

const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
		transition: { duration: 0.6, ease: easing }
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: easing
		}
	}
};

const Projects = props => (
	<motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
		{props.projects.map(project => (
			<div className="container">
				<motion.div className="img" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
					<motion.img key={project.id} src={`/assets/projects/${project.id}.png`} animate={{ x: 0, opacity: 1 }} initial={{ x: 200, opacity: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }} />
				</motion.div>
				<div className="text">
					<motion.div variants={stagger} className="inner">
						<motion.h1 variants={fadeInUp}>{project.name}</motion.h1>
						<motion.p variants={fadeInUp}>{project.description}</motion.p>
						<motion.div variants={fadeInUp} className="additonals">
							<span>{project.languages}</span>
						</motion.div>
						<motion.div variants={fadeInUp} className="btn-row">
							<a href={project.url}>
								<motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >Open</motion.button>
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>
		))};
	</motion.div>
);

Projects.getInitialProps = async function () {
	const res = await fetch(
		"https://my-json-server.typicode.com/Slowlydev/slowly-simple-api/projects"
	);
	const data = await res.json();
	return {
		projects: data
	};
};

export default Projects;