declare module 'discord-echidna' {
	import { ClientOptions, Client, Message, PermissionString, Channel, Emoji, Guild, User, GuildMember, Collection, Speaking, Invite, Snowflake, MessageReaction, Presence, Role, CloseEvent, VoiceState, TextChannel } from 'discord.js'

	// Classes

	export class Echidna {
		constructor (token: String, options?: BaseOptions)
		public client: Client
		public documents: Documents 
		public options: BaseOptions
		public on<K extends keyof ListenerParams> (event: K, listener?: (params: ListenerParams[K]) => void, options?: ListenerOptions[K]): ListenerParams[K]['Event']
	}

	export class Documents {
		constructor ()
		public models: ModelsManager
		public path: String
		public delete (ID: String, name: String): void
		public exist (ID: String, name: String): Boolean 
		public open (ID: String, name: String): DocumentManager
	}

	// Manager

	export class CommandsManager {
		constructor ()
		public table: Array<Object>
		public cooldowns: Object
		public create (exec: (params: ListenerParams['message']) => void, options: CommandOptions, help?: Object): void
		public get (name: String): Object | undefined
		public exist (...names: Array<String>): Boolean
	}

	export class DocumentManager {
		constructor (object: Object)
		public content: Object | Array<any>
		public default: Object | Array<any>
		public path: String
		public delete (): void
		public save (): void
		public reset (): this 
	}
	
	export class ModelsManager {
		constructor ()
		public table: Array<Object>
		public add (name: String, base: Object | Array<any>): void 
	}

	// Events

	export class ChannelCreateEvent {
		constructor (listener: (params: ListenerParams['channelCreate']) => void, options: Object, modules: Object)
		public client: Client
	}

	export class ChannelDeleteEvent {
		constructor (listener: (params: ListenerParams['channelDelete']) => void, options: Object, modules: Object)
		public client: Client
	}

	export class ChannelPinsUpdateEvent {
		constructor (listener: (params: ListenerParams['channelPinsUpdate']) => void, options: Object, modules: Object)
		public client: Client
	}

	export class ChannelUpdateEvent {
		constructor (listener: (params: ListenerParams['channelUpdate']) => void, options: Object, modules: Object)
		public client: Client
	}

	export class DebugEvent {
		constructor (listener: (params: ListenerParams['debug']) => void, options: Object, modules: Object)
	}

	export class EmojiCreateEvent {
		constructor (listener: (params: ListenerParams['emojiCreate']) => void, options: Object, modules: Object)
		public client: Client		
	}

	export class EmojiDeleteEvent {
		constructor (listener: (params: ListenerParams['emojiDelete']) => void, options: Object, modules: Object)
		public client: Client		
	}

	export class EmojiUpdateEvent {
		constructor (listener: (params: ListenerParams['emojiUpdate']) => void, options: Object, modules: Object)
		public client: Client		
	}

	export class ErrorEvent {
		constructor (listener: (params: ListenerParams['error']) => void, options: Object, modules: Object)
	}

