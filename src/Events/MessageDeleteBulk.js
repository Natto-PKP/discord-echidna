module.exports = class MessageDeleteBulkEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('messageDeleteBulk', (messages) => {
			if (messages && messages.first() && messages.first().guild && ignore.guilds.includes(messages.first().guild.id)) return
			listener({ client: this.client, messages, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
