const { default: makeWASocket, DisconnectReason, AnyMessageContent, delay, useMultiFileAuthState  } = require('@adiwajshing/baileys')
const {Boom} = require("@hapi/boom")
const pino = require("pino")
const { color, mylog } = require('./lib/color')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const fs = require("fs");
const yargs = require('yargs/yargs')
const moment = require('moment')
const chalk = require('chalk')
const clui = require('clui')
const { Spinner } = clui
const { serialize, getBuffer } = require("./lib/myfunc");
const { encode } = require("punycode");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())

if (opts['server']) require('./app')

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

async function sedative() {
 const {state, saveCreds} = await useMultiFileAuthState ('./sessions')

    async function connectToWhatsAp()  {
    
        const conn = makeWASocket({
                     version: [2, 2208, 7],

            logger: pino({ level: 'silent' }),
            printQRInTerminal: true,
            auth: state,
            browser: ['R a f l y', 'Chrome', '3.0'],
           
            getMessage: async key => {
                return {
                  
                }
            }
        })
    
        conn.ev.on('creds.update', await saveCreds)
        console.log('------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('R A F L Y ', { horizontalLayout: 'full' })))
        console.log('------------------------------------------------')
        lolcatjs.fromString('[SERVER] Server Started!')
 
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
		require('./message/msg')(conn, msg, m, setting)
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
				const bg = `https://telegra.ph/file/334792947c7cde58b3078.jpg`

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
       conn.updateProfilePicture = (from, content) =>
                { img } = await generateProfilePicture(content)
                return conn.query({
                    tag: 'iq',
                    attrs: { to: jidNormalizedUser(from), type: 'set', xmlns: 'w:profile:picture' },
                    content: [ { tag: 'picture', attrs: { type: 'image' }, content: img }]
                }), 
            enumerable: true

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

        return conn
    }
    
    connectToWhatsAp()

}
sedative()
