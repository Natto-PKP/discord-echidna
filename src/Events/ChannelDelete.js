module.exports = class ChannelDeleteEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('channelDelete', (channel) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client: this.client, channel, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
