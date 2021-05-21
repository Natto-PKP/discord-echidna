const { TypeError, Error } = require('../Errors/EchidnaError')
const Discord = require('discord.js')

/**
 * Search a Channel with name/ID
 * @async
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a Channel only by his ID
 * @param { string } [param1.type] Define specific channel type
 * @example
 * client.channels.select('12345', { strict: true, type: 'text' })
 * @returns { Discord.Channel }
 */
Discord.ChannelManager.prototype.select = async function (search, { strict, type } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true) && (channel.id == search.replace(/\D+/g, '') || (channel.name && channel.name.toLowerCase().includes(search.toLowerCase()))))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true).catch(() => undefined) : result
}

/**
 * Search a GuildChannel with name/ID
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a GuildChannel only by his ID
 * @param { string } [param1.type] Define specific channel type
 * @example
 * guild.channels.select('12345', { strict: true, type: 'text' })
 * @returns { Discord.GuildChannel }
 */
Discord.GuildChannelManager.prototype.select = function (search, { strict, type } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true) && (channel.id == search.replace(/\D+/g, '') || channel.name.toLowerCase().includes(search.toLowerCase())))
}

/**
 * Search a Emoji with name/ID
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a Emoji only by his ID
 * @example
 * guild.emojis.select('youloulou')
 * @returns { Discord.GuildEmoji }
 */
Discord.GuildEmojiManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((emoji) => emoji.id == search.replace(/\D+/g, '') || emoji.name.toLowerCase().includes(search.toLowerCase()))
}

/**
 * Search a Guild with name/ID
 * @async
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a Guild only by his ID
 * @example
 * client.guilds.select('12345')
 * @returns { Discord.GuildManager }
 */
Discord.GuildManager.prototype.select = async function (search, { strict } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((guild) => guild.id == search.replace(/\D+/g, '') || guild.name.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true).catch(() => undefined) : result
}

/**
 * Search a GuildMember with nickname/tag/ID
 * @async
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a GuildMember only by his ID
 * @example
 * guild.members.select('ations')
 * @returns { Discord.GuildMember }
 */
Discord.GuildMemberManager.prototype.select = async function (search, { strict } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	let result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((member) => member.id == search.replace(/\D+/g, '') || member.user.tag.toLowerCase().includes(search.toLowerCase()) || member.displayName.toLowerCase().includes(search.toLowerCase()))
	if (!result) {
		result = (await this.fetch({ user: search.replace(/\D+/g, ''), force: true }).catch(() => undefined)) || (strict && (await this.fetch({ query: search.split('#')[0], force: true })).catch(() => undefined))
		return (result instanceof Discord.Collection ? result.find((member) => member.user.tag.toLowerCase().includes(search.toLowerCase()) || member.displayName.toLowerCase().includes(search.toLowerCase())) : result) || undefined
	} else return result
}

/**
 * Search a Role with name/ID
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a Role only by his ID
 * @example
 * guild.roles.select('a role')
 * @returns { Discord.Role }
 */
Discord.GuildMemberRoleManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((role) => role.id == search.replace(/\D+/g, '') || role.name.toLowerCase().includes(search.toLowerCase()))
}

/**
 * @async
 * @param { Discord.Collection<string, object> | any[] } array 
 * @param { function } format Function to form pages 
 * @param { object } param2 Options
 * @param { number } [param2.limit] Element limit per page (default: 8)
 * @param { string[] } [param2.emojis] 3 emojis to navigate in menu
 * @param { Discord.ReactionCollectorOptions } collectorOptions 
 * @example
 * const format = (array, pages) => array.map(role => role.name).join(', ')
 * message.createPages(guild.roles.cache, format, { limit: 30 })
 * @returns { Discord.Message }
 */
Discord.Message.prototype.createPages = async function (array, format, { limit = 8, emojis = ['◀', '🔴', '▶'] } = {}, collectorOptions = { idle: 30000 }) {
	if (!array || (!Array.isArray(array) && !(array instanceof Discord.Collection))) throw new TypeError('ECHIDNA_INVALID_OPTION', 'array', 'array|Discord.Collection')
	if (!format || typeof format != 'function') throw new TypeError('ECHIDNA_INVALID_OPTION', 'format', 'function')
	if (!limit || typeof limit != 'number' || limit <= 0) throw new TypeError('ECHIDNA_INVALID_OPTION', 'limit', 'number > 0')
	if (this.guild && !this.guild.me.permissionsIn(this.channel).has(3072)) throw new Error('ECHIDNA_DISCORD_PERMS', 'client', '[ADD_REACTIONS, SEND_MESSAGES]')
	if (!emojis || !Array.isArray(emojis)) throw new TypeError('ECHIDNA_INVALID_OPTION', 'emojis', 'array')
	if (emojis.length < 3) throw new Error('ECHIDNA_INVALID_LENGTH', 'array', 'emojis', 3)

	array = array instanceof Discord.Collection ? array.array() : array
	const pages = Array.from({ length: Math.ceil(array.length / limit) }, (v, i) => format(array.slice(i * limit, i * limit + limit), { number: i + 1, total: Math.ceil(array.length / limit) }))

	const message = await this.channel.send(pages[0])
	if (!pages[1]) return message

	for (const e of emojis.slice(0, 3)) await message.react(e)
	const col = message.createReactionCollector((reaction, user) => emojis.some((e) => [reaction.emoji.name, reaction.emoji.id].includes(e)) && user.id == this.author.id, collectorOptions)

	let i = 0
	col
		.on('collect', async (reaction, user) => {
			reaction.users.remove(user).catch(() => null)
			if ([reaction.emoji.name, reaction.emoji.id].includes(emojis[0])) {
				pages[i - 1] ? --i : (i = pages.length - 1)
				await message.edit(pages[i]).catch(() => col.stop('error'))
			} else if ([reaction.emoji.name, reaction.emoji.id].includes(emojis[1])) col.stop('stop')
			else if ([reaction.emoji.name, reaction.emoji.id].includes(emojis[2])) {
				pages[i + 1] ? ++i : (i = 0)
				await message.edit(pages[i]).catch(() => col.stop('error'))
			}
		})
		.on('end', () => null)

	return message
}

/**
 * Search a Role with name/ID
 * @async
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a Role only by his ID
 * @example
 * guild.roles.select('a role')
 * @returns { Discord.Role }
 */
Discord.RoleManager.prototype.select = async function (search, { strict } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((role) => role.id == search.replace(/\D+/g, '') || role.name.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true).catch(() => undefined) : result
}

/**
 * Search a User with tag/ID
 * @async
 * @param { string } search 
 * @param { object } param1 Options
 * @param { boolean } [param1.strict] true to search a User only by his ID
 * @example
 * client.users.select("Nat'")
 * @returns { Discord.User }
 */
Discord.UserManager.prototype.select = async function (search, { strict } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((user) => user.id == search.replace(/\D+/g, '') || user.tag.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true).catch(() => undefined) : result
}
