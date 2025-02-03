/**         Base By @febbyadityan / github.com/FebbAdityaN            */
require('./config.js');
const {
	Client,
	Events
} = require("@mengkodingan/ckptw");
const { Consolefy } = require("@mengkodingan/consolefy");
const consolefy = new Consolefy();
const fs = require("fs");

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	// console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
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

const bot = new Client({
    prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i,
    readIncommingMsg: true,
    printQRInTerminal: !config.usePairingCode,
    markOnlineOnConnect: true,
    phoneNumber: config.botNumber,
    usePairingCode: config.usePairingCode,
    selfReply: false,
    WAVersion: [2, 3000, 1015901307],
    autoMention: true,
});

bot.ev.once(Events.ClientReady, async (m) => {
	consolefy.success(`${config.botName} by ${config.ownerName} telah siap!`);
})

/* Auto Update File */
require('./handler')
nocache('./handler', module => consolefy.success('[ WHATSAPP BOT ]  ' + `"${module}" Telah diupdate!`))

bot.ev.on(Events.MessagesUpsert, (m, ctx) => {
	var msg = ctx._msg
	try { if (msg.message.messageContextInfo) delete msg.message.messageContextInfo } catch { }
	require('./handler')(msg, ctx, m, bot)
})


bot.launch().catch((error) => consolefy.error(`Error: ${error}`));