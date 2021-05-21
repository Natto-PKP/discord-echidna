const Database = require('../Structures/Database')

module.exports = class GuildIntegrationsUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('guildIntegrationsUpdate', (guild) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client, guild, options: { ignore, owners }, Database })
		})
	}
}
