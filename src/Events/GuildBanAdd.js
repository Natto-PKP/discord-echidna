module.exports = class GuildBanAddEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildBanAdd', (guild, user) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client: this.client, guild, user, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
