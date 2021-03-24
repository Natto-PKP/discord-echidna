module.exports = class VoiceStateUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('voiceStateUpdate', (oldState, newState) => {
			if (newState && ((newState.member && ignore.users.includes(newState.member.id)) || (newState.guild && ignore.guilds.includes(newState.guild.id)))) return
			listener({ client: this.client, oldState, newState, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
