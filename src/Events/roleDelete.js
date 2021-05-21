const Database = require('../Structures/Database')

module.exports = class RoleDeleteEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('roleDelete', (role) => {
			if (role && role.guild && ignore.guilds.includes(role.guild.id)) return
			listener({ client, role, options: { ignore, owners }, Database })
		})
	}
}
