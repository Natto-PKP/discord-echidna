module.exports = class InviteCreateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('inviteCreate', (invite) => {
			if (invite && invite.guild && ignore.guilds.includes(invite.guild.id)) return
			listener({ client: this.client, invite, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
