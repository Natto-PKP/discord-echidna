const { Client } = require('discord.js')

const _events = {
	ready: require('../Events/Ready'),
	message: require('../Events/Message')
}

module.exports = class Echidna {
	/**
     * @param {String} token 
	 * @param {?{}} [options] 
     * @param {?{}} [options.ignore] List of guilds and users that the bot ignores
 	 * @param {?Object[]} [options.ignore.guilds] 
	 * @param {?Object[]} [options.ignore.users] 
 	 * @param {?{}} [options.client] Details here: https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
	 * @param {?Object[]} [options.owners] Owners IDs
 	 * @example 
	 * const echidna = new Echidna('token', { owners: ['1234'] })
     */
	constructor (token, options) {
		// Options
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}
		if (!options.ignore || Array.isArray(options.ignore) || typeof options.ignore != 'object') options.ignore = { guilds: [], users: [] }
		if (!options.ignore.guilds || !Array.isArray(options.ignore.guilds)) options.ignore.guilds = []
		if (!options.ignore.users || !Array.isArray(options.ignore.users)) options.ignore.users = []
		if (!options.client || Array.isArray(options.client) || typeof options.client != 'object') options.client = {}
		if (!options.owners || !Array.isArray(options.owners)) options.owners = []

		this.options = options
		this.client = new Client(options.client)
		this.client.login(token)
	}

	/**
	 * @param {String} event 
	 * @param {Function} listener 
	 * @returns
	 * @example
	 * const echidna = new Echidna(token)
	 * echidna.on('ready', ({ client }) => console.log(client.user.username + ' is ready !'))
	 */
	on (event, listener = () => null, options = {}) {
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}

		const result = _events[event]
		if (!result) throw Error(`"${event}" event is not supported`)
		if (!listener) listener = () => null
		if (typeof listener != 'function') throw Error('listener must be a function')
		return new _events[event](this.client, listener, Object.assign(options, this.options))
	}
}
