const Database = require('../Structures/Database')

module.exports = class MessageUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('messageUpdate', (oldMessage, newMessage) => {
			if (oldMessage && oldMessage.guild && ignore.guilds.includes(oldMessage.guild.id)) return
			listener({ client, oldMessage, newMessage, options: { ignore, owners }, Database })
		})
	}
}
