const Database = require('../Structures/Database')

module.exports = {
	manager: class EmojiCreateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('emojiCreate', (emoji) => {
				if (emoji && emoji.guild && ignore.guilds.includes(emoji.guild.id)) return
				listener({ client, emoji, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
