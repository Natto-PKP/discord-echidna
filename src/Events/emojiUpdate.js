const Database = require('../Structures/Database')

module.exports = class EmojiUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('emojiUpdate', (oldEmoji, newEmoji) => {
			if (oldEmoji && oldEmoji.guild && ignore.guilds.includes(oldEmoji.guild.id)) return
			listener({ client, oldEmoji, newEmoji, options: { ignore, owners }, Database })
		})
	}
}
