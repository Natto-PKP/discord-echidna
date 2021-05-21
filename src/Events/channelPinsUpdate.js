const Database = require('../Structures/Database')

module.exports = class ChannelPinsUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('channelPinsUpdate', (channel, date) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client, channel, date, options: { ignore, owners }, Database })
		})
	}
}
