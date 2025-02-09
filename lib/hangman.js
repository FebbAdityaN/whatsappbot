/**
* Hangman.js by @febbyadityan
* Tolong jangan dihapus untuk menghargai pembuatnya
* github.com/FebbAdityaN
*/
require('./words.js')

exports.hangmanjs = async(key, arg, cmd, sender) => {
	global.kataRahasia = words[Math.floor(Math.random() * words.length)];
	let hgData = global.hangman[key] || {
		secretWord: kataRahasia.word,
		clue: { text: kataRahasia.clue, used: "no" },
		attempts: 6,
		guessedLetters: [],
		player: null
	};
	global.hangman[key] = hgData;
	const feature = arg?.toLowerCase();
	const notReg = `Kamu bukan Player yang terdaftar.\nKetik \`${cmd} start\` untuk memulai.`
	function displayWord() {
		return hgData.secretWord.split('').map(letter => (hgData.guessedLetters.includes(letter) ? letter : '_')).join(' ');
	}
	function statusGame(jid) {
		if (displayWord().indexOf('_') === -1) {
			conn.reply(`\`Hangman Game\` \n\nKata Rahasia: \`${displayWord().replace(/\s/g, "")}\`\nDengan Sisa Percobaan: ${hgData.attempts}` + '\n\nSelamat kamu menang yeyyy.')
			delete global.hangman[jid];
		}
		if (hgData.attempts === 0) {
			conn.reply(`Kamu kalah! Kata yang benar adalah \`${hgData.secretWord}\`.`)
			delete global.hangman[jid];
		}
	}
	if (feature === 'start') {
		if (global.hangman[key].player === sender) {
			conn.reply(`Kamu sebelumnya sudah memulai sesi permainan, lanjutkan sesi sebelumnya.\natau Hapus sesi dengan mengetik \`${cmd} stop\``)
			hgData.attempts++
		} else {
			hgData.player = sender
			conn.reply(`\`Hangman Game\` \n\nKata Rahasia: ${displayWord()}\nSisa Percobaan: ${hgData.attempts}` + `\n\nKetik \`${cmd} <alphabet>\`\nUntuk menebak huruf yang hilang.\n\n`+ 'Sekarang Tebak Hurufnya!')
			return
		}
	}
	if (feature === 'stop' || feature === 'hapus') {
		if (global.hangman[key].player === sender) {
			delete global.hangman[key]
			conn.reply('Permainan dihentikan.')
		}
	}
	if (feature === 'clue') {
		if (global.hangman[key].player === sender) {
			if (hgData.attempts === 1) {
				return conn.reply('Kamu tidak dapat menggunakan clue, karena sisa percobaan kamu sisa 1')
			} else {
				if (hgData.clue.used === 'yes') {
					return conn.reply('Clue telah digunakan.')
				} else {
					hgData.attempts--
					hgData.clue.used = 'yes'
					return conn.reply(`Ini adalah clue nya: \`${hgData.clue.text}\`.\nSisa percobaan kamu berkurang menjadi: \`${hgData.attempts}\``)
				}
			}
		} else {
			conn.reply(notReg)
		}
	}
	if (!feature === 'clue') {
		if (global.hangman[key].player === sender) {
			hgData.attempts--
			return conn.reply(`Jawaban salah.\nSisa Percobaan: ${hgData.attempts}`)
		} else {
			conn.reply(notReg)
		}
	}
	if (feature === hgData.secretWord) {
		if (global.hangman[key].player === sender) {
			conn.reply(`\`Hangman Game\` \n\nKata Rahasia: \`${hgData.secretWord}\`\nDengan Sisa Percobaan: ${hgData.attempts}` + '\n\nSelamat kamu menang yeyyy.')
			delete global.hangman[key]
			return
		} else {
			conn.reply(notReg)
		}
	}
	if (hgData.guessedLetters.includes(feature)) {
		return conn.reply("Anda sudah menebak huruf ini sebelumnya.");
	} else if (hgData.secretWord.includes(feature)) {
		if (global.hangman[key].player === sender) {
			hgData.guessedLetters.push(feature)
			if (statusGame(key)) return
			conn.reply(`\`Hangman Game\` \n\nKata Rahasia: ${displayWord()}\nSisa Percobaan: ${hgData.attempts}` + '\n\nTebakan kamu benar, lanjutkan!')
		} else {
			conn.reply(notReg)
		}
	} else if (!hgData.secretWord.includes(feature)) {
		if (global.hangman[key].player === sender) {
			hgData.attempts--
			if (statusGame(key)) return
			conn.reply(`\`Hangman Game\` \n\nKata Rahasia: ${displayWord()}\nSisa Percobaan: ${hgData.attempts}` + '\n\nTebakan kamu salah, terus coba lagi!'+`\n\nButuh clue? Ketik: \`${cmd} clue\`\nJika clue digunakan, percobaan dikurangi 1.`)
		} else {
			conn.reply(notReg)
		}
	}
}