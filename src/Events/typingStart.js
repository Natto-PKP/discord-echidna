const Database = require('../Structures/Database')

module.exports = class TypingStartEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('typingStart', (channel, user) => {
			if ((user && ignore.users.includes(user.id)) || (channel && channel.guild && ignore.guilds.includes(channel.guild.id))) return
			listener({ client, channel, user, options: { ignore, owners }, Database })
		})
	}
}
