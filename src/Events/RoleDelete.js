module.exports = class RoleDeleteEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('roleDelete', (role) => {
			if (role && role.guild && ignore.guilds.includes(role.guild.id)) return
			listener({ client: this.client, role, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
