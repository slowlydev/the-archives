import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

import firebase from "firebase/app";
import "firebase/database";

import { useState, useEffect } from "react";
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

export default function Leaderboards(props) {

    const [l1GUI, setL1GUI] = useState(false);
    const [l2GUI, setL2GUI] = useState(false);

    const [times, setTimes] = useState({});

    firebaseClient();

    const router = useRouter();

    useEffect(() => {
        firebase.database().ref("levels").on("value", function (data) { try { setTimes(data.val()) } catch (err) { console.log(err) } });
        router.prefetch("/account")
    }, []);

    const L1 = [];
    for (const key in times.l1) {
        L1.push({
            time: times.l1[key].time,
            username: times.l1[key].username
        })
    }
    L1.sort(sortItems);

    const L2 = [];
    for (const key in times.l2) {
        L2.push({
            time: times.l2[key].time,
            username: times.l2[key].username
        })
    }
    L2.sort(sortItems);

    function sortItems(first, second) {
        if (first.time < second.time) {
            return -1;
        }
        if (first.time > second.time) {
            return 1;
        }
        return 0;
    }

    if (props.session && times && L1 && L2) {
        return (
            <Container signOutBtn pageName="Leaderboards">
                <h2>Leaderboards</h2>
                <div className="leaderboard-container">
                    <div className="leaderboard">
                        <h3>Level 1</h3>
                        <div className="times">
                            {L1.slice(0, 5).map(user => (
                                <p key={user.username}>{user.time} | {user.username}</p>
                            ))}
                        </div>
                        <motion.button onClick={() => setL1GUI(true)} className="settings open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Show More</motion.button>
                    </div>
                    <div className="leaderboard">
                        <h3>Level 2</h3>
                        <div className="times">
                            {L2.slice(0, 5).map(user => (
                                <p key={user.username}>{user.time} | {user.username}</p>
                            ))}
                        </div>
                        <motion.button onClick={() => setL2GUI(true)} className="settings open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Show More</motion.button>
                    </div>
                </div>
                <Link href="/account">
                    <a>
                        <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                    </a>
                </Link>
                <AnimatePresence>
                    {l1GUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>Level 1 Leaderboard</h2>
                                <motion.button onClick={() => setL1GUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                <div className="times">
                                    {L1 && L1.map(user => (
                                        <p key={user.username}>{user.time} | {user.username}</p>
                                    ))}
                                </div>
                                <motion.button onClick={() => setL1GUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {l2GUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>Level 2 Leaderboard</h2>
                                <motion.button onClick={() => setL2GUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                <div className="time-container">
                                    <div className="times">
                                        {L2 && L2.map(user => (
                                            <p key={user.username}>{user.time} | {user.username}</p>
                                        ))}
                                    </div>
                                </div>
                                <motion.button onClick={() => setL2GUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Leaderboards" />
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
        context.res.writeHead(302, { Location: "/account" });
        context.res.end();
        return { props: {} };
    }
}