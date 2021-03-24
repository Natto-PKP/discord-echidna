module.exports = class ChannelPinsUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('channelPinsUpdate', (channel, date) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client: this.client, channel, date, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
