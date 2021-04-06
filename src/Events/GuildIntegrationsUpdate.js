const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildIntegrationsUpdateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('guildIntegrationsUpdate', (guild) => {
				if (guild && ignore.guilds.includes(guild.id)) return
				listener({ client, guild, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
