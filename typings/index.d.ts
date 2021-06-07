declare module 'discord-echidna' {
	import Discord from 'discord.js'

	export class Echidna {
		constructor (token: string, EchidnaOptions?: EchidnaOptions)
		public client: Discord.Client
		public options: EchidnaOptions
		public on<K extends keyof Events> (event: K, listener?: (params: Events[K] & ListenerBase) => void): this
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

	interface Events {
		channelCreate: { channel?: Discord.Channel }
		channelDelete: { channel?: Discord.Channel }
		channelPinsUpdate: { channel?: Discord.Channel; date?: Date }
		channelUpdate: { oldChannel?: Discord.Channel; newChannel?: Discord.Channel }
		debug: { info?: string }
		emojiCreate: { emoji?: Discord.Emoji }
		emojiDelete: { emoji?: Discord.Emoji }
		emojiUpdate: { oldEmoji?: Discord.Emoji; newEmoji?: Discord.Emoji }
		error: { error?: Error }
		guildBanAdd: { guild?: Discord.Guild; user?: Discord.User }
		guildBanRemove: { guild?: Discord.Guild; user?: Discord.User }
		guildCreate: { guild?: Discord.Guild }
		guildDelete: { guild?: Discord.Guild }
		guildIntegrationsUpdate: { guild?: Discord.Guild }
		guildMemberAdd: { member?: Discord.GuildMember }
		guildMemberAvailable: { member?: Discord.GuildMember }
		guildMemberRemove: { member?: Discord.GuildMember }
		guildMembersChunk: { members?: Discord.Collection<Discord.Snowflake, Discord.GuildMember>; guild?: Discord.Guild; chunk?: { index?: number; count?: number; nonce?: string } }
		guildMemberSpeaking: { member?: Discord.GuildMember; readonly speaking: Discord.Speaking }
		guildMemberUpdate: { oldMember?: Discord.GuildMember; newMember?: Discord.GuildMember }
		guildUnavailable: { guild?: Discord.Guild; Database?: DatabaseInterface }
		guildUpdate: { oldGuild?: Discord.Guild; newGuild?: Discord.Guild }
		invalidated: {}
		inviteCreate: { invite?: Discord.Invite }
		inviteDelete: { invite?: Discord.Invite }
		message: { message?: Discord.Message }
		messageDelete: { message?: Discord.Message }
		messageDeleteBulk: { messages?: Discord.Collection<Discord.Snowflake, Discord.Message> }
		messageReactionAdd: { reaction?: Discord.MessageReaction; user?: Discord.User }
		messageReactionRemove: { reaction?: Discord.MessageReaction; user?: Discord.User }
		messageReactionRemoveAll: { message?: Discord.Message }
		messageReactionRemoveEmoji: { reaction?: Discord.MessageReaction }
		messageUpdate: { oldMessage?: Discord.Message; newMessage?: Discord.Message }
		presenceUpdate: { oldPresence?: Discord.Presence; newPresence?: Discord.Presence }
		rateLimit: { info?: { timeout?: number; limit?: number; method?: string; path?: string; route?: string } }
		ready: {}
		roleCreate: { role?: Discord.Role }
		roleDelete: { role?: Discord.Role }
		roleUpdate: { oldRole?: Discord.Role; newRole?: Discord.Role }
		shardDisconnect: { event?: Discord.CloseEvent; id?: number }
		shardError: { error?: Error; id?: number }
		shardReady: { id?: number; unavailableGuilds?: Set<String> }
		shardResume: { id?: number; replayedEvents?: number }
		typingStart: { channel?: Discord.Channel; user?: Discord.User }
		userUpdate: { oldUser?: Discord.User; newUser?: Discord.User }
		voiceStateUpdate: { oldState?: Discord.VoiceState; newState?: Discord.VoiceState }
		warn: { info?: string }
		webhookUpdate: { channel?: Discord.Channel }
	}

	interface Ignore {
		users?: string[]
		guilds?: string[]
	}

	interface ListenerBase {
		echidna?: Echidna
		client?: Discord.Client
		Collections?: CollectionsInterface
		Database?: DatabaseInterface
	}

	interface Permissions {
		users?: Discord.PermissionString[]
		client?: Discord.PermissionString[]
		flags?: EchidnaFlags[]
	}
}
