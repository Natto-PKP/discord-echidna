module.exports = class GuildMemberUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildMemberUpdate', (oldMember, newMember) => {
			if (oldMember && oldMember.guild && ignore.guilds.includes(oldMember.guild.id)) return
			listener({ client: this.client, oldMember, newMember, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
