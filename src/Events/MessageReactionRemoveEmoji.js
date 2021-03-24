module.exports = class MessageReactionRemoveEmojiEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('messageReactionRemoveEmoji', (messageReaction) => {
			if (messageReaction && messageReaction.message && messageReaction.message.guild && ignore.guilds.includes(messageReaction.message.guild.id)) return
			listener({ client: this.client, messageReaction, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
