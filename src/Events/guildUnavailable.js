const Database = require('../Structures/Database')

module.exports = class GuildUnavailableEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('guildUnavailable', (guild) => listener({ client, guild, Database }))
	}
}
