const { TypeError, Error } = require('../Errors/EchidnaError')
const Discord = require('discord.js')

// UserManager
/**
 * @async
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.User}
 */
Discord.UserManager.prototype.select = async function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((user) => user.id == search.replace(/\D+/g, '') || user.tag.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true) : result
}

// GuildMemberManager
/**
 * @async
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.GuildMember}
 */
Discord.GuildMemberManager.prototype.select = async function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	let result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((member) => member.id == search.replace(/\D+/g, '') || member.user.tag.toLowerCase().includes(search.toLowerCase()) || member.displayName.toLowerCase().includes(search.toLowerCase()))
	if (!result) {
		result = (await this.fetch({ user: search.replace(/\D+/g, ''), force: true })) || (strict && (await this.fetch({ query: search.split('#')[0], force: true })))
		return (result instanceof Discord.Collection ? result.find((member) => member.user.tag.toLowerCase().includes(search.toLowerCase()) || member.displayName.toLowerCase().includes(search.toLowerCase())) : result) || undefined
	} else return result
}

// ChannelManager
/**
 * @async
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @param {String|Boolean} [param1.type]
 * @returns {Discord.Channel}
 */
Discord.ChannelManager.prototype.select = async function (search, { strict = false, type = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true && (channel.id == search.replace(/\D+/g, '') || (channel.name && channel.name.toLowerCase().includes(search.toLowerCase())))))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true) : result
}

// GuildChannelManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @param {String|Boolean} [param1.type]
 * @returns {Discord.GuildChannel}
 */
Discord.GuildChannelManager.prototype.select = function (search, { strict = false, type = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true && (channel.id == search.replace(/\D+/g, '') || channel.name.toLowerCase().includes(search.toLowerCase()))))
}

// GuildManager
/**
 * @async
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.GuildManager}
 */
Discord.GuildManager.prototype.select = async function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((guild) => guild.id == search.replace(/\D+/g, '') || guild.name.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true) : result
}

// RoleManager
/**
 * @async
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.Role}
 */
Discord.RoleManager.prototype.select = async function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	const result = strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((role) => role.id == search.replace(/\D+/g, '') || role.name.toLowerCase().includes(search.toLowerCase()))
	return !result ? await this.fetch(search.replace(/\D+/g, ''), true, true) : result
}

// GuildMemberRoleManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.Role}
 */
Discord.GuildMemberRoleManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((role) => role.id == search.replace(/\D+/g, '') || role.name.toLowerCase().includes(search.toLowerCase()))
}

// GuildEmojiManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns {Discord.GuildEmoji}
 */
Discord.GuildEmojiManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((emoji) => emoji.id == search.replace(/\D+/g, '') || emoji.name.toLowerCase().includes(search.toLowerCase()))
}

// NEW

// Message
/**
 * @example
 * const format = (array, pages) => array.map(role => role.name).join(', ')
 * message.createPages(message.guild.roles.cache, format, { limit: 30 })
 * @async
 * @param {Discord.Collection|Array<any>} array 
 * @param {Function} format 
 * @param {Object} param2 
 * @param {Number} [param2.limit] 
 * @param {Array<String>} [param2.emojis] 
 * @param {Discord.ReactionCollectorOptions} collectorOptions 
 * @returns {Discord.Message}
 */
Discord.Message.prototype.createPages = async function (array, format, { limit, emojis = ['◀', '🔴', '▶'] } = {}, collectorOptions = { idle: 30000 }) {
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
