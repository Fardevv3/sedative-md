const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount) => {
	return `*── 「 ${setting.botName} - Beta 」 ──*
	
  _*${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}*_

    Prefix : ( ${prefix} )
    Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
    Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}

  	Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Free'}
  	Limit Harian : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
  	Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
  	Balance : $${toCommas(getBalance(sender, balance))}\n${readmore}`

+`
┏━━━⊱ ⸨ *GENERAL* ⸩
┣──────────────────⊱
┣➥ ${prefix}profile
┣➥ ${prefix}owner
┣➥ ${prefix}donate
┣➥ ${prefix}speed
┣➥ ${prefix}runtime
┣➥ ${prefix}listprem
┗──────────────────⊱

┏━━━⊱ ⸨ *CONVERT* ⸩
┣──────────────────⊱
┣➥ ${prefix}sticker
┣➥ ${prefix}toimg
┣➥ ${prefix}
┣➥ ${prefix}
┣➥ ${prefix}
┗──────────────────⊱

┏━━━⊱ ⸨ *DOWNLOADER* ⸩
┣──────────────────⊱
┣➥ ${prefix}play
┣➥ ${prefix}ytmp3
┣➥ ${prefix}ytmp4
┣➥ ${prefix}tiktok
┣➥ ${prefix}video
┣➥ ${prefix}music
┗──────────────────⊱

┏━━━⊱ ⸨ *SEARCH* ⸩
┣──────────────────⊱
┣➥ ${prefix}lirik
┣➥ ${prefix}ytsearch
┣➥ ${prefix}pinterest
┣➥ ${prefix}
┣➥ ${prefix}
┗──────────────────⊱

┏━━━⊱ ⸨ *GAME* ⸩
┣──────────────────⊱
┣➥ ${prefix}tictactoe
┣➥ ${prefix}delttt
┣➥ ${prefix}tebakgambar
┣➥ ${prefix}buylimit
┣➥ ${prefix}buyglimit
┣➥ ${prefix}transfer
┣➥ ${prefix}limit
┣➥ ${prefix}balance
┣➥ ${prefix}topbalance
┗──────────────────⊱

┏━━━⊱ ⸨ *GROUP TOOLS* ⸩
┣──────────────────⊱
┣➥ ${prefix}linkgroup
┣➥ ${prefix}setppgroup
┣➥ ${prefix}setnamegc
┣➥ ${prefix}setdesc
┣➥ ${prefix}group
┣➥ ${prefix}revoke
┣➥ ${prefix}hidetag
┗──────────────────⊱
`+'     \`\`\`Powered by @Rafly11~\`\`\`'
+`\n\n`
}
