const Database = require('../Structures/Database')

module.exports = class InviteCreateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('inviteCreate', (invite) => {
			if (invite && invite.guild && ignore.guilds.includes(invite.guild.id)) return
			listener({ client, invite, options: { ignore, owners }, Database })
		})
	}
}
