const Database = require('../Structures/Database')

module.exports = {
	manager: class RoleCreateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('roleCreate', (role) => {
				if (role && role.guild && ignore.guilds.includes(role.guild.id)) return
				listener({ client, role, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
