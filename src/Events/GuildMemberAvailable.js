const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildMemberAvailableEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('guildMemberAvailable', (member) => {
				if (member && member.guild && ignore.guilds.includes(member.guild.id)) return
				listener({ client, member, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
