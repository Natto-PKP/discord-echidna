const { TypeError, Error } = require('../Errors/EchidnaError')
const Enregex = require('enregex')
const _permissions = require('../permissions.json')

module.exports = new class Commands {
	constructor () {
		this.array = []
		this.cooldowns = {}
	}

	/**
     * @param {Function} exec 
     * @param {any} options 
     * @param {String} [options.name] 
     * @param {Object[]|RegExp} [options.aliases] 
     * @param {Number} [options.cooldown] 
     * @param {any} [options.permissions]
     * @param {Object[]} [options.permissions.users] Table of users permissions required
     * @param {Object[]} [options.permissions.client] Table of client permissions required
     * @param {Object[]} [options.permissions.flags] 
     * @param {any} [options.allow] Table of allowed ids
     * @param {Object[]} [options.allow.users]
     * @param {Object[]} [options.allow.channels]
     * @param {Object[]} [options.allow.guilds]
     * @param {Object[]} [options.allow.roles]
     * @param {any} [options.deny] Table of denied ids
     * @param {Object[]} [options.deny.users]
     * @param {Object[]} [options.deny.channels]
     * @param {Object[]} [options.deny.guilds]
     * @param {Object[]} [options.deny.roles]
     * @param {any} help  Object custom for help command
     */
	create (exec, options, help = {}) {
		if (!exec || typeof exec != 'function') throw new TypeError('ECHIDNA_INVALID_OPTION', 'exec', 'function')
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}

		if (!options.name || typeof options.name != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.name', 'string')
		if (options.name.length < 2) throw new Error('ECHIDNA_INVALID_LENGTH', 'string', 'options.name', '1')
		if (/\s/.test(options.name)) throw new Error('ECHIDNA_CONTAIN_SPACE', 'options.name')
		if (!options.aliases || !(Array.isArray(options.aliases) || options.aliases instanceof RegExp)) options.aliases = []
		if (options.aliases instanceof RegExp) options.aliases = Enregex(options.aliases).array()
		options.aliases.some((str) => {
			if (typeof str != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', `options.aliases[${str}]`, 'string')
			if (str.length < 2) throw new Error('ECHIDNA_INVALID_LENGTH', 'string', `options.aliases[${str}]`, '1')
			if (/\s/.test(str)) throw new Error('ECHIDNA_CONTAIN_SPACE', 'options.aliases[*]')
		})

		if (this.exist(options.name, ...options.aliases)) throw new Error('ECHIDNA_NAME_TAKEN', 'Command')

		if (!options.cooldown) options.cooldown = 1
		if (typeof options.cooldown != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.cooldown', 'number')

		if (!options.permissions || Array.isArray(options.permissions) || typeof options.permissions != 'object') options.permissions = {}
		if (!options.permissions.users || !Array.isArray(options.permissions.users)) options.permissions.users = []
		if (!options.permissions.client || !Array.isArray(options.permissions.client)) options.permissions.client = []
		if ([...options.permissions.client, ...options.permissions.users].some((e) => !_permissions.includes(e))) throw new Error('ECHIDNA_INVALID_PERM')
		if (!options.permissions.flags || !Array.isArray(options.permissions.flags)) options.permissions.flags = []

		if (!options.allow || Array.isArray(options.allow) || typeof options.allow != 'object') options.allow = {}
		if (!options.allow.users || !Array.isArray(options.allow.users)) options.allow.users = []
		if (!options.allow.channels || !Array.isArray(options.allow.channels)) options.allow.channels = []
		if (!options.allow.guilds || !Array.isArray(options.allow.guilds)) options.allow.guilds = []
		if (!options.allow.roles || !Array.isArray(options.allow.roles)) options.allow.roles = []

		if (!options.deny || Array.isArray(options.deny) || typeof options.deny != 'object') options.deny = {}
		if (!options.deny.users || !Array.isArray(options.deny.users)) options.deny.users = []
		if (!options.deny.channels || !Array.isArray(options.deny.channels)) options.deny.channels = []
		if (!options.deny.guilds || !Array.isArray(options.deny.guilds)) options.deny.guilds = []
		if (!options.deny.roles || !Array.isArray(options.deny.roles)) options.deny.roles = []

		this.array.push({ exec, options, help })
	}

	/**
     * @param {String} name 
     * @returns
     */
	get (name) {
		return this.array.find(({ options }) => [options.name, ...options.aliases].includes(name))
	}

	/**
     * @param  {...Array<String>} names 
     * @returns 
     */
	exist (...names) {
		return this.array.some(({ options: { name, aliases } }) => [name, ...aliases].some((str) => names.includes(str)))
	}
}()
