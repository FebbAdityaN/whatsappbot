/*
* Handler Command, etc.
* by @febbyadityan / github.com/FebbAdityan
* made with @mengkodingan/ckptw
* (n) Tolong jangan dihapus untuk menghargai pembuatnya
*/
require('./config.js');
const { Consolefy, Colors } = require("@mengkodingan/consolefy");
const consolefy = new Consolefy();
const moment = require("moment-timezone")
const fs = require("fs");
const filetype = require("file-type");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { upload } = require("./lib/upload");
const { sendMediaAsSticker } = require('./lib/sticker');

const { hangmanjs } = require('./lib/hangman')
global.hangman = global.hangman || {};

consolefy.defineLogLevel("cmd", {
    prefix: "COMMAND",
    theme: (text) => Colors.bgBlue(Colors.white(text)),
});

moment().tz("Asia/Jakarta").format();

module.exports = async (msg, ctx, m, bot) => {
	try {
		const { fromMe } = msg;
		const from = ctx.id
		const chat = m.content
		const isGroup = ctx.isGroup();
		const isPrivate = !isGroup;
		const senderJid = ctx.sender.jid;
		const senderId = senderJid.split("@")[0].split(":")[0];
		const pushName = msg.pushName
		const chats = msg.content ? msg.content : msg.message.imageMessage && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : msg.message.videoMessage && msg.message.imageMessage.caption ? msg.message.videoMessage.caption : msg.message.extendedTextMessage && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : "";
		const prefix = bot.prefix.test(chats) ? chats.match(bot.prefix) : "#"
		const args = chats.split(" ");
		const groupJid = isGroup ? ctx.id : null;
		const groupId = isGroup ? groupJid.split("@")[0].split(":")[0] : null;
		const command = chats.toLowerCase().split(" ")[0] || "";
		const q = chats.slice(command.length + 1, chats.length);
		const isOwner = config.botNumber === senderId || config.ownerNumber === senderId;
		const isCmd = chats.startsWith(prefix)
		
		// Test Cmd
		// Gunakan ketika dibutuhkan, kadang bot melakukan spam
		bot.command('ping', async(ctx) => ctx.reply('pong!'))
		
		// Log Cmd
		if (!isGroup && isCmd && !fromMe) {
			consolefy.log('cmd', `${command} [${args.length}] ` + moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm') + ' from ' + Colors.bgWhite(Colors.black(pushName)))
		}
		
		switch(command) {
			case prefix+'menu':
			case prefix+'help':
				let textMenu = `Hai ${pushName} 👋🏻
Aku adalah Bot WhatsApp bernama *${config.botName}* yang mungkin dapat membantu kamu.
\`Command/Perintah:\`

${prefix}ping
${prefix}sticker
${prefix}hangman / ${prefix}hg \`start\`
${prefix}e \`(Eval)\` \`(Khusus Owner)\`

Fitur masih tahap pengembangan.
Pull Request? Ketik: ${prefix}script
\`Created by @febbyadityan\``
				ctx.reply(textMenu)
				break
			case prefix+'sc': case prefix+'script':
				ctx.reply(`\`https://github.com/FebbAdityaN/whatsappbot\`\n\nJika kamu menemukan Error atau ingin menambahkan Fitur baru, jangan ragu untuk membuka Issue atau mengirimkan Pull Request.\n\nJangan lupa juga star nya ya!`)
				break
			case prefix+'sticker':
			case prefix+'stiker':
			case prefix+'s':
			case prefix+'stickers':
				try {
					let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
					if (!buffer) return ctx.reply('❌ Reply ke media atau jadikan sebagai caption.');
					let seconds = ctx.msg.message.videoMessage ? ctx.msg.message.videoMessage.seconds : ctx.quoted.videoMessage.seconds
					if (seconds > 10) return ctx.reply('Durasi untuk video maksimal 10 detik!')
					let bufferType = await filetype.fromBuffer(buffer);
					if (ctx.args.length && bufferType?.ext !== 'mp4') {
						let uploaded = await upload(buffer);
						let cap = ctx.args.join(" ").split("|");
						if (cap.length === 1) {
							cap.push("_")
							cap.reverse();
						}
						buffer = `https://api.memegen.link/images/custom/${encodeURIComponent(cap[0])}/${encodeURIComponent(cap[1])}.png?background=${uploaded}?font=impact`;
					}
					const packname = config.stickerPack
					const author = config.stickerAuthor
					var opt = { packname, author }
					sendMediaAsSticker(from, buffer, msg, opt)
				} catch (e) {
					console.log(e)
					ctx.reply('Error! Coba lagi nanti.')
				}
				break
			case prefix+'e': // eval
				if (!isOwner) return ctx.reply('Fitur ini hanya dapat digunakan oleh Owner Bot.')
				try {
					let evaled = await eval(q)
					if (typeof evaled !== "string")
					evaled = require("util").inspect(evaled);
					ctx.reply(`${evaled}`);
				} catch (e) {
					ctx.reply(`${e}`)
				}
				break
			case prefix+'hangman':
			case prefix+'hg':
				try {
					if (global.hangman) {
						hangmanjs(msg.key, args[1], command, senderId)
					}
				} catch (e) {
					console.log(e)
					ctx.reply(`Ketik \`${command} start\` untuk memulai permainan.`)
				}
				break
			default:
				break
		}
	} catch (error) {
		console.log(`[ERROR] : ${error}`)
	}
}