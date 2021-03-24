module.exports = class EmojiDeleteEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('emojiDelete', (oldEmoji, newEmoji) => {
			if (oldEmoji && oldemoji.guild && ignore.guilds.includes(oldEmoji.guild.id)) return
			listener({ client: this.client, oldEmoji, newEmoji, guild: oldEmoji && oldEmoji.guild, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
