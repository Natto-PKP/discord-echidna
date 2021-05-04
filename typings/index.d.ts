declare module 'discord-echidna' {
	import Discord from 'discord.js'

	// Structures

	class CollectionsInterface {
		public array: Array<{ name: String; model: Function }>
		public add (collectionName: String, model: Object | Array<any>): void
	}

	export class Commands {
		constructor (echidna: Echidna, options: CommandsOptions)
		public array: Array<{ exec: (params: Command['exec']) => void; options: Command['options']; help?: any }>
		public cooldowns: Object
		public create (exec: (params: Command['exec']) => void, options: Command['options'], help?: any): void
		public get (name: String, arg?: String): { exec: (params: Command['exec']) => void; options: Command['options']; help?: any }
		public exist (...names: Array<String>): Boolean
	}

	class DatabaseInterface {
		public Collections: CollectionsInterface
		public delete (DocumentID: String, collectionName: String): void
		public exist (DocumentID: String, collectionName: String): Boolean
		public open (DocumentID: String, collectionName: String): Document
	}

	export class Echidna {
		constructor (token: String, EchidnaOptions?: EchidnaOptions)
		public client: Discord.Client
		public options: EchidnaOptions
		public on<K extends keyof Events> (event: K, listener?: (params: Listeners[K]) => void): Events[K]
		public on<K extends keyof EventsWithOptions> (event: K, listener?: (params: Listeners[K]) => void, EventOptions?: EventsOptions[K]): Events[K]
		public commands (options: CommandsOptions): Commands
	}

	class Util {
		checkTypings (target: Object, source: Object): Object
		parseToRegexp (value: String): String
	}

	export const Collections: CollectionsInterface
	export const Database: DatabaseInterface

	// Managers

	class Document {
		constructor (params: { ID: String; path: String; collection: { name: String; model: Function } })
		public collection: { name: String; model: Function }
		public content: Object | Array<any>
		private options: { ID: String; path: String }
		public delete (): void
		public update (source: Object, options?: { index?: Number; path?: String }): this
		private static update (target: Object, source: Object, options?: { index?: Number; path?: String }): Object | Array<any>
		public save (): void
		public remove (options?: { index?: Number; path?: String; size?: 1 }): this
		public reset (): this
	}

	// Events

	class ChannelCreateEvent {
		constructor (listener: (params: Listeners['channelCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class ChannelDeleteEvent {
		constructor (listener: (params: Listeners['channelDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class ChannelPinsUpdateEvent {
		constructor (listener: (params: Listeners['channelPinsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class ChannelUpdate {
		constructor (listener: (params: Listeners['channelUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class DebugEvent {
		constructor (listener: (params: Listeners['debug']) => void, options: { client: Discord.Client })
	}

	class EmojiCreateEvent {
		constructor (listener: (params: Listeners['emojiCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class EmojiDeleteEvent {
		constructor (listener: (params: Listeners['emojiDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class EmojiUpdateEvent {
		constructor (listener: (params: Listeners['emojiUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class ErrorEvent {
		constructor (listener: (params: Listeners['error']) => void, options: { client: Discord.Client })
	}

	class GuildBanAddEvent {
		constructor (listener: (params: Listeners['guildBanAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildBanRemoveEvent {
		constructor (listener: (params: Listeners['guildBanRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildCreateEvent {
		constructor (listener: (params: Listeners['guildCreate']) => void, options: { client: Discord.Client })
	}

	class GuildDeleteEvent {
		constructor (listener: (params: Listeners['guildDelete']) => void, options: { client: Discord.Client })
	}

	class GuildIntegrationsUpdateEvent {
		constructor (listener: (params: Listeners['guildIntegrationsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMemberAddEvent {
		constructor (listener: (params: Listeners['guildMemberAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMemberAvailableEvent {
		constructor (listener: (params: Listeners['guildMemberAvailable']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMemberRemoveEvent {
		constructor (listener: (params: Listeners['guildMemberRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMembersChunkEvent {
		constructor (listener: (params: Listeners['guildMembersChunk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMemberSpeakingEvent {
		constructor (listener: (params: Listeners['guildMemberSpeaking']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildMemberUpdateEvent {
		constructor (listener: (params: Listeners['guildMemberUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class GuildUnavailableEvent {
		constructor (listener: (params: Listeners['guildUnavailable']) => void, options: { client: Discord.Client })
	}

	class GuildUpdateEvent {
		constructor (listener: (params: Listeners['guildUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class InvalidatedEvent {
		constructor (listener: (params: Listeners['invalidated']) => void, options: { client: Discord.Client })
	}

	class InviteCreateEvent {
		constructor (listener: (params: Listeners['inviteCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class InviteDeleteEvent {
		constructor (listener: (params: Listeners['inviteDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageEvent {
		constructor (listener: (params: Listeners['message']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageDeleteEvent {
		constructor (listener: (params: Listeners['messageDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageDeleteBulkEvent {
		constructor (listener: (params: Listeners['messageDeleteBulk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageReactionAddEvent {
		constructor (listener: (params: Listeners['messageReactionAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageReactionRemoveEvent {
		constructor (listener: (params: Listeners['messageReactionRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageReactionRemoveAllEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveAll']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageReactionRemoveEmojiEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveEmoji']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class MessageUpdateEvent {
		constructor (listener: (params: Listeners['messageUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class PresenceUpdateEvent {
		constructor (listener: (params: Listeners['presenceUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class RateLimitEvent {
		constructor (listener: (params: Listeners['rateLimit']) => void, options: { client: Discord.Client })
	}

	class ReadyEvent {
		constructor (listener: (params: Listeners['ready']) => void, options: { client: Discord.Client })
	}

	class RoleCreateEvent {
		constructor (listener: (params: Listeners['roleCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class RoleDeleteEvent {
		constructor (listener: (params: Listeners['roleDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class RoleUpdateEvent {
		constructor (listener: (params: Listeners['roleUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class ShardDisconnectEvent {
		constructor (listener: (params: Listeners['shardDisconnect']) => void, options: { client: Discord.Client })
	}

	class ShardErrorEvent {
		constructor (listener: (params: Listeners['shardError']) => void, options: { client: Discord.Client })
	}

	class ShardReadyEvent {
		constructor (listener: (params: Listeners['shardReady']) => void, options: { client: Discord.Client })
	}

	class ShardResumeEvent {
		constructor (listener: (params: Listeners['shardResume']) => void, options: { client: Discord.Client })
	}

	class TypingStartEvent {
		constructor (listener: (params: Listeners['typingStart']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class UserUpdateEvent {
		constructor (listener: (params: Listeners['userUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class VoiceStateUpdateEvent {
		constructor (listener: (params: Listeners['voiceStateUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	class WarnEvent {
		constructor (listener: (params: Listeners['warn']) => void, options: { client: Discord.Client })
	}

	class WebhookUpdateEvent {
		constructor (listener: (params: Listeners['webhookUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	// Interfaces

	interface AllowedOrDenyID {
		users?: Array<String>
		guilds?: Array<String>
		channels?: Array<String>
		roles?: Array<String>
	}

	interface Command {
		exec: {
			client?: Discord.Client
			message?: Discord.Message
			prefix?: String
			command?: String
			args?: Array<String>
			Database?: DatabaseInterface
			Collections?: CollectionsInterface
			Util?: Util
			Commands?: Commands
			options?: { ignore?: Ignore; owners?: Array<String>; lang?: String }
		}
		options: {
			name: String
			aliases?: Array<String> | RegExp
			cooldown?: Number
			permissions?: Permissions
			modules?: String
			allow?: AllowedOrDenyID
			deny?: AllowedOrDenyID
		}
	}

	interface CommandsOptions {
		prefixes: String | Array<String> | { collection: String; properties: String }
		directory: String | { path: String; categories: Boolean }
	}

	type EchidnaFlags = 'owner'

	interface EchidnaOptions {
		client?: Discord.ClientOptions
		ignore?: Ignore
		owners?: Array<String>
	}

	interface EventsWithOptions {}

	interface Events extends EventsWithOptions {
		channelCreate: ChannelCreateEvent
		channelDelete: ChannelDeleteEvent
		channelPinsUpdate: ChannelPinsUpdateEvent
		channelUpdate: ChannelUpdate
		debug: DebugEvent
		emojiCreate: EmojiCreateEvent
		emojiDelete: EmojiDeleteEvent
		emojiUpdate: EmojiUpdateEvent
		error: ErrorEvent
		guildBanAdd: GuildBanAddEvent
		guildBanRemove: GuildBanRemoveEvent
		guildCreate: GuildCreateEvent
		guildDelete: GuildDeleteEvent
		guildIntegrationsUpdate: GuildIntegrationsUpdateEvent
		guildMemberAdd: GuildMemberAddEvent
		guildMemberAvailable: GuildMemberAvailableEvent
		guildMemberRemove: GuildBanRemoveEvent
		guildMembersChunk: GuildMembersChunkEvent
		guildMemberSpeaking: GuildMemberSpeakingEvent
		guildMemberUpdate: GuildMemberUpdateEvent
		guildUnavailable: GuildUnavailableEvent
		guildUpdate: GuildUpdateEvent
		invalidated: InvalidatedEvent
		inviteCreate: InviteCreateEvent
		inviteDelete: InviteDeleteEvent
		message: MessageEvent
		messageDelete: MessageDeleteEvent
		messageDeleteBulk: MessageDeleteBulkEvent
		messageReactionAdd: MessageReactionAddEvent
		messageReactionRemove: MessageReactionRemoveEvent
		messageReactionRemoveAll: MessageReactionRemoveAllEvent
		messageReactionRemoveEmoji: MessageReactionRemoveEmojiEvent
		messageUpdate: MessageUpdateEvent
		presenceUpdate: PresenceUpdateEvent
		rateLimit: RateLimitEvent
		ready: ReadyEvent
		roleCreate: RoleCreateEvent
		roleDelete: RoleDeleteEvent
		roleUpdate: RoleUpdateEvent
		shardDisconnect: ShardDisconnectEvent
		shardError: ShardErrorEvent
		shardReady: ShardReadyEvent
		shardResume: ShardResumeEvent
		typingStart: TypingStartEvent
		userUpdate: UserUpdateEvent
		voiceStateUpdate: VoiceStateUpdateEvent
		warn: WarnEvent
		webhookUpdate: WebhookUpdateEvent
	}

	interface EventsOptions {}

	interface Ignore {
		users?: Array<String>
		guilds?: Array<String>
	}

	interface Listeners {
		channelCreate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		channelDelete: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		channelPinsUpdate: { client?: Discord.Client; channel?: Discord.Channel; date?: Date; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		channelUpdate: { client?: Discord.Client; oldChannel?: Discord.Channel; newChannel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		debug: { client?: Discord.Client; info?: String }
		emojiCreate: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		emojiDelete: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		emojiUpdate: { client?: Discord.Client; oldEmoji?: Discord.Emoji; newEmoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		error: { client?: Discord.Client; error?: Error }
		guildBanAdd: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildBanRemove: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildCreate: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildDelete: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildIntegrationsUpdate: { client?: Discord.Client; guild?: Discord.Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMemberAdd: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMemberAvailable: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMemberRemove: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMembersChunk: { client?: Discord.Client; members?: Discord.Collection<Discord.Snowflake, Discord.GuildMember>; guild?: Discord.Guild; chunk?: { index?: Number; count?: Number; nonce?: String }; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMemberSpeaking: { client?: Discord.Client; member?: Discord.GuildMember; readonly speaking: Discord.Speaking; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildMemberUpdate: { client?: Discord.Client; oldMember?: Discord.GuildMember; newMember?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		guildUnavailable: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildUpdate: { client?: Discord.Client; oldGuild?: Discord.Guild; newGuild?: Discord.Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		invalidated: { client?: Discord.Client }
		inviteCreate: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		inviteDelete: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		message: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> } }
		messageDelete: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageDeleteBulk: { client?: Discord.Client; messages?: Discord.Collection<Discord.Snowflake, Discord.Message>; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageReactionAdd: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageReactionRemove: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageReactionRemoveAll: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageReactionRemoveEmoji: { client?: Discord.Client; reaction?: Discord.MessageReaction; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		messageUpdate: { client?: Discord.Client; oldMessage?: Discord.Message; newMessage?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		presenceUpdate: { client?: Discord.Client; oldPresence?: Discord.Presence; newPresence?: Discord.Presence; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		rateLimit: { client?: Discord.Client; info?: { timeout?: Number; limit?: Number; method?: String; path?: String; route?: String } }
		ready: { client?: Discord.Client; Database?: DatabaseInterface; Collections?: CollectionsInterface }
		roleCreate: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		roleDelete: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		roleUpdate: { client?: Discord.Client; oldRole?: Discord.Role; newRole?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		shardDisconnect: { client?: Discord.Client; event?: Discord.CloseEvent; id?: Number }
		shardError: { client?: Discord.Client; error?: Error; id?: Number }
		shardReady: { client?: Discord.Client; id?: Number; unavailableGuilds?: Set<String> }
		shardResume: { client?: Discord.Client; id?: Number; replayedEvents?: Number }
		typingStart: { client?: Discord.Client; channel?: Discord.Channel; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		userUpdate: { client?: Discord.Client; oldUser?: Discord.User; newUser?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		voiceStateUpdate: { client?: Discord.Client; oldState?: Discord.VoiceState; newState?: Discord.VoiceState; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
		warn: { client?: Discord.Client; info?: String }
		webhookUpdate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: DatabaseInterface }
	}

	interface Permissions {
		users?: Array<Discord.PermissionString>
		client?: Array<Discord.PermissionString>
		flags?: Array<EchidnaFlags>
	}
}
