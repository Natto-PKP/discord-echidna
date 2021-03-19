declare module 'discord-echidna' {
	import { ClientOptions, Client, Message, PermissionString } from 'discord.js'

	// Classes

	export class Echidna {
		constructor (token: String, options?: BaseOptions)
		public client: Client
		public options: BaseOptions
		public on<K extends keyof ListenerParams> (event: K, listener?: (params: ListenerParams[K]) => void, options?: ListenerOptions[K]): Events[K]
	}

	export class CommandsManager {
		constructor ()
		public table: Array<any>
		public cooldowns: any
		public create (exec: (params: CommandExecParams) => void, options: CommandOptions, help?: any): void
		public get (name: String): any | undefined
		public exist (...names: Array<String>): Boolean
	}

	// Events

	export class ReadyEvent {
		constructor (client: Client, listener?: (params: any) => void)
		public client: Client
	}

	export class MessageEvent {
		constructor (client: Client, listener?: (params: any) => void, options: any)
		public client: Client
		public commands: CommandsManager
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

	interface CommandExecParams {
		message: Message
		prefix: String
		command: String
		args: Array<String>
		Commands: CommandsManager
		Event: MessageEvent
		client: Client
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
		message: { commandsDir: String; prefix: String }
	}

	interface ListenerParams {
		ready: { client?: Client; Event?: ReadyEvent }
		message: { message?: Message; prefix?: String; command?: String; args?: Array<String>; commands?: CommandsManager; client?: Client; Event?: MessageEvent }
	}

	interface Permissions {
		users?: Array<PermissionString>
		client?: Array<PermissionString>
		flags?: Array<EchidnaFlags>
	}
}
