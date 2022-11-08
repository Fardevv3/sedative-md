"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
    jidNormalizedUser, 
	useMultiFileAuthState,
	delay
} = require("@adiwajshing/baileys")
const { Boom } = require ('@hapi/boom')
const path = require("path")
const figlet = require("figlet");
const lolcatjs = require('lolcatjs');
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const { serialize, getBuffer } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const { encode } = require("punycode");
const { makeInMemoryStore } = require("./lib/store");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./sessions`
const { state, saveCreds } = useMultiFileAuthState(path.resolve('./sessions'))

function title() {
    console.clear()
	console.log('----------------------------------------------------')
	lolcatjs.fromString(color(figlet.textSync('Rafly', {
		font: 'Bloody',
		horizontalLayout: 'full',
		verticalLayout: 'full',
		whitespaceBreak: true
	})));
  	console.log('----------------------------------------------------')
	lolcatjs.fromString('[SERVER STARTED!!!]')
	console.log('----------------------------------------------------')
	lolcatjs.fromString('SIMPLE WHATSAPP BOT WITH MULTI DEVICE')
	lolcatjs.fromString('Create by Rafly¹¹')
	console.log('----------------------------------------------------')
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	lolcatjs.fromString(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'silent', stream: 'store' }) })
async function connectToWhatsApp()  {

	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'silent' }),
            auth: state,
            browser: ["BOT-MD BY RAFLY", "Chrome", "3.0"]
        })}
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'anjing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store)
	})
	conn.ev.on("creds.update", saveCreds)

    conn.ev.on("connection.update", async(update) => {
        if (update.connection == "open" && conn.type == "legacy") {
            conn.user = {
                id: conn.state.legacy.user.id,
                jid: conn.state.legacy.user.id,
                name: conn.state.legacy.user.name
            }
        }
        const { lastDisconnect, connection } = update
        if (connection) {
            console.info(`Connection Status : ${connection}`)
        }

        if (connection == "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); conn.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); connect(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); connect(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); conn.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); connect(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); connect(); }
            else conn.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
    })
	conn.ev.on('creds.update', () => saveCreds)
	
        conn.ev.on('group-participants.update', async (data) => {
            try {
              for (let i of data.participants) {
                try {
                  var ppuser = await conn.profilePictureUrl(i, 'image')
                } catch {
                  var ppuser = 'https://telegra.ph/file/697858c5140630f089f6e.jpg'
                }
				const ppgc = await conn.profilePictureUrl(data.id, 'image')
				const mdata = await conn.groupMetadata(data.id)
				const gcname = mdata.subject
				const gcmem = mdata.participants.length
				const bg = `https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`

				if (data.action == "add") {
			    /*var buff = await getBuffer(`https://hardianto.xyz/api/welcome3?profile=${ppuser}&name=${i.split("@")[0]}&bg=https://telegra.ph/file/11f2e752e749f5412b52f.jpg&namegb=${encodeURI(mdata.subject)}&member=${mdata.participants.length}`)*/
                /*var buff = await getBuffer(ppuser)*/
				var buff = await getBuffer(`https://hadi-api.herokuapp.com/api/card/welcome?nama=${i.split("@")[0]}&descriminator=${gcmem}&memcount=${gcmem}&gcname=${encodeURI(gcname)}&pp=${ppuser}&bg=${bg}`)
					await conn.sendMessage(data.id, {
						image: buff, 
						fileLength: 1000000000000,
						caption: `${mdata.desc}\n\n_${gcmem}th_ Members in \n${gcname}`,
						buttons : [{buttonId: `y`, buttonText: { displayText: "WELCOME" }, type: 1 }],
						footer: `Welcome @${i.split("@")[0]}`,
						mentions: [i]
					})

				 } else if (data.action == "remove") {
					buff = await getBuffer(`https://hadi-api.herokuapp.com/api/card/goodbye?nama=${i.split("@")[0]}&descriminator=${gcmem}&memcount=${gcmem}&gcname=${encodeURI(gcname)}&pp=${ppuser}&bg=${bg}`);
					await conn.sendMessage(data.id, {
						image: buff,
						fileLength: 1000000000000, 
						caption: `Sayonara @${i.split("@")[0]}\n`,
						mentions: [i],
						buttons : [{buttonId: `y`, buttonText: { displayText: "LATOM" }, type: 1 }],
						footer: 'Semoga tenang di alam sana'
					})
                }
              }
            } catch (e) {
              console.log(e)
            }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))
