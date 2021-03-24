module.exports = class GuildUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildUpdate', (oldGuild, newGuild) => {
			if (oldGuild && ignore.guilds.includes(oldGuild.id)) return
			listener({ client: this.client, oldGuild, newGuild, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
