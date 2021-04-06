const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildUnavailableEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('guildUnavailable', (guild) => listener({ client, guild, Database }))
		}
	},
	defaultOptions: {}
}
