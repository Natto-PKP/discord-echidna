const Database = require('../Structures/Database')

module.exports = class MessageDeleteEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('messageDelete', (message) => {
			if (message && message.guild && ignore.guilds.includes(message.guild.id)) return
			listener({ client, message, options: { ignore, owners }, Database })
		})
	}
}
