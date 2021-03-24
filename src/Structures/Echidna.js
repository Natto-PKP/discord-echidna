const Documents = require('./Documents')
const { Client } = require('discord.js')

const _events = {
	channelCreate: require('../Events/ChannelCreate'),
	channelDelete: require('../Events/ChannelDelete'),
	channelPinsUpdate: require('../Events/ChannelPinsUpdate'),
	channelUpdate: require('../Events/ChannelUpdate'),
	debug: require('../Events/Debug'),
	emojiCreate: require('../Events/EmojiCreate'),
	emojiDelete: require('../Events/EmojiDelete'),
	emojiUpdate: require('../Events/EmojiUpdate'),
	error: require('../Events/Error'),
	guildBanAdd: require('../Events/GuildBanAdd'),
	guildBanRemove: require('../Events/GuildBanRemove'),
	guildCreate: require('../Events/GuildCreate'),
	guildDelete: require('../Events/GuildDelete'),
	guildIntegrationsUpdate: require('../Events/GuildIntegrationsUpdate'),
	guildMemberAdd: require('../Events/GuildMemberAdd'),
	guildMemberAvailable: require('../Events/GuildMemberAvailable'),
	guildMemberRemove: require('../Events/GuildMemberRemove'),
	guildMemberSpeaking: require('../Events/GuildMemberSpeaking'),
	guildMemberUpdate: require('../Events/GuildMemberUpdate'),
	guildMembersChunk: require('../Events/GuildMembersChunk'),
	guildUnavailable: require('../Events/GuildUnavailable'),
	guildUpdate: require('../Events/GuildUpdate'),
	invalidated: require('../Events/Invalidated'),
	inviteCreate: require('../Events/InviteCreate'),
	inviteDelete: require('../Events/InviteDelete'),
	message: require('../Events/Message'),
	messageDelete: require('../Events/MessageDelete'),
	messageDeleteBulk: require('../Events/MessageDeleteBulk'),
	messageReactionAdd: require('../Events/MessageReactionAdd'),
	messageReactionRemove: require('../Events/MessageReactionRemove'),
	messageReactionRemoveAll: require('../Events/MessageReactionRemoveAll'),
	messageReactionRemoveEmoji: require('../Events/MessageReactionRemoveEmoji'),
	messageUpdate: require('../Events/MessageUpdate'),
	presenceUpdate: require('../Events/PresenceUpdate'),
	rateLimit: require('../Events/RateLimit'),
	ready: require('../Events/Ready'),
	roleCreate: require('../Events/RoleCreate'),
	roleDelete: require('../Events/RoleDelete'),
	roleUpdate: require('../Events/RoleUpdate'),
	shardDisconnect: require('../Events/ShardDisconnect'),
	shardError: require('../Events/ShardError'),
	shardReady: require('../Events/ShardReady'),
	shardResume: require('../Events/ShardResume'),
	typingStart: require('../Events/TypingStart'),
	userUpdate: require('../Events/UserUpdate'),
	voiceStateUpdate: require('../Events/VoiceStateUpdate'),
	warn: require('../Events/Warn'),
	webhookUpdate: require('../Events/WebhookUpdate')
}

module.exports = class Echidna {
	/**
     * @param {String} token 
	 * @param {?{}} [options] 
     * @param {?{}} [options.ignore] List of guilds and users that the bot ignores
 	 * @param {?Object[]} [options.ignore.guilds] 
	 * @param {?Object[]} [options.ignore.users] 
 	 * @param {?{}} [options.client] Details here: https://discord.js.org/#/docs/main/stable/typedef/ClientOptions
	 * @param {?Object[]} [options.owners] Owners IDs
 	 * @example 
	 * const echidna = new Echidna('token', { owners: ['1234'] })
     */
	constructor (token, options) {
		// Options
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}
		if (!options.ignore || Array.isArray(options.ignore) || typeof options.ignore != 'object') options.ignore = { guilds: [], users: [] }
		if (!options.ignore.guilds || !Array.isArray(options.ignore.guilds)) options.ignore.guilds = []
		if (!options.ignore.users || !Array.isArray(options.ignore.users)) options.ignore.users = []
		if (!options.client || Array.isArray(options.client) || typeof options.client != 'object') options.client = {}
		if (!options.owners || !Array.isArray(options.owners)) options.owners = []

		this.options = options
		this.client = new Client(options.client)
		this.documents = new Documents()
		this.client.login(token)
	}

	/**
	 * @param {String} event 
	 * @param {Function} listener 
	 * @returns
	 * @example
	 * const echidna = new Echidna(token)
	 * echidna.on('ready', ({ client }) => console.log(client.user.username + ' is ready !'))
	 */
	on (event, listener = () => null, options = {}) {
		if (!options || Array.isArray(options) || typeof options != 'object') options = {}

		const result = _events[event]
		if (!result) throw Error(`"${event}" event is not supported`)
		if (!listener) listener = () => null
		if (typeof listener != 'function') throw Error('listener must be a function')
		return new _events[event](listener, Object.assign(options, this.options), { client: this.client, Documents: this.documents })
	}
}
