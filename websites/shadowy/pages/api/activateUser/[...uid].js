import firebaseClient from "../../../firebaseClient";
import { adminApp } from "../../../firebaseAdmin";

firebaseClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        
        const adminRecord = await adminApp().auth().getUser(req.query.uid[0])
        var isAdmin;
        
        if(adminRecord.customClaims) {
            if(adminRecord.customClaims["admin"]) {
                isAdmin = true;
            } else {
                isAdmin = false;
            }
        } else {
            isAdmin = false;
        }
        
        if (isAdmin) {
            if(req.query.uid[1]) {
                await adminApp().auth().updateUser(req.query.uid[1], {
                    disabled: false
                });
    
                return res.status(200).json({
                    msg: "Succsesfully activated user!", uid: req.query.uid[1]
                }); 
            } else {
                return res.status(400).json({
                    msg: "Failed to activate user!", uid: req.query.uid[1]
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