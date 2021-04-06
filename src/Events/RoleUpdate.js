const Database = require('../Structures/Database')

module.exports = {
	manager: class RoleUpdateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('roleUpdate', (oldRole, newRole) => {
				if (oldRole && oldRole.guild && ignore.guilds.includes(oldRole.guild.id)) return
				listener({ client, oldRole, newRole, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
