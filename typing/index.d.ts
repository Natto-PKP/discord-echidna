declare module 'discord-echidna' {
	import Discord from 'discord.js'

	// Structures

	export class Collections {
		public array: Array<{ name: String; model: Function }>
		public add (collectionName: String, model: Object | Array<any>): void
	}

	export class Commands {
		public array: Array<{ exec: Function; options: Object; help?: Object }>
		public cooldowns: Object
		public create (exec: (params: Listeners['message']) => void, options: CommandsOptions, help?: Object): void
		public get (name: String): { exec: (params: Listeners['message']) => void; options: CommandsOptions; help?: Object }
		public exist (...names: Array<String>): Boolean
	}

	export class Database {
		public Collections: Collections
		public delete (DocumentID: String, collectionName: String): void
		public exist (DocumentID: String, collectionName: String): Boolean
		public open (DocumentID: String, collectionName: String): Document
	}

	export class Echidna {
		constructor (token: String, EchidnaOptions?: EchidnaOptions)
		public on<K extends keyof Events> (event: K, listener?: (params: Listeners[K]) => void, EventOptions?: EventsOptions[K]): Events[K]
	}

	// Managers

	export class Document {
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

	export class ChannelCreateEvent {
		constructor (listener: (params: Listeners['channelCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelDeleteEvent {
		constructor (listener: (params: Listeners['channelDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelPinsUpdateEvent {
		constructor (listener: (params: Listeners['channelPinsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelUpdate {
		constructor (listener: (params: Listeners['channelUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class DebugEvent {
		constructor (listener: (params: Listeners['debug']) => void, options: { client: Discord.Client })
	}

	export class EmojiCreateEvent {
		constructor (listener: (params: Listeners['emojiCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class EmojiDeleteEvent {
		constructor (listener: (params: Listeners['emojiDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class EmojiUpdateEvent {
		constructor (listener: (params: Listeners['emojiUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class ErrorEvent {
		constructor (listener: (params: Listeners['error']) => void, options: { client: Discord.Client })
	}

	export class GuildBanAddEvent {
		constructor (listener: (params: Listeners['guildBanAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildBanRemoveEvent {
		constructor (listener: (params: Listeners['guildBanRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildCreateEvent {
		constructor (listener: (params: Listeners['guildCreate']) => void, options: { client: Discord.Client })
	}

	export class GuildDeleteEvent {
		constructor (listener: (params: Listeners['guildDelete']) => void, options: { client: Discord.Client })
	}

	export class GuildIntegrationsUpdateEvent {
		constructor (listener: (params: Listeners['guildIntegrationsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberAddEvent {
		constructor (listener: (params: Listeners['guildMemberAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberAvailableEvent {
		constructor (listener: (params: Listeners['guildMemberAvailable']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberRemoveEvent {
		constructor (listener: (params: Listeners['guildMemberRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMembersChunkEvent {
		constructor (listener: (params: Listeners['guildMembersChunk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberSpeakingEvent {
		constructor (listener: (params: Listeners['guildMemberSpeaking']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberUpdateEvent {
		constructor (listener: (params: Listeners['guildMemberUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildUnavailableEvent {
		constructor (listener: (params: Listeners['guildUnavailable']) => void, options: { client: Discord.Client })
	}

	export class GuildUpdateEvent {
		constructor (listener: (params: Listeners['guildUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class InvalidatedEvent {
		constructor (listener: (params: Listeners['invalidated']) => void, options: { client: Discord.Client })
	}

	export class InviteCreateEvent {
		constructor (listener: (params: Listeners['inviteCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class InviteDeleteEvent {
		constructor (listener: (params: Listeners['inviteDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageEvent {
		constructor (listener: (params: Listeners['message']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageDeleteEvent {
		constructor (listener: (params: Listeners['messageDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageDeleteBulkEvent {
		constructor (listener: (params: Listeners['messageDeleteBulk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionAddEvent {
		constructor (listener: (params: Listeners['messageReactionAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveEvent {
		constructor (listener: (params: Listeners['messageReactionRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveAllEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveAll']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveEmojiEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveEmoji']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageUpdateEvent {
		constructor (listener: (params: Listeners['messageUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class PresenceUpdateEvent {
		constructor (listener: (params: Listeners['presenceUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class RateLimitEvent {
		constructor (listener: (params: Listeners['rateLimit']) => void, options: { client: Discord.Client })
	}

	export class ReadyEvent {
		constructor (listener: (params: Listeners['ready']) => void, options: { client: Discord.Client })
	}

	export class RoleCreateEvent {
		constructor (listener: (params: Listeners['roleCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class RoleDeleteEvent {
		constructor (listener: (params: Listeners['roleDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class RoleUpdateEvent {
		constructor (listener: (params: Listeners['roleUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class ShardDisconnectEvent {
		constructor (listener: (params: Listeners['shardDisconnect']) => void, options: { client: Discord.Client })
	}

	export class ShardErrorEvent {
		constructor (listener: (params: Listeners['shardError']) => void, options: { client: Discord.Client })
	}

	export class ShardReadyEvent {
		constructor (listener: (params: Listeners['shardReady']) => void, options: { client: Discord.Client })
	}

	export class ShardResumeEvent {
		constructor (listener: (params: Listeners['shardResume']) => void, options: { client: Discord.Client })
	}

	export class TypingStartEvent {
		constructor (listener: (params: Listeners['typingStart']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class UserUpdateEvent {
		constructor (listener: (params: Listeners['userUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class VoiceStateUpdateEvent {
		constructor (listener: (params: Listeners['voiceStateUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	export class WarnEvent {
		constructor (listener: (params: Listeners['warn']) => void, options: { client: Discord.Client })
	}

	export class WebhookUpdateEvent {
		constructor (listener: (params: Listeners['webhookUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: Array<String> })
	}

	// Interfaces

	interface AllowedOrDenyID {
		users?: Array<String>
		guilds?: Array<String>
		channels?: Array<String>
		roles?: Array<String>
	}

	interface CommandsOptions {
		name: String
		aliases?: Array<String> | RegExp
		cooldown?: Number
		permissions?: Permissions
		allow?: AllowedOrDenyID
		deny?: AllowedOrDenyID
	}

	type EchidnaFlags = 'owner'

	interface EchidnaOptions {
		client?: Discord.ClientOptions
		ignore?: Ignore
		owners?: Array<String>
	}

	interface Events {
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

	interface EventsOptions {
		channelCreate: Object
		channelDelete: Object
		channelPinsUpdate: Object
		channelUpdate: Object
		debug: Object
		emojiCreate: Object
		emojiDelete: Object
		emojiUpdate: Object
		error: Object
		guildBanAdd: Object
		guildBanRemove: Object
		guildCreate: Object
		guildDelete: Object
		guildIntegrationsUpdate: Object
		guildMemberAdd: Object
		guildMemberAvailable: Object
		guildMemberRemove: Object
		guildMembersChunk: Object
		guildMemberSpeaking: Object
		guildMemberUpdate: Object
		guildUnavailable: Object
		guildUpdate: Object
		invalidated: Object
		inviteCreate: Object
		inviteDelete: Object
		message: { commandsDir?: String; prefix?: String }
		messageDelete: Object
		messageDeleteBulk: Object
		messageReactionAdd: Object
		messageReactionRemove: Object
		messageReactionRemoveAll: Object
		messageReactionRemoveEmoji: Object
		messageUpdate: Object
		presenceUpdate: Object
		rateLimit: Object
		ready: Object
		roleCreate: Object
		roleDelete: Object
		roleUpdate: Object
		shardDisconnect: Object
		shardError: Object
		shardReady: Object
		shardResume: Object
		typingStart: Object
		userUpdate: Object
		voiceStateUpdate: Object
		warn: Object
		webhookUpdate: Object
	}

	interface Ignore {
		users?: Array<String>
		guilds?: Array<String>
	}

	interface Listeners {
		channelCreate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelDelete: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelPinsUpdate: { client?: Discord.Client; channel?: Discord.Channel; date?: Date; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelUpdate: { client?: Discord.Client; oldChannel?: Discord.Channel; newChannel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		debug: { client?: Discord.Client }
		emojiCreate: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		emojiDelete: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		emojiUpdate: { client?: Discord.Client; oldEmoji?: Discord.Emoji; newEmoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		error: { client?: Discord.Client; error?: Error }
		guildBanAdd: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildBanRemove: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildCreate: { client?: Discord.Client; guild?: Discord.Guild; Database?: Database }
		guildDelete: { client?: Discord.Client; guild?: Discord.Guild; Database?: Database }
		guildIntegrationsUpdate: { client?: Discord.Client; guild?: Discord.Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberAdd: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberAvailable: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberRemove: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMembersChunk: { client?: Discord.Client; members?: Discord.Collection<Discord.Snowflake, Discord.GuildMember>; guild?: Discord.Guild; chunk?: { index?: Number; count?: Number; nonce?: String }; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberSpeaking: { client?: Discord.Client; member?: Discord.GuildMember; readonly speaking: Discord.Speaking; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberUpdate: { client?: Discord.Client; oldMember?: Discord.GuildMember; newMember?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildUnavailable: { client?: Discord.Client; guild?: Discord.Guild; Database?: Database }
		guildUpdate: { client?: Discord.Client; oldGuild?: Discord.Guild; newGuild?: Discord.Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		invalidated: { client?: Discord.Client }
		inviteCreate: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		inviteDelete: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		message: { client?: Discord.Client; message?: Discord.Message; prefix?: String; command?: String; args?: Array<String>; options?: { ignore?: Ignore; owners?: Array<String>; commandsDir?: String; prefix?: String }; Database?: Database; Collections?: Collections; Commands?: Commands }
		messageDelete: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageDeleteBulk: { client?: Discord.Client; messages?: Discord.Collection<Discord.Snowflake, Discord.Message>; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionAdd: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemove: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemoveAll: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemoveEmoji: { client?: Discord.Client; reaction?: Discord.MessageReaction; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageUpdate: { client?: Discord.Client; oldMessage?: Discord.Message; newMessage?: Discord.Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		presenceUpdate: { client?: Discord.Client; oldPresence?: Discord.Presence; newPresence?: Discord.Presence; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		rateLimit: { client?: Discord.Client; info?: { timeout?: Number; limit?: Number; method?: String; path?: String; route?: String } }
		ready: { client?: Discord.Client; Database?: Database; Collections?: Collections; Commands?: Commands }
		roleCreate: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		roleDelete: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		roleUpdate: { client?: Discord.Client; oldRole?: Discord.Role; newRole?: Discord.Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		shardDisconnect: { client?: Discord.Client; event?: Discord.CloseEvent; id?: Number }
		shardError: { client?: Discord.Client; error?: Error; id?: Number }
		shardReady: { client?: Discord.Client; id?: Number; unavailableGuilds?: Set<String> }
		shardResume: { client?: Discord.Client; id?: Number; replayedEvents?: Number }
		typingStart: { client?: Discord.Client; channel?: Discord.Channel; user?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		userUpdate: { client?: Discord.Client; oldUser?: Discord.User; newUser?: Discord.User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		voiceStateUpdate: { client?: Discord.Client; oldState?: Discord.VoiceState; newState?: Discord.VoiceState; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		warn: { client?: Discord.Client; info?: String }
		webhookUpdate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
	}

	interface Permissions {
		users?: Array<Discord.PermissionString>
		client?: Array<Discord.PermissionString>
		flags?: Array<EchidnaFlags>
	}
}

declare module 'discord.js' {
	import Discord from 'discord.js'

	// New methods
	interface ChannelManager {
		select(search: String, options: { strict: Boolean; type: String | Boolean }): Discord.Channel
	}

	interface GuildChannelManager {
		select(search: String, options: { strict: Boolean; type: String | Boolean }): Discord.Channel
	}

	interface GuildEmojiManager {
		select(search: String, options: { strict: Boolean }): Discord.Emoji
	}

	interface GuildManager {
		select(search: String, options: { strict: Boolean }): Discord.Guild
	}

	interface GuildMemberManager {
		select(search: String, options: { strict: Boolean }): Discord.GuildMember
	}

	interface GuildMemberRoleManager {
		select(search: String, options: { strict: Boolean }): Discord.Role
	}

	interface RoleManager {
		select(search: String, options: { strict: Boolean }): Discord.Role
	}

	interface UserManager {
		select(search: String, options: { strict: Boolean }): Discord.User
	}
}
