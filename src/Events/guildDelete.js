const Database = require('../Structures/Database')

module.exports = class GuildDeleteEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('guildDelete', (guild) => listener({ client, guild, Database }))
	}
}
