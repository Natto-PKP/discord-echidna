declare module 'discord-echidna' {
	import { ClientOptions, Client, Message, PermissionString } from 'discord.js'

	// Classes

	export class Echidna {
		constructor (token: String, options?: BaseOptions)
		public client: Client
		public documents: Documents // NEW
		public options: BaseOptions
		public on<K extends keyof ListenerParams> (event: K, listener?: (params: ListenerParams[K]) => void, options?: ListenerOptions[K]): Events[K]
	}

	export class Documents {
		constructor ()
		public models: ModelsManager
		public path: String
		public delete (ID: String, name: String): void
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
		public content: Object
		public default: Object
		public path: String
		public delete (): void
		public exist (): Boolean
		public save (): void
		public reset (): this //NEW
	}

	export class ModelsManager {
		constructor ()
		public table: Array<Object>
		public add (name: String, base: Object): void
	}

	// Events

	export class MessageEvent {
		constructor (client: Client, listener: (params: ListenerParams['message']) => void, options: Object, modules: Object)
		public client: Client
		public commands: CommandsManager
	}

	export class ReadyEvent {
		constructor (client: Client, listener: (params: ListenerParams['ready']) => void, options: Object, modules: Object)
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

	interface Events {
		ready: ReadyEvent
		message: MessageEvent
	}

	interface ListenerOptions {
		ready: {}
		message: { commandsDir?: String; prefix?: String }
	}

	// NEW
	interface ListenerParams {
		ready: { client?: Client; Event?: ReadyEvent; Documents: Documents }
		message: { client?: Client; message?: Message; prefix?: String; command?: String; args?: Array<String>; Commands?: CommandsManager; Event?: MessageEvent; Documents: Documents }
	}

	interface Permissions {
		users?: Array<PermissionString>
		client?: Array<PermissionString>
		flags?: Array<EchidnaFlags>
	}
}
