module.exports = class GuildDeleteEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildDelete', (guild) => listener({ client: this.client, guild, options: { ignore, owners }, Event: this, Documents }))
	}
}
