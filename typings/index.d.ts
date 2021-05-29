declare module 'discord-echidna' {
	import Discord from 'discord.js'

	export class Echidna {
		constructor (token: string, EchidnaOptions?: EchidnaOptions)
		public client: Discord.Client
		public options: EchidnaOptions
		public on<K extends keyof Listeners> (event: K, listener?: (params: Listeners[K]) => void): this
		public commands (options: CommandsOptions): Commands
	}

	// Structures

	export class Commands {
		constructor (echidna: Echidna, options: CommandsOptions)
		public array: Command[]
		public cooldowns: object
		public create (exec: Command['exec'], options: Command['options'], help?: Command['help']): void
		public get (name: string, arg?: string): Command
		public exist (...names: string[]): boolean
	}

	class CollectionsInterface {
		public array: Collection[]
		public add (collectionName: string, model: object | any[]): void
	}

	class DatabaseInterface {
		public delete (DocumentID: string, collectionName: string): void
		public exist (DocumentID: string, collectionName: string): boolean
		public open (DocumentID: string, collectionName: string): Document
		public openAll (collectionName: string): Document[]
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
		public collection: Collection
		public cache: object | any[]
		private options: { ID: string; path: string }
		public delete (): void
		public update (source: any, options?: { index?: number | Function; path?: string }): this
		public save (): void
		public set (source: any, options?: { index?: number | Function; path?: string }): this
		public remove (options?: { index?: number | Function; path?: string; size?: 1 }): this
		public reset (): this
	}

	// Interfaces

	interface AllowedOrDeniedID {
		users?: string[]
		guilds?: string[]
		channels?: string[]
		roles?: string[]
	}

	interface Collection {
		name: string
		model(ID: string): object | any[]
	}

	interface CollectionGetValue {
		collection: string
		properties: string
	}

	interface Command {
		exec(params: { client?: Discord.Client; message?: Discord.Message; prefix?: string; command?: string; args?: string[]; Database?: DatabaseInterface; Collections?: CollectionsInterface; Util?: UtilInterface; Commands?: Commands; options?: { ignore?: Ignore; owners?: string[]; lang?: string } }): void
		options: { name: string; aliases?: string[] | RegExp; cooldown?: number; permissions?: Permissions; modules?: string; allow?: AllowedOrDeniedID; deny?: AllowedOrDeniedID }
		help: any
	}

	interface CommandsOptions {
		prefixes: string | string[] | CollectionGetValue
		directory: string | { path: string; categories: boolean }
	}

	type EchidnaFlags = 'owner'

	interface EchidnaOptions extends Discord.ClientOptions {
		ignore?: Ignore
		owners?: string[]
		lang?: 'fr' | 'en'
	}

	interface Ignore {
		users?: string[]
		guilds?: string[]
	}

	interface ListenerOptions {
		ignore?: Ignore
		owners?: string[]
	}

	interface Listeners {
		channelCreate: { client?: Discord.Client; channel?: Discord.Channel; options?: ListenerOptions; Database?: DatabaseInterface }
		channelDelete: { client?: Discord.Client; channel?: Discord.Channel; options?: ListenerOptions; Database?: DatabaseInterface }
		channelPinsUpdate: { client?: Discord.Client; channel?: Discord.Channel; date?: Date; options?: ListenerOptions; Database?: DatabaseInterface }
		channelUpdate: { client?: Discord.Client; oldChannel?: Discord.Channel; newChannel?: Discord.Channel; options?: ListenerOptions; Database?: DatabaseInterface }
		debug: { client?: Discord.Client; info?: string }
		emojiCreate: { client?: Discord.Client; emoji?: Discord.Emoji; options?: ListenerOptions; Database?: DatabaseInterface }
		emojiDelete: { client?: Discord.Client; emoji?: Discord.Emoji; options?: ListenerOptions; Database?: DatabaseInterface }
		emojiUpdate: { client?: Discord.Client; oldEmoji?: Discord.Emoji; newEmoji?: Discord.Emoji; options?: ListenerOptions; Database?: DatabaseInterface }
		error: { client?: Discord.Client; error?: Error }
		guildBanAdd: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		guildBanRemove: { client?: Discord.Client; guild?: Discord.Guild; user?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		guildCreate: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildDelete: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildIntegrationsUpdate: { client?: Discord.Client; guild?: Discord.Guild; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMemberAdd: { client?: Discord.Client; member?: Discord.GuildMember; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMemberAvailable: { client?: Discord.Client; member?: Discord.GuildMember; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMemberRemove: { client?: Discord.Client; member?: Discord.GuildMember; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMembersChunk: { client?: Discord.Client; members?: Discord.Collection<Discord.Snowflake, Discord.GuildMember>; guild?: Discord.Guild; chunk?: { index?: number; count?: number; nonce?: string }; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMemberSpeaking: { client?: Discord.Client; member?: Discord.GuildMember; readonly speaking: Discord.Speaking; options?: ListenerOptions; Database?: DatabaseInterface }
		guildMemberUpdate: { client?: Discord.Client; oldMember?: Discord.GuildMember; newMember?: Discord.GuildMember; options?: ListenerOptions; Database?: DatabaseInterface }
		guildUnavailable: { client?: Discord.Client; guild?: Discord.Guild; Database?: DatabaseInterface }
		guildUpdate: { client?: Discord.Client; oldGuild?: Discord.Guild; newGuild?: Discord.Guild; options?: ListenerOptions; Database?: DatabaseInterface }
		invalidated: { client?: Discord.Client }
		inviteCreate: { client?: Discord.Client; invite?: Discord.Invite; options?: ListenerOptions; Database?: DatabaseInterface }
		inviteDelete: { client?: Discord.Client; invite?: Discord.Invite; options?: ListenerOptions; Database?: DatabaseInterface }
		message: { client?: Discord.Client; message?: Discord.Message; options?: ListenerOptions; Database?: DatabaseInterface }
		messageDelete: { client?: Discord.Client; message?: Discord.Message; options?: ListenerOptions; Database?: DatabaseInterface }
		messageDeleteBulk: { client?: Discord.Client; messages?: Discord.Collection<Discord.Snowflake, Discord.Message>; options?: ListenerOptions; Database?: DatabaseInterface }
		messageReactionAdd: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		messageReactionRemove: { client?: Discord.Client; reaction?: Discord.MessageReaction; user?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		messageReactionRemoveAll: { client?: Discord.Client; message?: Discord.Message; options?: ListenerOptions; Database?: DatabaseInterface }
		messageReactionRemoveEmoji: { client?: Discord.Client; reaction?: Discord.MessageReaction; options?: ListenerOptions; Database?: DatabaseInterface }
		messageUpdate: { client?: Discord.Client; oldMessage?: Discord.Message; newMessage?: Discord.Message; options?: ListenerOptions; Database?: DatabaseInterface }
		presenceUpdate: { client?: Discord.Client; oldPresence?: Discord.Presence; newPresence?: Discord.Presence; options?: ListenerOptions; Database?: DatabaseInterface }
		rateLimit: { client?: Discord.Client; info?: { timeout?: number; limit?: number; method?: string; path?: string; route?: string } }
		ready: { client?: Discord.Client; Database?: DatabaseInterface; Collections?: CollectionsInterface }
		roleCreate: { client?: Discord.Client; role?: Discord.Role; options?: ListenerOptions; Database?: DatabaseInterface }
		roleDelete: { client?: Discord.Client; role?: Discord.Role; options?: ListenerOptions; Database?: DatabaseInterface }
		roleUpdate: { client?: Discord.Client; oldRole?: Discord.Role; newRole?: Discord.Role; options?: ListenerOptions; Database?: DatabaseInterface }
		shardDisconnect: { client?: Discord.Client; event?: Discord.CloseEvent; id?: number }
		shardError: { client?: Discord.Client; error?: Error; id?: number }
		shardReady: { client?: Discord.Client; id?: number; unavailableGuilds?: Set<String> }
		shardResume: { client?: Discord.Client; id?: number; replayedEvents?: number }
		typingStart: { client?: Discord.Client; channel?: Discord.Channel; user?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		userUpdate: { client?: Discord.Client; oldUser?: Discord.User; newUser?: Discord.User; options?: ListenerOptions; Database?: DatabaseInterface }
		voiceStateUpdate: { client?: Discord.Client; oldState?: Discord.VoiceState; newState?: Discord.VoiceState; options?: ListenerOptions; Database?: DatabaseInterface }
		warn: { client?: Discord.Client; info?: string }
		webhookUpdate: { client?: Discord.Client; channel?: Discord.Channel; options?: ListenerOptions; Database?: DatabaseInterface }
	}

	interface Permissions {
		users?: Discord.PermissionString[]
		client?: Discord.PermissionString[]
		flags?: EchidnaFlags[]
	}
}
