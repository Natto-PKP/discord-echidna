declare module 'discord-echidna' {
	import Discord from 'discord.js'

	// Structures

	export class Commands {
		constructor (echidna: Echidna, options: CommandsOptions)
		public array: { exec: (params: Command['exec']) => void; options: Command['options']; help?: any }[]
		public cooldowns: object
		public create (exec: (params: Command['exec']) => void, options: Command['options'], help?: any): void
		public get (name: string, arg?: string): { exec: (params: Command['exec']) => void; options: Command['options']; help?: any }
		public exist (...names: string[]): boolean
	}

	export class Echidna {
		constructor (token: string, EchidnaOptions?: EchidnaOptions)
		public client: Discord.Client
		public options: EchidnaOptions
		public on<K extends keyof Events> (event: K, listener?: (params: Listeners[K]) => void): Events[K]
		public commands (options: CommandsOptions): Commands
	}

	class CollectionsInterface {
		public array: { name: string; model: (ID: string) => void }[]
		public add (collectionName: string, model: object | any[]): void
	}

	class DatabaseInterface {
		public delete (DocumentID: string, collectionName: string): void
		public exist (DocumentID: string, collectionName: string): boolean
		public open (DocumentID: string, collectionName: string): Document
	}

	class UtilInterface {
		public assembly (target: object, source: object): object
		public checkTypings (target: object, source: object): object
		public parseToRegexp (value: string): string
	}

	export const Collections: CollectionsInterface
	export const Database: DatabaseInterface
	export const Util: UtilInterface

	// Managers

	class Document {
		constructor (params: { ID: string; path: string; collection: { name: string; model: (ID: string) => void } })
		public collection: { name: string; model: (ID: string) => void }
		public content: object
		private options: { ID: string; path: string }
		public delete (): void
		public update (source: any, options?: { index?: number | Function; path?: string }): this
		public save (): void
		public set (source: any, options?: { index?: number | Function; path?: string }): this
		public remove (options?: { index?: number | Function; path?: string; size?: 1 }): this
		public reset (): this
	}

	// Events

	class ChannelCreateEvent {
		constructor (listener: (params: Listeners['channelCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class ChannelDeleteEvent {
		constructor (listener: (params: Listeners['channelDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class ChannelPinsUpdateEvent {
		constructor (listener: (params: Listeners['channelPinsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class ChannelUpdate {
		constructor (listener: (params: Listeners['channelUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class DebugEvent {
		constructor (listener: (params: Listeners['debug']) => void, options: { client: Discord.Client })
	}

	class EmojiCreateEvent {
		constructor (listener: (params: Listeners['emojiCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class EmojiDeleteEvent {
		constructor (listener: (params: Listeners['emojiDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class EmojiUpdateEvent {
		constructor (listener: (params: Listeners['emojiUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class ErrorEvent {
		constructor (listener: (params: Listeners['error']) => void, options: { client: Discord.Client })
	}

	class GuildBanAddEvent {
		constructor (listener: (params: Listeners['guildBanAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildBanRemoveEvent {
		constructor (listener: (params: Listeners['guildBanRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildCreateEvent {
		constructor (listener: (params: Listeners['guildCreate']) => void, options: { client: Discord.Client })
	}

	class GuildDeleteEvent {
		constructor (listener: (params: Listeners['guildDelete']) => void, options: { client: Discord.Client })
	}

	class GuildIntegrationsUpdateEvent {
		constructor (listener: (params: Listeners['guildIntegrationsUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMemberAddEvent {
		constructor (listener: (params: Listeners['guildMemberAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMemberAvailableEvent {
		constructor (listener: (params: Listeners['guildMemberAvailable']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMemberRemoveEvent {
		constructor (listener: (params: Listeners['guildMemberRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMembersChunkEvent {
		constructor (listener: (params: Listeners['guildMembersChunk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMemberSpeakingEvent {
		constructor (listener: (params: Listeners['guildMemberSpeaking']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildMemberUpdateEvent {
		constructor (listener: (params: Listeners['guildMemberUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class GuildUnavailableEvent {
		constructor (listener: (params: Listeners['guildUnavailable']) => void, options: { client: Discord.Client })
	}

	class GuildUpdateEvent {
		constructor (listener: (params: Listeners['guildUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class InvalidatedEvent {
		constructor (listener: (params: Listeners['invalidated']) => void, options: { client: Discord.Client })
	}

	class InviteCreateEvent {
		constructor (listener: (params: Listeners['inviteCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class InviteDeleteEvent {
		constructor (listener: (params: Listeners['inviteDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageEvent {
		constructor (listener: (params: Listeners['message']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageDeleteEvent {
		constructor (listener: (params: Listeners['messageDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageDeleteBulkEvent {
		constructor (listener: (params: Listeners['messageDeleteBulk']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageReactionAddEvent {
		constructor (listener: (params: Listeners['messageReactionAdd']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageReactionRemoveEvent {
		constructor (listener: (params: Listeners['messageReactionRemove']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageReactionRemoveAllEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveAll']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageReactionRemoveEmojiEvent {
		constructor (listener: (params: Listeners['messageReactionRemoveEmoji']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class MessageUpdateEvent {
		constructor (listener: (params: Listeners['messageUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class PresenceUpdateEvent {
		constructor (listener: (params: Listeners['presenceUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class RateLimitEvent {
		constructor (listener: (params: Listeners['rateLimit']) => void, options: { client: Discord.Client })
	}

	class ReadyEvent {
		constructor (listener: (params: Listeners['ready']) => void, options: { client: Discord.Client })
	}

	class RoleCreateEvent {
		constructor (listener: (params: Listeners['roleCreate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class RoleDeleteEvent {
		constructor (listener: (params: Listeners['roleDelete']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class RoleUpdateEvent {
		constructor (listener: (params: Listeners['roleUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
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
		constructor (listener: (params: Listeners['typingStart']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class UserUpdateEvent {
		constructor (listener: (params: Listeners['userUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class VoiceStateUpdateEvent {
		constructor (listener: (params: Listeners['voiceStateUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	class WarnEvent {
		constructor (listener: (params: Listeners['warn']) => void, options: { client: Discord.Client })
	}

	class WebhookUpdateEvent {
		constructor (listener: (params: Listeners['webhookUpdate']) => void, options: { client: Discord.Client; ignore: Ignore; owners: string[] })
	}

	// Interfaces

	interface AllowedOrDenyID {
		users?: string[]
		guilds?: string[]
		channels?: string[]
		roles?: string[]
	}

	interface Command {
		exec: {
			client?: Discord.Client
			message?: Discord.Message
			prefix?: string
			command?: string
			args?: string[]
			Database?: DatabaseInterface
			Collections?: CollectionsInterface
			Util?: UtilInterface
			Commands?: Commands
			options?: { ignore?: Ignore; owners?: string[]; lang?: string }
		}
		options: {
			name: string
			aliases?: string[] | RegExp
			cooldown?: number
			permissions?: Permissions
			modules?: string
			allow?: AllowedOrDenyID
			deny?: AllowedOrDenyID
		}
	}

	interface CommandsOptions {
		prefixes: string | string[] | { collection: string; properties: string }
		directory: string | { path: string; categories: boolean }
	}

	type EchidnaFlags = 'owner'

	interface EchidnaOptions extends Discord.ClientOptions {
		ignore?: Ignore
		owners?: string[]
		lang?: 'fr' | 'en'
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

	interface Ignore {
		users?: Array<String>
		guilds?: Array<String>
	}

	interface Listeners {
		channelCreate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		channelDelete: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		channelPinsUpdate: { client?: Discord.Client; channel?: Discord.Channel; date?: Date; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		channelUpdate: { client?: Discord.Client; oldChannel?: Discord.Channel; newChannel?: Discord.Channel; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		debug: { client?: Discord.Client; info?: string }
		emojiCreate: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		emojiDelete: { client?: Discord.Client; emoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		emojiUpdate: { client?: Discord.Client; oldEmoji?: Discord.Emoji; newEmoji?: Discord.Emoji; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		error: { client?: Discord.Client; error?: Error }
		guildBanAdd: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildBanRemove: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildCreate: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildDelete: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildIntegrationsUpdate: { client?: Discord.Client; guild?: Discord.Guild; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMemberAdd: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMemberAvailable: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMemberRemove: { client?: Discord.Client; member?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMembersChunk: { client?: Discord.Client; members?: Discord.Collection<Discord.Snowflake, Discord.GuildMember>; guild?: Discord.Guild; chunk?: { index?: number; count?: number; nonce?: string }; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMemberSpeaking: { client?: Discord.Client; member?: Discord.GuildMember; readonly speaking: Discord.Speaking; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildMemberUpdate: { client?: Discord.Client; oldMember?: Discord.GuildMember; newMember?: Discord.GuildMember; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		guildUnavailable: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildUpdate: { client?: Discord.Client; oldGuild?: Discord.Guild; newGuild?: Discord.Guild; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		invalidated: { client?: Discord.Client }
		inviteCreate: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		inviteDelete: { client?: Discord.Client; invite?: Discord.Invite; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		message: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: string[] } }
		messageDelete: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageDeleteBulk: { client?: Discord.Client; messages?: Discord.Collection<Discord.Snowflake, Discord.Message>; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageReactionAdd: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageReactionRemove: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageReactionRemoveAll: { client?: Discord.Client; message?: Discord.Message; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageReactionRemoveEmoji: { client?: Discord.Client; reaction?: Discord.MessageReaction; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		messageUpdate: { client?: Discord.Client; oldMessage?: Discord.Message; newMessage?: Discord.Message; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		presenceUpdate: { client?: Discord.Client; oldPresence?: Discord.Presence; newPresence?: Discord.Presence; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		rateLimit: { client?: Discord.Client; info?: { timeout?: number; limit?: number; method?: string; path?: string; route?: string } }
		ready: { client?: Discord.Client; Database?: DatabaseInterface; Collections?: CollectionsInterface }
		roleCreate: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		roleDelete: { client?: Discord.Client; role?: Discord.Role; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		roleUpdate: { client?: Discord.Client; oldRole?: Discord.Role; newRole?: Discord.Role; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		shardDisconnect: { client?: Discord.Client; event?: Discord.CloseEvent; id?: number }
		shardError: { client?: Discord.Client; error?: Error; id?: number }
		shardReady: { client?: Discord.Client; id?: number; unavailableGuilds?: Set<String> }
		shardResume: { client?: Discord.Client; id?: number; replayedEvents?: number }
		typingStart: { client?: Discord.Client; channel?: Discord.Channel; user?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		userUpdate: { client?: Discord.Client; oldUser?: Discord.User; newUser?: Discord.User; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		voiceStateUpdate: { client?: Discord.Client; oldState?: Discord.VoiceState; newState?: Discord.VoiceState; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
		warn: { client?: Discord.Client; info?: string }
		webhookUpdate: { client?: Discord.Client; channel?: Discord.Channel; options?: { ignore?: Ignore; owners?: string[] }; Database?: DatabaseInterface }
	}

	interface Permissions {
		users?: Discord.PermissionString[]
		client?: Discord.PermissionString[]
		flags?: EchidnaFlags[]
	}
}
