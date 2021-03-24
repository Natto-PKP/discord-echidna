module.exports = class EmojiCreateEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('emojiCreate', (emoji) => {
			if (emoji && emoji.guild && ignore.guilds.includes(emoji.guild.id)) return
			listener({ client: this.client, emoji, guild: emoji && emoji.guild, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
