const Database = require('../Structures/Database')

module.exports = class MessageReactionRemoveEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('messageReactionRemove', (reaction, user) => {
			if (reaction && reaction.message && reaction.message.guild && ignore.guilds.includes(reaction.message.guild.id)) return
			if (user && ignore.users.includes(user.id)) return
			listener({ client, reaction, user, options: { ignore, owners }, Database })
		})
	}
}
