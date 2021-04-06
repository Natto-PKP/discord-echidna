const Database = require('../Structures/Database')

module.exports = {
	manager: class MessageUpdateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('messageUpdate', (oldMessage, newMessage) => {
				if (oldMessage && oldMessage.guild && ignore.guilds.includes(oldMessage.guild.id)) return
				listener({ client, oldMessage, newMessage, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
