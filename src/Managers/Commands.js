const { Enregex } = require('enregex')
const { existsSync, lstatSync, readdirSync } = require('fs')
const { join } = require('path')

// Utils
const _permissions = require('../permissions.json')
const { TypeError, Error } = require('../Errors/EchidnaError')

// Classes
const Collections = require('../Structures/Collections')
const Database = require('../Structures/Database')
const Echidna = require('../Structures/Echidna')
const Util = require('../Utils')

// Functions
/**
 * @param { object } exec 
 * @param { object } options 
 * @returns { object }
 */
const commandCheck = (exec, options) => {
	if (!exec || typeof exec != 'function') throw new TypeError('ECHIDNA_INVALID_OPTION', 'exec', 'function')
	if (!options || Array.isArray(options) || typeof options != 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options', 'object')

	// Name
	if (!options.name || typeof options.name != 'string' || !options.name.length) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.name', 'string')
	if (/\s/.test(options.name)) throw new Error('ECHIDNA_CONTAIN_SPACE', 'options.name')

	// Aliases
	options.aliases = options.aliases instanceof RegExp ? Enregex(options.aliases).array : Array.isArray(options.aliases) ? options.aliases : []
	options.aliases.some((alias) => {
		if (typeof alias != 'string' || !alias.length) throw new TypeError('ECHIDNA_INVALID_OPTION', `options.aliases[${alias}]`, 'string')
		if (/\s/.test(alias)) throw new Error('ECHIDNA_CONTAIN_SPACE', `options.aliases[${alias}]`)
	})

	// Ckeck
	options = Util.checkTypings(options, { cooldown: 1, permissions: { users: [], client: [], flags: [] }, allow: { users: [], channels: [], guilds: [], roles: [] }, deny: { users: [], channels: [], guilds: [], roles: [] } })

	// Check Permission
	if ([...options.permissions.client, ...options.permissions.users].some((e) => !_permissions.includes(e))) throw new Error('ECHIDNA_DISCORD_PERMS', 'permissions.property[*]', '')

	return options
}

module.exports = class Commands {
	/**
	 * @param { Echidna } echidna 
	 * @param { import('discord-echidna').CommandsOptions }
	 */
	constructor (echidna, { prefixes = '!', directory } = {}) {
		this.array = []
		this.cooldowns = {}

		// Prefixes
		if (prefixes && typeof prefixes == 'object') {
			if (!Array.isArray(prefixes)) {
				if (!prefixes.collection || typeof prefixes.collection != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'prefixes.collection', 'string')
				if (!prefixes.properties || typeof prefixes.properties != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'prefixes.propetries', 'string')
				const collection = Collections.array.find(({ name }) => name == prefixes.collection)
				if (!collection) throw new Error('ECHIDNA_COLLECTION_MISSING', prefixes.collection)
				if (typeof collection.model() != 'object' || Array.isArray(collection.model())) throw new TypeError('ECHIDNA_INVALID_OPTION', 'collection.model', 'object')
				Object.assign(prefixes, {
					path: './database/' + collection.name,
					default: prefixes.properties.split('.').reduce((acc, prop) => {
						if (!Object.hasOwnProperty.call(acc, prop)) throw new Error('ECHIDNA_INVALID_PATH', prop)
						return acc[prop]
					}, collection.model())
				})
			} else for (const prefix of prefixes) if (typeof prefix != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'prefix of prefixes', 'string')
		} else if (typeof prefixes != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'prefixes', 'string|array|object')

		// Directory
		if (directory) {
			if (!['string', 'object'].includes(typeof directory) || Array.isArray(directory)) throw new TypeError('ECHIDNA_INVALID_OPTION', 'directory', 'string|object')
			const path = directory.path || directory
			if (!path || !existsSync(path)) throw new Error('ECHIDNA_INVALID_PATH', path)
			if (!lstatSync(path).isDirectory()) throw new Error('ECHIDNA_INVALID_OPTION', path, 'directory')

			if (directory.categories) {
				readdirSync(path).filter((dir) => lstatSync(join(path, dir)).isDirectory()).forEach((dir) =>
					readdirSync(join(path, dir)).filter((file) => lstatSync(join(path, dir, file)).isFile() && file.endsWith('.js')).forEach((file) => {
						const obj = require(join('../../../../', path, dir, file))
						if (typeof obj != 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', `module.exports of ${join(path, dir, file)}`, 'object')
						const [exec, options, help] = Array.isArray(obj) ? obj : [obj.exec, obj.options, obj.help]
						this.create(exec, Object.assign(options, { category: dir }), help)
					})
				)
			} else {
				readdirSync(path).filter((file) => lstatSync(join(path, file)).isFile() && file.endsWith('.js')).forEach((file) => {
					const obj = require(join('../../../../', path, file))
					if (typeof obj != 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', `module.exports of ${join(path, file)}`, 'object')
					const [exec, options, help] = Array.isArray(obj) ? obj : [obj.exec, obj.options, obj.help]
					this.create(exec, options, help)
				})
			}
		}

		// Commands handler
		const { client, options: { ignore, owners, lang } } = echidna
		const contents = require('../contents').events.message[lang] || require('../contents').events.message.en
		client.on('message', (message) => {
			if (!message || !message.guild || message.author.bot || (message && (ignore.users.includes(message.author.id) || ignore.guilds.includes(message.guild.id)))) return

			// Set prefixes
			let _prefix
			if (typeof prefixes == 'object' && !Array.isArray(prefixes)) {
				if (existsSync(join(prefixes.path, message.guild.id) + '.json')) {
					const value = prefixes.properties.split('.').reduce((acc, prop) => Object.hasOwnProperty.call(acc, prop) && acc[prop], require('../../../../' + join(prefixes.path, message.guild.id)))
					_prefix = typeof value != 'string' && !Array.isArray(value) ? prefixes.default : value
				} else _prefix = prefixes.default
			} else _prefix = prefixes

			// Set arguments
			const reg = message.content.toLowerCase().match(`^(<@!?${client.user.id}> (?= *)|${Array.isArray(_prefix) ? '(' + _prefix.map((str) => Util.parseToRegexp(str)).join('|') + ')' : Util.parseToRegexp(_prefix)}(?=[A-Za-z-]))`)
			const [prefix, command, ...args] = reg ? [reg[0], ...message.content.toLowerCase().slice(reg[0].length).trim().split(/\s+/g)] : [, ...message.content.toLowerCase().split(/\s+/g)]

			// Search command
			const expt = prefix && prefix.length && this.get(command, args[0])
			if (!expt) return

			// Allowed or denied channels, users, roles, guilds
			if (
				!owners.includes(message.author.id) &&
				// Deny
				((expt.options.deny.users.includes(message.author.id) && !expt.options.allow.users.includes(message.author.id)) ||
					(expt.options.deny.guilds.includes(message.guild.id) && !expt.options.allow.guilds.includes(message.guild.id)) ||
					(expt.options.deny.channels.includes(message.channel.id) && !expt.options.allow.channels.includes(message.channel.id)) ||
					(expt.options.deny.roles.some((role) => message.member.roles.cache.get(role)) && !expt.options.allow.roles.some((role) => message.member.roles.cache.get(role))) ||
					// Allow
					(expt.options.allow.users.length > 0 && !expt.options.allow.users.includes(message.author.id)) ||
					(expt.options.allow.guilds.length > 0 && !expt.options.allow.guilds.includes(message.guild.id)) ||
					(expt.options.allow.channels.length > 0 && !expt.options.allow.channels.includes(message.channel.id)) ||
					(expt.options.allow.roles.length > 0 && !expt.options.allow.roles.some((role) => message.member.roles.cache.get(role))))
			)
				return

			// cooldowns
			const key = `${message.author.id}${expt.options.parent ? expt.options.parent + expt.options.name : expt.options.name}`
			if (this.cooldowns[key] && this.cooldowns[key] - Date.now() / 1000 > 0) return message.channel.send(contents.cooldown(message.member.toString(), Math.ceil(this.cooldowns[key] - Date.now() / 1000)))

			// Commands flags
			if (expt.options.permissions.flags.includes('owner') && !owners.includes(message.author.id)) return message.channel.send(contents['no-owner'](message.author.toString()))

			// Permissions
			if (expt.options.permissions.users.length > 0 && !owners.includes(message.author.id) && message.member.permissions.missing(expt.options.permissions.users).length > 0) return message.channel.send(contents['no-member-perms'](message.member.toString(), message.member.permissions.missing(expt.options.permissions.users).join('` `')))
			if (expt.options.permissions.client.length > 0) {
				const perms = message.guild.me.permissions.missing().concat(...message.guild.me.permissionsIn(message.channel).missing())
				if (perms.length) return message.channel.send(contents['no-client-perms'](message.member.toString(), client.user.username, perms.join('` `')))
			}

			// Exec
			this.cooldowns[key] = Date.now() / 1000 + (expt.options.cooldown || 1)
			expt.exec({ client, message, prefix, command, args, Database, Collections, Util, Commands: this, options: { ignore, owners, lang } })
		})
	}

	/**
	 * Create a new command
     * @param { function } exec 
	 * @param { import('discord-echidna').Command['options'] } options 
	 * @param { any } help
	 * @example
	 * Commands.create(
	 * 	({ message }) => message.reply('world !')
	 *  { name: 'hello' }
	 * )
     */
	create (exec, options, help) {
		// Check command params
		options = commandCheck(exec, options)

		// Check if name/aliases is already taken
		if (this.exist(options.name, ...options.aliases)) throw new Error('ECHIDNA_NAME_TAKEN', 'Command')

		// Load command modules
		if (options.modules && typeof options.modules == 'string' && options.modules.length) {
			if (!existsSync(options.modules)) throw new Error('ECHIDNA_INVALID_PATH', options.modules)
			if (!lstatSync(options.modules).isDirectory()) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.modules', 'directory')
			options.modules = readdirSync(options.modules).filter((file) => lstatSync(join(options.modules, file)).isFile() && file.endsWith('.js')).map((file) => {
				const content = require(join('../../../../', options.modules, file))
				const arr = Array.isArray(content) ? content : Object.values(content)
				return { exec: arr[0], options: Object.assign(commandCheck(...arr), { parent: options.name }), help: arr[2] }
			})
		} else options.modules = []

		// Push in commands table
		this.array.push({ exec, options, help })
	}

	/**
	 * Get a command or command module
     * @param { string } name 
     * @param { string } subname 
     * @returns { object }
     */
	get (name, subname) {
		const command = this.array.find(({ options }) => [options.name, ...options.aliases].includes(name))
		return (command && subname && command.options.modules.find(({ options }) => [options.name, ...options.aliases].includes(subname))) || command
	}

	/**
     * @param  { ...string[] } names 
     * @returns { boolean }
     */
	exist (...names) {
		return this.array.some(({ options: { name, aliases } }) => [name, ...aliases].some((str) => names.includes(str)))
	}
}
