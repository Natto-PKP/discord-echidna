const _permissions = require('../permissions.json')

module.exports = class CommandsManager {
	constructor () {
		this.table = []
		this.cooldowns = {}
	}

	/**
     * @param {Function} exec 
     * @param {any} options 
     * @param {String} [options.name] 
     * @param {Object[]} [options.aliases] 
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
	create (exec, options, help) {
		if (!exec || typeof exec != 'function') throw Error('exec must be a function')
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}

		if (!options.name || typeof options.name != 'string') throw Error('options.name must be a string')
		if (options.name.length < 2) throw Error('options.name must contain more than 2 characters')
		if (/\s/.test(options.name)) throw Error('options.name must not contain spaces')
		if (!options.aliases || !Array.isArray(options.aliases)) options.aliases = []
		options.aliases.some((str) => {
			if (typeof str != 'string') throw Error('alias of options.aliases must be a string')
			if (str.length < 2) throw Error('alias of options.aliases must contain more than 2 characters')
			if (/\s/.test(str)) throw Error('alias of options.aliases must not contain spaces')
		})

		if (this.exist(options.name, ...options.aliases)) throw Error('this name|alias is already used')

		if (!options.cooldown) options.cooldown = 1
		if (typeof options.cooldown != 'number') throw Error('options.cooldown must be a number')

		if (!options.permissions || Array.isArray(options.permissions) || typeof options.permissions != 'object') options.permissions = {}
		if (!options.permissions.users || !Array.isArray(options.permissions.users)) options.permissions.users = []
		if (!options.permissions.client || !Array.isArray(options.permissions.client)) options.permissions.client = []
		if ([...options.permissions.client, ...options.permissions.users].some((e) => !_permissions.includes(e))) throw Error('a permission is not a valid Discord permissions')
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

		this.table.push({ exec, options, help })
	}

	/**
     * @param {String} name 
     * @returns
     */
	get (name) {
		return this.table.find(({ options }) => [options.name, ...options.aliases].includes(name))
	}

	/**
     * @param  {...any} names 
     * @returns 
     */
	exist (...names) {
		return this.table.some(({ options: { name, aliases } }) => [name, ...aliases].some((str) => names.includes(str)))
	}
}
