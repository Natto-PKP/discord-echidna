const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildMembersChunkEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('guildMembersChunk', (members, guild, chunk) => {
				if (guild && ignore.guilds.includes(guild.id)) return
				listener({ client, members, guild, chunk, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
