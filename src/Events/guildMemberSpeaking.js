const Database = require('../Structures/Database')

module.exports = class GuildMemberSpeakingEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client, ignore, owners }) {
		client.on('guildMemberSpeaking', (member, speaking) => {
			if (member && member.guild && ignore.guilds.includes(member.guild.id)) return
			listener({ client, member, speaking, options: { ignore, owners }, Database })
		})
	}
}
