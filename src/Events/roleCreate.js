const Database = require('../Structures/Database')

module.exports = class RoleCreateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('roleCreate', (role) => {
			if (role && role.guild && ignore.guilds.includes(role.guild.id)) return
			listener({ client, role, options: { ignore, owners }, Database })
		})
	}
}
