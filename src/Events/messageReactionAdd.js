const Database = require('../Structures/Database')

module.exports = {
	manager: class MessageReactionAddEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('messageReactionAdd', (reaction, user) => {
				if (reaction && reaction.message && reaction.message.guild && ignore.guilds.includes(reaction.message.guild.id)) return
				if (user && ignore.users.includes(user.id)) return
				listener({ client, reaction, user, options: { ignore, owners }, Database })
			})
		}
	},
	defaultOptions: {}
}
