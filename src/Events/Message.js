const Commands = require('../Managers/Commands')
const { existsSync, readdirSync, lstatSync } = require('fs')

module.exports = class MessageEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, { ignore, prefix, owners, commandsDir }, { client, Documents }) {
		if (!prefix || typeof prefix != 'string') prefix = null

		this.client = client
		this.commands = new Commands()

		if (commandsDir) {
			if (typeof commandsDir != 'string') throw Error('options.commandsDir must be a string')
			if (!existsSync(commandsDir)) throw Error(`${commandsDir} path not exist`)
			if (!lstatSync(commandsDir).isDirectory()) throw Error(`${commandsDir} must be a directory`)
			readdirSync(commandsDir).forEach((f) => {
				if (!f.endsWith('.js')) return
				let obj
				try {
					obj = require(`../../../.${commandsDir}/${f}`)
				} catch (err) {
					throw Error(`${commandsDir}/${f} not contain module.exports`)
				}
				if (typeof obj != 'object') throw Error(`module.exports of ${commandsDir + '/' + f} must be a object`)
				this.commands.create(...(Array.isArray(obj) ? obj : Object.values(obj)))
			})
		}

		client.on('message', (message) => {
			if (!message || (message && ((message.author && ignore.users.includes(message.author.id)) || (message.guild && ignore.guilds.includes(message.guild.id))))) return

			const reg = message.content.toLowerCase().match(`^(<@!?${client.user.id}> (?= *)|${prefix}(?=[A-Za-z-]))`)
			const [PREFIX, command, ...args] = reg ? [reg[0], ...message.content.slice(reg[0].length).trim().split(/\s+/g)] : [, ...message.content.split(/\s+/g)]
			const pack = { client: this.client, message, prefix: PREFIX, command, args, commands: this.commands, options: { ignore, owners, commandsDir }, Event: this, Documents }

			listener(pack)

			if (message.guild && !message.author.bot) {
				const cmd = prefix && prefix.length > 0 && PREFIX && this.commands.get(command)
				if (!cmd) return

				if (!owners.includes(message.author.id)) {
					// Deny
					if (cmd.options.deny.users.includes(message.author.id) && !cmd.options.allow.users.includes(message.author.id)) return
					if (cmd.options.deny.guilds.includes(message.guild.id) && !cmd.options.allow.guilds.includes(message.guild.id)) return
					if (cmd.options.deny.channels.includes(message.channel.id) && !cmd.options.allow.channels.includes(message.channel.id)) return
					if (cmd.options.deny.roles.some((role) => message.member.roles.cache.get(role)) && !cmd.options.allow.roles.some((role) => message.member.roles.cache.get(role))) return
					// Allow
					if (cmd.options.allow.users.length > 0 && !cmd.options.allow.users.includes(message.author.id)) return
					if (cmd.options.allow.guilds.length > 0 && !cmd.options.allow.guilds.includes(message.guild.id)) return
					if (cmd.options.allow.channels.length > 0 && !cmd.options.allow.channels.includes(message.channel.id)) return
					if (cmd.options.allow.roles.length > 0 && !cmd.options.allow.roles.some((role) => message.member.roles.cache.get(role))) return
				}

				// cooldowns
				const key = `${message.author.id}${cmd.options.name}`
				if (this.commands.cooldowns[key] && this.commands.cooldowns[key] - Date.now() / 1000 > 0) return message.channel.send(`${message.member} **\` |\`** ⏳ You must wait another **${Math.ceil(this.commands.cooldowns[key] - Date.now() / 1000)}** second(s).`)

				// Commands flags
				if (cmd.options.permissions.flags.includes('owner') && !owners.includes(message.author.id)) return message.channel.send(`${message.author} **\`| ❌ You are not in the developers team.\`**`)

				// Standard
				if (cmd.options.permissions.users.length > 0 && !owners.includes(message.author.id) && message.member.permissions.missing(cmd.options.permissions.users).length > 0) return message.channel.send(`${message.member} **\` | ❌ You do not have the required permissions.\`**\n[\`${message.member.permissions.missing(cmd.options.permissions.users).join('` `')}\`]`)
				if (cmd.options.permissions.client.length > 0) {
					if (message.guild.me.permissions.missing(cmd.options.permissions.client).length > 0) return message.channel.send(`${message.member} **\` | ❌\` ${client.user.username}** does not have the required permissions.\n[\`${message.guild.me.permissions.missing(cmd.options.permissions.client).join('` `')}\`]`)
					if (message.guild.me.permissionsIn(message.channel).missing(cmd.options.permissions.client).length > 0) return message.channel.send(`${message.member} **\` | ❌\` ${client.user.username}** does not have the required permissions in this room.\n[\`${message.guild.me.permissionsIn(message.channel).missing(cmd.options.permissions.client).join('` `')}\`]`)
				}

				this.commands.cooldowns[key] = Date.now() / 1000 + cmd.options.cooldown
				cmd.exec(pack)
			}
		})
	}
}
