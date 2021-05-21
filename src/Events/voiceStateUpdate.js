const Database = require('../Structures/Database')

module.exports = class VoiceStateUpdateEvent {
	/**
     * @param {Function} listener 
     * @param {Object} param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('voiceStateUpdate', (oldState, newState) => {
			if (newState && ((newState.member && ignore.users.includes(newState.member.id)) || (newState.guild && ignore.guilds.includes(newState.guild.id)))) return
			listener({ client, oldState, newState, options: { ignore, owners }, Database })
		})
	}
}
