const Database = require('../Structures/Database')

module.exports = class ChannelDeleteEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('channelDelete', (channel) => {
			if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
			listener({ client, channel, options: { ignore, owners }, Database })
		})
	}
}