	export class GuildBanAddEvent {
		constructor (listener: (params: ListenerParams['guildBanAdd']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildBanRemoveEvent {
		constructor (listener: (params: ListenerParams['guildBanRemove']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildCreateEvent {
		constructor (listener: (params: ListenerParams['guildCreate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildDeleteEvent {
		constructor (listener: (params: ListenerParams['guildDelete']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildIntegrationsUpdateEvent {
		constructor (listener: (params: ListenerParams['guildIntegrationsUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildMemberAddEvent {
		constructor (listener: (params: ListenerParams['guildMemberAdd']) => void, options: Object, modules: Object)
		public client: Client	
	}
	
	export class GuildMemberAvailableEvent {
		constructor (listener: (params: ListenerParams['guildMemberAvailable']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildMemberRemoveEvent {
		constructor (listener: (params: ListenerParams['guildMemberRemove']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildMembersChunkEvent {
		constructor (listener: (params: ListenerParams['guildMembersChunk']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildMemberSpeakingEvent {
		constructor (listener: (params: ListenerParams['guildMemberSpeaking']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildMemberUpdateEvent {
		constructor (listener: (params: ListenerParams['guildMemberUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildUnavailableEvent {
		constructor (listener: (params: ListenerParams['guildUnavailable']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class GuildUpdateEvent {
		constructor (listener: (params: ListenerParams['guildUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class InvalidatedEvent {
		constructor (listener: (params: ListenerParams['invalidated']) => void, options: Object, modules: Object)
	}

	export class InviteCreateEvent {
		constructor (listener: (params: ListenerParams['inviteCreate']) => void, options: Object, modules: Object)
		public client: Client			
	}

	export class InviteDeleteEvent {
		constructor (listener: (params: ListenerParams['inviteDelete']) => void, options: Object, modules: Object)
		public client: Client			
	}
	
	export class MessageEvent {
		constructor (listener: (params: ListenerParams['message']) => void, options: Object, modules: Object) // NEW : -1 param : client moove in last object
		public client: Client
		public commands: CommandsManager
	}

	export class MessageDeleteEvent {
		constructor (listener: (params: ListenerParams['messageDelete']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageDeleteBulkEvent {
		constructor (listener: (params: ListenerParams['messageDeleteBulk']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageReactionAddEvent {
		constructor (listener: (params: ListenerParams['messageReactionAdd']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageReactionRemoveEvent {
		constructor (listener: (params: ListenerParams['messageReactionRemove']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageReactionRemoveAllEvent {
		constructor (listener: (params: ListenerParams['messageReactionRemoveAll']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageReactionRemoveEmojiEvent {
		constructor (listener: (params: ListenerParams['messageReactionRemoveEmoji']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class MessageUpdateEvent {
		constructor (listener: (params: ListenerParams['messageUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class PresenceUpdateEvent {
		constructor (listener: (params: ListenerParams['presenceUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class RateLimitEvent {
		constructor (listener: (params: ListenerParams['rateLimit']) => void, options: Object, modules: Object)
	}

	export class ReadyEvent {
		constructor (listener: (params: ListenerParams['ready']) => void, options: Object, modules: Object) // NEW : -1 param : client moove in last object
		public client: Client
	}

	export class RoleCreateEvent {
		constructor (listener: (params: ListenerParams['roleCreate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class RoleDeleteEvent {
		constructor (listener: (params: ListenerParams['roleDelete']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class RoleUpdateEvent {
		constructor (listener: (params: ListenerParams['roleUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class ShardDisconnectEvent {
		constructor (listener: (params: ListenerParams['shardDisconnect']) => void, options: Object, modules: Object)
	}

	export class ShardErrorEvent {
		constructor (listener: (params: ListenerParams['shardError']) => void, options: Object, modules: Object)
	}

	export class ShardReadyEvent {
		constructor (listener: (params: ListenerParams['shardReady']) => void, options: Object, modules: Object)
	}

	export class ShardResumeEvent {
		constructor (listener: (params: ListenerParams['shardResume']) => void, options: Object, modules: Object)
	}

	export class TypingStartEvent {
		constructor (listener: (params: ListenerParams['typingStart']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class UserUpdateEvent {
		constructor (listener: (params: ListenerParams['userUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class VoiceStateUpdateEvent {
		constructor (listener: (params: ListenerParams['voiceStateUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	export class WarnEvent {
		constructor (listener: (params: ListenerParams['warn']) => void, options: Object, modules: Object)
	}

	export class WebhookUpdateEvent {
		constructor (listener: (params: ListenerParams['webhookUpdate']) => void, options: Object, modules: Object)
		public client: Client	
	}

	// Typings  

	interface AllowedOrDenyID {
		users?: Array<String>
		guilds?: Array<String>
		channels?: Array<String>
		roles?: Array<String>
	}

	interface BaseOptions {
		ignore?: { guilds?: Array<String>; users?: Array<String> }
		client?: ClientOptions
		owners?: Array<String>
	}

	interface CommandOptions {
		name: String
		aliases?: Array<String>
		cooldown?: Number
		permissions?: Permissions
		allow?: AllowedOrDenyID
		deny?: AllowedOrDenyID
	}

	type EchidnaFlags = 'owner'

	interface ListenerOptions {  
		channelCreate: {}
		channelDelete: {}
		channelPinsUpdate: {}
		channelUpdate: {}
		debug: {}
		emojiCreate: {}
		emojiDelete: {}
		emojiUpdate: {}
		error: {}
		guildBanAdd: {}
		guildBanRemove: {}
		guildCreate: {}
		guildDelete: {}
		guildIntegrationsUpdate: {}
		guildMemberAdd: {}
		guildMemberAvailable: {}
		guildMemberRemove: {}
		guildMembersChunk: {}
		guildMemberSpeaking: {}
		guildMemberUpdate: {}
		guildUnavailable: {}
		guildUpdate: {}
		invalidated: {}
		inviteCreate: {}
		inviteDelete: {}
		message: { commandsDir?: String; prefix?: String }
		messageDelete: {}
		messageDeleteBulk: {}
		messageReactionAdd: {}
		messageReactionRemove: {}
		messageReactionRemoveAll: {}
		messageReactionRemoveEmoji: {}
		messageUpdate: {}
		presenceUpdate: {}
		rateLimit: {}
		ready: {}
		roleCreate: {}
		roleDelete: {}
		roleUpdate: {}
		shardDisconnect: {}
		shardError: {}
		shardReady: {}
		shardResume: {}
		typingStart: {}
		userUpdate: {}
		voiceStateUpdate: {}
		warn: {}
		webhookUpdate: {}
	}

	interface ListenerParams {
		channelCreate: { client?: Client; channel?: Channel; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: ChannelCreateEvent; Documents?: Documents } 
		channelDelete: { client?: Client; channel?: Channel; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: ChannelDeleteEvent; Documents?: Documents } 
		channelPinsUpdate: { client?: Client; channel?: Channel; date?: Date; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: ChannelDeleteEvent; Documents?: Documents }
		channelUpdate: { client?: Client; oldChannel?: Channel; newChannel?: Channel; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: ChannelDeleteEvent; Documents?: Documents } 
		debug: { client?: Client; Event?: DebugEvent }
		emojiCreate: { client?: Client; emoji?: Emoji; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: EmojiCreateEvent; Documents?: Documents }
		emojiDelete: { client?: Client; emoji?: Emoji; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: EmojiDeleteEvent; Documents?: Documents }
		emojiUpdate: { client?: Client; oldEmoji?: Emoji; newEmoji?: Emoji; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: EmojiUpdateEvent; Documents?: Documents }
		error: { client?: Client; Event?: ErrorEvent }
		guildBanAdd: { client?: Client; guild?: Guild; user?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildBanAddEvent; Documents?: Documents }
		guildBanRemove: { client?: Client; guild?: Guild; user?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildBanRemoveEvent; Documents?: Documents }
		guildCreate: { client?: Client; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildCreateEvent; Documents?: Documents }
		guildDelete: { client?: Client; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildDeleteEvent; Documents?: Documents }
		guildIntegrationsUpdate: { client?: Client; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildIntegrationsUpdateEvent; Documents?: Documents }
		guildMemberAdd: { client?: Client; member?: GuildMember; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberAddEvent; Documents?: Documents }
		guildMemberAvailable: { client?: Client; member?: GuildMember; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberAvailableEvent; Documents?: Documents }
		guildMemberRemove: { client?: Client; member?: GuildMember; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberRemoveEvent; Documents?: Documents }
		guildMembersChunk: { client?: Client; members?: Collection<Snowflake, GuildMember>; guild?: Guild; chunk?: { index?: Number; count?: Number; nonce?: String }; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberRemoveEvent; Documents?: Documents }
		guildMemberSpeaking: { client?: Client; member?: GuildMember; readonly speaking?: Speaking; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberSpeakingEvent; Documents?: Documents }
		guildMemberUpdate: { client?: Client; oldMember?: GuildMember; newMember?: GuildMember; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildMemberUpdateEvent; Documents?: Documents }
		guildUnavailable: { client?: Client; guild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildUnavailableEvent; Documents?: Documents }
		guildUpdate: { client?: Client; oldGuild?: Guild; newGuild?: Guild; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: GuildUpdateEvent; Documents?: Documents }
		invalidated: { client?: Client; Event?: InvalidatedEvent }
		inviteCreate: { client?: Client; invite?: Invite, options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: InviteCreateEvent; Documents?: Documents }
		inviteDelete: { client?: Client; invite?: Invite, options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: InviteDeleteEvent; Documents?: Documents }
		message: { client?: Client; message?: Message; prefix?: String; command?: String; args?: Array<String>; Commands?: CommandsManager; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageEvent; Documents?: Documents } // NEW : options
		messageDelete: { client?: Client; message?: Message; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageDeleteEvent; Documents?: Documents }
		messageDeleteBulk: { client?: Client; messages?: Collection<Snowflake, Message>; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageDeleteEvent; Documents?: Documents }
		messageReactionAdd: { client?: Client; messageReaction?: MessageReaction; user?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageReactionAddEvent; Documents?: Documents }
		messageReactionRemove: { client?: Client; messageReaction?: MessageReaction; user?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageReactionRemoveEvent; Documents?: Documents }
		messageReactionRemoveAll: { client?: Client; message?: Message; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageReactionRemoveAllEvent; Documents?: Documents }
		messageReactionRemoveEmoji: { client?: Client; messageReaction?: MessageReaction; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageReactionRemoveEmojiEvent; Documents?: Documents }
		messageUpdate: { client?: Client; oldMessage?: Message; newMessage?: Message; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: MessageUpdateEvent; Documents?: Documents }
		presenceUpdate: { client?: Client; oldPresence?: Presence?; newPresence?: Presence; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: PresenceUpdateEvent; Documents?: Documents }
		rateLimit: { client?: Client; rateLimitInfo?: { timeout?: Number; limit?: Number; method?: String; path?: String; route?: String }; Event?: RateLimitEvent }
		ready: { client?: Client; Event?: ReadyEvent; Documents?: Documents }
		roleCreate: { client?: Client; role?: Role; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: RoleCreateEvent; Documents?: Documents }
		roleDelete: { client?: Client; role?: Role; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: RoleDeleteEvent; Documents?: Documents }
		roleUpdate: { client?: Client; oldRole?: Role; newRole?: Role; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: RoleUpdateEvent; Documents?: Documents }
		shardDisconnect: { client?: Client; event?: CloseEvent; id?: Number; Event?: RateLimitEvent }
		shardError: { client?: Client; error?: Error; shardID?: Number; Event?: RateLimitEvent }
		shardReady: { client?: Client; id?: Number; unavailableGuilds?: Set<String>; Event?: RateLimitEvent, Documents?: Documents }
		shardResume: { client?: Client; id?: Number; replayedEvents?: Number; Event?: RateLimitEvent, Documents?: Documents }
		typingStart: { client?: Client; channel?: Channel; user?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: TypingStartEvent; Documents?: Documents }
		userUpdate: { client?: Client; oldUser?: User; newUser?: User; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: UserUpdateEvent; Documents?: Documents }
		voiceStateUpdate: { client?: Client; oldState?: VoiceState; newState?: VoiceState; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: VoiceStateUpdateEvent; Documents?: Documents }
		warn: { client?: Client; info?: String; Event?: WarnEvent }
		webhookUpdate: { client?: Client; channel?: TextChannel; options?: { ignore?: BaseOptions['ignore']; owners?: Array<String> }; Event?: WebhookUpdateEvent; Documents?: Documents } 
	}

	interface Permissions {
		users?: Array<PermissionString>
		client?: Array<PermissionString>
		flags?: Array<EchidnaFlags>
	}
}
