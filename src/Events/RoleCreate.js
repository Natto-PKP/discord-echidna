module.exports = class RoleCreateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('roleCreate', (role) => {
			if (role && role.guild && ignore.guilds.includes(role.guild.id)) return
			listener({ client: this.client, role, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
