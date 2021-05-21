const Database = require('../Structures/Database')

module.exports = class GuildBanRemoveEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('guildBanRemove', (guild, user) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client, guild, user, options: { ignore, owners }, Database })
		})
	}
}
