import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import nookies from "nookies";

import { adminApp } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

import Container from "../components/container";
import Loading from "../components/loading";
import { useAuth } from "../auth";

export default function Account(props) {

    firebaseClient();
    const { user } = useAuth();

    if (props.session && user) {
        return (
            <Container signOutBtn pageName="Account">
                <div className="profile-picture">
                    <Image src={user.photoURL} layout="fill" alt="charakter image" />
                </div>
                {props.isAdmin && (
                    <Link href="admin-dashboard">
                        <motion.div className="role-card" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <p>Admin</p>
                        </motion.div>
                    </Link>
                )}
                {!props.isAdmin && (
                    <motion.div className="user-card">
                        <p>User</p>
                    </motion.div>
                )}
                <h2>Welcomeback, {user.displayName}!</h2>
                <div>
                    <Link href="/levels">
                        <a>
                            <motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Play</motion.button>
                        </a>
                    </Link>
                    <Link href="/leaderboards">
                        <a>
                            <motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Leaderboards</motion.button>
                        </a>
                    </Link>
                    <Link href="/settings">
                        <a>
                            <motion.button className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Settings</motion.button>
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Back</motion.button>
                        </a>
                    </Link>
                </div>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Account" />
        );
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await adminApp().auth().verifyIdToken(cookies.token);
        const { uid } = token;

        const userRecord = await adminApp().auth().getUser(uid)
        var isAdmin;
        
        if(userRecord.customClaims) {
            if(userRecord.customClaims["admin"]) {
                isAdmin = true;
            } else {
                isAdmin = false;
            }
        } else {
            isAdmin = false;
        }

        return {
            props: { session: uid, isAdmin: isAdmin }
        };
    } catch (err) {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();

        return { props: {} };
    }
}