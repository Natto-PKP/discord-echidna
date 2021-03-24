module.exports = class MessageReactionRemoveEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('messageReactionRemove', (messageReaction, user) => {
			if (messageReaction && messageReaction.message && messageReaction.message.guild && ignore.guilds.includes(messageReaction.message.guild.id)) return
			if (user && ignore.users.includes(user.id)) return
			listener({ client: this.client, messageReaction, user, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
