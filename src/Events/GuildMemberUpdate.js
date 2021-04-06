const Database = require('../Structures/Database')

module.exports = {
	manager: class GuildMemberUpdateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('guildMemberUpdate', (oldMember, newMember) => {
				if (oldMember && oldMember.guild && ignore.guilds.includes(oldMember.guild.id)) return
				listener({ client, oldMember, newMember, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
