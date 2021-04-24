declare module 'discord.js' {
	import Discord from 'discord.js'

	interface ChannelManager {
		select(search: String, options?: { strict?: Boolean; type?: String | Boolean }): Discord.Channel
	}

	interface GuildChannelManager {
		select(search: String, options?: { strict?: Boolean; type?: String | Boolean }): Discord.GuildChannel
	}

	interface GuildEmojiManager {
		select(search: String, options?: { strict?: Boolean }): Discord.Emoji
	}

	interface GuildManager {
		select(search: String, options?: { strict?: Boolean }): Discord.Guild
	}

	interface GuildMemberManager {
		select(search: String, options?: { strict?: Boolean }): Discord.GuildMember
	}

	interface GuildMemberRoleManager {
		select(search: String, options?: { strict?: Boolean }): Discord.Role
	}

	interface Message {
		createPage(array: Discord.Collection | Array<any>, format: (array: Array<any>, pages: { number: Number; total: Number }) => void, options: { limit: Number; emojis?: Array<String> }, collectorOptions?: Discord.ReactionCollectorOptions): Discord.Message
	}

	interface RoleManager {
		select(search: String, options?: { strict?: Boolean }): Discord.Role
	}

	interface UserManager {
		select(search: String, options?: { strict?: Boolean }): Discord.User
	}
}
