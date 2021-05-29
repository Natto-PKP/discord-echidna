const { Client } = require('discord.js')
const { readdirSync } = require('fs')

const { TypeError, Error } = require('../Errors/EchidnaError')
const { checkTypings } = require('../Utils')

const Commands = require('./Commands')

const events = {}
readdirSync('./node_modules/discord-echidna/src/Events').forEach((f) => (events[f.split('.')[0]] = require(`../Events/${f}`)))

module.exports = class Echidna {
	/**
	 * Initialize new Echidna client
	 * @param { string } token Discord bot token
	 * @param { import('discord-echidna').EchidnaOptions } EchidnaOptions echidna & client options
	 * @example 
	 * new Echidna('BOT TOKEN', { partials: ['MESSAGE'], lang: 'fr' })
	 */
	constructor (token, EchidnaOptions = {}) {
		if (typeof token !== 'string') throw new TypeError('ECHIDNA_TOKEN_MISSING')
		this.options = checkTypings(EchidnaOptions, { client: {}, ignore: { users: [], guilds: [] }, owners: [], lang: 'en' })
		this.client = new Client(this.options)
		this.client.login(token)
	}

	/**
	 * Initialize Echidna commands manager
	 * @param { import('discord-echidna').CommandsOptions } param0 
	 * @example
	 * const commands = Echidna.commands({ prefixes: '!', directory: { path: './commands', categories: true } })
	 * @returns { Commands }
	 */
	commands ({ prefixes = '!', directory } = {}) {
		return new Commands(this, { prefixes, directory })
	}

	/**
	 * Start a event
	 * @param { string } event 
	 * @param { function } listener
	 * @example
	 * Echidna.on('ready', ({ client }) => console.log(client.user.tag + ' start !'))
	 * @returns { this }
	 */
	on (event, listener = () => null) {
		if (typeof event != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'event', 'string')
		if (!events[event]) throw new Error('ECHIDNA_EVENT_MISSING', event)
		if (!listener || typeof listener != 'function') listener = () => null
		new events[event](listener, Object.assign(Object.assign(this.options, { client: this.client })))

		return this
	}
}
