module.exports = class MessageUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('messageUpdate', (oldMessage, newMessage) => {
			if (oldMessage && oldMessage.guild && ignore.guilds.includes(oldMessage.guild.id)) return
			listener({ client: this.client, oldMessage, newMessage, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
