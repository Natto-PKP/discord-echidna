module.exports = class ChannelCreateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('channelCreate', (channel) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client: this.client, channel, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
