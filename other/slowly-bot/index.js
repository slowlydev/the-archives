require("dotenv").config();

//Discord
const Discord = require("discord.js");
const Util = require("discord.js");
const client = new Discord.Client();

//Youtube
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.YOUTUBE);

//Music Map
const queue = new Map();

//Firebase
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slowly-bot.firebaseio.com"
});

client.on("ready", () => {
    console.log("Logged in as " + client.user.username);
    client.user.setActivity(process.env.PREFIX + "help", {
        type: "WATCHING"
    }).catch(console.error)
});

client.on("message", async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith(process.env.PREFIX)) return;

    if (message.channel.type == "dm") return message.send("I can only work in Servers :c");

    let args = message.content.substring(process.env.PREFIX.length).split(" ");

    const searchString = args.slice(1).join(" ");

    const serverQueue = queue.get(message.guild.id);
	
	const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

    switch (args[0]) {

        //Intitation

        case "admin": {

            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need to be an Admin to do this!");
            
            switch (args[1]) {

                case "ticket": {

                    if(!args[2]) return message.channel.send("You need to refrence a parent ID!");

                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.update({
                        ticketChannel: args[2]
                    }).then( message.channel.send("Updated ticket parent id to " + args[2]) );

                    break;
                }

                case "staff": {

                    if(!args[2]) return message.channel.send("You need to refrence a role ID!");

                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.update({
                        staff: args[2]
                    }).then( message.channel.send("Updated staff role id to " + args[2]) );

                    break;
                }

                case "suggestion": {

                    if(!args[2]) return message.channel.send("You need to refrence a Channel ID!")

                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.update({
                        suggestionsChannel: args[2]
                    }).then( message.channel.send("Updated suggstion channel id to " + args[2]) );

                    break; 

                }

                case "info": {
                    
                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.once("value", async function (snap) {

                        var data = snap.val();

                        try {

                            const embedadmininfo = new Discord.MessageEmbed();

                            embedadmininfo.setTitle("Admin Info Panel");

                            embedadmininfo.setColor(0x7842f5);

                            embedadmininfo.addField("Ticket Category", data.ticketChannel);
                            embedadmininfo.addField("Suggestion Channel", data.suggestionsChannel);
                            embedadmininfo.addField("Staff Role", `<@&${data.staff}>`);

                            message.channel.send(embedadmininfo);

                        } catch (err) {

                            message.channel.send("An error occurred, either becaouse a Admin didn't set the bot correctly up or an database error happend!")

                            console.error(err)
                        }

                    });
                    
                    break;
                }

                default: {

                    message.channel.send(process.env.PREFIX + "admin <ticket/staff/suggestion/info> <category ID/role ID/channel ID>");
                    break;

                }

            }
            
            break;
        }

        //Info

        case "help": {
            const embedhelp = new Discord.MessageEmbed();

            embedhelp.setColor(0x7842f5);
            
            embedhelp.setTitle(`Help for ${client.user.username}`);

            //Intitation

            embedhelp.addField(`${process.env.PREFIX}admin <staff(set staff role ID)/ticket(set ticket Category ID)>`, "Set ID's  for roles, categorys and ");

            //Info

            embedhelp.addField(`${process.env.PREFIX}help`, "Shows this neet help");
            embedhelp.addField(`${process.env.PREFIX}info`, "Shows neet info");

            //Utility

            embedhelp.addField(`${process.env.PREFIX}selfrole <news/events>`, "Give yourself roles");
            embedhelp.addField(`${process.env.PREFIX}ticket <create/close> <subject>`, "Create/Manage tickets");
            embedhelp.addField(`${process.env.PREFIX}suggest <suggestion>`, "Make a Server suggestion");

            //Moderation

            embedhelp.addField(`${process.env.PREFIX}clear <amount/all>`, "Clear the Chat");
            embedhelp.addField(`${process.env.PREFIX}kick <user> <reason>`, "Kicks a member");
            embedhelp.addField(`${process.env.PREFIX}ban <user> <reason>`, "Bans a member");
            embedhelp.addField(`${process.env.PREFIX}music <volume/ban/clear>`, "Manage music permission and clear queue");
            
            //Music

            embedhelp.addField(`${process.env.PREFIX}play <song/yt playlist link>`, "Plays music");
            embedhelp.addField(`${process.env.PREFIX}skip`, "Skips the current song");
            embedhelp.addField(`${process.env.PREFIX}stop`, "Stops the music");
            
            embedhelp.addField(`${process.env.PREFIX}volume <1-5>`, "Change the volume of the music");
            
            embedhelp.addField(`${process.env.PREFIX}pause`, "Pauses the music");
            embedhelp.addField(`${process.env.PREFIX}resume`, "Resumes the music");

            embedhelp.addField(`${process.env.PREFIX}np`, "Shows the current song");
            embedhelp.addField(`${process.env.PREFIX}queue`, "Shows the song queue");

            message.channel.send(embedhelp);
            break;
        }

        case "info": {
            const embedinfo = new Discord.MessageEmbed();

            embedinfo.setTitle(`${client.user.username} Bot`);
            embedinfo.addField("Developed by", "Slowlydev#8104");
            embedinfo.setFooter("btw. im private!");
            embedinfo.setThumbnail(client.user.avatarURL);

            message.channel.send(embedinfo);
            break;
        }

        //Utility

        case "selfrole": {

            switch (args[1]) {

                case "events": {

                    var role = message.guild.roles.cache.find(r => r.name === "Events");

                    if(message.member.roles.cache.find(r => r.name === "Events")) {

                        message.member.roles.remove(role).then( message.reply("Removed you from Events") );

                    } else {

                        message.member.roles.add(role).then( message.reply("Added you to Events") );

                    }

                    break;
                }

                case "news": {

                    var role = message.guild.roles.cache.find(r => r.name === "News");

                    if(message.member.roles.cache.find(r => r.name === "News")) {

                        message.member.roles.remove(role).then( message.reply("Removed you from News") );

                    } else {

                        message.member.roles.add(role).then( message.reply("Added you to News") );

                    }

                    break;
                }

                default: {

                    message.reply(process.env.PREFIX + "selfrole <events/news>");

                    break;
                }
            }

            break;
        }

        case "ticket": {

            switch (args[1]) {

                case "create": {

                    if(!args[2]) return message.channel.send(`Please set a Subject. ${process.env.PREFIX}ticket create <subject>`);

                    const subjectString = args.slice(2).join(" ");

                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.once("value", async function(snap) {

                        var data = snap.val();

                        try {

                            var staffRole = data.staff;

                            var ticketChannel = data.ticketChannel;

                            var role = message.guild.roles.cache.find(r => r.id === staffRole);

                            const embedticket = new Discord.MessageEmbed();
                            embedticket.setTitle(`Thank you for opening a ticket ${message.author.username}, a staff member will be here momentarily!`);
                            embedticket.addField("Subject set:", subjectString);
                            embedticket.setColor(0x7842f5);
    
                            var channel = await message.guild.channels.create(`${message.author.username}-ticket`, {
                                permissionOverwrites: [

                                    {
                                        id: message.guild.roles.everyone,
                                        deny: [ "VIEW_CHANNEL", "SEND_MESSAGES" ]
                                    },
                                    {
                                        id: message.author.id,
                                        allow: [ "VIEW_CHANNEL", "SEND_MESSAGES" ]
                                    },
                                    {
                                        id: role.id,
                                        allow: [ "VIEW_CHANNEL", "SEND_MESSAGES" ]
                                    }
                                ]
                            });
    
                            (await channel).setParent(ticketChannel);
    
                            (await channel).send(`${message.member}, <@&${role.id}>`);
                            (await channel).send(embedticket); 

                            message.delete();

                        } catch(err) {

                            message.channel.send("An error occurred, either becaouse a Admin didn't set the bot correctly up or an database error happend!")

                            console.error(err)
                        }

                    });

                    break;
                }

                case "close": {
                    let channelARGS = message.channel.name.split("-");

                    if (channelARGS[1] != "ticket" && channelARGS[2] != "ticket" ) return message.channel.send("Not allowed in this channel!");

                    if(!args[2]) return message.channel.send(`Please set a reason to close the ticket. ${process.env.PREFIX}ticket close <reason>`)

                    const reasonString = args.slice(2).join(" ");

                    var db = admin.database();

                    var guild = db.ref("guild");

                    var guildRef = guild.child(message.guild.id);

                    guildRef.once("value", function(snap) {

                        var data = snap.val();

                        var staffRole = data.staff;

                        if(!message.member.roles.cache.find(r => r.id === staffRole)) return message.channel.send("You are not allowed to do this!");

                        try {

                            var firstMessage = message.channel.messages.cache.first()

                            var user = firstMessage.mentions.users.first()
    
                            user.send(`Your ticket got closed by **${message.author.tag}** with the reason: **${reasonString}**`)

                        } catch (err) {

                            console.error(err);

                            message.author.send("An error occcured, please contact Slowlydev!");

                        }

                        message.channel.delete();

                    });

                    break;
                }
            }

            break;
        }

        case "suggest": {

            if(!args[1]) return message.channel.send("Please provide a suggestion!");

            var suggestion = args.slice(1).join(" ");

            var username = `${message.author.tag} | ${message.author.id}`

            var avatar = message.author.avatarURL( { format: "png", dynamic: true, size: 128 } );

            var emojiNo = message.guild.emojis.cache.find( e => e.name === "no" );

            var emojiYes = message.guild.emojis.cache.find( e => e.name === "yes" );

            let ts = Date.now();

            let date_ob = new Date(ts);

            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();

            var db = admin.database();

            var guild = db.ref("guild");

            var guildRef = guild.child(message.guild.id);

            guildRef.once("value", async function (snap) {

                var data = snap.val();

                try {

                    var textChannel = data.suggestionsChannel;

                    const embedsuggestion = new Discord.MessageEmbed();

                    embedsuggestion.setColor(0x7842f5);
                    embedsuggestion.setTitle("New Suggestion");
                    embedsuggestion.setDescription(suggestion);
                    embedsuggestion.setFooter(`${date}/${month}/${year}`);

                    embedsuggestion.setAuthor(username, avatar)

                    var suggestionMessage = await message.guild.channels.cache.find( c => c.id == textChannel).send(embedsuggestion);

                    (await suggestionMessage).react(emojiYes);
                    (await suggestionMessage).react(emojiNo);

                    message.delete();

                } catch (err) {

                    message.channel.send("An error occurred, either becaouse a Admin didn't set the bot correctly up or an database error happend!")

                    console.error(err)
                }

            });

            break;

        }

        //Moderation

        case "clear": {
            if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to do this!");

            if(args[1] == "*") {

                var clonedchannel = await message.channel.clone();

                message.channel.delete();

                clonedchannel.send("I deleted all messages!");

            } else {

                await message.delete()

                if(args[1] >= 100) {

                    message.channel.bulkDelete(100, true).then(deleted => message.channel.send(`I deleted ${deleted.size} messages!`));

                } else {

                    message.channel.bulkDelete(args[1], true).then(deleted => message.channel.send(`I deleted ${deleted.size} messages!`));

                }
            }

            break;
        }

        case "kick": {

            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You are not allowed to do this!");

            if(!args[2]) return message.channel.send("You need to set a reason! !kick <user> <reason>");

            const user = message.mentions.users.first();

            if (user) {
                
                const member = message.guild.member(user);

                if (member) {
                    
                    member.kick(args[2]).then(() => {

                        message.reply(`Successfully kicked ${user.tag}`);

                    }).catch(err => {

                        message.reply('I was unable to kick the member');

                        console.error(err);

                    });

                } else {

                    message.reply("That user isn't in this guild!");

                }

            } else {

                message.reply("You didn't mention the user to kick!");

            }

            break;
        }

        case "ban": {

            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You are not allowed to do this!");

            if(!args[2]) return message.channel.send("You need to set a reason! !ban <user> <reason>");

            const user = message.mentions.users.first();

            if (user) {
                
                const member = message.guild.member(user);

                if (member) {
                    
                    member.ban(args[2]).then(() => {

                        message.reply(`Successfully banned ${user.tag}`);

                    }).catch(err => {

                        message.reply('I was unable to ban the member');

                        console.error(err);

                    });

                } else {

                    message.reply("That user isn't in this guild!");

                }

            } else {

                message.reply("You didn't mention the user to ban!");

            }

            break;
        }

        case "music": {
            
            var db = admin.database();

            var guild = db.ref("guild");

            var guildRef = guild.child(message.guild.id);

            guildRef.once("value", async function (snap) {

            var data = snap.val();

            try {

                var staffRole = data.staff;

                if(!message.member.roles.cache.find(r => r.id === staffRole)) return message.channel.send("You are not allowed to do this!");

                switch(args[1]) {
                    case "volume": {
                
                        var user = message.mentions.users.first();
                
                        var role = message.guild.roles.cache.find(r => r.name === "Music Volume");
                
                        const member = message.guild.member(user);

                        if(member.roles.cache.find(r => r.name === "Music Volume")) {
                
                            member.roles.remove(role).then( message.reply(`Removed Music Volume premission from ${member}`) );
                
                        } else {
                
                            member.roles.add(role).then( message.reply(`Added Music Volume premission to ${member}`) );
                
                        }
                
                        break;
                    }
                
                    case "ban": {
                
                        var user = message.mentions.users.first();
                
                        var role = message.guild.roles.cache.find(r => r.name === "Music Banned");
                
                        const member = message.guild.member(user);
                
                        if(member.roles.cache.find(r => r.name === "Music Banned")) {
                
                            member.roles.remove(role).then( message.reply(`Music unbanned ${member}`) );
                
                        } else {
                
                            member.roles.add(role).then( message.reply(`Music banned ${member}`) );
                
                        }
                
                        break;
                    }

                    case "clear": {

                        if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
            
                        serverQueue.songs = [];

                        serverQueue.connection.dispatcher.end();
            
			            return message.channel.send("Song queue clear command has been used!");

                        break;
                    }
                
                    default: {
                        message.channel.send(process.env.PREFIX + "music <ban/volume> <@USER>")
                        break;
                    }
                }

            } catch (err) {

                message.channel.send("An error occurred, either becaouse a Admin didn't set the bot correctly up or an database error happend!")

                console.error(err)
            }

});
        
            break;
        }

        //Music

        case "play": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

            if (!args[1]) return message.channel.send("I don't know what you want to play!")

            if (message.member.voice.channel == null) return message.channel.send("You need to be in a voice channel!");

            if (!message.member.voice.channel.joinable) return message.channel.send("I am not allowed to join this Voice Channel!");

            if (!message.member.voice.channel.speakable) return message.channel.send("I am not allowed to talk in this Voice Channel!");

            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

                const playlist = await youtube.getPlaylist(url);
                
                const videos = await playlist.getVideos();
                
				for (const video of Object.values(videos)) {

                    const video2 = await youtube.getVideoByID(video.id);
                    
                    await handleVideo(video2, message, message.member.voice.channel, true);
                    
                }

                const playlistembed = new Discord.MessageEmbed()

                playlistembed.setTitle(`Playlist has been added to the queue!`);
                playlistembed.setDescription(playlist.title)
                playlistembed.setColor(0x7842f5)
                playlistembed.setThumbnail(playlist.thumbnails.medium.url);
                playlistembed.addField("Songs", playlist.length);
                playlistembed.setFooter("Added by " + message.author.username);
                
                return message.channel.send(playlistembed);
                
			} else {

				try {

                    var video = await youtube.getVideo(url);
                    
				} catch (error) {

					try {

                        var videos = await youtube.searchVideos(searchString, 1);
                        
                        var video = await youtube.getVideoByID(videos[0].id);
                        
					} catch (err) {

                        console.error(err);
                        
                        return message.channel.send('I could not obtain any search results.');
                        
					}
                }
                
				return handleVideo(video, message, message.member.voice.channel);
            }
        }

        case "skip": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

            if (message.member.voice.channel == null) return message.channel.send("You need to be in a voice channel!");
            
            if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
            
            serverQueue.connection.dispatcher.end();
            
			return message.channel.send("Skip command has been used!");
		}

		case "stop": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

            if (message.member.voice.channel == null) return message.channel.send("You need to be in a voice channel!");
            
            if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
            
            serverQueue.songs = [];

            serverQueue.connection.dispatcher.end();
            
			return message.channel.send("Stop command has been used!");
		}

		case "volume": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Volume");

            if (message.member.voice.channel == null) return message.channel.send("You need to be in a voice channel!");
            
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            
            if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
            
            if (!message.member.roles.cache.find(r => r.name === "Music Volume")) return message.channel.send("You don't have Music Volume Permission!")

            serverQueue.volume = args[1];
            
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            
            return message.channel.send(`I set the volume to: **${args[1]}**`);
		}

		case "np": {

            if (!serverQueue) return message.channel.send('There is nothing playing.');
            
            const embednp = new Discord.MessageEmbed();
            embednp.setTitle("Now playing");
            embednp.setDescription(serverQueue.songs[0].title);
            embednp.setColor(0x7842f5);
            embednp.addField("Duration",  serverQueue.songs[0].duration);
            embednp.setThumbnail(serverQueue.songs[0].thumbnail);
            embednp.setFooter("Added by " + serverQueue.songs[0].added);

			return message.channel.send(embednp);
		}

		case "pause": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

			if (serverQueue && serverQueue.playing) {

                serverQueue.playing = false;
                
                serverQueue.connection.dispatcher.pause();
                
                return message.channel.send('Paused the music for you!');
                
            }
            
			return message.channel.send('There is nothing playing.');
		}

		case "resume": {

            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

			if (serverQueue && !serverQueue.playing) {
				serverQueue.playing = true;
				serverQueue.connection.dispatcher.resume();
				return message.channel.send('Resumed the music for you!');
			}
			return message.channel.send('There is nothing playing.');
		}

		case "queue": {
			if (!serverQueue) return message.channel.send('There is nothing playing.');
			
			const embedqueue = new Discord.MessageEmbed();
            embedqueue.setTitle("Song queue")
            embedqueue.setThumbnail(serverQueue.songs[0].thumbnail)
            embedqueue.addField("Now Playing", serverQueue.songs[0].title)
			embedqueue.addField("Queue", serverQueue.songs.map(song => ` ${song.title}`).join('\n'))
			embedqueue.setColor(0x7842f5)

			return message.channel.send(embedqueue);
        }
        
        case "loop": {
            
            var role = message.guild.roles.cache.find(r => r.name === "Music Banned");

            if (message.member.roles.cache.find(r => r.name === "Music Banned")) return message.channel.send("You don't have Music Permission! If you don't think so make a ticket and ask kindly!")

            if (!serverQueue) return message.channel.send('There is nothing playing.');

            if (serverQueue.loop) {

                serverQueue.loop = false;

                message.channel.send("Stoped Looping the Queue!");
            
            } else {

                serverQueue.loop = true;
                
                message.channel.send("Looping the Queue now!");
                
            }

            break;
        }
    }
});

