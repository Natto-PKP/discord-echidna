const { TypeError, Error } = require('../Errors/EchidnaError')
const { Enregex } = require('enregex')
const _permissions = require('../permissions.json')
const { existsSync, lstatSync, readdirSync } = require('fs')

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
     * @param {String} [options.modules] 
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
		const verif = (execution, opts) => {
			if (!execution || typeof execution != 'function') throw new TypeError('ECHIDNA_INVALID_OPTION', 'exec', 'function')
			if (!opts || Array.isArray(opts) || typeof opts != 'object') opts = {}

			if (!opts.name || typeof opts.name != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.name', 'string')
			if (opts.name.length < 2) throw new Error('ECHIDNA_INVALID_LENGTH', 'string', 'options.name', '1')
			if (/\s/.test(opts.name)) throw new Error('ECHIDNA_CONTAIN_SPACE', 'options.name')
			if (!opts.aliases || !(Array.isArray(opts.aliases) || opts.aliases instanceof RegExp)) opts.aliases = []
			if (opts.aliases instanceof RegExp) opts.aliases = Enregex(opts.aliases).array
			opts.aliases.some((str) => {
				if (typeof str != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', `options.aliases[${str}]`, 'string')
				if (str.length < 2) throw new Error('ECHIDNA_INVALID_LENGTH', 'string', `options.aliases[${str}]`, '1')
				if (/\s/.test(str)) throw new Error('ECHIDNA_CONTAIN_SPACE', 'options.aliases[*]')
			})

			if (this.exist(opts.name, ...opts.aliases)) throw new Error('ECHIDNA_NAME_TAKEN', 'Command')

			if (!opts.cooldown) opts.cooldown = 1
			if (typeof opts.cooldown != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.cooldown', 'number')

			if (!opts.permissions || Array.isArray(opts.permissions) || typeof opts.permissions != 'object') opts.permissions = {}
			if (!opts.permissions.users || !Array.isArray(opts.permissions.users)) opts.permissions.users = []
			if (!opts.permissions.client || !Array.isArray(opts.permissions.client)) opts.permissions.client = []
			if ([...opts.permissions.client, ...opts.permissions.users].some((e) => !_permissions.includes(e))) throw new Error('ECHIDNA_INVALID_PERM')
			if (!opts.permissions.flags || !Array.isArray(opts.permissions.flags)) opts.permissions.flags = []

			if (!opts.allow || Array.isArray(opts.allow) || typeof opts.allow != 'object') opts.allow = {}
			if (!opts.allow.users || !Array.isArray(opts.allow.users)) opts.allow.users = []
			if (!opts.allow.channels || !Array.isArray(opts.allow.channels)) opts.allow.channels = []
			if (!opts.allow.guilds || !Array.isArray(opts.allow.guilds)) opts.allow.guilds = []
			if (!opts.allow.roles || !Array.isArray(opts.allow.roles)) opts.allow.roles = []

			if (!opts.deny || Array.isArray(opts.deny) || typeof opts.deny != 'object') opts.deny = {}
			if (!opts.deny.users || !Array.isArray(opts.deny.users)) opts.deny.users = []
			if (!opts.deny.channels || !Array.isArray(opts.deny.channels)) opts.deny.channels = []
			if (!opts.deny.guilds || !Array.isArray(opts.deny.guilds)) opts.deny.guilds = []
			if (!opts.deny.roles || !Array.isArray(opts.deny.roles)) opts.deny.roles = []

			return opts
		}

		const parent = options.name
		if (!options.modules || typeof options.modules != 'string') options.modules = []
		else {
			const dir = options.modules.endsWith('/') ? options.modules : options.modules + '/'
			if (!existsSync(dir)) throw new Error('ECHIDNA_INVALID_PATH', options.modules)
			if (!lstatSync(dir).isDirectory()) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.modules', 'directory')
			options.modules = []
			readdirSync(dir).forEach((file) => {
				const mdl = require('../../../.' + dir + file)
				const obj = Array.isArray(mdl) ? { exec: mdl[0], options: mdl[1], help: mdl[2] } : mdl
				options.modules.push({ exec: obj.exec, options: Object.assign(verif(...Object.values(obj)), { parent }), help: obj.help })
			})
		}

		this.array.push({ exec, options: verif(exec, options), help })
	}

	/**
     * @param {String} name 
     * @param {String} arg 
     * @returns
     */
	get (name, arg) {
		const command = this.array.find(({ options }) => [options.name, ...options.aliases].includes(name))
		return (arg && command.options.modules.find(({ options }) => [options.name, ...options.aliases].includes(arg))) || command
	}

	/**
     * @param  {...Array<String>} names 
     * @returns 
     */
	exist (...names) {
		return this.array.some(({ options: { name, aliases } }) => [name, ...aliases].some((str) => names.includes(str)))
	}
}()
