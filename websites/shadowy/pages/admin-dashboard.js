import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import nookies from "nookies";

import { adminApp } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

import firebase from "firebase/app";

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

const fadeInDown = {
    initial: {
        y: -200,
        opacity: 1,
        transition: { duration: 1.2, ease: easing }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.2, ease: easing }
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

const delay = ms => new Promise(res => setTimeout(res, ms));

function TimeItem(props) {
    const [isTimeEdited, setIsTimeEdited] = useState(false);

    const toggleTimeEdited = () => setIsTimeEdited(!isTimeEdited);

    const [newTime, setNewTime] = useState("");

    const userTime = props.userTime;

    async function saveNewTime(UID, AUID) {
        const res = await fetch(`/api/updateTime/${AUID}/${UID}/${userTime.level}/${userTime.key}/${newTime}`, {
            method: "POST"
        });
        const response = await res.json();

        setNewTime("");
        toggleTimeEdited();

        props.setStatusMessage(response.msg);
        await delay(3000);
        props.setStatusMessage("");
    }

    async function abortChanges() {
        setNewTime("");
        toggleTimeEdited();
    }

    async function deleteTime(UID, AUID) {
        const res = await fetch(`/api/deleteTimes/${AUID}/${UID}/${userTime.level}/${userTime.key}`, {
            method: "POST"
        });
        const response = await res.json();

        props.setStatusMessage(response.msg);
        await delay(3000);
        props.setStatusMessage("");
    }

    return (
        <div className="time-item">
            <div className="time">
                {isTimeEdited && (
                    <motion.input onChange={(e) => setNewTime(e.target.value)} placeholder={`${userTime.time === "no time" ? "0.00:00" : userTime.time}`} />
                )}
                {!isTimeEdited && (
                    <p className={`${userTime.time === "no time" ? "no-time" : ""}`} key={userTime.key} >{userTime.level.toUpperCase()}: {userTime.time}</p>
                )}
            </div>
            {userTime.time !== "no time" && (
                <div className="time-actions">
                    {isTimeEdited && (
                        <motion.div className="icon" onClick={() => saveNewTime(props.uid, props.auid)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image layout="fill" src="/assets/ios-save.png" />
                        </motion.div>
                    )}
                    {isTimeEdited && (
                        <motion.div className="icon" onClick={abortChanges} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image layout="fill" src="/assets/ios-close-circle.png" />
                        </motion.div>
                    )}
                    {!isTimeEdited && (
                        <motion.div className="icon" onClick={toggleTimeEdited} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image layout="fill" src="/assets/ios-create.png" />
                        </motion.div>
                    )}
                    {!isTimeEdited && (
                        <motion.div className="icon" onClick={() => deleteTime(props.uid, props.auid)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Image layout="fill" src="/assets/ios-trash.png" />
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    )
}

function UserItem(props) {
    const [isOpen, setIsOpen] = useState(false);

    const userItem = props.userItem;
    const userTimes = [];

    const router = useRouter();

    const refreshData = () => router.replace(router.asPath);

    const toggleOpen = () => setIsOpen(!isOpen);

    async function disableUser(UID, AUID) {
        const res = await fetch(`/api/disableUser/${AUID}/${UID}`, {
            method: "POST"
        });
        const response = await res.json();

        refreshData();

        props.setStatusMessage(response.msg);
        await delay(3000);
        props.setStatusMessage("");
    }

    async function activateUser(UID, AUID) {
        const res = await fetch(`/api/activateUser/${AUID}/${UID}`, {
            method: "POST"
        });
        const response = await res.json();

        refreshData();

        props.setStatusMessage(response.msg);
        await delay(3000);
        props.setStatusMessage("");
    }

    function addTimes(levelTimes, username, prefix) {
        var objNum = Object.keys(levelTimes).length;
        var posNum = 0;

        for (const key in levelTimes) {
            if (levelTimes[key].username == username) {
                userTimes.push({
                    time: levelTimes[key].time,
                    key: key,
                    level: prefix
                });
            } else {
                posNum++;
            }

            if (posNum >= objNum) {
                userTimes.push({
                    time: "no time",
                    level: prefix
                });
                break;
            }
        }
    }

    addTimes(props.levelTimes.l1, userItem.displayName, "l1");
    addTimes(props.levelTimes.l2, userItem.displayName, "l2");

    return (
        <motion.div layout className={`${userItem.disabled ? "disabled " : ""}user-item`}>
            <div className="top-menu">
                <motion.div layout className="info">
                    <motion.div layout className="user-img">
                        <Image src={userItem.photoURL} layout="fill" alt="charakter image" />
                    </motion.div>
                    <motion.div layout className="user-text">
                        <motion.p layout>{userItem.displayName}</motion.p>
                        <motion.p layout className="strong">{userItem.email}</motion.p>
                    </motion.div>
                </motion.div>
                <motion.div layout onClick={toggleOpen} className="icon" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Image layout="fill" src="/assets/ios-cog.png" />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div className="dropdown-menu" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="dropdown-menu-times">
                            {userTimes.map(userTime => (
                                <TimeItem userTime={userTime} auid={props.user.uid} uid={userItem.uid} setStatusMessage={(e) => props.setStatusMessage(e)} />
                            ))}
                        </div>
                        <div className="dropdown-menu-buttons">
                            {!userItem.disabled && (<motion.button onClick={() => disableUser(userItem.uid, props.user.uid)} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Disable User</motion.button>)}
                            {userItem.disabled && (<motion.button onClick={() => activateUser(userItem.uid, props.user.uid)} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Activate User</motion.button>)}
                            <motion.button className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Delete User</motion.button>
                            <motion.button onClick={() => navigator.clipboard.writeText(userItem.uid)} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Copy UID</motion.button>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default function AdminDashboard(props) {

    const [patchGUI, setPatchGUI] = useState(false);
    const [infoGUI, setInfoGUI] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const [infoMessage, setInfoMessage] = useState("");

    const [allTimes, setAllTimes] = useState();
    const [oldInfoMessage, setOldInfoMessage] = useState();
    const [allPatchNotes, setAllPatchNotes] = useState();

    const [patchTitle, setPatchTitle] = useState("");
    const [patchDate, setPatchDate] = useState("");
    const [patchMessage, setPatchMessage] = useState("");

    firebaseClient();
    const { user } = useAuth();

    useEffect(() => {
        firebase.database().ref("levels").on("value", function (data) { try { setAllTimes(data.val()) } catch (err) { console.log(err) } });
        firebase.database().ref("info").on("value", function (data) { try { setOldInfoMessage(data.val()) } catch (err) { console.log(err) } });
        firebase.database().ref("info/changelog").on("value", function (data) { try { setAllPatchNotes(data.val()) } catch (err) { console.log(err) } });
    }, []);

    async function uploadInfoMessage() {
        setErrorMessage("");
        await firebase.database().ref("info/").child("msg").set(infoMessage).catch(function (error) {
            setErrorMessage(error.message);
        });

        setInfoMessage("");

        setStatusMessage("Succesfully changed info message!");
        await delay(3000);
        setStatusMessage("");
    }

    async function deleteInfoMessage() {
        setErrorMessage("");
        await firebase.database().ref("info/").child("msg").remove().catch(function (error) {
            setErrorMessage(error.message);
        });

        setInfoMessage("");

        setStatusMessage("Succesfully deleted info message!");
        await delay(3000);
        setStatusMessage("");
    }

    async function uploadPatch() {
        setErrorMessage("");
        await firebase.database().ref("info/changelog").push({
            title: patchTitle,
            date: patchDate,
            message: patchMessage
        }).catch(function (error) { setErrorMessage(error.message) });

        setStatusMessage("Succesfully uploaded patch!");
        await delay(3000);
        setStatusMessage("");
    }

    function clearPatchInput() {
        setPatchDate("");
        setPatchMessage("");
        setPatchTitle("");

        document.getElementById("patch-title").value = "";
        document.getElementById("patch-date").value = "";
        document.getElementById("patch-message").value = "";
    }

    async function removePatch(id) {
        setErrorMessage("");
        await firebase.database().ref("info/changelog/" + id).remove().catch(function (error) { setErrorMessage(error.message) });

        setStatusMessage("Succesfully removed patch!");
        await delay(3000);
        setStatusMessage("");
    }

    const patchNotes = [];
    for (const key in allPatchNotes) {
        patchNotes.push({
            title: allPatchNotes[key].title,
            date: allPatchNotes[key].date,
            message: allPatchNotes[key].message,
            id: key
        })
    }
    patchNotes.sort(sortItems);

    function sortItems(first, second) {
        if (first.date > second.date) {
            return -1;
        }
        if (first.date < second.date) {
            return 1;
        }
        return 0;
    }

    if (props.session && props.users && user && allTimes) {
        return (
            <Container signOutBtn pageName="Admin-Dashboard" noscroll={`${patchGUI || infoGUI ? "noscroll" : ""}`}>
                <h2>Admin-Dashboard</h2>
                <AnimatePresence>
                    {statusMessage && (
                        <motion.p className="status" initial="initial" animate="animate" variants={fadeInDown} exit={{ y: -200, opacity: 1, transition: { duration: 1.2, ease: easing } }} >{statusMessage}</motion.p>
                    )}
                </AnimatePresence>
                <div>
                    <motion.button onClick={() => setPatchGUI(true)} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Patch Notes</motion.button>
                    <motion.button onClick={() => setInfoGUI(true)} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Info Message</motion.button>
                    <Link href="/account">
                        <a>
                            <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                        </a>
                    </Link>
                </div>
                <AnimateSharedLayout>
                        <motion.div layout className="user-conatiner">
                            {props.users.users.map(userItem => (
                                <UserItem key={userItem.uid} user={user} userItem={userItem} levelTimes={allTimes} setStatusMessage={(e) => setStatusMessage(e)} />
                            ))}
                        </motion.div>
                    </AnimateSharedLayout>
                <AnimatePresence>
                    {infoGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h1>Set Info Message</h1>
                                {oldInfoMessage.msg && (
                                    <div className="info-message-toast">
                                        <div className="img">
                                            <Image src="/logo_nobg.png" layout="fill" alt="developer profile picture" />
                                        </div>
                                        <div className="text">
                                            <p className="strong">Message from Slowlydev</p>
                                            <p>{oldInfoMessage.msg}</p>
                                        </div>
                                    </div>
                                )}
                                <motion.input onChange={(e) => setInfoMessage(e.target.value)} placeholder="Info Message" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} /><br />
                                <div className="flex">
                                    <motion.button onClick={uploadInfoMessage} disabled={infoMessage === ""} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Upload</motion.button>
                                    <motion.button onClick={deleteInfoMessage} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Delete</motion.button>
                                    <motion.button onClick={() => setInfoGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                </div>
                                {errorMessage && (
                                    <p className="error">{errorMessage}</p>
                                )}
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {patchGUI &&
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>Add Patch Notes</h2>
                                <motion.button onClick={() => setPatchGUI(false)} className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                                {errorMessage && (
                                    <p className="error">{errorMessage}</p>
                                )}
                                <div className="patch-container">
                                    <div className="new-patch-container">
                                        <motion.input id="patch-title" className="title-input" onChange={(e) => setPatchTitle(e.target.value)} placeholder="Patch Title" whileFocus={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} />
                                        <motion.input id="patch-date" className="date-input" type="date" onChange={(e) => setPatchDate(e.target.value)} placeholder="Patch Date" whileFocus={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} />
                                        <motion.textarea id="patch-message" className="message-input" type="text" onChange={(e) => setPatchMessage(e.target.value)} placeholder="Patch Message" whileFocus={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} />
                                        <div className="flex">
                                            <motion.button onClick={uploadPatch} disabled={patchTitle === "" || patchDate === "" || patchMessage === ""} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Upload</motion.button>
                                            <motion.button onClick={clearPatchInput} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Clear</motion.button>
                                        </div>
                                    </div>
                                    <div className="all-patch-container">
                                        {patchNotes.map(patchNote => (
                                            <div className="patch">
                                                <h3>{patchNote.title}</h3>
                                                <p className="strong">{patchNote.date}</p>
                                                <p className="patch-message">{patchNote.message}</p>
                                                <motion.button onClick={() => removePatch(patchNote.id)} className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Remove</motion.button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    }
                </AnimatePresence>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Admin-Dashboard" />
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await adminApp().auth().verifyIdToken(cookies.token);
        const { uid } = token;

        const userRecord = await adminApp().auth().getUser(uid);
        const isAdmin = userRecord.customClaims["admin"];

        if (!isAdmin) {
            context.res.writeHead(302, { Location: "/account" });
            context.res.end();
        }

        const usersData = await adminApp().auth().listUsers();

        return {
            props: { session: uid, users: JSON.parse(JSON.stringify(usersData)) }
        };

    } catch (err) {
        context.res.writeHead(302, { Location: "/account" });
        context.res.end();
        return { props: {} };
    }
}