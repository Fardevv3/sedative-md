const FormData = require("form-data");
const axios = require('axios');
const { default: Axios } = require('axios');
const fs = require("fs");
const cheerio = require("cheerio");
const { fromBuffer } = require('file-type');

function webp2mp4File(path) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('new-image-url', '')
          bodyForm.append('new-image', fs.createReadStream(path))
          Axios({
               method: 'post',
               url: 'https://s6.ezgif.com/webp-to-mp4',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               const bodyFormThen = new FormData()
               const $ = cheerio.load(data)
               const file = $('input[name="file"]').attr('value')
               const token = $('input[name="token"]').attr('value')
               const convert = $('input[name="file"]').attr('value')
               const gotdata = {
                    file: file,
                    token: token,
                    convert: convert
               }
               bodyFormThen.append('file', gotdata.file)
               bodyFormThen.append('token', gotdata.token)
               bodyFormThen.append('convert', gotdata.convert)
               Axios({
                    method: 'post',
                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                    data: bodyFormThen,
                    headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
               }).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                    resolve({
                         status: true,
                         message: "Created By Riyan",
                         result: result
                    })
               }).catch(reject)
          }).catch(reject)
     })
}


function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
     return new Promise(async (resolve, reject) => {
       try {
         let tmp = path.join(__dirname, '../src', + new Date + '.' + ext)
         let out = tmp + '.' + ext2
         await fs.promises.writeFile(tmp, buffer)
         spawn('ffmpeg', [
           '-y',
           '-i', tmp,
           ...args,
           out
         ])
           .on('error', reject)
           .on('close', async (code) => {
             try {
               await fs.promises.unlink(tmp)
               if (code !== 0) return reject(code)
               resolve(await fs.promises.readFile(out))
               await fs.promises.unlink(out)
             } catch (e) {
               reject(e)
             }
           })
       } catch (e) {
         reject(e)
       }
     })
   }

function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

exports.webp2mp4File = webp2mp4File
exports.ffmpeg = ffmpeg
exports.TelegraPH = TelegraPh
