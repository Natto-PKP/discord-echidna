module.exports = class PresenceUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('presenceUpdate', (oldPresence, newPresence) => {
			if (newPresence && newPresence.guild && ignore.guilds.includes(newPresence.guild.id)) return
			if (newPresence && newPresence.member && ignore.users.includes(newPresence.member.id)) return
			listener({ client: this.client, oldPresence, newPresence, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
