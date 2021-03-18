declare module 'discord-echidna' {
	import { ClientOptions, Client } from 'discord.js'

	// Classes

	export class Echidna {
		constructor (token: string, options?: BaseOptions)
		public on<K extends keyof ListenerParams> (event: K, listener?: (params: ListenerParams[K]) => void): this
	}

	export class ReadyEvent {
		constructor (client: Client, listener?: (params: any) => void)
	}

	// Typings

	interface BaseOptions {
		ignore?: { guilds?: Array<String>; users?: Array<String> }
		client?: ClientOptions
	}

	interface ListenerParams {
		ready: { client?: Client; Event?: ReadyEvent }
	}
}
