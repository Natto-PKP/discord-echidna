module.exports = class TypingStartEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('typingStart', (channel, user) => {
			if ((user && ignore.users.includes(user.id)) || (channel && channel.guild && ignore.guilds.includes(channel.guild.id))) return
			listener({ client: this.client, channel, user, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
