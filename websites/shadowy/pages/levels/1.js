import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import nookies from "nookies";

import { adminApp } from "../../firebaseAdmin";
import firebaseClient from "../../firebaseClient";
import { useAuth } from "../../auth";
import firebase from "firebase/app";

import Loading from "../../components/loading";

const NoSSR = dynamic(
    () => import("../../components/pixi/LevelStage/Stage1"),
    { ssr: false }
)

export default function Level1(props) {

    const [levelTimes, setLevelTimes] = useState({});

    firebaseClient();

    const router = useRouter();

    useEffect(() => {
        firebase.database().ref("levels/l1").on("value", function (data) { try { setLevelTimes(data.val()) } catch (err) { console.log(err) } });
        router.prefetch("/levels")
    }, []);

    const { user } = useAuth();

    if (props.session && user && levelTimes) {
        return (
            <NoSSR userImg={user.photoURL} username={user.displayName} levelTimes={levelTimes} isMobile={props.isMobile} />
        )
    } else {
        return (
            <Loading pageName="Level 1 Loading..." />
        )
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context);
        const token = await adminApp().auth().verifyIdToken(cookies.token);
        const { uid } = token;

        const UA = context.req.headers['user-agent'];
        const isMobile = Boolean(UA.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        ))

        return {
            props: { session: uid, isMobile: isMobile }
        };
    } catch (err) {
        context.res.writeHead(302, { Location: "/levels" });
        context.res.end();
        return { props: {} };
    }
}