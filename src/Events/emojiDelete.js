const Database = require('../Structures/Database')

module.exports = {
	manager: class EmojiDeleteEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('emojiDelete', (emoji) => {
				if (emoji && emoji.guild && ignore.guilds.includes(emoji.guild.id)) return
				listener({ client, emoji, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