async function handleVideo(video, message, voiceChannel, playlist = false) {

    const serverQueue = queue.get(message.guild.id);
    
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: video.thumbnails.medium.url,
        added: message.author.username,
        duration: `${video.duration.minutes}:${video.duration.seconds}`
    };
    
	if (!serverQueue) {

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 2,
            playing: true,
            loop: false
        };
        
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {

            var connection = await voiceChannel.join();
            
            queueConstruct.connection = connection;
            
            play(message.guild, queueConstruct.songs[0]);
            
		} catch (error) {
            
            queue.delete(message.guild.id);
            
			return message.channel.send(`I could not join the voice channel: ${error}`);
        }
        
	} else {

        serverQueue.songs.push(song);
        
        if (playlist) {

            return;

        } else {

            const songaddembed = new Discord.MessageEmbed();
            songaddembed.setTitle("Song added to the queue!")
            songaddembed.setDescription(song.title)
            songaddembed.setColor(0x7842f5)
            songaddembed.addField("Duration", song.duration)
            songaddembed.setThumbnail(song.thumbnail)
            songaddembed.setFooter("Added by " + message.author.username)

            return message.channel.send(songaddembed);
        }
    }
    
	return;
}

function play(guild, song) {

	const serverQueue = queue.get(guild.id);

	if (!song) {

        serverQueue.voiceChannel.leave();
        
        queue.delete(guild.id);
        
		return;
	}

    const dispatcher = serverQueue.connection.play(ytdl(song.url, {filter: "audioonly"}))
    
	dispatcher.on('finish', reason => {

            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            
            else console.log(reason);

            if(serverQueue.loop) {

               var oldsong = serverQueue.songs[0]; 

               serverQueue.songs.shift();

               serverQueue.songs.push(oldsong);

            } else {

                serverQueue.songs.shift();

            }
            
            play(guild, serverQueue.songs[0]);
            
    })
        
    dispatcher.on('error', error => console.error(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
    const songstartembed = new Discord.MessageEmbed();
    songstartembed.setTitle("Started playing");
    songstartembed.setDescription(song.title)
    songstartembed.addField("Duration", song.duration);
    songstartembed.setThumbnail(song.thumbnail);
    songstartembed.setFooter("Added by " + song.added);
    songstartembed.setColor(0x7842f5);

	serverQueue.textChannel.send(songstartembed);
}

client.login(process.env.TOKEN);
