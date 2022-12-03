"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid, convert } = require("../lib/myfunc");
const { webp2mp4File, ffmpeg, upload } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { getLevelingXp, getLevelingLevel, getLevelingId, addLevelingXp, addLevelingLevel, addLevelingId } = require("../lib/level");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");

const fs = require ("fs");
const fetch = require('node-fetch');
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const { youtubeSearch } = require("@bochilteam/scraper");
const speed = require("performance-now");
const ms = require("parse-ms");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');


// DB Game
let tictactoe = []
let tebakgambar = []
let tebakkimia = []
let susunkata = []
let tebakchara = []
let siapaaku = []
let asahotak = []

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _level = JSON.parse(fs.readFileSync('./database/level.json'));
let block = JSON.parse(fs.readFileSync('./database/block.json'));
let afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let saylist = JSON.parse(fs.readFileSync('./database/saylist.json'));


moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store) => {
	try {
		let { ownerNumber, botName, gamewaktu, limitCount } = setting
		let { allmenu, levelup } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		if (fromMe) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
        const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = '-'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
    	const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : ["6281234795656@s.whatsapp.net","628985824528@s.whatsapp.net"].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const quoted = m.quoted ? msg.quoted : msg
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isBlocked = block.includes(sender, block)
		
                const fatkuns = (m.quoted || m)
                const peler = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
                const mime = (peler.msg || peler).mimetype || ''
                const qmsg = (peler.msg || peler)
                const isMedia = /image|video|sticker|audio/.test(mime)
		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "Malam lord";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Sore";
    }
    if (time2 < "16:00:00") {
      var ucapanWaktu = "Siang lord";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Pagi lord";
    }
	if (time2 < "05:00:00") {
      var ucapanWaktu = "Subuh lord";
    }
	if (time2 < "03:00:00") {
      var ucapanWaktu = "Gk tidur kak?";
    }

		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			return conn.sendMessage(from, { text: teks}, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, "thumbnail": fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		const ftokoo = {
			key: {
			  fromMe: false,
			  participant: `0@s.whatsapp.net`,
			  ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {}),
			},
			message: {
			  productMessage: {
				product: {
				  productImage: {
					mimetype: "image/jpeg",
					jpegThumbnail: fs.readFileSync(setting.pathimg), //Gambarnye
				  },
				  title: `${pushname}`, //Kasih namalu
				  description: `${pushname}`,
				  currencyCode: "USD",
				  priceAmount1000: `${getBalance(sender, balance)}`,
				  retailerId: "Rafly",
				  productImageCount: 1,
				},
				businessOwnerJid: `0@s.whatsapp.net`,
			  },
			},
		  };

		  const fgclink = {
			key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
			message: {
			  groupInviteMessage: {
				groupJid: "6282171732892-1606823776@g.us",
				inviteCode: "m",
				groupName: "P",
				caption: setting.fake
			  },
			},
		  };

		  const fvn = {
			key: {
			  participant: sender,
			  ...(from ? { remoteJid: from } : {}),
			},
			message: {
			  audioMessage: {
				mimetype: "audio/ogg; codecs=opus",
				seconds: 32949,
				ptt: "true",
			  },
			},
		  };

		  
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		
		conn.sendPresenceUpdate('available', from)

		// Auto block
		conn.ws.on("CB:call", async function (node) {
			if(node.content[0].tag === "terminate") {
			conn.sendMessage(node.attrs.from, {text: `Kamu Telah Melanggar Rules Maka Kamu Akan Terkena *Blokir*`, jpegThumbnail: fs.readFileSync('./media/menupic.jpeg')}).then(anu => {
			conn.updateBlockStatus(node.attrs.from, "block")
			})
		}
	})

		// AFK
		for (let x of mentionUser) {
			if (afk.hasOwnProperty(x.split('@')[0])) {
				const ini_txt = `_the user is currently afk_\n`
				+`_reason:_ ${afk[x.split('@')[0]]}`
				reply(ini_txt)
			}
		}
		if (afk.hasOwnProperty(sender.split('@')[0])) {
			reply("Welcome back")
			delete afk[sender.split('@')[0]]
			fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
		}
		
		// Auto Registrasi
		if (chats && !isUser && !fromMe) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		  console.log(color('[REGISTER]','cyan'), color(sender,'yellow'), color(from, 'cyan'))
		}
		
		// Premium
		_prem.expiredCheck(conn, premium)

		//function leveling
		if (isGroup && isUser) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                	console.log(color(levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, 'cyan')))
                }
            } catch (err) {
                console.error(err)
            }
        }
		
		//function rank 
		const levelRole = getLevelingLevel(sender)
		var role = 'Destroyer'
		if (levelRole <= 3) {
			role = 'Warrior'
		} else if (levelRole <= 5) {
			role = 'Knight'
		} else if (levelRole <= 7) {
			role = 'General'
		} else if (levelRole <= 9) {
			role = 'Guardian'
		} else if (levelRole <= 11) {
			role = 'Monster Tamer'
		} else if (levelRole <= 13) {
			role = 'Dragon Slayer'
		} else if (levelRole <= 15) {
			role = 'Demon Lord'
		} else if (levelRole <= 20) {
			role = 'Fallen Angel'
		}

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		cekWaktuGame(conn, tebakkimia)
		if (isPlayGame(from, tebakkimia) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkimia)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakkimia*`)
		    tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
		  }
		}
		cekWaktuGame(conn, susunkata)
		if (isPlayGame(from, susunkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, susunkata)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}susunkata*`)
		    susunkata.splice(getGamePosi(from, susunkata), 1)
		  }
		}
		cekWaktuGame(conn, tebakchara)
		if (isPlayGame(from, tebakchara) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakchara)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakchara)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakchara*`)
		    tebakchara.splice(getGamePosi(from, tebakchara), 1)
		  }
		}
		cekWaktuGame(conn, siapaaku)
		if (isPlayGame(from, siapaaku) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, siapaaku)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, siapaaku)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}siapaaku*`)
		    siapaaku.splice(getGamePosi(from, siapaaku), 1)
		  }
		}
		cekWaktuGame(conn, asahotak)
		if (isPlayGame(from, asahotak) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, asahotak)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
			addLevelingXp(sender, htgm)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, asahotak)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}asahotak*`)
		    asahotak.splice(getGamePosi(from, asahotak), 1)
		  }
		}


		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`From Owner`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log(color('[PRIVATE]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'white'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log(color('[GROUP]', 'green'), color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'white'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
		if (chats && !isCmd && !fromMe) {
			console.log(color('[MESSAGE]', 'yellow'), color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'white'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
		if (isGroup && isCmd && isBlocked && !fromMe) {
			reply('*ANDA TELAH DIBLOKIR KARENA MELANGGAR ATURAN BOT*')
			console.log(color('[CMD FROM BLOKED USER]', 'red'), color(sender, 'yellow'))
		}

		if (isBlocked) return
		switch(command) {

			case 'ftroli':
				let prep = generateWAMessageFromContent(from, { orderMessage: {
					itemCount: 12345, status: 500,
					surface: 999, 
					message: 'tes',
					orderTitle: 'tesd',
					token: '9', 
					curreyCode: 'IDR',
					totalAmount1000: '1000',
					sellerJid: from,
					thumbnail: setting.pathimg
					}},
					{quoted: msg})
					
				await conn.relayWAMessage(prep)
				break

			case prefix:
			case 'prefix':
			case 'test':
			case 'bot':
				if (args.length > 1) return
				var cptn = `*${ucapanWaktu} ${pushname}*\nKetik ${prefix}help untuk bantuan\n\n`
				+`*SIMPLE RULES:*\n`
				+`Call/Spam = Block!!!\n`
				+`Kelewat gblk = Block!!!\n\n`
				+`*_NOTE_*\nKalo 2x gk direspon artinya bot memang off:v\n\n`
				var rr = `0@s.whatsapp.net`
				var buttonsDefault = [
					{ y: { displayText: `y`, id: `y` } }
				]
				if (isGroup) {
				await conn.sendMessage(from, {
					 caption: cptn,
					 document: fs.readFileSync(setting.pathaud),
					 mimetype: 'audio/mp4',
					 fileName: setting.botName,
					 fileLength: 887890909999999,
					 buttons: [{buttonId: `${prefix}help`, buttonText: { displayText: "MENU" }, type: 1 }], 
					 footer: `Powered by @${rr.split("@")[0]}\n`,
					 mentions: [rr]},
					 {quoted: fvn})
				} else if (!isGroup) {
				conn.sendMessage(from, {
					 caption: cptn,
					 document: fs.readFileSync(setting.pathaud),
					 mimetype: 'audio/mp4',
					 fileName: setting.botName,
					 fileLength: 887890909999999,
					 templateButtons: buttonsDefault,
					 footer: setting.fake
					})
				}
				break
			case 'assalamualaikum':
				if (!isGroup) return
				reply(`Wa'alaikumussalam`)
			case 'pagi':
			case 'siang':
			case 'sore':
			case 'malam':
				if (!isGroup) return
				reply(`${command} juga kak ${pushname}`)
				break
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(pushname, prefix)
				var buttonsDefault = [
					{ callButton: { displayText: `OWNER NUMBER`, phoneNumber: `+62 812-3479-5656` } },
					{ urlButton: { displayText: `BOT GROUP`, url : `https://chat.whatsapp.com/FdXRCtaTQrHG8jqmdNdEMn` } },
					{ quickReplyButton: { displayText: `Info`, id: `${prefix}info` } },
					{ quickReplyButton: { displayText: `Changelog`, id: `${prefix}changelog` } }
				]
				var buttonsDefault2 = [{ y: { displayText: `y`, id: `y` } }]
				if (isGroup) {
				conn.sendMessage(from, { 
					caption: teks, 
					video: fs.readFileSync(setting.pathgif), 
					gifPlayback: true, 
					fileLength: 887890909999999, 
					templateButtons: buttonsDefault,
					footer: setting.fake })
				} else if (!isGroup) {
				conn.sendMessage(from, { 
					caption: teks, 
					video: fs.readFileSync(setting.pathgif), 
					gifPlayback: true, 
					fileLength: 887890909999999, 
					templateButtons: buttonsDefault2,
					footer: setting.fake })
				}
				break
			case prefix+'info':{
				const user = JSON.parse(fs.readFileSync('./database/user.json'))
				const _user = user.length
				var timestamp = speed();
                var latensi = speed() - timestamp
				var info = `*SIMPLE BOT WHATSAPP*\n\n`
				+`*Bot Name:* ${setting.botName}\n`
				+`*Prefix:* ${prefix}\n`
				+`*Registered*: ${_user}\n`
				+`*Library:* Baileys\n`
				+`*Language:* JavaScript (100%)\n`
				+`*SpeedTest:* ${latensi.toFixed(4)} Second\n`
				+`*RunTime:* ${runtime(process.uptime())}\n\n`
				+`*Date:* ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\n`
				+`*Time:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}\n\n`
				+`*SIMPLE RULES:*\n`
				+`Call/Spam = Block!!!\n`
				+`Kelewat gblk = block!!!\n`
				+`--------------------------\n`
				+`Create by ${setting.ownerName}\nSince 01-12-2020`
				var buttonsDefault = [
					{ urlButton: { displayText: `BOT GROUP`, url : `https://chat.whatsapp.com/FdXRCtaTQrHG8jqmdNdEMn` } },
					{ callButton: { displayText: `OWNER NUMBER`, phoneNumber: `+62 812-3479-5656` } }
					]
				const infoimg = fs.readFileSync(setting.pathimg)
				conn.sendMessage(from, { caption: info, image: infoimg, templateButtons: buttonsDefault, footer: setting.fake, mentions: [sender] })
			}
				break
			case prefix+'changelog':
				var cptn = `*LAST UPDATE*\n\n`
				+`*[02-07-2022]*\n`
				+`${prefix}gura\n`
				+`${prefix}doge\n`
				+`${prefix}patrick\n`
				+`${prefix}slap\n`
				+`${prefix}bonk\n`
				+`${prefix}dance\n`
				+`${prefix}kiss\n\n`
				+`*[03-07-2022]\n`
				+`${prefix}dadu\n`
				+`${prefix}sticker-c\n\n`
				conn.sendMessage(from, { 
					caption: cptn, 
					document: {url: "https://wa.me/6281234795656"},
					mimetype: "application/pdf",
					fileName: setting.fake,
					pageCount: "888",
					fileLength: 887890909999999,
					jpegThumbnail: fs.readFileSync(setting.pathimg), 
					buttons: [{buttonId: `${prefix}owner`, buttonText: { displayText: "Creator" }, type: 1 },],
					footer: setting.fake }, 
					{quoted: fvn})
				break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'donate':
			case prefix+'donasi':
			    reply(`*「 DONATE 」*\n\n\n\`\`\`GOPAY/DANA : 6281234795656\`\`\`\n\`\`\`PULSA : 6281234795656 (Tsel)\`\`\`\n\n*「 THANK YOU 」*`)
			    break
			case prefix+'owner':
				var nomernye = [`${ownerNumber}`]
			    for (let x of nomernye) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Creator', msg)
			    }
			    break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
                let stc = new Sticker(media, {
      pack: ``, // The pack name
      author: `ユ\nウ\nキ\n\nY\nu\nu\nk\ni`, // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 75, // The quality of the output file
      background: 'transparent' // The sticker background color (only for full stickers)
      })
      var buffer = await stc.toBuffer()
      conn.sendMessage(from, {sticker: buffer}, {quoted: msg})
	  fs.unlinkSync("./media/"+sender+".jpg")
	} else if (isVideo || isQuotedVideo) {
	if (isQuotedVideo ? msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 15 : msg.message.videoMessage.seconds > 15) return textImg('too long duration, max 15 seconds')
    let file = await downloadAndSaveMediaMessage("video", "./media/"+sender+".mp4")
    let sticker = new Sticker(fs.readFileSync(file), {
        pack: ``, // The pack name
        author: `ユ\nウ\nキ\n\nY\nu\nu\nk\ni`, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
        quality: 25, // The quality of the output file
        background: 'transparent' // The sticker background color (only for full stickers)
    })
    const stikk = await sticker.toBuffer() 
    conn.sendMessage(from, {sticker: stikk}, {quoted: msg})
	fs.unlinkSync("./media/"+sender+".mp4")
	   } else {
		   reply(`Kirim gambar/video dengan caption ${prefix}sticker`)
	   }
        break
		case prefix+'sticker-c': case prefix+'stiker-c': case prefix+'s-c':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
                let stc = new Sticker(media, {
      pack: ``, // The pack name
      author: `ユ\nウ\nキ\n\nY\nu\nu\nk\ni`, // The author name
      type: StickerTypes.CROPPED, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 75, // The quality of the output file
      background: 'transparent' // The sticker background color (only for full stickers)
      })
      var buffer = await stc.toBuffer()
      conn.sendMessage(from, {sticker: buffer}, {quoted: msg})
	  fs.unlinkSync("./media/"+sender+".jpg")
	} else if (isVideo || isQuotedVideo) {
	if (isQuotedVideo ? msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 15 : msg.message.videoMessage.seconds > 15) return textImg('too long duration, max 15 seconds')
    let file = await downloadAndSaveMediaMessage("video", "./media/"+sender+".mp4")
    let sticker = new Sticker(fs.readFileSync(file), {
        pack: ``, // The pack name
        author: `ユ\nウ\nキ\n\nY\nu\nu\nk\ni`, // The author name
        type: StickerTypes.CROPPED, // The sticker type
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
        quality: 25, // The quality of the output file
        background: 'transparent' // The sticker background color (only for full stickers)
    })
    const stikk = await sticker.toBuffer() 
    conn.sendMessage(from, {sticker: stikk}, {quoted: msg})
	fs.unlinkSync("./media/"+sender+".mp4")
	   } else {
		   reply(`Kirim gambar/video dengan caption ${prefix}sticker`)
	   }
        break
		case prefix+'take': case prefix+'swm':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			if(isSticker || isQuotedSticker) {
				var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let file = await downloadAndSaveMediaMessage("sticker", "./media/"+sender+".webp")
				anu = q.split("|");
			   var satu = anu[0] !== "" ? anu[0] : `${pushname}`;
			   var dua = typeof anu[1] !== "undefined" ? anu[1] : ``;
					let stc = new Sticker(file, {
		  pack: `${satu}`, // The pack name
		  author: `${dua}`, // The author name
		  type: StickerTypes.FULL, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 75, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await stc.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		fs.unlinkSync("./media/"+sender+".webp")
		} else {
				reply(`Tag sticker dengan caption ${prefix}take`)
			}
			break
		case prefix+'toimg': case prefix+'toimage':
		if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		if(isSticker || isQuotedSticker) {
			var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
			let file = await downloadAndSaveMediaMessage("sticker", "./media/"+sender+".webp")
    		let media = await convert("./media/"+sender+".webp")
                let ran = getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    let buffer = fs.readFileSync(ran)
                    conn.sendMessage(from, { image: buffer, fileLength: 1000000000000000 }, { quoted: msg })
                    fs.unlinkSync(ran)
                })
				limitAdd(sender, limit)
		}
            break
		case prefix+'tourl':
		case prefix+'imgtourl':
		case prefix+'imagetourl':
			if (isImage || isQuotedImage) {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
				var res = await upload(media)
				await reply(res)
				fs.unlinkSync(media)
			}
				break

			// Random Text
			case prefix+'addsay':
				if (body.slice(100)) return reply('Teks lu kepanjangan badut')
				if (q.includes(ownerNumber)) return reply("Tidak dapat menambahkan say yg diawali prefix")
				if (q.startsWith("#")) return reply("Tidak dapat menambahkan say yg diawali prefix")
				if (q.startsWith("/")) return reply("Tidak dapat menambahkan say yg diawali prefix")
				if (q.startsWith("!")) return reply("Tidak dapat menambahkan say yg diawali prefix")
				if (q.startsWith(prefix)) return reply("Tidak dapat menambahkan say yg diawali prefix")
				if (!q) return reply(`Contoh:\n${command} Gw ganteng:v`)
				if (saylist.includes(q)) return reply(`${q}\n*Telah terdaftar di dalam database*`)
				saylist.push(q)
				fs.writeFileSync('./database/saylist.json', JSON.stringify(saylist, null, 2))
				reply(`*Sukses menambahkan:*\n\n${q}\n\n*ke dalam database*`)
				break
			case prefix+'delsay':
				if (!q) return reply(`Contoh:\n${command} Gw ganteng:v`)
				if (!saylist.includes(q)) return reply(`${q}\n*Tidak terdaftar di dalam database*`)
				var posi = saylist.indexOf(q)
				saylist.splice(posi, 1)
				fs.writeFileSync('./database/saylist.json', JSON.stringify(saylist, null, 2))
				reply(`*Sukses menghapus:*\n\n${q}\n\n*ke dari database*`)
				break
			case prefix+'say':
				if (!isGroup) return reply(mess.OnlyGrup)
				const say = JSON.parse(fs.readFileSync('./database/saylist.json'))
				var data = say[Math.floor(Math.random() * say.length)]
				await conn.sendMessage(from, {text: data, mentions: [say]}, {quoted: msg})
				break
			case prefix+'quotesanime':
			case prefix+'quotesnime':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=Rafly11`)
				var hasil = data.result
				var cptn = `*Quote:* ${hasil.quote}\n`
				+`*Character:* ${hasil.character}\n`
				+`*Anime:* ${hasil.anime}\n`
				+`*Episode:* ${hasil.episode}`
				const qnime = {
					key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
					message: {
					  groupInviteMessage: {
						groupJid: from,
						inviteCode: "m",
						groupName: "P",
						caption: hasil.character
					  },
					},
				  };
				await conn.sendMessage(from, {text: cptn}, {quoted: qnime})
				break
			case prefix+'faktaunik':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/random/faktaunik?apikey=Rafly11`)
				var hasil = data.result
				const fku = {
					key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
					message: {
					  groupInviteMessage: {
						groupJid: from,
						inviteCode: "m",
						groupName: "P",
						caption: "Tahukah Kamu?"
					  },
					},
				  };
				await conn.sendMessage(from, {text: hasil}, {quoted: fku})
				break
			case prefix+'puisi':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/random/puisi?apikey=Rafly11`)
				var hasil = data.result
				const puisi = {
					key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
					message: {
					  groupInviteMessage: {
						groupJid: from,
						inviteCode: "m",
						groupName: "P",
						caption: "Puisi"
					  },
					},
				  };
				await conn.sendMessage(from, {text: hasil}, {quoted: puisi})
				break
			case prefix+'katabijak':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/random/katabijak?apikey=Rafly11`)
				var hasil = data.result
				const ktbj = {
					key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
					message: {
					  groupInviteMessage: {
						groupJid: from,
						inviteCode: "m",
						groupName: "P",
						caption: "Kata Bijak"
					  },
					},
				  };
				await conn.sendMessage(from, {text: hasil}, {quoted:ktbj})
				break

			// Photo Oxy
			case prefix+'cup':
				if (!q) return reply(`Example:\n${command} Abcd`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/photooxy1/cup?apikey=Rafly11&text=${q}`)
				await conn.sendMessage(from, {image: data}, {quoted: msg})
				break
			case prefix+'coffe':
				if (!q) return reply(`Example:\n${command} Abcd`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/photooxy1/coffe?apikey=Rafly11&text=${q}`)
				await conn.sendMessage(from, {image: data}, {quoted: msg})
				break
			case prefix+'wolfmetal':
				if (!q) return reply(`Example:\n${command} Abcd`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/photooxy1/wolfmetal?apikey=Rafly11&text=${q}`)
				await conn.sendMessage(from, {image: data}, {quoted: msg})
				break
			case prefix+'smooke':
				if (!q) return reply(`Example:\n${command} Abcd`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/photooxy1/smoke?apikey=Rafly11&text=${q}`)
				await conn.sendMessage(from, {image: data}, {quoted: msg})
				break

	        // Downloader Menu
			case prefix+'tiktok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    await reply(mess.wait)
				data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=Rafly11&url=${q}`)
				var vid = await getBuffer(data.result.link)
			    var buttonsDefault = [
					{ y: { displayText: `y`, id: `y` } }
				]
				var cptn = `████████▀▀▀████\n`
                 +`████████────▀██\n`
                 +`████████──█▄──█\n`
                 +`███▀▀▀██──█████\n`
                 +`█▀──▄▄██──█████\n`
                 +`█──█████──█████\n`
                 +`█▄──▀▀▀──▄█████\n`
                 +`███▄▄▄▄▄███████\n`
				await conn.sendMessage(from, {
				   video: vid,
				   caption: `${cptn}\n`,
				   templateButtons: buttonsDefault,
				   footer: setting.fake
			      }, { quoted: msg })
				  await sleep(1000)
				  var aud = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=Rafly11&url=${q}`)
				  await conn.sendMessage(from, {document: aud, mimetype: "audio/mp4", fileName: 'Tiktok Audio'}, {quoted: msg})
				  limitAdd(sender, limit)
				  break
			case prefix+'tiktokaudio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    await reply(mess.wait)
			    var data = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=Rafly11&url=${q}`)
				await conn.sendMessage(from, {audio: data}, {quoted: msg})
		        break
			case prefix+'pindl':
			case prefix+'pinvid':
			case prefix+'pinterestvid':
			case prefix+'pinterestvideo':
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
					var data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/pindl?link=${q}`)
					const pin = await getBuffer(data.result)
					await conn.sendMessage(from, { video: pin }, { quoted: msg })
					limitAdd(sender, limit)
					break
            case prefix+'play':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                var data = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=Rafly11&query=${q}`)
				var hasil = data.result
				var thumb = await getBuffer(hasil.thumbnail )
				var cptn = `*YOUTUBE PLAY*\n\n`
				+`*${hasil.title}*\n`
				conn.sendMessage(from, {
					image: thumb,
					caption: cptn,
					buttons: [{buttonId: `${prefix}playvid ${q}`, buttonText: { displayText: "Video" }, type: 1 },
					 {buttonId: `${prefix}playaud ${q}`, buttonText: { displayText: "Audio" }, type: 1 }],
					footer: setting.fake
				   }, { quoted: msg })
				   limitAdd(sender, limit)
				} catch(err) {
					reply(mess.error.api)
				}
                break
			
			case prefix+'playvid':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=Rafly11&query=${q}`)
				var hasil = data.result
				var vid = await getBuffer(hasil.video)
				await conn.sendMessage(from, {video: vid}, {quoted: msg})
				break
			case prefix+'playaud':
				var data = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=Rafly11&query=${q}`)
				var hasil = data.result
				var aud = await getBuffer(hasil.audio)
				conn.sendMessage(from, {document: aud, fileName: `${hasil.title}.mp3`, mimetype: "audio/mp3"}, {quoted: msg})
				break
			/*case prefix+'mp4': 
			case prefix+'ytmp4':
				try {
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    var data = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo?apikey=Rafly11&url=${q}`)
				var hasil = data.result
				reply(mess.wait)
				var cptn = `*YOUTUBE VIDEO DOWNLOADER*\n\n`
				+`*Title:* ${hasil.title}\n`
				+`*Likes:* ${hasil.like}\n`
				+`*Desc:*\n${hasil.description}`
				var vid = await getBuffer(hasil.link.link)
				conn.sendMessage(from, {video: vid, caption: cptn}, {quoted: msg})
				limitAdd(sender, limit)
			} catch(err) {
				reply(mess.error.api)
			}
				break
			case prefix+'mp3': 
			case prefix+'ytmp3':
				try {
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    data = await fetchJson(`https://api.lolhuman.xyz/api/ytaudio?apikey=Rafly11&url=${q}`)
				await reply(mess.wait)
				var hasil = data.result
				var thumb = await getBuffer(hasil.thumbnail)
				var cptn = `*YOUTUBE AUDIO DOWNLOADER*\n\n`
				+`*Title:* ${hasil.title}\n`
				+`*Size:* ${hasil.link.size}\n`
				+`*Duration'* ${hasil.duration}\n`
				+`*Desc:*\n${hasil.description}`
				await conn.sendMessage(from, {image: thumb, caption: cptn}, {quoted: msg})
				var aud = await getBuffer(hasil.link.link)
				conn.sendMessage(from,{document: aud, mimetype: "audio/mp4", fileName: hasil.title, fileLength: 1000000000000}, {quoted: msg})
				limitAdd(sender, limit)
			} catch(err) {
				reply(mess.error.api)
			}
			    break*/

				case prefix+'mp4': case prefix+'ytmp4':
				case prefix+'mp3': case prefix+'ytmp3':
					reply(`Fitur error\nUtk sementara gunakan fitur ${prefix}play\n\nContoh:\n${prefix}play https://youtube.com/watch?v=w3RDwQjUekU`)
					break
			
				case prefix+'getvideo':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    await reply(mess.wait)
				var data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/youtube?link=https://youtube.com/watch?v=${arrey[args[1] -1]}`)
				var cptn = `*YOUTUBE VIDEO DOWNLOADER*\n\n`
				+`*Title:* ${data.title}\n`
				+`*Size:* ${data.filesize_video}\n`
				var vid = await getBuffer(data.video)
				conn.sendMessage(from, {video: vid, caption: cptn}, {quoted: msg})
				limitAdd(sender, limit)
				break
			case prefix+'getmusik': case prefix+'getmusic':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    await reply(mess.wait)
			    data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/youtube?link=https://youtube.com/watch?v=${arrey[args[1] -1]}`)
				var thumb = await getBuffer(data.thumb)
				var cptn = `*YOUTUBE AUDIO DOWNLOADER*\n\n`
				+`*Title:* ${data.title}\n`
				+`*Size:* ${data.filesize_audio}\n`
				+`*_Uploading Media..._*`
				await conn.sendMessage(from, {image: thumb, caption: cptn}, {quoted: msg})
				var aud = await getBuffer(data.audio)
				conn.sendMessage(from, {document: aud, fileName: `${data.title}.mp3`, mimetype: "audio/mp3"}, {quoted: msg})
				limitAdd(sender, limit)
			    break
			case prefix+'ig': 
			case prefix+'igdl': 
			case prefix+'instagram':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    await reply(mess.wait)
			    hxz.igdl(q)
	.then(async(result) => {
		for(let i of result.medias){
			if(i.url.includes('mp4')){
				let link = await getBuffer(i.url)
                    conn.sendMessage(from,{video: link}, {quoted: msg})
                } else {
                    let link = await getBuffer(i.url)
                    conn.sendMessage(from, {image: link})                  
                }
            }
				 limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			/*case prefix+'facebook': case prefix+'fbdl':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    await reply(mess.wait)
			    xfar.Facebook(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break*/
			case prefix+'zippyshare': case prefix+'zippy': case prefix+'zp':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
				if (!args[1].includes('zippy')) return reply(mess.error.Iv)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/zippyshare?apikey=Rafly11&url=${q}`)
				var hasil = data.result
				var cptn = `*ZIPPYSHARE DOWNLOADER*\n\n`
				+`*Title:* ${hasil.name_file}\n`
				+`*Size:* ${hasil.size}\n\n`
				+`*UPLOADING MEDIA...*`
				await reply(cptn)
				if (hasil.download_url.includes(".mp4")){
					var zpvid = await getBuffer(hasil.download_url)
					await conn.sendMessage(from, {document: zpvid, fileName: `${hasil.name_file}.mp4`, mimetype: "video/mp4"}, {quoted: msg})
				} else {
				if(hasil.download_url.includes(".pdf")){
					var zppdf = await getBuffer(hasil.download_url)
					await conn.sendMessage(from, {document: zppdf, fileName: `${hasil.name_file}.pdf`, mimetype: "application/pdf", JpegThumbnail: fs.readFileSync(setting.pathimg)}, {quoted: msg})
				} else {
				if(hasil.download_url.includes(".mkv")){
					var zpmkv = await getBuffer(hasil.download_url)
					await conn.sendMessage(from, {document: zpmkv, fileName: `${hasil.name_file}.mkv`, mimetype: "video/mp4"}, {quoted: msg})
				} 
			}
		}
				limitAdd(sender, limit)
			} catch(err) {
				reply(mess.error.api)
			}
				break
			case prefix+'mediafire':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
				if (!args[1].includes('mediafire')) return reply(mess.error.Iv)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/mediafire?apikey=Rafly11&url=${q}`)
				var hasil = data.result
				var cptn = `*MEDIAFIRE DOWNLOADER*\n\n`
						  +`*FileName:* ${hasil.filename}\n`
						  +`*FileType:* ${hasil.filetype}\n`
						  +`*Size:* ${hasil.filesize}\n\n`
						  +`*UPLOADING MEDIA...*`
				await reply(cptn, setting.fake, setting.botName, msg)
				if (hasil.link.includes(".mp4")){
					var mvid = await getBuffer(hasil.link)
					await conn.sendMessage(from, {document: mvid, fileName: `${hasil.filename}.mp4`, mimetype: "video/mp4"}, {quoted: msg})
				} else {
				if(hasil.link.includes(".pdf")){
					var mpdf = await getBuffer(hasil.link)
					await conn.sendMessage(from, {document: mpdf, fileName: `${hasil.filename}.pdf`, mimetype: "application/pdf"}, {quoted: msg})
				} else {
				if(hasil.link.includes(".apk")){
					var mapk = await getBuffer(hasil.link)
					await conn.sendMessage(from, {document: mapk, fileName: `${hasil.filename}.apk`, mimetype: "document/apk"}, {quoted: msg})
				} else {
				if(hasil.link.includes(".zip")){
					var mzip = await getBuffer(hasil.link)
					await conn.sendMessage(from, {document: mzip, fileName: `${hasil.filename}.zip`, mimetype: "document/zip"}, {quoted: msg})
				}
			}
		}
	}
				limitAdd(sender, limit)
} catch(err) {
	reply(mess.error.api)
}
				break
		
			//Animanga
			case prefix+'storyanime': case prefix+'animestory':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/storynime?apikey=Rafly11`)
				var vid = await getBuffer(data.result)
				await conn.sendMessage(from, {video: vid,fileLength: 1000000000, caption: '*ANIME STORY*'}, {quoted: msg})
				limitAdd(sender, limit)
				break
			case prefix+'ppcp':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=Rafly11`)
				var male = await getBuffer(data.result.male)
				var female = await getBuffer(data.result.female)
				await conn.sendMessage(from, {image: male}, {quoted: msg})
				await conn.sendMessage(from, {image: female}, {quoted: msg})
				limitAdd(sender, limit)
				break
			case prefix+'genshin':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				const gsn = JSON.parse(fs.readFileSync('./database/genshin.json'))
				var data = gsn[Math.floor(Math.random() * gsn.length)]
				var hasil = await getBuffer(data)
				await conn.sendMessage(from, {image: hasil, 
					caption: `*GENSHIN ART*`,
					fileLength: 100000000000000,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'waifu':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/waifu?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*WAIFU*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'loli':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://bot25-api.herokuapp.com/randomimg/loli`)
				await conn.sendMessage(from, {image: data, 
					caption: `*LOLI*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				} catch(err) {
					reply(mess.error.api)
				}
				break
			case prefix+'neko':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/neko?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*NEKO*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
				break
			case prefix+'cosplay':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://bot25-api.herokuapp.com/randomimg/cosplay`)
				await conn.sendMessage(from, {image: data, 
					caption: `*COSPLAY*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'elf':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/elf?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*ELF*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'megumin':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/megumin?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*MEGUMIN*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'sagiri':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/sagiri?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*SAGIRI*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'elaina':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/elaina?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*ELAINA*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'shinobu':
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/shinobu?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*shinobu*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break

		// Random Stickers
			case prefix+'gura':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		  var data = await getBuffer(`https://api.lolhuman.xyz/api/sticker/gawrgura?apikey=Rafly11`)
		  let gura = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.FULL, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 75, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await gura.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
		break
		case prefix+'doge':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		  var data = await getBuffer(`https://api.lolhuman.xyz/api/sticker/anjing?apikey=Rafly11`)
		  let doge = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.FULL, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 75, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await doge.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
		break
		case prefix+'patrick':
		case prefix+'patrik':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		  var data = await getBuffer(`https://api.lolhuman.xyz/api/sticker/patrick?apikey=Rafly11`)
		  let patrick = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.FULL, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 75, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await patrick.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
		break
			case prefix+'slap':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			if (!isGroup) return reply(mess.OnlyGrup)
			var data = await getBuffer(`https://api.lolhuman.xyz/api/random/slap?apikey=Rafly11`)
		  let slap = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.CROPPED, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 50, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await slap.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
			break
		case prefix+'dance':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			if (!isGroup) return reply(mess.OnlyGrup)
			var data = await getBuffer(`https://api.lolhuman.xyz/api/random/dance?apikey=Rafly11`)
		  let dance = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.CROPPED, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 50, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await dance.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
			break
		case prefix+'bonk':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			if (!isGroup) return reply(mess.OnlyGrup)
			var data = await getBuffer(`https://api.lolhuman.xyz/api/random/bonk?apikey=Rafly11`)
		  let bonk = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.CROPPED, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 50, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await bonk.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
			break
		case prefix+'kiss':
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			if (!isGroup) return reply(mess.OnlyGrup)
			var data = await getBuffer(`https://api.lolhuman.xyz/api/random/kiss?apikey=Rafly11`)
		  let kiss = new Sticker(data, {
		  pack: ``, // The pack name
		  author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
		  type: StickerTypes.CROPPED, // The sticker type
		  categories: ['🤩', '🎉'], // The sticker category
		  id: '12345', // The sticker id
		  quality: 50, // The quality of the output file
		  background: 'transparent' // The sticker background color (only for full stickers)
		  })
		  var buffer = await kiss.toBuffer()
		  conn.sendMessage(from, {sticker: buffer, fileLength: 1000000000000}, {quoted: msg})
		  limitAdd(sender, limit)
			break
			
			// Owner Menu
			case prefix+'ownermenu':
			if (!isOwner) return
				var cptn = `❮ *OWNER TOOLS* ❯\n\n`
				+`>\n`
				+`x\n`
				+`$\n`
				+`${prefix}join\n`
				+`${prefix}leave\n`
				+`${prefix}broadcast\n`
				+`${prefix}reset\n`
				+`${prefix}setpp\n`
				+`${prefix}setmenupic\n`
				+`${prefix}setmenugif\n`
				+`${prefix}setmenupic\n`
				+`${prefix}addprem\n`
				+`${prefix}delprem\n`
				+`${prefix}addblock\n`
				+`${prefix}delblock\n`
			await reply(cptn)
			break
			case prefix+'setmenupic':
				if (!isOwner) return reply(mess.OnlyOwner)
				if (isImage || isQuotedImage) {
					var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
					var media = await downloadAndSaveMediaMessage('image',"./media/menupic.jpeg")
				}
				reply('*Done*')
				break
			case prefix+'setmenugif':
				if (!isOwner) return reply(mess.OnlyOwner)
				if (isVideo || isQuotedVideo) {
					var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
					var media = await downloadAndSaveMediaMessage('video',"./media/menugif.mp4")
				}
				reply('*Done*')
				break
			case prefix+'setmenuaud':
				if (!isOwner) return reply(mess.OnlyOwner)
				if (isQuotedAudio) {
					var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
					var media = await downloadAndSaveMediaMessage('audio',"./media/menuaud.mp3")
				}
				reply('*Done*')
				break
			
			case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
			case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
             case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
		        if (args.length < 2) return reply(`Masukkan isi pesannya`)
                var data = await store.chats.all()
                      for (let i of data) {
                      conn.sendMessage(i.id, { text: `${q}\n\n❮ *NOTICE MY SENPAI* ❯` }, {quoted: fgclink})
                      await sleep(1000)
                            }
                            break
			case prefix+'setpp': case prefix+'setppbot':
		        if (!isOwner) return reply(mess.OnlyOwner)
		        if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
				  var data =  await conn.updateProfilePicture(botNumber, { url: media })
			      fs.unlinkSync(media)
				  reply(`Sukses`)
				} else {
				  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
				}
				break
			case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			case prefix+'addblock':
				if (!isOwner) return reply(mess.OnlyOwner)
				const addblock = `${q + '@s.whatsapp.net'}`
				block.push(addblock)
				fs.writeFileSync("./database/block.json", JSON.stringify(block, null, 2))
				await sleep(1000)
				conn.updateBlockStatus(addblock, "block")
				reply('Done')
				break
			case prefix+'delblock':
				if (!isOwner) return reply(mess.OnlyOwner)
				const delblock = `${q + '@s.whatsapp.net'}`
				var posi = block.indexOf(delblock)
				block.splice(posi, 1)
				fs.writeFileSync("./database/block.json", JSON.stringify(block))
				await sleep(1000)
				conn.updateBlockStatus(delblock, "unblock")
				reply('Done')
				break
			/*case 'react':
			case 'bang':
			case 'banh':
				if (!isOwner) return
				const reactionMessage = {
					react: {
						text: `${args[1]}`,
						key: msg.quoted ? msg.quoted.key : msg.key,
					},
				};
				await conn.sendMessage(msg.from, reactionMessage)
			break*/

			case prefix+'addgenshin':
			case prefix+'adg':
				const genshin = JSON.parse(fs.readFileSync('./database/genshin.json'));
				if (!isOwner) return
				if (isImage || isQuotedImage) {
					var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
					var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
					var res = await upload(media)
					genshin.push(res)
					fs.writeFileSync('./database/genshin.json', JSON.stringify(genshin, null, 2))
				reply(`*Total Genshin Picture: ${genshin.length}*`)
				}
				break

			case prefix+'reset':
				if (!isOwner) return reply(mess.OnlyOwner)
				glimit.splice(glimit)
				limit.splice(limit)
				fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit, null, 2))
				fs.writeFileSync('./database/limit.json', JSON.stringify(limit, null, 2))
				reply('Sukses Reset Limit & GLimit')
				break

			// Search Menu
			case prefix+'lirik': case 'liriklagu':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
				await reply(mess.wait)
			    ra.Musikmatch(q).then(async(data) => {
				  var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
				  conn.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: msg })
				}).catch(() => reply(`Judul lagu tidak ditemukan`))
				limitAdd(sender, limit)
				break
			/*case prefix+'grupwa': case prefix+'searchgrup':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
				await reply(mess.wait)
			    hxz.linkwa(q).then(async(data) => {
				  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
				  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
				  for (let x of data) {
					teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
				  }
				  reply(teks)
				  limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break*/
			case prefix+'pinterest':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
				await reply(mess.wait)
			    var jumlah;
			    if (q.includes('--')) jumlah = q.split('--')[1]
			    pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
				  if (q.includes('--')) {
					if (data.result.length < jumlah) {
					  jumlah = data.result.length
					  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
					}
					for (let i = 0; i < jumlah; i++) {
					  conn.sendMessage(from, { image: { url: data.result[i] }, fileLength: 100000000000 })
					}
				    limitAdd(sender, limit)
				  } else {
					var but = [{buttonId: `${command} ${q}`, buttonText: { displayText: 'Next' }, type: 1 }]
					conn.sendMessage(from, { caption: `*${q}*`, image: { url: pickRandom(data.result) }, fileLength: 100000000000, buttons: but, footer: setting.fake }, { quoted: msg })
				    limitAdd(sender, limit)
				  }
				})
			    break
			case prefix+'yts': case prefix+'ytsearch':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
				await reply(mess.wait)
			    youtubeSearch(q).then( data => {
				  let yt = data.video
                  if (!yt) throw 'Tidak di temukan, coba untuk membalikkan judul dan author nya'
                  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = yt
                  const url = 'https://www.youtube.com/watch?v=' + videoId
				  var jumlah = 15
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 *${prefix}getmusic <no urutan>*
 *${prefix}getvideo <no urutan>*
 Untuk mengambil Audio/Video dari hasil pencarian`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Upload :* ${yt[i].publishedTime}\n*▢ Ditonton :* ${yt[i].viewH}\n*▢ Duration :* ${yt[i].durationH}\n*▢ URL :* ${yt[i].url}\n`
				}
				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
				limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'sauce':
			case prefix+'sc':
				if (isImage || isQuotedImage) {
					var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
					var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
					var res = await upload(media)
					reply('*SEARCHING...*')
					data = await fetchJson(`https://h2wan.herokuapp.com/api/sauce?URL=${res}`)
                      hasil = data.result
					  for (var sc of hasil) {
					  var cptn = `*Url:* ${sc.url}\n`
                      +`*Site:* ${sc.site}\n`
                      +`*Index:* ${sc.index}\n`
                      +`*Similarity:* ${sc.similarity}\n`
                      +`*Thumbnail:* ${sc.thumbnail}\n\n`
					await reply(cptn)
					}
					} else {
					reply('tag/reply picture')
					}
				fs.unlinkSync("./media/"+sender+".jpg")
				break

			// Game Menu
			case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
				if (!isGroup)return reply(mess.OnlyGrup)
			    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentionByTag.length !== 1) {
				if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                     var hadiah = randomNomor(100, 150)
				     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
						hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentionByTag[0],
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
					 gameAdd(sender, limit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
			case prefix+'delttt':
            case prefix+'delttc':
                if (!isGroup)return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                var posi = getPosTic(from, tictactoe)
                if (tictactoe[posi].penantang.includes(sender)) {
                    tictactoe.splice(posi, 1)
                    reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else {
                   reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                }
                break
			case prefix+'tebakgambar':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
				  var data = await fetchJson(`https://api.lolhuman.xyz/api/tebak/gambar2?apikey=Rafly11`)
				  var hasil = data.result
				  jawaban = hasil.answer.split('Answer ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: { url: hasil.image }, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				} catch(err) {
					reply(mess.error.api)
				}
			    break
			case prefix+'tebakkimia': case prefix+'tebakimia':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakkimia)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakkimia[getGamePosi(from, tebakkimia)].msg)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/tebak/unsurkimia?apikey=Rafly11`)
				var hasil = data.result
				var jawaban = hasil.lambang.split('Lambang ').join('')
				var cptn = `*TEBAK KIMIA*\n\nLambang dari ${hasil.nama}\n\nWaktu : ${gamewaktu}s`
				reply(cptn)
				.then( res => {
				var jawab = jawaban.toLowerCase()
				addPlayGame(from, 'Tebak Kimia', jawab, gamewaktu, res, tebakkimia)
					gameAdd(sender, glimit)
				})
			} catch(err) {
				reply(mess.error.api)
			}
				break
			case prefix+'susunkata':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, susunkata)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, susunkata[getGamePosi(from, susunkata)].msg)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/tebak/susunkata?apikey=Rafly11`)
				var jawaban = data.result.jawaban.split('Jawaban ').join('')
				var cptn = `*SUSUN KATA*\n\n${data.result.pertanyaan}\n\nWaktu : ${gamewaktu}s`
				reply(cptn)
				.then( res => {
				var jawab = jawaban.toLowerCase()
				addPlayGame(from, 'susunkata', jawab, gamewaktu, res, susunkata)
					gameAdd(sender, glimit)
				})
			} catch(err) {
				reply(mess.error.api)
			}
				break
			case prefix+'tebakchara': case prefix+'tebakcharacter':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakchara)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakchara[getGamePosi(from, tebakchara)].msg)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/tebakchara?apikey=Rafly11`)
				var thumb = await getBuffer(data.result.image)
				  jawaban = data.result.name.split('name ').join('')
				  var teks = `*TEBAK KARAKTER*\n\n`+monospace(`Petunjuk : ${data.result.name.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: thumb, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Karakter', jawab, gamewaktu, res, tebakchara)
					gameAdd(sender, glimit)
				  })
				} catch(err) {
					reply(mess.error.api)
				}
			    break
			case prefix+'siapaaku':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, siapaaku)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, siapaaku[getGamePosi(from, siapaaku)].msg)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/tebak/siapaaku?apikey=Rafly11`)
				jawaban = data.result.answer.split('answer ').join('')
				  var teks = `*SIAPAKAH AKU?*\n\n${data.result.question}\n`+monospace(`Petunjuk : ${data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { text: teks }, { quoted: msg })
				  .then( res => {
					var jawab = jawaban.toLowerCase()
					addPlayGame(from, 'Siapakah Aku', jawab, gamewaktu, res, siapaaku)
					gameAdd(sender, glimit)
				  })
				} catch(err) {
					reply(mess.error.api)
				}
			    break
			case prefix+'asahotak':
				try {
				if (!isGroup) return reply(mess.OnlyGrup)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, asahotak)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, asahotak[getGamePosi(from, asahotak)].msg)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/tebak/asahotak?apikey=Rafly11`)
				jawaban = data.result.jawaban.split('jawaban ').join('')
				  var teks = `*ASAH OTAK*\n\n${data.result.pertanyaan}\n`+monospace(`Petunjuk : ${data.result.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { text: teks }, { quoted: msg })
				  .then( res => {
					var jawab = jawaban.toLowerCase()
					addPlayGame(from, 'Asah Otak', jawab, gamewaktu, res, asahotak)
					gameAdd(sender, glimit)
				  })
				} catch(err) {
					reply(mess.error.api)
				}
			    break

			case prefix+'dadu':
			case prefix+'dice':
				if (!isGroup) return reply(mess.OnlyGrup)
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
				if (!q) return reply('tambahkan angka 1/2/3/4/5/6')
				addBalance(sender, -250, balance)
				reply(`Sebanyak $250 balance digunakan `)
				var angka = ['1', '2', '3', '4', '5', '6']
				var kocok = angka[Math.floor(Math.random() * angka.length)]
				var data = await getBuffer(`https://api.lolhuman.xyz/api/sticker/dadu?apikey=Rafly11`)
				let dadu = new Sticker(data, {
					pack: ``, // The pack name
					author: `ユ\nウ\nキ\n\nA\nk\ni\nr\na\na`, // The author name
					type: StickerTypes.FULL, // The sticker type
					categories: ['🤩', '🎉'], // The sticker category
					id: '12345', // The sticker id
					quality: 50, // The quality of the output file
					background: 'transparent' // The sticker background color (only for full stickers)
					})
					var buffer = await dadu.toBuffer()
					await conn.sendMessage(from, {sticker: buffer}, {quoted: msg})
				if (kocok.includes(q)) {
					var cptn = `Hasil: ${kocok}\nSelamat kamu mendapatkan $1000 balance`
					reply(cptn)
					addBalance(sender, 1000, balance)
				}
				if (!kocok.includes(q)) {
					var cptn = `Hasil: ${kocok}\nMaaf kamu kurang beruntung`
					reply(cptn)
				}
				gameAdd(sender, glimit)
				break

			// Group Menu
			case prefix+'afk':
				if (!isGroup) return
				if (body.slice(50)) return reply('Alasan lu kepanjangan badut')
				const alasan = `${q}`
				afk[sender.split('@')[0]] = alasan.toLowerCase()
                    fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
                    const afkny = `*[ AFK USER ]*\n\n*${pushname}* afk now!\n`
                    +`reason : ${alasan}`
                    const fakeafk = (teks) => {
                      conn.sendMessage(from, {text: teks}, {
                        quoted: {
                          key: {
                            fromMe: false,
                            participant: `0@s.whatsapp.net`,
                            ...(from ? { remoteJid: "393480920957-1442683491@g.us" } : {}),
                          },
                          message: {
                            imageMessage: {
                              url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                              mimetype: "image/jpeg",
                              caption: `${pushname} Afk Now!!!`,
                              fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                              fileLength: "28777",
                              height: 1080,
                              width: 1079,
                              mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                              fileEncSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                              directPath:
                                "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                              mediaKeyTimestamp: "1610993486",
                              jpegThumbnail: fs.readFileSync(setting.pathimg),
                              scansSidecar:
                                "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==",
                            },
                          },
                        },
                      });
                    };
                    fakeafk(afkny)
                    break
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc': case prefix+'setppgroup':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			        var media = await downloadAndSaveMediaMessage(qmsg)
                var group = from
                var { img } = conn.generateProfilePicture(media)
                await conn.query({
                tag: 'iq',
                attrs: {
                to: group, 
                type:'set',
                xmlns: 'w:profile:picture'
                },
                content: [
                {
                tag: 'picture',
                attrs: { type: 'image' },
                content: img
               }
               ]
               })
               reply(`Success`)
				break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'group': case prefix+'grup':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				if (args[1] == "close") {
				  conn.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  conn.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
				
			// Bank & Payment Menu
			case prefix+'topbalance': {
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*❒ 「 TOP BALANCE 」 ❒*\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n┗➥ Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
			}
			break
			case prefix+'toplevel':{
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let topl = '*❒ 「 TOP LEVEL 」 ❒*\n\n'
                let arrTopl = []
				var total = 10
				if (_level.length < 10) total = _level.length
                for (let i = 0; i < total; i ++){
                    topl += `${i + 1}. @${_level[i].id.split("@")[0]}\n┗⊱ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n\n`
                    arrTopl.push(_level[i].id)
                }
                mentions(topl, arrTopl, true)
            }
			break
			
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
            case prefix+'tf':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @6285791458996 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break

			//PROFILE

			case prefix+'profile':
            case prefix+'me':
			case prefix+'limit':
			case prefix+'balance':
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
				let premiumnya = `${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
				let header = `❒ *「 Profile User 」* ❒`
				let type = `${isOwner ? 'Cheater' : isPremium ? 'Elite' : 'Free'}`
				let xp = `${getLevelingXp(sender)}`
				let level = `${getLevelingLevel(sender)}`
				let requiredXp = 5000 * (Math.pow(2, level) - 1)
				let roleny = `${isOwner ? 'Fallen Angel' : role}`
				let limith = `${isOwner ? '∞' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}`
                let limitg = `${cekGLimit(sender, gcount, glimit)}`
				let balanceny = `$${getBalance(sender, balance)}`
				let expired = `${isOwner ? '∞' : isPremium ? premiumnya : '-'}`
				const cptnp = `${header}\n\n`
				+`🔖 *Name:* ${pushname}\n`
				+`📡 *Type:* ${type}\n`
				+`⏳ *Expired:* ${expired}\n\n`
				+`🗝️ *Limit:* ${limith}\n`
				+`🔑 *Glimit:* ${limitg}\n`
				+`💵 *Balance:* ${balanceny}\n\n`
				+`📍 *Level:* ${level}\n`
				+`🔎 *Xp:* ${xp}/${requiredXp}\n`
				+`🔮 *Role:* ${roleny}\n`
				try {
					var pp_user = await conn.profilePictureUrl(sender, 'image')
				  } catch {
					var pp_user = 'https://telegra.ph/file/697858c5140630f089f6e.jpg'
				  }
				let pp = await getBuffer(`https://api.lolhuman.xyz/api/welcomeimage?apikey=Rafly11&img=${pp_user}&text=${sender.split("@")[0]}\nLevel: ${level}\nXp: ${xp}\nRole: ${role}`)
				await conn.sendMessage(from, {image: pp ,caption: cptnp, fileLength: 1000000000000000 }, {quoted: ftokoo})
				break

			case prefix+'listblock': case prefix+'blocklist':{
                let listban = '*❒ 「 BLACK LIST 」 ❒*\n\n'
                let listny = []
				if (block.length) total = block.length
                for (let i = 0; i < total; i ++){
                    listban += `${i + 1}. @${block[i].split("@")[0]}\n`
                    listny.push(block[i])
                }
                mentions(listban, listny, true)
            }
			break
			
			default:
			if (!isGroup && isCmd) {
				reply(`*CMD Not Found* ಠ_ಠ`)
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
