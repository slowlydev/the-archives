import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import * as PIXI from "pixi.js"

import firebase from "firebase/app";
import firebaseClient from "../../../firebaseClient";

import Container from "../../container";
import Loading from "../../loading";

const MAP = "/levels/2/map2.json";
const TILESET = "/levels/2/tileset.png";

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

export default function Stage1(props) {

    const [endState, setEndState] = useState({ msg: "", oldtime: "", pb: "", wr: "" });
    const [finishGUI, setFinishGUI] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState();

    const router = useRouter();

    const fileurl = props.userImg.split('/').pop().split(".")
    const player = "/characters/PIX_" + fileurl[0] + ".png"

    const tileSize = 16;
    const SCALE = 2;

    var prevTime, elapsedTime = 0;
    var stopwatchInterval;
    var endTime;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    firebaseClient()

    useEffect(() => {
        router.prefetch("/");
        if (props.isMobile) {
            document.body.getElementsByClassName("display-container")[0].style.transform = "scale(0.65, 0.65)";
            document.body.getElementsByClassName("display-container")[0].style.marginBottom = "1em";
        }
    }, []);

    function refresh() {
        router.reload(window.location.pathname);
    }

    function start() {
        if (!props.userImg) { return };

        setIsPlaying(true);

        const app = new PIXI.Application({
            width: 540,
            height: 360
        });

        for (var textureUrl in PIXI.utils.BaseTextureCache) {
            delete PIXI.utils.BaseTextureCache[textureUrl];
        }
        for (var textureUrl in PIXI.utils.TextureCache) {
            delete PIXI.utils.TextureCache[textureUrl];
        }
        for (var textureUrl in app.loader.resources) {
            delete loader.resources.data;
            delete loader.resources;
        }

        app.loader.add("map", MAP);
        app.loader.add("tileset", TILESET);
        app.loader.add("character", player);

        // Keyboard input listener
        class Keyboard {
            constructor() {
                this.pressed = {};
            }

            watch(el) {
                el.addEventListener("keydown", (e) => {
                    this.pressed[e.code] = true;
                });
                el.addEventListener("keyup", (e) => {
                    this.pressed[e.code] = false;
                });

                if (props.isMobile) {
                    document.body.getElementsByClassName("jump")[0].addEventListener("touchstart", () => {
                        this.pressed["mobileJump"] = true;
                    });
                    document.body.getElementsByClassName("jump")[0].addEventListener("touchend", () => {
                        this.pressed["mobileJump"] = false;
                    });

                    document.body.getElementsByClassName("left")[0].addEventListener("touchstart", () => {
                        this.pressed["mobileLeft"] = true;
                    });
                    document.body.getElementsByClassName("left")[0].addEventListener("touchend", () => {
                        this.pressed["mobileLeft"] = false;
                    });

                    document.body.getElementsByClassName("right")[0].addEventListener("touchstart", () => {
                        this.pressed["mobileRight"] = true;
                    });
                    document.body.getElementsByClassName("right")[0].addEventListener("touchend", () => {
                        this.pressed["mobileRight"] = false;
                    });
                }
            }
        }

        const displayDIV = document.body.getElementsByClassName("display");
        displayDIV[0].appendChild(app.view);
        app.className = "canvas-app"
        app.view.setAttribute('tabindex', 0);

        app.loader.load((loader, resources) => {

            let map = resources.map.data;

            function testCollision(worldX, worldY) {
                let mapX = Math.floor(worldX / tileSize / SCALE);
                let mapY = Math.floor(worldY / tileSize / SCALE);
                return map.collision[mapY * map.width + mapX];
            }

            let kb = new Keyboard();
            kb.watch(app.view);

            let tileTextures = [];
            for (let i = 0; i < 7 * 11; i++) {
                let x = i % 7;
                let y = Math.floor(i / 7);
                tileTextures[i] = new PIXI.Texture(
                    resources.tileset.texture,
                    new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
                );
            }

            let characterFrames = [];
            for (let i = 0; i < 8; i++) {
                characterFrames[i] = new PIXI.Texture(
                    resources.character.texture,
                    new PIXI.Rectangle(i * tileSize, 0, tileSize, tileSize * 2)
                );
            }

            const blob = new PIXI.Sprite(characterFrames[0]);
            blob.scale.x = SCALE;
            blob.scale.y = SCALE;

            const sky = new PIXI.Container();
            const background = new PIXI.Container();
            const stage = new PIXI.Container();
            for (let y = 0; y < map.width; y++) {
                for (let x = 0; x < map.width; x++) {
                    let pos = y * map.width + x;
                    if (map.sky[pos] != 12) {
                        let sprite = new PIXI.Sprite(tileTextures[map.sky[pos] - 1]);
                        sprite.x = x * tileSize;
                        sprite.y = y * tileSize;
                        sky.addChild(sprite);
                    }
                    if (map.background[pos] != 12) {
                        let sprite = new PIXI.Sprite(tileTextures[map.background[pos] - 1]);
                        sprite.x = x * tileSize;
                        sprite.y = y * tileSize;
                        background.addChild(sprite);
                    }
                    if (map.stage[pos] != 12) {
                        let sprite = new PIXI.Sprite(tileTextures[map.stage[pos] - 1]);
                        sprite.x = x * tileSize;
                        sprite.y = y * tileSize;
                        stage.addChild(sprite);
                    }
                }
            }

            sky.scale.x = sky.scale.y = SCALE;
            background.scale.x = background.scale.y = SCALE;
            stage.scale.x = stage.scale.y = SCALE;

            app.stage.addChild(sky);
            app.stage.addChild(background);
            app.stage.addChild(stage);
            app.stage.addChild(blob);

            let character = {
                x: 0, y: 864,
                vx: 0, vy: 0,
                direction: 0,
                jumped: false,
                cycles: {
                    'runLeft': [5, 6, 7, 6],
                    'runRight': [1, 2, 3, 2]
                }
            };

            let scrollX = 0;
            let scrollY = 0;

            app.view.focus();
            startTimer();

            // Listen for frame updates
            app.ticker.add((time) => {

                blob.x = character.x;
                blob.y = character.y;

                character.vy = Math.min(12, character.vy + 1)
                if (character.vx > 0) {
                    character.vx -= 1;
                }
                if (character.vx < 0) {
                    character.vx += 1;
                }

                if (character.x == 4066) {
                    app.stop();
                    app.loader.destroy();
                    for (var textureUrl in PIXI.utils.BaseTextureCache) {
                        delete PIXI.utils.BaseTextureCache[textureUrl];
                    }
                    for (var textureUrl in PIXI.utils.TextureCache) {
                        delete PIXI.utils.TextureCache[textureUrl];
                    }
                    for (var textureUrl in app.loader.resources) {
                        delete app.loader.resources.data;
                        delete app.loader.resources;
                    }
                    setIsPlaying(false);
                    stopTimer();
                }

                let touchingGround = testCollision(
                    character.x + 2,
                    character.y + tileSize * SCALE * 2 + 1
                ) || testCollision(
                    character.x + tileSize * SCALE - 3,
                    character.y + tileSize * SCALE * 2 + 1
                );

                if (character.vy > 0) {
                    for (let i = 0; i < character.vy; i++) {
                        let testX1 = character.x + 2;
                        let testX2 = character.x + tileSize * SCALE - 3;
                        let testY = character.y + tileSize * SCALE * 2;
                        if (testY > map.height * tileSize * SCALE || testCollision(testX1, testY) || testCollision(testX2, testY)) {
                            character.vy = 0;
                            break;
                        }
                        character.y = character.y + 1;
                    }
                }
                if (character.vy < 0) {
                    for (let i = character.vy; i < 0; i++) {
                        let testX1 = character.x + 2;
                        let testX2 = character.x + tileSize * SCALE - 3;
                        let testY = character.y + 5;
                        if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
                            character.vy = 0;
                            break;
                        }
                        character.y = character.y - 1;
                    }
                }
                if (character.vx > 0) {
                    character.direction = 0;
                    for (let i = 0; i < character.vx; i++) {
                        let testX = character.x + tileSize * SCALE - 2;
                        let testY1 = character.y + 5;
                        let testY2 = character.y + tileSize * SCALE;
                        let testY3 = character.y + tileSize * SCALE * 2 - 1;
                        if (testX >= map.width * tileSize * SCALE || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                            character.vx = 0;
                            break;
                        }
                        character.x = character.x + 1;
                    }
                }
                if (character.vx < 0) {
                    character.direction = 1;
                    for (let i = character.vx; i < 0; i++) {
                        let testX = character.x + 1;
                        let testY1 = character.y + 5;
                        let testY2 = character.y + tileSize * SCALE;
                        let testY3 = character.y + tileSize * SCALE * 2 - 1;
                        if (testX < 0 || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                            character.vx = 0;
                            break;
                        }
                        character.x = character.x - 1;
                    }
                }

                if (character.x + scrollX > app.view.width - tileSize * SCALE * 6) {
                    scrollX = Math.max(
                        app.view.width - map.width * tileSize * SCALE,
                        app.view.width - character.x - tileSize * SCALE * 6
                    );
                }
                if (character.x + scrollX < tileSize * SCALE * 5) {
                    scrollX = Math.min(0, -character.x + tileSize * SCALE * 5);
                }
                if (character.y + scrollY > app.view.height - tileSize * SCALE * 5) {
                    scrollY = Math.max(
                        app.view.height - map.height * tileSize * SCALE,
                        app.view.height - character.y - tileSize * SCALE * 5
                    );
                }
                if (character.y + scrollY < tileSize * SCALE * 2) {
                    scrollY = Math.min(0, -character.y + tileSize * SCALE * 2);
                }

                app.stage.x = scrollX;
                sky.x = -scrollX * .5;
                sky.y = -scrollY * .5;
                app.stage.y = scrollY;

                let characterFrame = 0;
                if (!touchingGround) {
                    characterFrame = character.direction * 4 + 1;
                } else {
                    if (character.vx > 0) {
                        characterFrame = character.cycles.runRight[(Math.floor(Date.now() / 100) % 4)]
                    } else if (character.vx < 0) {
                        characterFrame = character.cycles.runLeft[(Math.floor(Date.now() / 100) % 4)]
                    } else {
                        characterFrame = character.direction * 4;
                    }
                }

                blob.texture = characterFrames[characterFrame];

                if (kb.pressed.KeyD || kb.pressed.ArrowRight || kb.pressed.mobileRight) {
                    character.direction = 0;
                    character.vx = Math.min(9, character.vx + 2);
                }
                if (kb.pressed.KeyA || kb.pressed.ArrowLeft || kb.pressed.mobileLeft) {
                    character.direction = 1;
                    character.vx = Math.max(-9, character.vx - 2);
                }
                if ((!kb.pressed.Space || !kb.pressed.KeyW || !kb.pressed.ArrowUp || !kb.pressed.mobileJump) && touchingGround && character.jumped) {
                    character.jumped = false;
                }
                if ((kb.pressed.Space || kb.pressed.KeyW || kb.pressed.ArrowUp || kb.pressed.mobileJump) && touchingGround && !character.jumped) {
                    character.vy = -16;
                    character.jumped = true;
                }
            });
        });

        app.loader.onError.add((error) => console.error(error));
    }

    function updateTime() {
        var tempTime = elapsedTime;

        var centiseconds = tempTime % 100;
        tempTime = Math.floor(tempTime / 1000);
        var seconds = tempTime % 60;
        tempTime = Math.floor(tempTime / 60);
        var minutes = tempTime % 60;

        if (centiseconds < 10 || centiseconds == 0) {
            centiseconds = '0' + centiseconds;
        }
        if (seconds < 10 || seconds == 0) {
            seconds = '0' + seconds;
        }

        setTime(`${minutes}.${seconds}:${centiseconds}`);
        endTime = `${minutes}.${seconds}:${centiseconds}`
    }

    function startTimer() {
        stopwatchInterval = setInterval(function () {
            if (!prevTime) {
                prevTime = Date.now();
            }

            elapsedTime += Date.now() - prevTime;
            prevTime = Date.now();

            updateTime()
        }, 1);
    }

    async function stopTimer() {
        clearInterval(stopwatchInterval);
        prevTime = null;
        await uploadTime(props.username, endTime, props.levelTimes)
        setFinishGUI(true);
    }

    async function uploadTime(newUsername, newTime, levelTimes) {

        const L2 = [];
        for (const timeL2 in props.levelTimes) {
            L2.push({
                time: props.levelTimes[timeL2].time,
                username: props.levelTimes[timeL2].username
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

        var objNum = Object.keys(levelTimes).length;
        var posNum = 0;

        for (const key in levelTimes) {
            if (levelTimes[key].username == newUsername) {
                const oldTime = levelTimes[key].time;
                if (levelTimes[key].time > newTime) {
                    try {
                        firebase.database().ref("levels/l2/" + key).update({
                            time: newTime
                        });
                        setEndState({ msg: "Awsome Run, Uploaded new Time succsesfully!", oldTime: oldTime, pb: newTime, wr: L2[0] });
                        break;
                    } catch (err) {
                        console.log(err);
                        setEndState({ msg: "Failed to upload time sorry :/", oldTime: oldTime, pb: oldTime });
                        break;
                    }
                }
                if (levelTimes[key].time < newTime) {
                    setEndState({ msg: "U didn't improve your time, try again!", oldTime: oldTime, pb: oldTime, wr: L2[0] });
                    break;
                }
                if (levelTimes[key].time == newTime) {
                    setEndState({ msg: "U didn't improve your time, try again!", oldTime: oldTime, pb: oldTime, wr: L2[0] });
                    break;
                }
            } else {
                posNum++;
            }

            if (posNum >= objNum) {
                try {
                    firebase.database().ref("levels/l2/").push({
                        time: newTime,
                        username: newUsername
                    });
                    setEndState({ msg: "Awsome Run, Uploaded new Time succsesfully!", oldTime: "none", pb: newTime, wr: L2[0] });
                    break;
                } catch (err) {
                    console.log(err);
                    setEndState({ msg: "Failed to upload time sorry :/", oldTime: "none", pb: oldTime });
                    break;
                }
            }
        }
    }

    if (props.userImg) {
        return (
            <Container pageName="Level 2">
                <h2 className="timer">{isPlaying ? time : "00:00.00"}</h2>
                <div className="display-container">
                    <div className="display">

                    </div>
                </div>
                <div className="flex">
                    <motion.button disabled={isPlaying} onClick={start} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Start</motion.button>
                    <motion.button onClick={refresh} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Reset</motion.button>
                    <Link href="/levels">
                        <a>
                            <motion.button className="important" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Exit</motion.button>
                        </a>
                    </Link>
                </div>
                {props.isMobile && (
                    <div className="controller-container noselect">
                        <div className="jump" />
                        <div className="movement-container">
                            <div className="left" />
                            <div className="right" />
                        </div>
                    </div>
                )}
                <AnimatePresence>
                    {finishGUI && (
                        <div className="blur">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} exit={exit} className="content-container">
                                <h2>Level Finished!</h2>
                                <p>You finished the Level in {time}</p>
                                <p>{endState.msg}</p>
                                <div className="end-card">
                                    <div>
                                        <p>New time: {time}</p>
                                        <p>Last time: {endState.oldTime}</p>
                                    </div>
                                    <div>
                                        <p>Personal Best: {endState.pb}</p>
                                        <p>World Record: {endState.wr.time} by {endState.wr.username}</p>
                                    </div>
                                </div>
                                <div>
                                    <motion.button onClick={refresh} className="open" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Try Again</motion.button>
                                    <Link href="/levels">
                                        <a>
                                            <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Levels</motion.button>
                                        </a>
                                    </Link>
                                    <Link href="/leaderboards">
                                        <a>
                                            <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Leaderboards</motion.button>
                                        </a>
                                    </Link>
                                    <Link href="/account">
                                        <a>
                                            <motion.button className="back" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Account</motion.button>
                                        </a>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </Container>
        )
    } else {
        return (
            <Loading pageName="Level 2 Loading..." />
        )
    }
}
