module.exports = class WebhookUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		client.on('WebhookUpdate', (channel) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client: this.client, channel, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
