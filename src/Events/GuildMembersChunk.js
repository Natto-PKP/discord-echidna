module.exports = class GuildMembersChunkEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildMembersChunk', (members, guild, chunk) => {
			if (guild && ignore.guilds.includes(guild.id)) return
			listener({ client: this.client, members, guild, chunk, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
