module.exports = class GuildMemberRemoveEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildMemberRemove', (member) => {
			if (member && member.guild && ignore.guilds.includes(member.guild.id)) return
			listener({ client: this.client, member, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
