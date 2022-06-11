const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "Selamat malam kak";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat sore kak";
    }
    if (time2 < "16:00:00") {
      var ucapanWaktu = "Selamat siang kak";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat pagi kak";
    }
	if (time2 < "05:00:00") {
      var ucapanWaktu = "Subuh lord";
    }
	if (time2 < "03:00:00") {
      var ucapanWaktu = "Gk tidur kak?";
    }
let setting = JSON.parse(fs.readFileSync('./config.json'))

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role) => {
	return`
┏━━━⊱ ⸨ *LEVEL UP* ⸩
┣──────────────────⊱
┣➥ *Name* : ${pushname}
┣➥ *Number* : wa.me/${sender.split("@")[0]}
┣➥ *Xp* : ${getLevelingXp(sender)}
┣➥ *Level* : ${getLevel} ⊱ ${getLevelingLevel(sender)}
┗──────────────────⊱
`}

exports.allmenu = (pushname, prefix) => {
	return `*── 「 ${setting.botName} 」 ──*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_\n${readmore}
`
+`
┏━━━⊱ ⸨ *GENERAL* ⸩
┣──────────────────⊱
┣➥ ${prefix}profile
┣➥ ${prefix}owner
┣➥ ${prefix}donate
┣➥ ${prefix}info
┣➥ ${prefix}runtime
┣➥ ${prefix}listprem
┣➥ ${prefix}listblock
┗──────────────────⊱

┏━━━⊱ ⸨ *CONVERT* ⸩
┣──────────────────⊱
┣➥ ${prefix}sticker
┣➥ ${prefix}take
┣➥ ${prefix}toimg
┣➥ ${prefix}tourl
┗──────────────────⊱

┏━━━⊱ ⸨ *DOWNLOADER* ⸩
┣──────────────────⊱
┣➥ ${prefix}play
┣➥ ${prefix}ytmp3
┣➥ ${prefix}ytmp4
┣➥ ${prefix}tiktok
┣➥ ${prefix}instagram
┣➥ ${prefix}facebook
┣➥ ${prefix}pinterestvid
┣➥ ${prefix}zippyshare
┣➥ ${prefix}mediafire
┗──────────────────⊱

┏━━━⊱ ⸨ *MAKER* ⸩
┣──────────────────⊱
┣➥ ${prefix}cup
┣➥ ${prefix}coffe
┣➥ ${prefix}smooke
┣➥ ${prefix}wolfmetal
┗──────────────────⊱

┏━━━⊱ ⸨ *SEARCH* ⸩
┣──────────────────⊱
┣➥ ${prefix}lirik
┣➥ ${prefix}ytsearch
┣➥ ${prefix}pinterest
┣➥ ${prefix}sauce
┗──────────────────⊱

┏━━━⊱ ⸨ *ANIMANGA* ⸩
┣──────────────────⊱
┣➥ ${prefix}animestory
┣➥ ${prefix}genshin
┣➥ ${prefix}waifu
┣➥ ${prefix}loli
┣➥ ${prefix}neko
┣➥ ${prefix}cosplay
┣➥ ${prefix}elf
┣➥ ${prefix}megumin
┣➥ ${prefix}sagiri
┣➥ ${prefix}elaina
┣➥ ${prefix}shinobu
┣➥ ${prefix}ppcp
┗──────────────────⊱

┏━━━⊱ ⸨ *GAME* ⸩
┣──────────────────⊱
┣➥ ${prefix}tictactoe
┣➥ ${prefix}delttt
┣➥ ${prefix}tebakgambar
┣➥ ${prefix}tebakkimia
┣➥ ${prefix}susunkata
┣➥ ${prefix}tebakchara
┣➥ ${prefix}siapaaku
┣➥ ${prefix}asahotak
┣──────────────────⊱
┣➥ ${prefix}buylimit
┣➥ ${prefix}buyglimit
┣➥ ${prefix}transfer
┣➥ ${prefix}toplevel
┣➥ ${prefix}topbalance
┗──────────────────⊱

┏━━━⊱ ⸨ *GROUP TOOLS* ⸩
┣──────────────────⊱
┣➥ ${prefix}afk
┣➥ ${prefix}linkgroup
┣➥ ${prefix}setppgroup
┣➥ ${prefix}setnamegc
┣➥ ${prefix}setdesc
┣➥ ${prefix}group
┣➥ ${prefix}revoke
┣➥ ${prefix}hidetag
┣➥ ${prefix}game
┗──────────────────⊱

┏━━━⊱ ⸨ *OTHER* ⸩
┣──────────────────⊱
┣➥ ${prefix}addsay
┣➥ ${prefix}delsay
┣➥ ${prefix}say
┗──────────────────⊱
`
+`\n\n`
}
