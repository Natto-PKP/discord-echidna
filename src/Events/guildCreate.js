const Database = require('../Structures/Database')

module.exports = class GuildCreateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
	 */
	constructor (listener, { client }) {
		client.on('guildCreate', (guild) => listener({ client, guild, Database }))
	}
}
