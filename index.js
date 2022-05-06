"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useSingleFileAuthState,
	delay
} = require("@adiwajshing/baileys")
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
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

function title() {
    console.clear()
	console.log('------------------------------------------------')
	lolcatjs.fromString(color(figlet.textSync('RAFLY', { horizontalLayout: 'full' })))
  	console.log('------------------------------------------------')
	lolcatjs.fromString('[SERVER] Server Started!')
	console.log('------------------------------------------------')
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

const connectToWhatsApp = async () => {
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'silent' }),
            auth: state,
            browser: ["SEDATIVE-MD BY RAFLY", "Safari", "3.0"]
        })
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
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
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	conn.ev.on('creds.update', () => saveState)
	
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
				const bg = `https://telegra.ph/file/11f2e752e749f5412b52f.jpg`

				if (data.action == "add") {
					/*var buff = await getBuffer(`https://hardianto.xyz/api/welcome3?profile=${ppuser}&name=${i.split("@")[0]}&bg=https://telegra.ph/file/11f2e752e749f5412b52f.jpg&namegb=${encodeURI(mdata.subject)}&member=${mdata.participants.length}`)*/
					var buff = await getBuffer(`
				https://api.lolhuman.xyz/api/base/welcome?apikey=Rafly11&img1=${ppuser}&img2=${ppgc}&background=${bg}&username=NewMember&member=${gcmem}&groupname=${encodeURIComponent(gcname)}
				`)
                await  conn.sendMessage(data.id, { image: buff, caption: `Hello @${i.split("@")[0]}\nWelcome to Group ${gcname}\nJangan lupa baca desk grup yak`, mentions: [i] })
				
				 } else if (data.action == "remove") {
				var buff = await getBuffer(`
				https://api.lolhuman.xyz/api/base/leave?apikey=Rafly11&img1=${ppuser}&img2=${ppgc}&background=${bg}&username=MemberLeft&member=${gcmem}&groupname=${encodeURIComponent(gcname)}
				`)
                  conn.sendMessage(data.id, { image: buff, caption: `Sayonara @${i.split("@")[0]}\nSemoga tenang di alam sana\nLatom`, mentions: [i] })
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
