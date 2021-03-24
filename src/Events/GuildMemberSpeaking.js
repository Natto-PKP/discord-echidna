module.exports = class GuildMemberSpeakingEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('guildMemberSpeaking', (member, speaking) => {
			if (member && member.guild && ignore.guilds.includes(member.guild.id)) return
			listener({ client: this.client, member, speaking, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
