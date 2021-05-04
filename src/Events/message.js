module.exports = {
	manager: class MessageEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners }) {
			client.on('message', (message) => {
				if (!message || (message && ((message.author && ignore.users.includes(message.author.id)) || (message.guild && ignore.guilds.includes(message.guild.id))))) return
				listener({ client, message, options: { ignore, owners } })
			})
		}
	}
}
