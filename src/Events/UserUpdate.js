module.exports = class UserUpdateEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, owners }, { client, Documents }) {
		this.client = client
		client.on('userUpdate', (oldUser, newUser) => {
			if (oldUser && ignore.users.includes(oldUser.id)) return
			listener({ client: this.client, oldUser, newUser, options: { ignore, owners }, Event: this, Documents })
		})
	}
}
