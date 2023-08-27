import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react"
import Head from "next/head";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.05
		}
	}
};

const favspin = {
	animate: {
		scale: [0, 1.3, 1],
		rotate: [360, 0],
		transition: { duration: 2, ease: easing, type: "spring", stiffness: 260, damping: 20 }
	}
}

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

const fadeInUpView = {
	hidden: {
		y: 80,
		opacity: 0,
		transition: { duration: 0.8, ease: easing }
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: easing }
	}
};

function Card(props) {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	const imgSRC = `/assets/projects/${props.id}.png`;
	const proejctURL = `/projects/${props.id}`;

	return (
		<motion.div className="card" ref={ref} animate={controls} initial="hidden" variants={fadeInUpView}>
			<h3>{props.name}</h3>
			<p>{props.desc}</p>
			<img src={imgSRC} />
			<a href={props.url}>
				<motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Visit</motion.button>
			</a>
		</motion.div>
	)

};

function CardTool(props) {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<motion.div className="tools-card" ref={ref} animate={controls} initial="hidden" variants={fadeInUpView}>
			<div className="tools-card-text">
				<h3>{props.name}</h3>
				<p>{props.desc}</p>
			</div>
		</motion.div>
	)

};

function CardSoftware(props) {
	const controls = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	const imgSRC = `/assets/software/${props.id}.png`;

	return (
		<motion.div className="software-card" ref={ref} animate={controls} initial="hidden" variants={fadeInUpView}>
			<img src={imgSRC} />
			<div className="software-card-text">
				<h3>{props.name}</h3>
				<p>{props.desc}</p>
			</div>
		</motion.div>
	)

};

function Index(props) {

	return (
		<motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>

			<Head>
				<title>Slowlydev simple</title>
				<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes"></meta>
				<meta key="bar-style" name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
				<meta key="capable" name="apple-mobile-web-app-capable" content="yes"></meta>

				<link rel="canonical" href="https://slowlydev-simple.now.sh" />
				<link rel="icon" type="image/png" href="/icon/favicon.png" />
				<link rel="apple-touch-icon" href="/icon/favicon.png" />
				<link rel="apple-touch-startup-image" href="/icon/favicon.png" />
			</Head>

			<div className="intro">
				<motion.img className="icon" variants={favspin} src="/icon/logo_nobg.png" />
				<motion.div className="text" variants={stagger}>
					<motion.h1 variants={fadeInUp}>Slowlydev</motion.h1>
					<motion.p variants={fadeInUp}>and this is what i do and use</motion.p>
				</motion.div>
			</div>

			<div className="projects">
				<h2>Projects</h2>
				<p>here are all my projects i did so far</p>
				<div className="card-container">
					<Card name="CoverX" id="coverx" url="https://coverx.vercel.app" desc="Generate Apple like playlist covers" />
					<Card name="VideoX" id="videox" url="https://videox.vercel.app" desc="Watch Youtube videos in Picture-in-Picture" />
					<Card name="Clean Time" id="clean-time" url="https://clean-time.now.sh" desc="Just the Time and the Weather" />
					<Card name="Heat Studio" id="heat-studio" url="https://heat-studio.now.sh" desc="App for the game NeedforSpeed Heat" />
					<Card name="Chillhop" id="chill" url="https://chillhop.now.sh" desc="listen to chillhop music outside of youtube" />
				</div>
			</div>

			<div className="tools">
				<h2>Tools</h2>
				<p>These programming langauages and tools i use</p>
				<div className="tools-card-container">
					<CardTool name="CSS" desc="stylesheet" />
					<CardTool name="SASS / SCSS" desc="stylesheet" />
					<CardTool name="Html" desc="web langauge" />
					<CardTool name="JavaScript" desc="functionality for web" />
					<CardTool name="NodeJS" desc="use javascript outside from the web" />
					<CardTool name="ReactJS" desc="JavaScript framework" />
					<CardTool name="NextJS" desc="JavaScript framework" />
					<CardTool name="IonicJS" desc="JavaScript framework" />
					<CardTool name="Firebase" desc="Database and backend" />
					<CardTool name="Python" desc="scripting langauges" />
				</div>
			</div>

			<div className="software">
				<h2>Software</h2>
				<p>With these Tools i build my projects</p>
				<div className="software-card-container">
					<CardSoftware id="adobe_photoshop" name="Adobe Photoshop" desc="image editor" />
					<CardSoftware id="adobe_xd" name="Adobe xd" desc="prototyping" />
					<CardSoftware id="github" name="Github" desc="version control" />
					<CardSoftware id="putty" name="Putty" desc="ssh terminal" />
					<CardSoftware id="visual_studio_code" name="Visual Studio Code" desc="editor" />
				</div>
			</div>

			<div className="footer">
				<p>Made with ♥ by Slowlydev</p>
				<p>Website build with NextJS and FramerMotion</p>
			</div>

		</motion.div>
	)
};

export default Index;
