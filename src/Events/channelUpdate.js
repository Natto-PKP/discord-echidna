const Database = require('../Structures/Database')

module.exports = class ChannelUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('channelUpdate', (oldChannel, newChannel) => {
			if (oldChannel && oldChannel.guild && ignore.guilds.includes(oldChannel.guild.id)) return
			listener({ client, oldChannel, newChannel, options: { ignore, owners }, Database })
		})
	}
}
