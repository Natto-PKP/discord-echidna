module.exports = class RoleUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('roleUpdate', (oldRole, newRole) => {
			if (oldRole && oldRole.guild && ignore.guilds.includes(oldRole.guild.id)) return
			listener({ client: this.client, oldRole, newRole, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
