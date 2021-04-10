import { Client, VoiceState, Message, PermissionString, ClientOptions, Channel, Emoji, Guild, Role, Presence, User, GuildMember, Collection, Snowflake, Speaking, CloseEvent, Invite, MessageReaction } from 'discord.js'

declare module 'discord-echidna' {
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
		constructor (listener: (params: Listeners['channelCreate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelDeleteEvent {
		constructor (listener: (params: Listeners['channelDelete']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelPinsUpdateEvent {
		constructor (listener: (params: Listeners['channelPinsUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class ChannelUpdate {
		constructor (listener: (params: Listeners['channelUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class DebugEvent {
		constructor (listener: (params: Listeners['debug']) => void, options: { client: Client })
	}

	export class EmojiCreateEvent {
		constructor (listener: (params: Listeners['emojiCreate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class EmojiDeleteEvent {
		constructor (listener: (params: Listeners['emojiDelete']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class EmojiUpdateEvent {
		constructor (listener: (params: Listeners['emojiUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class ErrorEvent {
		constructor (listener: (params: Listeners['error']) => void, options: { client: Client })
	}

	export class GuildBanAddEvent {
		constructor (listener: (params: Listeners['guildBanAdd']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildBanRemoveEvent {
		constructor (listener: (params: Listeners['guildBanRemove']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildCreateEvent {
		constructor (listener: (params: Listeners['guildCreate']) => void, options: { client: Client })
	}

	export class GuildDeleteEvent {
		constructor (listener: (params: Listeners['guildDelete']) => void, options: { client: Client })
	}

	export class GuildIntegrationsUpdateEvent {
		constructor (listener: (params: Listeners['guildIntegrationsUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberAddEvent {
		constructor (listener: (params: Listeners['guildMemberAdd']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberAvailableEvent {
		constructor (listener: (params: Listeners['guildMemberAvailable']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberRemoveEvent {
		constructor (listener: (params: Listeners['guildMemberRemove']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMembersChunkEvent {
		constructor (listener: (params: Listeners['guildMembersChunk']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberSpeakingEvent {
		constructor (listener: (params: Listeners['guildMemberSpeaking']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildMemberUpdateEvent {
		constructor (listener: (params: Listeners['guildMemberUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class GuildUnavailableEvent {
		constructor (listener: (params: Listeners['guildUnavailable']) => void, options: { client: Client })
	}

	export class GuildUpdateEvent {
		constructor (listener: (params: Listeners['guildUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class InvalidatedEvent {
		constructor (listener: (params: Listeners['invalidated']) => void, options: { client: Client })
	}

	export class InviteCreateEvent {
		constructor (listener: (params: Listeners['inviteCreate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class InviteDeleteEvent {
		constructor (listener: (params: Listeners['inviteDelete']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageEvent {
		constructor (listener: (params: Listeners['message']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageDeleteEvent {
		constructor (listener: (params: Listeners['messageDelete']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageDeleteBulkEvent {
		constructor (listener: (params: Listeners['messageDeleteBulk']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionAddEvent {
		constructor (listener: (params: Listeners['messageReactionAdd']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveEvent {
		constructor (listener: (params: Listeners['messageReactionRemove']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveAllEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveAll']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageReactionRemoveEmojiEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveEmoji']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class MessageUpdateEvent {
		constructor (listener: (params: Listeners['messageUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class PresenceUpdateEvent {
		constructor (listener: (params: Listeners['presenceUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class RateLimitEvent {
		constructor (listener: (params: Listeners['rateLimit']) => void, options: { client: Client })
	}

	export class ReadyEvent {
		constructor (listener: (params: Listeners['ready']) => void, options: { client: Client })
	}

	export class RoleCreateEvent {
		constructor (listener: (params: Listeners['roleCreate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class RoleDeleteEvent {
		constructor (listener: (params: Listeners['roleDelete']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class RoleUpdateEvent {
		constructor (listener: (params: Listeners['roleUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class ShardDisconnectEvent {
		constructor (listener: (params: Listeners['shardDisconnect']) => void, options: { client: Client })
	}

	export class ShardErrorEvent {
		constructor (listener: (params: Listeners['shardError']) => void, options: { client: Client })
	}

	export class ShardReadyEvent {
		constructor (listener: (params: Listeners['shardReady']) => void, options: { client: Client })
	}

	export class ShardResumeEvent {
		constructor (listener: (params: Listeners['shardResume']) => void, options: { client: Client })
	}

	export class TypingStartEvent {
		constructor (listener: (params: Listeners['typingStart']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class UserUpdateEvent {
		constructor (listener: (params: Listeners['userUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class VoiceStateUpdateEvent {
		constructor (listener: (params: Listeners['voiceStateUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
	}

	export class WarnEvent {
		constructor (listener: (params: Listeners['warn']) => void, options: { client: Client })
	}

	export class WebhookUpdateEvent {
		constructor (listener: (params: Listeners['webhookUpdate']) => void, options: { client: Client; ignore: Ignore; owners: Array<String> })
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
		aliases?: Array<String>
		cooldown?: Number
		permissions?: Permissions
		allow?: AllowedOrDenyID
		deny?: AllowedOrDenyID
	}

	type EchidnaFlags = 'owner'

	interface EchidnaOptions {
		client?: ClientOptions
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
		channelCreate: { client?: Client; channel?: Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelDelete: { client?: Client; channel?: Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelPinsUpdate: { client?: Client; channel?: Channel; date?: Date; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		channelUpdate: { client?: Client; oldChannel?: Channel; newChannel?: Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		debug: { client?: Client }
		emojiCreate: { client?: Client; emoji?: Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		emojiDelete: { client?: Client; emoji?: Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		emojiUpdate: { client?: Client; oldEmoji?: Emoji; newEmoji?: Emoji; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		error: { client?: Client; error?: Error }
		guildBanAdd: { client?: Client; guild?: Guild; user?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildBanRemove: { client?: Client; guild?: Guild; user?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildCreate: { client?: Client; guild?: Guild; Database?: Database }
		guildDelete: { client?: Client; guild?: Guild; Database?: Database }
		guildIntegrationsUpdate: { client?: Client; guild?: Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberAdd: { client?: Client; member?: GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberAvailable: { client?: Client; member?: GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberRemove: { client?: Client; member?: GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMembersChunk: { client?: Client; members?: Collection<Snowflake, GuildMember>; guild?: Guild; chunk?: { index?: Number; count?: Number; nonce?: String }; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberSpeaking: { client?: Client; member?: GuildMember; readonly speaking: Speaking; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildMemberUpdate: { client?: Client; oldMember?: GuildMember; newMember?: GuildMember; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		guildUnavailable: { client?: Client; guild?: Guild; Database?: Database }
		guildUpdate: { client?: Client; oldGuild?: Guild; newGuild?: Guild; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		invalidated: { client?: Client }
		inviteCreate: { client?: Client; invite?: Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		inviteDelete: { client?: Client; invite?: Invite; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		message: { client?: Client; message?: Message; prefix?: String; command?: String; args?: Array<String>; options?: { ignore?: Ignore; owners?: Array<String>; commandsDir?: String; prefix?: String }; Database?: Database; Collections?: Collections; Commands?: Commands }
		messageDelete: { client?: Client; message?: Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageDeleteBulk: { client?: Client; messages?: Collection<Snowflake, Message>; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionAdd: { client?: Client; reaction?: MessageReaction; user?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemove: { client?: Client; reaction?: MessageReaction; user?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemoveAll: { client?: Client; message?: Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageReactionRemoveEmoji: { client?: Client; reaction?: MessageReaction; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		messageUpdate: { client?: Client; oldMessage?: Message; newMessage?: Message; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		presenceUpdate: { client?: Client; oldPresence?: Presence; newPresence?: Presence; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		rateLimit: { client?: Client; info?: { timeout?: Number; limit?: Number; method?: String; path?: String; route?: String } }
		ready: { client?: Client; Database?: Database; Collections?: Collections; Commands?: Commands }
		roleCreate: { client?: Client; role?: Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		roleDelete: { client?: Client; role?: Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		roleUpdate: { client?: Client; oldRole?: Role; newRole?: Role; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		shardDisconnect: { client?: Client; event?: CloseEvent; id?: Number }
		shardError: { client?: Client; error?: Error; id?: Number }
		shardReady: { client?: Client; id?: Number; unavailableGuilds?: Set<String> }
		shardResume: { client?: Client; id?: Number; replayedEvents?: Number }
		typingStart: { client?: Client; channel?: Channel; user?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		userUpdate: { client?: Client; oldUser?: User; newUser?: User; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		voiceStateUpdate: { client?: Client; oldState?: VoiceState; newState?: VoiceState; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
		warn: { client?: Client; info?: String }
		webhookUpdate: { client?: Client; channel?: Channel; options?: { ignore?: Ignore; owners?: Array<String> }; Database?: Database }
	}

	interface Permissions {
		users?: Array<PermissionString>
		client?: Array<PermissionString>
		flags?: Array<EchidnaFlags>
	}
}

declare module 'discord.js' {
	interface ChannelManager {
		public select(search: String, options: { strict: Boolean; type: String | Boolean }): Channel
	}

	interface GuildChannelManager {
		public select(search: String, options: { strict: Boolean; type: String | Boolean }): Channel
	}

	interface GuildEmojiManager {
		public select(search: String, options: { strict: Boolean }): Emoji
	}

	interface GuildManager {
		public select(search: String, options: { strict: Boolean }): Guild
	}

	interface GuildMemberManager {
		public select(search: String, options: { strict: Boolean }): GuildMember
	}

	interface GuildMemberRoleManager {
		public select(search: String, options: { strict: Boolean }): Role
	}

	interface RoleManager {
		public select(search: String, options: { strict: Boolean }): Role
	}

	interface UserManager {
		public select(search: String, options: { strict: Boolean }): User
	}
}
