import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import nookies from "nookies";

import { adminApp } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

import Container from "../components/container";
import Loading from "../components/loading";
import { useAuth } from "../auth";

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

export default function Settings(props) {

    const [chracterGUI, setCharacterGUI] = useState(false);
    const [emailGUI, setEmailGUI] = useState(false);
    const [passwordGUI, setPasswordGUI] = useState(false);
    const [deleteGUI, setDeleteGUI] = useState(false);

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    firebaseClient();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
		router.prefetch("/");
	})

    function isUsingCharacter(selectedCharacter) {
        if (user.photoURL === "/characters/blob_" + selectedCharacter + ".png") {
            return (true);
        } else {
            return (false);
        }
    }

    function changeCharacter(selectedCharacter) {
        user.updateProfile({ photoURL: `/characters/blob_${selectedCharacter}.png` }).then(function () {
            setCharacterGUI(false);
        });
    }

    function changeEmail() {
        user.updateEmail(email).then(function(){
            setEmailGUI(false);
            setErrorMessage("");
        }).catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function changePassword() {
        user.updatePassword(pass).then(function(){
            setPasswordGUI(false);
            setErrorMessage("");
        }).catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    function deleteAccount() {
        user.delete().then(function(){
            setErrorMessage("");
            alert("Goodbye my friend! It was a good time! I hope u had fun :^)");
            router.push("/");
        }).catch(function (error) {
            setErrorMessage(error.message);
        });
    }

    if (props.session && user) {
        return (
            <Container signOutBtn pageName="Settings" noscroll={`${chracterGUI || emailGUI || passwordGUI || deleteGUI ? "noscroll" : ""}`}>
                <h2>Settings</h2>
                <div className="settings-container">
                    <div className="setting">
                        <motion.button onClick={() => setCharacterGUI(true)} className="open settings" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Change Charcter</motion.button>
                        <p>Change your in-game chracter</p>
                    </div>
                    <div className="setting">
                        <motion.button onClick={() => setEmailGUI(true)} className="important settings" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Change Email</motion.button>
                        <p>Change your Accounts email</p>
                    </div>
                    <div className="setting">
                        <motion.button onClick={() => setPasswordGUI(true)} className="important settings" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Change Password</motion.button>
                        <p>Change your Accounts password</p>
                    </div>
                    <div className="setting">
                        <motion.button onClick={() => setDeleteGUI(true)} className="important settings" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Delete Account</motion.button>
                        <p>Delete your wonderful Account</p>
                    </div>
                </div>
                <Link href="/account">
                    <a>
                        <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                    </a>
                </Link>
                <AnimatePresence>
                    {chracterGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>Choose a Character</h2>
                                <div className="character-container">
                                    <div className="character">
                                        <div className="character-image">
                                            <Image src="/characters/blob_purple.png" layout="fill" />
                                        </div>
                                        <motion.button className={`settings ${isUsingCharacter("purple") ? "selected" : "open"}`} onClick={() => changeCharacter("purple")} disabled={isUsingCharacter("purple")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isUsingCharacter("purple") ? "Selected" : "Select"}</motion.button>
                                    </div>
                                    <div className="character">
                                        <div className="character-image">
                                            <Image src="/characters/blob_red.png" layout="fill" />
                                        </div>
                                        <motion.button className={`settings ${isUsingCharacter("red") ? "selected" : "open"}`} onClick={() => changeCharacter("red")} disabled={isUsingCharacter("red")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isUsingCharacter("red") ? "Selected" : "Select"}</motion.button>
                                    </div>
                                    <div className="character">
                                        <div className="character-image">
                                            <Image src="/characters/blob_cyan.png" layout="fill" />
                                        </div>
                                        <motion.button className={`settings ${isUsingCharacter("cyan") ? "selected" : "open"}`} onClick={() => changeCharacter("cyan")} disabled={isUsingCharacter("cyan")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isUsingCharacter("cyan") ? "Selected" : "Select"}</motion.button>
                                    </div>
                                    <div className="character">
                                        <div className="character-image">
                                            <Image src="/characters/blob_green.png" layout="fill" />
                                        </div>
                                        <motion.button className={`settings ${isUsingCharacter("green") ? "selected" : "open"}`} onClick={() => changeCharacter("green")} disabled={isUsingCharacter("green")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isUsingCharacter("green") ? "Selected" : "Select"}</motion.button>
                                    </div>
                                </div>
                                <motion.button onClick={() => setCharacterGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {emailGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit}>
                                <h1>Change your Email</h1>
                                <form>
                                    <motion.input onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" type="email" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} />
                                </form>
                                <motion.button onClick={() => changeEmail()} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Change</motion.button>
                                <motion.button onClick={() => setEmailGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                {errorMessage && (
                                    <p className="error">{errorMessage}</p>
                                )}
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {passwordGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit}>
                                <h1>Change your Password</h1>
                                <form>
                                    <motion.input onChange={(e) => setPass(e.target.value)} placeholder="New Password" id="pass" type="password" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} />
                                </form>
                                <motion.button onClick={() => changePassword()} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Change</motion.button>
                                <motion.button onClick={() => setPasswordGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                {errorMessage && (
                                    <p className="error">{errorMessage}</p>
                                )}
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {deleteGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit}>
                                <h1>Delete your Account</h1>
                                <p>Are u sure u want to delete your Shadowy Account? All your data will be lost!</p>
                                <motion.button onClick={() => deleteAccount()} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Delete</motion.button>
                                <motion.button onClick={() => setDeleteGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                {errorMessage && (
                                    <p className="error">{errorMessage}</p>
                                )}
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Settings" />
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