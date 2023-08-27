var db = admin.database();

var guild = db.ref("guild");

var guildRef = guild.child(message.guild.id);

guildRef.once("value", async function (snap) {

    var data = snap.val();

    try {

        

    } catch (err) {

        message.channel.send("An error occurred, either becaouse a Admin didn't set the bot correctly up or an database error happend!")

        console.error(err)
    }

});

embedhelp.addField(`${process.env.PREFIX}`);