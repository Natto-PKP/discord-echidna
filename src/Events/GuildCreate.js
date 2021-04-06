const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildCreateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('guildCreate', (guild) => listener({ client, guild, Database }))
		}
	},
	defaultOptions: {}
}
