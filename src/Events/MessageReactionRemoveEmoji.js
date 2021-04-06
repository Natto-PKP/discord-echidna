const Database = require('../Structures/Database')

module.exports = {
	manager: class MessageReactionRemoveEmojiEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('messageReactionRemoveEmoji', (reaction) => {
				if (reaction && reaction.message && reaction.message.guild && ignore.guilds.includes(reaction.message.guild.id)) return
				listener({ client, reaction, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
