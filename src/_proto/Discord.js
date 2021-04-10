const { TypeError, Error } = require('../Errors/EchidnaError')
const Discord = require('discord.js')

// UserManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns 
 */
Discord.UserManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((user) => user.id == search.replace(/\D+/g, '') || user.tag.toLowerCase().includes(search.toLowerCase()))
}

// new

// GuildMemberManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns 
 */
Discord.GuildMemberManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((member) => member.id == search.replace(/\D+/g, '') || member.user.tag.toLowerCase().includes(search.toLowerCase()) || member.displayName.toLowerCase()).includes(search.toLowerCase())
}

// ChannelManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @param {String|Boolean} [param1.type]
 * @returns 
 */
Discord.ChannelManager.prototype.select = function (search, { strict = false, type = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true && (channel.id == search.replace(/\D+/g, '') || (channel.name && channel.name.toLowerCase().includes(search.toLowerCase())))))
}

// GuildChannelManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @param {String|Boolean} [param1.type]
 * @returns 
 */
Discord.GuildChannelManager.prototype.select = function (search, { strict = false, type = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((channel) => (type ? channel.type == `${type}`.toLowerCase() : true && (channel.id == search.replace(/\D+/g, '') || channel.name.toLowerCase().includes(search.toLowerCase()))))
}

// GuildManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns 
 */
Discord.GuildManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((guild) => guild.id == search.replace(/\D+/g, '') || guild.name.toLowerCase().includes(search.toLowerCase()))
}

// RoleManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns 
 */
Discord.RoleManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((role) => role.id == search.replace(/\D+/g, '') || role.name.toLowerCase().includes(search.toLowerCase()))
}

// GuildMemberRoleManager
/**
 * @param {String} search 
 * @param {Object} param1 
 * @param {Boolean} [param1.strict]
 * @returns 
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
 * @returns 
 */
Discord.GuildEmojiManager.prototype.select = function (search, { strict = false } = {}) {
	if (!search || typeof search != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'search', 'string')
	return strict ? this.cache.get(search.replace(/\D+/g, '')) : this.cache.find((emoji) => emoji.id == search.replace(/\D+/g, '') || emoji.name.toLowerCase().includes(search.toLowerCase()))
}
