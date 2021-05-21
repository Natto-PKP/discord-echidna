const Database = require('../Structures/Database')

module.exports = class MessageReactionRemoveEmojiEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('messageReactionRemoveEmoji', (reaction) => {
			if (reaction && reaction.message && reaction.message.guild && ignore.guilds.includes(reaction.message.guild.id)) return
			listener({ client, reaction, options: { ignore, owners }, Database })
		})
	}
}
