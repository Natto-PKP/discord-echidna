declare module 'discord.js' {
	import Discord from 'discord.js'

	// New methods
	interface ChannelManager {
		select(search: String, options?: { strict: Boolean; type?: String | Boolean }): Discord.Channel
	}

	interface GuildChannelManager {
		select(search: String, options?: { strict: Boolean; type?: String | Boolean }): Discord.Channel
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
		createPage(userID: String, pages: Array<String | Object>, options?: { emojis?: Array<String>; collectorOptions?: Discord.ReactionCollectorOptions }): Discord.Message
	}

	interface RoleManager {
		select(search: String, options?: { strict?: Boolean }): Discord.Role
	}

	interface UserManager {
		select(search: String, options?: { strict?: Boolean }): Discord.User
	}
}
