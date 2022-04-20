"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid, convert } = require("../lib/myfunc");
const { webp2mp4File, ffmpeg, upload } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");

const fs = require ("fs");
const fetch = require('node-fetch');
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');


// DB Game
let tictactoe = [];
let tebakgambar = []
let tebakkimia = []
let susunkata = []

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _level = JSON.parse(fs.readFileSync('./database/level.json'));

//LEVELING
const getLevelingXp = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].id
	}
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (sender) => {
	const obj = {id: sender, xp: 1, level: 1}
	_level.push(obj)
	fs.writeFileSync('./database/level.json', JSON.stringify(_level), null, 2)
}

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, botName, gamewaktu, limitCount } = setting
		let { allmenu, levelup } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
		const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = '$'
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
		const isOwner = ownerNumber == sender ? true : ["687731367@s.whatsapp.net", "436506699997000@s.whatsapp.net"].includes(sender) ? true : false
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
                const isWelcome = isGroup ? welcome.includes(from) ? true : false : false

		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
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
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
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
		
		const buttonsDefault = [
			{ callButton: { displayText: `OWNER NUMBER`, phoneNumber: `+687 73.13.67` } },
			{ urlButton: { displayText: `BOT GROUP`, url : `https://chat.whatsapp.com/FNvoKzB3VlY8MInlFJcecg` } },
			{ quickReplyButton: { displayText: `Owner`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `Info`, id: `${prefix}info` } },
			{ quickReplyButton: { displayText: `Changelog`, id: `${prefix}changelog` } }
		]
        
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
		conn.sendReadReceipt(from, sender, [msg.key.id])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (chats && !isUser && !fromMe) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		  console.log(color('[REGISTER]','red'), color(sender,'yellow'), color(from, 'cyan'))
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
                    await reply(levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel))
                }
            } catch (err) {
                console.error(err)
            }
        }

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		cekWaktuGame(conn, tebakkimia)
		if (isPlayGame(from, tebakkimia) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakkimia)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakkimia*`)
		    tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
		  }
		}
		cekWaktuGame(conn, susunkata)
		if (isPlayGame(from, susunkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
		    var htgm = randomNomor(200, 300)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, susunkata)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}susunkata*`)
		    susunkata.splice(getGamePosi(from, susunkata), 1)
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
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			
			case prefix:
			case 'test':
			case 'bot':
			case '@421951902500':
				const test = `${ucapanWaktu} ${pushname}`
				const thumbtest = await getBuffer(`https://api.lolhuman.xyz/api/random/art?apikey=Rafly11`)
				conn.sendMessage(from, { caption: `${test}`, image: thumbtest, buttons: [{buttonId: `${prefix}help`, buttonText: { displayText: "MENU" }, type: 1 }], footer: setting.fake }, { quoted: msg })
				break
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(pushname, prefix)
			    conn.sendMessage(from, { caption: teks, location: { jpegThumbnail: fs.readFileSync(setting.pathimg) }, templateButtons: buttonsDefault, footer: setting.fake, mentions: [sender] })
				break
			case prefix+'info':
				const user = JSON.parse(fs.readFileSync('./database/user.json'))
				const _user = user.length
				var timestamp = speed();
                var latensi = speed() - timestamp
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/waifu?apikey=Rafly11`)
				var info = `*SIMPLE BOT WHATSAPP*\n\n`
				+`*Bot Name:* ${setting.botName}\n`
				+`*Prefix:* ${prefix}\n`
				+`*Registered*: ${_user}\n`
				+`*Library:* Baileys-md\n`
				+`*SpeedTest:* ${latensi.toFixed(4)} Second\n`
				+`*RunTime:* ${runtime(process.uptime())}\n\n`
				+`*Date:* ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\n`
				+`*Time:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}\n\n`
				+`--------------------------\n`
				+`*SIMPLE RULES:*\n`
				+`Call/Spam = Block!!!\n`
				+`Kelewat gblk = block!!!\n`
				await conn.sendMessage(from, {image: data, caption: info}, {quoted: msg})
				break
			case prefix+'changelog':
				var cptn = `*CHANGLOG*\n\n`
				+`*[14-04-2022]*\n`
				+`Change Library from Legacy to Multi Device\n\n`
				+`*[15-04-2022]*\n`
				+`Add some games feature\n`
				+`${prefix}tictactoe\n`
				+`${prefix}tebakgambar\n\n`
				+`*[16-04-2022]*\n`
				+`${prefix}waifu\n`
				+`${prefix}loli\n`
				+`${prefix}neko\n`
				+`${prefix}megumin\n`
				+`${prefix}sagiri\n`
				+`${prefix}elaina\n`
				+`${prefix}shinobu\n`
				+`${prefix}elf\n`
				+`${prefix}cosplay\n\n`
				+`*[17-04-2022]*\n`
				+`${prefix}susunkata\n`
				+`${prefix}tebakkimia\n\n`
				+`*[20-04-2022]*\n`
				+`Added Leveling System\n`
				+`${prefix}storyanime`
				reply(cptn)
				break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'donate':
			case prefix+'donasi':
			    reply(`*「 DONATE 」*\n\n\n\`\`\`GOPAY : 085158322853\`\`\`\n\`\`\`PULSA : 082171732892 (Tsel)\`\`\`\n\n*「 THANK YOU 」*`)
			    break
			case prefix+'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Owner', msg)
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
      pack: `Sticker Request by\n${pushname}`, // The pack name
      author: `Create by ユウキ||Yuuki Bot`, // The author name
      type: StickerTypes.FULL, // The sticker type
      categories: ['🤩', '🎉'], // The sticker category
      id: '12345', // The sticker id
      quality: 75, // The quality of the output file
      background: 'transparent' // The sticker background color (only for full stickers)
      })
      var buffer = await stc.toBuffer()
      conn.sendMessage(from, {sticker: buffer}, {quoted: msg})
	} else if (isVideo || isQuotedVideo) {
	if (isQuotedVideo ? msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 15 : msg.message.videoMessage.seconds > 15) return textImg('too long duration, max 15 seconds')
    let file = await downloadAndSaveMediaMessage("video", "./media/"+sender+".mp4")
    let ahsuhfkj = await convert("./media/"+sender+".mp4")
    let sticker = new Sticker(fs.readFileSync(ahsuhfkj), {
        pack: `Sticker Request by\n${pushname}`, // The pack name
        author: `Create by ユウキ||Yuuki Bot`, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
        quality: 75, // The quality of the output file
        background: 'transparent' // The sticker background color (only for full stickers)
    })
    const stikk = await sticker.toBuffer() 
    conn.sendMessage(from, {sticker: stikk}, {quoted: msg})
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
			   var satu = anu[0] !== "" ? anu[0] : ``;
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
		  conn.sendMessage(from, {sticker: buffer}, {quoted: msg})
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
                    conn.sendMessage(from, { image: buffer }, { quoted: msg })
                    fs.unlinkSync(ran)
                })
				limitAdd(sender, limit)
		}
            break
		case prefix+'tourl': case prefix+'imagetourl': case prefix+'imgtourl':
		if (isImage || isQuotedImage) {
			var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			var media = await downloadAndSaveMediaMessage('image',"./media/"+sender+".jpg")
			var res = await upload(media)
			reply(res)
		}
			break

	        // Downloader Menu
			case prefix+'tiktok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Tiktok(args[1]).then( data => {
			      conn.sendMessage(from, {
				   video: { url: data.medias[0].url },
				   caption: `${data.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, pencet tombol dibawah untuk mengubahnya!`,
				   buttons: [{buttonId: `${prefix}tiktoknowm ${args[1]}`, buttonText: { displayText: "Video No-Wm" }, type: 1 },
					{buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: "Audio" }, type: 1 }],
				   footer: setting.fake
			      }, { quoted: msg })
				  limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			case prefix+'tiktoknowm':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'tiktokaudio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      conn.sendMessage(from, { audio: { url: data.nowm }, mimetype: 'audio/mp4' }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
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
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                var data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/play?query=${q}`)
				var thumb = await getBuffer(data.thumb)
				var cptn = `*YOUTUBE PLAY*\n\n`
				+`*Title:* ${data.title}\n`
				+`*Video Size:* ${data.filesize_video}\n`
				+`*Audio Size:* ${data.filesize_audio}\n`
				+`*Views:* ${data.views}\n`
				+`*Likes:* ${data.likes}\n\n`
				+`*Desc:*\n${data.desc}`
				conn.sendMessage(from, {
					image: thumb,
					caption: cptn,
					buttons: [{buttonId: `${prefix}playvid ${q}`, buttonText: { displayText: "Video" }, type: 1 },
					 {buttonId: `${prefix}playaud ${q}`, buttonText: { displayText: "Audio" }, type: 1 }],
					footer: setting.fake
				   }, { quoted: msg })
				   limitAdd(sender, limit)
                break
			
			case prefix+'playvid':
				data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/play?query=${q}`)
				var vid = await getBuffer(data.video)
				conn.sendMessage(from, {video: vid}, {quoted: msg})
				break
			case prefix+'playaud':
				data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/play?query=${q}`)
				var aud = await getBuffer(data.audio)
				conn.sendMessage(from, {document: aud, fileName: `${data.title}.mp3`, mimetype: "audio/mp3"}, {quoted: msg})
				break
			case prefix+'mp4': case prefix+'ytmp4':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    var data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/youtube?link=${q}`)
				var cptn = `*YOUTUBE VIDEO DOWNLOADER*\n\n`
				+`*Title:* ${data.title}\n`
				+`*Size:* ${data.filesize_video}\n\n`
				+`*Desc:*\n${data.desc}`
				var vid = await getBuffer(data.video)
				conn.sendMessage(from, {video: vid, caption: cptn}, {quoted: msg})
				limitAdd(sender, limit)
				break
			case prefix+'mp3': case prefix+'ytmp3':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    data = await fetchJson(`https://bot25-api.herokuapp.com/downloader/youtube?link=${q}`)
				var thumb = await getBuffer(data.thumb)
				var cptn = `*YOUTUBE AUDIO DOWNLOADER*\n\n`
				+`*Title:* ${data.title}\n`
				+`*Size:* ${data.filesize_audio}\n\n`
				+`*Desc:*\n${data.desc}`
				await conn.sendMessage(from, {image: thumb, caption: cptn}, {quoted: msg})
				var aud = await getBuffer(data.audio)
				conn.sendMessage(from, {document: aud, fileName: `${data.title}.mp3`, mimetype: "audio/mp3"}, {quoted: msg})
				limitAdd(sender, limit)
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
			    reply(mess.wait)
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
			    reply(mess.wait)
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
			case prefix+'ig': case prefix+'igdl': case prefix+'instagram':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
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
			case prefix+'facebook': case prefix+'fbdl':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Facebook(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'zippyshare': case prefix+'zippy': case prefix+'zp':
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
				reply(cptn)
				if (hasil.download_url.includes(".mp4")){
					var zpvid = await getBuffer(hasil.download_url)
					await conn.sendMessage(from, {document: zpvid, fileName: `${hasil.name_file}.mp4`, mimetype: "video/mp4"}, {quoted: msg})
				} else {
				if(hasil.download_url.includes(".pdf"))
					var zppdf = await getBuffer(hasil.download_url)
					await conn.sendMessage(from, {document: zppdf, fileName: `${hasil.name_file}.pdf`, mimetype: "pdf"}, {quoted: msg})
				}
				limitAdd(sender, limit)
				break


			//Animanga
			case prefix+'storyanime': case prefix+'animestory':
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://api.lolhuman.xyz/api/storynime?apikey=Rafly11`)
				var vid = await getBuffer(data.result)
				await conn.sendMessage(from, {video: vid, caption: '*ANIME STORY*'}, {quoted: msg})
				limitAdd(sender, limit)
				break

			case prefix+'waifu':
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
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://bot25-api.herokuapp.com/randomimg/loli`)
				await conn.sendMessage(from, {image: data, 
					caption: `*LOLI*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			case prefix+'neko':
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/neko?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*NEKO*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
				break
			case prefix+'cosplay':
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
				if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await getBuffer(`https://api.lolhuman.xyz/api/random/shinobu?apikey=Rafly11`)
				await conn.sendMessage(from, {image: data, 
					caption: `*shinobu*`,
					buttons : [{buttonId: `${command}`, buttonText: { displayText: "Next" }, type: 1 }],
					footer: setting.fake},
					{quoted: msg})
					limitAdd(sender, limit)
				break
			
			
			
			// Owner Menu
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
                               conn.sendMessage(i.id, { text: `${q}\n\n_*BROADCAST MESSAGE*_` })
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
			case prefix +'react':
				if (!isOwner) return
				const reactionMessage = {
                    react: {
                        text: args[2],
                        key: { remoteJid: from, fromMe: true, id: quoted.id }
                    }
                }
                conn.sendMessage(from, reactionMessage)
            
			break

			
			// Search Menu
			case prefix+'lirik': case 'liriklagu':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
				reply(mess.wait)
			    ra.Musikmatch(q).then(async(data) => {
				  var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
				  conn.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: msg })
				}).catch(() => reply(`Judul lagu tidak ditemukan`))
				limitAdd(sender, limit)
				break
			case prefix+'grupwa': case prefix+'searchgrup':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
				reply(mess.wait)
			    hxz.linkwa(q).then(async(data) => {
				  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
				  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
				  for (let x of data) {
					teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
				  }
				  reply(teks)
				  limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'pinterest':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
				reply(mess.wait)
			    var jumlah;
			    if (q.includes('--')) jumlah = q.split('--')[1]
			    pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
				  if (q.includes('--')) {
					if (data.result.length < jumlah) {
					  jumlah = data.result.length
					  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
					}
					for (let i = 0; i < jumlah; i++) {
					  conn.sendMessage(from, { image: { url: data.result[i] }})
					}
				    limitAdd(sender, limit)
				  } else {
					var but = [{buttonId: `${command} ${q}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					conn.sendMessage(from, { caption: `*${q}*`, image: { url: pickRandom(data.result) }, buttons: but, footer: setting.fake }, { quoted: msg })
				    limitAdd(sender, limit)
				  }
				})
			    break
			case prefix+'yts': case prefix+'ytsearch':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
				reply(mess.wait)
			    yts(q).then( data => {
				  let yt = data.videos
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
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}
				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
				limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
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
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
				kotz.tebakgambar().then( data => {
				  data = data[0]
				  data.jawaban = data.jawaban.split('Jawaban ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = data.jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				})
			    break
			case prefix+'tebakkimia': case prefix+'tebakimia':
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakkimia)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakkimia[getGamePosi(from, tebakkimia)].msg)
				var data = await fetchJson(`https://docs-jojo.herokuapp.com/api/tebak-unsur-kimia`)
				var jawaban = data.lambang.split('Lambang ').join('')
				var cptn = `*TEBAK KIMIA*\n\nLambang dari ${data.nama}\n\nWaktu : ${gamewaktu}s`
				reply(cptn)
				.then( res => {
				var jawab = jawaban.toLowerCase()
				addPlayGame(from, 'Tebak Kimia', jawab, gamewaktu, res, tebakkimia)
					gameAdd(sender, glimit)
				})
				break
			case prefix+'susunkata':
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
				break

			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			      await conn.updateProfilePicture(from, { url: media })
				  .then( res => {
					reply(`Sukses`)
					fs.unlinkSync(media)
				  }).catch(() => reply(mess.error.api))
				} else {
			      reply(`Kirim/balas gambar dengan caption ${command}`)
				}
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
				case prefix+'welcome':
					if (!isGroup) return reply(mess.OnlyGrup)
					if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
					if (args.length < 2) return reply(`Pilih enable atau disable`)
					if (args[1].toLowerCase() === "enable") {
					  if (isWelcome) return reply(`Welcome sudah aktif`)
					  welcome.push(from)
					  fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
					  reply(`Sukses mengaktifkan welcome di grup ini`)
					} else if (args[1].toLowerCase() === "disable") {
					  if (!isWelcome) return reply(`Welcome sudah nonaktif`)
					  var posi = welcome.indexOf(from)
					  welcome.splice(posi, 1)
					  fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
					  reply(`Sukses menonaktifkan welcome di grup ini`)
					} else {
					  reply(`Pilih enable atau disable`)
					}
					break
			
			// Bank & Payment Menu
			case prefix+'topbalance': case prefix+'top':{
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
			case prefix+'limit': case prefix+'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    textImg(`Limit : ${isPremium ? 'Unlimited' : limitPrib}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
				break

			//PROFILE

			case prefix+'profile':
            case prefix+'me':
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
				let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
				let header = `❒ *「 Profile User 」* ❒\n`
				let type = `❒ *Type* : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}`
				var xp = `❒ *Xp:* ${getLevelingXp(sender)}`
				var level = `❒ *Level:* ${getLevelingLevel(sender)}`
				let limith = `❒ *Limit :* ${isOwner ? '∞' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}`
                let limitg = `❒ *Game Limit :* ${isOwner ? '∞' : cekGLimit(sender, gcount, glimit)}`
				let expired = `❒ *Expired :* ${isOwner ? '∞' : isPremium ? premiumnya : '-'}`
				try {
					var pp = await conn.profilePictureUrl(sender, 'image')
				  } catch {
					var pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				  }
				const ppnye = await getBuffer(pp)
				var profile = `${header}\n${type}\n${xp}\n${level}\n${expired}\n${limitg}\n${limith}\n`
				conn.sendMessage(from, {image: ppnye, caption: profile}, {quoted:msg})
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
