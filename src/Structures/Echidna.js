const { Client } = require('discord.js')

const { TypeError, Error } = require('../errors/EchidnaError')
const { checkTypings } = require('../Utils')
const events = require('../echidna/events')

const Collections = require('./Collections')
const Commands = require('./Commands')
const Database = require('./Database')

module.exports = class Echidna {
	#commands

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
		return this.#commands instanceof Commands ? this.#commands : (this.#commands = new Commands(this, { prefixes, directory }))
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
		events[event](typeof listener != 'function' ? listener = () => null : listener, { echidna: this, client: this.client, Database, Collections }) 

		return this
	}
}
