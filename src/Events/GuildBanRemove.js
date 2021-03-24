module.exports = class GuildBanRemoveEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildBanRemove', (guild, user) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client: this.client, guild, user, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
