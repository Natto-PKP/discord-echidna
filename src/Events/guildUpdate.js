const Database = require('../Structures/Database')

module.exports = class GuildUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('guildUpdate', (oldGuild, newGuild) => {
			if (oldGuild && ignore.guilds.includes(oldGuild.id)) return
			listener({ client, oldGuild, newGuild, options: { ignore, owners }, Database })
		})
	}
}
