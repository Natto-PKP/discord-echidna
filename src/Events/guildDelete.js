const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildDeleteEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('guildDelete', (guild) => listener({ client, guild, Database }))
		}
	},
	defaultOptions: {}
}
