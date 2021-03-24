module.exports = class ChannelUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('channelCreate', (oldChannel, newChannel) => {
			if (oldChannel && oldChannel.guild && ignore.guilds.includes(oldChannel.guild.id)) return
			listener({ client: this.client, oldChannel, newChannel, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
