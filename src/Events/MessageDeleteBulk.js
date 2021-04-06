const Database = require('../Structures/Database')

module.exports = {
	manager: class MessageDeleteBulkEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('messageDeleteBulk', (messages) => {
				if (messages && messages.first() && messages.first().guild && ignore.guilds.includes(messages.first().guild.id)) return
				listener({ client, messages, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
