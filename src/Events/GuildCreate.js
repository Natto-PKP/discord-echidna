module.exports = class GuildCreateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildCreate', (guild) => listener({ client: this.client, guild, options: { ignore, owners }, Event: this, Documents }))
	}
}
