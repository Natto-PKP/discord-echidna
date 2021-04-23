const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { TypeError, Error } = require('../Errors/EchidnaError')
const Util = require('../Utils')

const events = {}
readdirSync('./node_modules/discord-echidna/src/Events').forEach((f) => (events[f.split('.')[0]] = require(`../Events/${f}`)))

module.exports = class Echidna {
	/**
	 * @param {String} token 
	 * @param {*} EchidnaOptions 
	 */
	constructor (token, EchidnaOptions = {}) {
		if (!token || typeof token !== 'string') throw new TypeError('ECHIDNA_TOKEN_MISSING')
		this.options = Util.verifyDefault(EchidnaOptions, { client: {}, ignore: { users: [], guilds: [] }, owners: [] })
		this.client = new Client(this.options.client)
		this.client.login(token)
	}

	/**
	 * @param {String} event 
	 * @param {Function} listener
	 * @param {Object} EventOptions 
	 * @returns 
	 */
	on (event, listener = () => null, EventOptions = {}) {
		if (!event || typeof event != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'event', 'string')
		if (!events[event]) throw new Error('ECHIDNA_EVENT_MISSING', event)
		if (!listener || typeof listener != 'function') listener = () => null
		return new events[event].manager(listener, Object.assign(Object.assign(this.options, { client: this.client }), Util.verifyDefault(EventOptions, events[event].defaultOptions)))
	}
}
