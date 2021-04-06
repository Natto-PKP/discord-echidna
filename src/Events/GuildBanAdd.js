const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildBanAddEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('guildBanAdd', (guild, user) => {
				if (guild && ignore.guilds.includes(guild.id)) return
				listener({ client, guild, user, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
