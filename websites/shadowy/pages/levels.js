import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import nookies from "nookies";

import { adminApp } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

import Container from "../components/container";
import Loading from "../components/loading";

let easing = [0.6, -0.05, 0.01, 0.99];

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

const exit = {
    y: 80,
    opacity: 0,
    transition: {
        duration: 0.6,
        ease: easing
    }
};

export default function Levels(props) {
    const [helpGUI, setHelpGUI] = useState(false);

    firebaseClient();

    if (props.session) {
        return (
            <Container signOutBtn pageName="Levels">
                <h2>Choose a Level to Play</h2>
                <div className="help" onClick={() => setHelpGUI(true)}>
                    <p>How to play?</p>
                    <Image src="/assets/ios-help-circle.png" width="30" height="30" />
                </div>
                <div className="level-container">
                    <div className="level">
                        <h3>Level 1</h3>
                        <div className="level-preview">
                            <Image src="/levels/1/preview.png" layout="fill" />
                        </div>
                        <Link href="/levels/1">
                            <a>
                                <motion.button className="settings open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Play</motion.button>
                            </a>
                        </Link>
                    </div>
                    <div className="level">
                        <h3>Level 2</h3>
                        <div className="level-preview">
                            <Image src="/levels/2/preview.png" layout="fill" />
                        </div>
                        <Link href="/levels/2">
                            <a>
                                <motion.button className="settings open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Play</motion.button>
                            </a>
                        </Link>
                    </div>
                </div>
                <Link href="/account">
                    <a>
                        <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                    </a>
                </Link>
                <AnimatePresence>
                    {helpGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>How to play?</h2>
                                <p><strong>Where can you play?</strong><br/> You can play on any device that has a Keyboard for example a Laptop or Desktop. Or an a Mobile device</p>
                                <p><strong>How do i finish a level?</strong><br/> You simply walk to the end of the Level!</p>
                                <p><strong>How do i control my character?</strong><br/> Go Left: [A] [ArrowLeft] | Go Right: [D] [ArrowRight] | Jump: [SPACE] [W]  [ArrowUp]. Or on Mobile u use the touch controller.</p>
                                <p><strong>Can i change my character?</strong><br/> Yes! You can change your Character in the Settings</p>
                                <motion.button onClick={() => setHelpGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Levels" />
        )
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await adminApp().auth().verifyIdToken(cookies.token);
        const { uid } = token;

        return {
            props: { session: uid }
        };
    } catch (err) {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();
        return { props: {} };
    }
}