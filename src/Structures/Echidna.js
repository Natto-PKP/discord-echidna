const { Client } = require('discord.js')
const { readdirSync } = require('fs')

const { TypeError, Error } = require('../Errors/EchidnaError')
const { checkTypings } = require('../Utils')

const Commands = require('../Managers/Commands')

const events = {}
readdirSync('./node_modules/discord-echidna/src/Events').forEach((f) => (events[f.split('.')[0]] = require(`../Events/${f}`)))

module.exports = class Echidna {
	/**
	 * @param {String} token Discord bot token
	 * @param {Object} EchidnaOptions echidna options
	 * @param {Client} [EchidnaOptions.client] discord.js Client options
	 * @param {Object} [EchidnaOptions.ignore] 
	 * @param {Array<String>} [EchidnaOptions.ignore.users] users ids to ignore
	 * @param {Array<String>} [EchidnaOptions.ignore.guilds] guilds ids to ignore
	 * @param {Array<String>} [EchidnaOptions.owners] bot owners ids
	 * @param {String} [EchidnaOptions.lang] default lang of returned errors messages
	 */
	constructor (token, EchidnaOptions = {}) {
		if (!token || typeof token !== 'string') throw new TypeError('ECHIDNA_TOKEN_MISSING')
		this.options = checkTypings(EchidnaOptions, { client: {}, ignore: { users: [], guilds: [] }, owners: [], lang: 'en' })
		this.client = new Client(this.options.client)
		this.client.login(token)
	}

	/**
	 * @param {Object} param0 
	 * @param {String|Array<String>|Object} [param0.prefixes] prefix | array of prefixes | prefixes options
	 * @param {String} [param0.prefixes.collection] database collection name of guilds configs
	 * @param {String} [param0.prefixes.properties] name(s) of property(ies) for the prefix value
	 * @param {String} [param1.prefixes.default] default prefix 
	 * @param {String|Object} [param0.directory] path to commands folder | directory options
	 * @param {String} [param0.directory.path] path to commands folder
	 * @param {Boolean} [param0.directory.categories] enable commands categories
	 * @returns {Commands}
	 */
	commands ({ prefixes = '!', directory } = {}) {
		return new Commands(this, { prefixes, directory })
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
		return new events[event].manager(listener, Object.assign(Object.assign(this.options, { client: this.client }), checkTypings(EventOptions, events[event].defaultOptions || {})))
	}
}
