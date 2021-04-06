const Database = require('../Structures/Database')

module.exports = {
	manager: class PresenceUpdateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('presenceUpdate', (oldPresence, newPresence) => {
				if (oldPresence && oldPresence.guild && ignore.guilds.includes(oldPresence.guild.id)) return
				if (oldPresence && oldPresence.member && ignore.users.includes(oldPresence.member.id)) return
				listener({ client, oldPresence, newPresence, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
