const Database = require('../Structures/Database')

module.exports = class UserUpdateEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('userUpdate', (oldUser, newUser) => {
			if (oldUser && ignore.users.includes(oldUser.id)) return
			listener({ client, oldUser, newUser, options: { ignore, owners }, Database })
		})
	}
}
