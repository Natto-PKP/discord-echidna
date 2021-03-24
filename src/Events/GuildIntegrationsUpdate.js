module.exports = class GuildIntegrationsUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildIntegrationsUpdate', (guild) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client: this.client, guild, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
