const Database = require('../Structures/Database')

module.exports = {
	manager: class ChannelCreateEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('channelCreate', (channel) => {
				if (channel && channel.guild && ignore.guilds.includes(channel.guild.id)) return
				listener({ client, channel, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
