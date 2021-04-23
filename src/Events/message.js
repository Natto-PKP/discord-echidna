const Database = require('../Structures/Database')
const Collections = require('../Structures/Collections')
const Commands = require('../Structures/Commands')
const { Error, TypeError } = require('../Errors/EchidnaError')
const { existsSync, lstatSync, readdirSync } = require('fs')

module.exports = {
	manager: class MessageEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client, ignore, owners, commandsDir, prefix }) {
			if (commandsDir) {
				if (typeof commandsDir != 'string' || !commandsDir.length) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.commandsDir', 'string')
				if (!existsSync(commandsDir)) throw new Error('ECHIDNA_INVALID_PATH', commandsDir)
				if (!lstatSync(commandsDir).isDirectory()) throw new Error('ECHIDNA_INVALID_OPTION', commandsDir, 'directory')
				readdirSync(commandsDir).forEach((f) => {
					if (!f.endsWith('.js')) return
					let obj
					try {
						obj = require(`../../../.${commandsDir}/${f}`)
					} catch (err) {
						throw new Error('ECHIDNA_INVALID_EXPORT', `${commandsDir}/${f}`)
					}
					if (typeof obj != 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', `module.exports of ${commandsDir + '/' + f}`, 'object')
					Commands.create(...(Array.isArray(obj) ? obj : Object.values(obj)))
				})
			}

			client.on('message', (message) => {
				if (!message || (message && ((message.author && ignore.users.includes(message.author.id)) || (message.guild && ignore.guilds.includes(message.guild.id))))) return

				const reg = message.content.toLowerCase().match(`^(<@!?${client.user.id}> (?= *)|${prefix}(?=[A-Za-z-]))`)
				const [PREFIX, command, ...args] = reg ? [reg[0], ...message.content.slice(reg[0].length).trim().split(/\s+/g)] : [, ...message.content.split(/\s+/g)]
				const pack = { client, message, prefix: PREFIX, command, args, options: { ignore, owners, commandsDir, prefix }, Database, Collections, Commands }

				listener(pack)

				if (message.guild && !message.author.bot) {
					const cmd = prefix && prefix.length > 0 && PREFIX && Commands.get(command, args[0])
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
					const key = `${message.author.id}${cmd.options.parent ? cmd.options.parent + cmd.options.name : cmd.options.name}`
					if (Commands.cooldowns[key] && Commands.cooldowns[key] - Date.now() / 1000 > 0) return message.channel.send(`${message.member} **\` |\`** ⏳ You must wait another **${Math.ceil(Commands.cooldowns[key] - Date.now() / 1000)}** second(s).`)

					// Commands flags
					if (cmd.options.permissions.flags.includes('owner') && !owners.includes(message.author.id)) return message.channel.send(`${message.author} **\`| ❌ You are not in the developers team.\`**`)

					// Permissions
					if (cmd.options.permissions.users.length > 0 && !owners.includes(message.author.id) && message.member.permissions.missing(cmd.options.permissions.users).length > 0) return message.channel.send(`${message.member} **\` | ❌ You do not have the required permissions.\`**\n[\`${message.member.permissions.missing(cmd.options.permissions.users).join('` `')}\`]`)
					if (cmd.options.permissions.client.length > 0) {
						if (message.guild.me.permissions.missing(cmd.options.permissions.client).length > 0) return message.channel.send(`${message.member} **\` | ❌\` ${client.user.username}** does not have the required permissions.\n[\`${message.guild.me.permissions.missing(cmd.options.permissions.client).join('` `')}\`]`)
						if (message.guild.me.permissionsIn(message.channel).missing(cmd.options.permissions.client).length > 0) return message.channel.send(`${message.member} **\` | ❌\` ${client.user.username}** does not have the required permissions in this room.\n[\`${message.guild.me.permissionsIn(message.channel).missing(cmd.options.permissions.client).join('` `')}\`]`)
					}

					// Exec
					Commands.cooldowns[key] = Date.now() / 1000 + (cmd.options.cooldown || 1)
					cmd.exec(pack)
				}
			})
		}
	},
	defaultOptions: { commandsDir: '', prefix: '!' }
}
