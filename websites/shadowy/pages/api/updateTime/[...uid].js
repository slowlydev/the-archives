import firebaseClient from "../../../firebaseClient";
import { adminApp } from "../../../firebaseAdmin";
import { useState } from "react";

firebaseClient();

export default async function handler(req, res) {
    if (req.method === "POST") {

        const adminRecord = await adminApp().auth().getUser(req.query.uid[0])
        var isAdmin;

        if (adminRecord.customClaims) {
            if (adminRecord.customClaims["admin"]) {
                isAdmin = true;
            } else {
                isAdmin = false;
            }
        } else {
            isAdmin = false;
        }

        if (isAdmin) {
            if (req.query.uid[1] && req.query.uid[2] && req.query.uid[3]) {
                console.log(`levels/${req.query.uid[2]}/${req.query.uid[3]}`)

                await adminApp().database().ref(`levels/${req.query.uid[2]}/${req.query.uid[3]}`).child("time").set(req.query.uid[4]);

                return res.status(200).json({
                    msg: "Succsesfully updated times of user!", uid: req.query.uid[1]
                }); 
            } else {
                return res.status(400).json({
                    msg: "Failed to update times of user!", uid: req.query.uid[1]
                });
            }

        } else {
            /*adminApp().database().ref("important/").push({
                uid: req.query.uid[1],
                username: adminRecord.displayName,
                agent: req.headers['user-agent'],
                msg: "tried to disable a user"
            });*/

            return res.status(401).json({
                msg: "You are not allowed to do this, u sneaky!"
            });
        }
    } else {
        return res.status(400).json({
            msg: "need to use POST"
        });
    }
}