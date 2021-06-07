module.exports = {
	channelCreate: (listener, base) => {
		const { options, client } = base
		client.on('channelCreate', (channel) => {
			if (channel && channel.guild && options.ignore.guilds.includes(channel.guild.id)) return
			listener(Object.assign(base, { channel }))
		})
	},
	channelCreate: (listener, base) => {
		const { options, client } = base
		client.on('channelDelete', (channel) => {
			if (channel && channel.guild && options.ignore.guilds.includes(channel.guild.id)) return
			listener(Object.assign(base, { channel }))
		})
	},
	channelPinsUpdate: (listener, base) => {
		const { options, client } = base
		client.on('channelPinsUpdate', (channel, date) => {
			if (channel && channel.guild && options.ignore.guilds.includes(channel.guild.id)) return
			listener(Object.assign(base, { channel, date }))
		})
	},
	channelPinsUpdate: (listener, base) => {
		const { options, client } = base
		client.on('channelUpdate', (oldChannel, newChannel) => {
			if (oldChannel && oldChannel.guild && options.ignore.guilds.includes(oldChannel.guild.id)) return
			listener(Object.assign(base, { oldChannel, newChannel }))
		})
	},
	debug: (listener, base) => base.client.on('debug', (info) => listener(base, { info })),
	emojiCreate: (listener, base) => {
		const { options, client } = base
		client.on('emojiCreate', (emoji) => {
			if (emoji && emoji.guild && options.ignore.guilds.includes(emoji.guild.id)) return
			listener(Object.assign(base, { emoji }))
		})
	},
	emojiDelete: (listener, base) => {
		const { options, client } = base
		client.on('emojiDelete', (emoji) => {
			if (emoji && emoji.guild && options.ignore.guilds.includes(emoji.guild.id)) return
			listener(Object.assign(base, { emoji }))
		})
	},
	emojiUpdate: (listener, base) => {
		const { options, client } = base
		client.on('emojiUpdate', (oldEmoji, newEmoji) => {
			if (oldEmoji && oldEmoji.guild && options.ignore.guilds.includes(oldEmoji.guild.id)) return
			listener(Object.assign(base, { oldEmoji, newEmoji }))
		})
	},
	error: (listener, base) => base.client.on('error', (error) => listener(Object.assign(base, { error }))),
	guildBanAdd: (listener, base) => {
		const { options, client } = base
		client.on('guildBanAdd', (guild, user) => {
			if (guild && options.ignore.guilds.includes(guild.id)) return
			listener(Object.assign(base, { guild, user }))
		})
	},
	guildBanRemove: (listener, base) => {
		const { options, client } = base
		client.on('guildBanRemove', (guild, user) => {
			if (guild && options.ignore.guilds.includes(guild.id)) return
			listener(Object.assign(base, { guild, user }))
		})
	},
	guildCreate: (listener, base) => base.client.on('guildCreate', (guild) => listener(Object.assign(base, { guild }))),
	guildDelete: (listener, base) => base.client.on('guildDelete', (guild) => listener(Object.assign(base, { guild }))),
	guildIntegrationsUpdate: (listener, base) => {
		const { options, client } = base
		client.on('guildIntegrationsUpdate', (guild) => {
			if (guild && options.ignore.guilds.includes(guild.id)) return
			listener(Object.assign(base, { guild }))
		})
	},
	guildMemberAdd: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberAdd', (member) => {
			if (member && member.guild && options.ignore.guilds.includes(member.guild.id)) return
			listener(Object.assign(base, { member }))
		})
	},
	guildMemberAvailable: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberAvailable', (member) => {
			if (member && member.guild && options.ignore.guilds.includes(member.guild.id)) return
			listener(Object.assign(base, { member }))
		})
	},
	guildMemberRemove: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberRemove', (member) => {
			if (member && member.guild && options.ignore.guilds.includes(member.guild.id)) return
			listener(Object.assign(base, { member }))
		})
	},
	guildMembersChunk: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberRemove', (members, guild, chunk) => {
			if (guild && options.ignore.guilds.includes(guild.id)) return
			listener(Object.assign(base, { members, guild, chunk }))
		})
	},
	guildMemberSpeaking: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberSpeaking', (member, speaking) => {
			if (member && member.guild && options.ignore.guilds.includes(member.guild.id)) return
			listener(Object.assign(base, { member, speaking }))
		})
	},
	guildMemberUpdate: (listener, base) => {
		const { options, client } = base
		client.on('guildMemberUpdate', (oldMember, newMember) => {
			if (oldMember && oldMember.guild && options.ignore.guilds.includes(oldMember.guild.id)) return
			listener(Object.assign(base, { oldMember, newMember }))
		})
	},
	guildUnavailable: (listener, base) => base.client.on('guildUnavailable', (guild) => listener(Object.assign(base, { guild }))),
	guildUpdate: (listener, base) => {
		const { options, client } = base
		client.on('guildUpdate', (oldGuild, newGuild) => {
			if (oldGuild && options.ignore.guilds.includes(oldGuild.id)) return
			listener(Object.assign(base, { oldGuild, newGuild }))
		})
	},
	invalidated: (listener, base) => base.client.on('invalidated', () => listener(base)),
	inviteCreate: (listener, base) => {
		const { options, client } = base
		client.on('inviteCreate', (invite) => {
			if (invite && invite.guild && options.ignore.guilds.includes(invite.guild.id)) return
			listener(Object.assign(base, { invite }))
		})
	},
	inviteDelete: (listener, base) => {
		const { options, client } = base
		client.on('inviteDelete', (invite) => {
			if (invite && invite.guild && options.ignore.guilds.includes(invite.guild.id)) return
			listener(Object.assign(base, { invite }))
		})
	},
	message: (listener, base) => {
		const { options, client } = base
		client.on('message', (message) => {
			if (message && (message && ((message.author && options.ignore.users.includes(message.author.id)) || (message.guild && options.ignore.guilds.includes(message.guild.id))))) return
			listener(Object.assign(base, { message }))
		})
	},
	messageDelete: (listener, base) => {
		const { options, client } = base
		client.on('messageDelete', (message) => {
			if (message && message.guild && options.ignore.guilds.includes(message.guild.id)) return
			listener(Object.assign(base, { message }))
		})
	},
	messageDeleteBulk: (listener, base) => {
		const { options, client } = base
		client.on('messageDeleteBulk', (messages) => {
			if (messages && messages.first() && messages.first().guild && options.ignore.guilds.includes(messages.first().guild.id)) return
			listener(Object.assign(base, { messages }))
		})
	},
	messageReactionAdd: (listener, base) => {
		const { options, client } = base
		client.on('messageReactionAdd', (reaction, user) => {
			if ((reaction && reaction.message && reaction.message.guild && options.ignore.guilds.includes(reaction.message.guild.id)) || (user && options.ignore.users.includes(user.id))) return
			listener(Object.assign(base, { reaction, user }))
		})
	},
	messageReactionRemove: (listener, base) => {
		const { options, client } = base
		client.on('messageReactionRemove', (reaction, user) => {
			if ((reaction && reaction.message && reaction.message.guild && options.ignore.guilds.includes(reaction.message.guild.id)) || (user && options.ignore.users.includes(user.id))) return
			listener(Object.assign(base, { reaction, user }))
		})
	},
	messageReactionRemoveAll: (listener, base) => {
		const { options, client } = base
		client.on('messageReactionRemoveAll', (message) => {
			if (message && message.guild && options.ignore.guilds.includes(message.guild.id)) return
			listener(Object.assign(base, { message }))
		})
	},
	messageReactionRemoveEmoji: (listener, base) => {
		const { options, client } = base
		client.on('messageReactionRemoveEmoji', (reaction) => {
			if (reaction && reaction.message && reaction.message.guild && options.ignore.guilds.includes(reaction.message.guild.id)) return
			listener(Object.assign(base, { reaction }))
		})
	},
	messageUpdate: (listener, base) => {
		const { options, client } = base
		client.on('messageUpdate', (oldMessage, newMessage) => {
			if (oldMessage && oldMessage.guild && options.ignore.guilds.includes(oldMessage.guild.id)) return
			listener(Object.assign(base, { oldMessage, newMessage }))
		})
	},
	presenceUpdate: (listener, base) => {
		const { options, client } = base
		client.on('presenceUpdate', (oldPresence, newPresence) => {
			if ((oldPresence && oldPresence.guild && options.ignore.guilds.includes(oldPresence.guild.id)) || (oldPresence && oldPresence.member && options.ignore.users.includes(oldPresence.member.id))) return
			listener(Object.assign(base, { oldPresence, newPresence }))
		})
	},
	rateLimit: (listener, base) => base.client.on('rateLimit', (info) => listener(Object.assign(base, { info }))),
	ready: (listener, base) => base.client.on('ready', () => listener(base)),
	roleCreate: (listener, base) => {
		const { options, client } = base
		client.on('roleCreate', (role) => {
			if (role && role.guild && options.ignore.guilds.includes(role.guild.id)) return
			listener(Object.assign(base, { role }))
		})
	},
	roleDelete: (listener, base) => {
		const { options, client } = base
		client.on('roleDelete', (role) => {
			if (role && role.guild && options.ignore.guilds.includes(role.guild.id)) return
			listener(Object.assign(base, { role }))
		})
	},
	roleUpdate: (listener, base) => {
		const { options, client } = base
		client.on('roleUpdate', (oldRole, newRole) => {
			if (oldRole && oldRole.guild && options.ignore.guilds.includes(oldRole.guild.id)) return
			listener(Object.assign(base, { oldRole, newRole }))
		})
	},
	shardDisconnect: (listener, base) => base.client.on('shardDisconnect', (event, id) => listener(Object.assign(base, { event, id }))),
	shardError: (listener, base) => base.client.on('shardError', (error, id) => listener(Object.assign(base, { error, id }))),
	shardReady: (listener, base) => base.client.on('shardReady', (id, unavailableGuilds) => listener(Object.assign(base, { id, unavailableGuilds }))),
	shardResume: (listener, base) => base.client.on('shardResume', (id, replayedEvents) => listener(Object.assign(base, { id, replayedEvents }))),
	typingStart: (listener, base) => {
		const { options, client } = base
		client.on('typingStart', (channel, user) => {
			if ((user && options.ignore.users.includes(user.id)) || (channel && channel.guild && options.ignore.guilds.includes(channel.guild.id))) return
			listener(Object.assign(base, { channel, user }))
		})
	},
	userUpdate: (listener, base) => {
		const { options, client } = base
		client.on('userUpdate', (oldUser, newUser) => {
			if (oldUser && options.ignore.users.includes(oldUser.id)) return
			listener(Object.assign(base, { oldUser, newUser }))
		})
	},
	voiceStateUpdate: (listener, base) => {
		const { options, client } = base
		client.on('voiceStateUpdate', (oldState, newState) => {
			if (newState && ((newState.member && options.ignore.users.includes(newState.member.id)) || (newState.guild && options.ignore.guilds.includes(newState.guild.id)))) return
			listener(Object.assign(base, { oldState, newState }))
		})
	},
	warn: (listener, base) => base.client.on('warn', (info) => listener(Object.assign(base, { info }))),
	webhookUpdate: (listener, base) => {
		const { options, client } = base
		client.on('webhookUpdate', (channel) => {
			if (channel && channel.guild && options.ignore.guilds.includes(channel.guild.id)) return
			listener(Object.assign(base, { channel }))
		})
	}
}
