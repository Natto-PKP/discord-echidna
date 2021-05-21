declare module 'discord.js' {
	import Discord from 'discord.js'

	interface ChannelManager {
		select(search: string, options?: { strict?: boolean; type?: string }): Discord.Channel
	}

	interface GuildChannelManager {
		select(search: string, options?: { strict?: boolean; type?: string }): Discord.GuildChannel
	}

	interface GuildEmojiManager {
		select(search: string, options?: { strict?: boolean }): Discord.Emoji
	}

	interface GuildManager {
		select(search: string, options?: { strict?: boolean }): Discord.Guild
	}

	interface GuildMemberManager {
		select(search: string, options?: { strict?: boolean }): Discord.GuildMember
	}

	interface GuildMemberRoleManager {
		select(search: string, options?: { strict?: boolean }): Discord.Role
	}

	interface Message {
		createPages(array: Discord.Collection<string, object> | any[], format: (array: any[], pages: { number: number; total: number }) => void, options: { limit: number; emojis?: string[] }, collectorOptions?: Discord.ReactionCollectorOptions): Discord.Message
	}

	interface RoleManager {
		select(search: string, options?: { strict?: boolean }): Discord.Role
	}

	interface UserManager {
		select(search: string, options?: { strict?: boolean }): Discord.User
	}
}
