module.exports = class MessageDeleteEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('messageDelete', (message) => {
			if (message && message.guild && ignore.guilds.includes(message.guild.id)) return
			listener({ client: this.client, message, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
