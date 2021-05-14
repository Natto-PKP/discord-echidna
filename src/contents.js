module.exports = {
	events: {
		message: {
			en: {
				cooldown: (...params) => params[0] + ' **` |`** ⏳ You must wait another **' + params[1] + '** second(s).',
				'no-owner': (...params) => params[0] + ' **`| ❌ You are not in the developers team.`**',
				'no-member-perms': (...params) => params[0] + ' **` | ❌ You do not have the required permissions.`**\n[`' + params[1] + '`]',
				'no-client-perms': (...params) => params[0] + ' **` | ❌`' + params[1] + '** does not have the required permissions.\n[`' + params[2] + '`]',
				'no-client-channel-perms': (...params) => params[0] + ' **` | ❌`' + params[1] + '** does not have the required permissions in this room.\n[`' + params[2] + '`]'
			},
			fr: {
				cooldown: (...params) => params[0] + ' **` |`** ⏳ Vous devez attendre **' + params[1] + '** seconde(s).',
				'no-owner': (...params) => params[0] + " **`| ❌ Vous n'êtes pas un créateur du bot.`**",
				'no-member-perms': (...params) => params[0] + " **` | ❌ Vous n'avez pas les permissions.`**\n[`" + params[1] + '`]',
				'no-client-perms': (...params) => params[0] + ' **` | ❌`' + params[1] + "** n'a pas les permissions.\n[`" + params[2] + '`]',
				'no-client-channel-perms': (...params) => params[0] + ' **` | ❌`' + params[1] + "** n'a pas les permissions dans ce salon.\n[`" + params[2] + '`]'
			}
		}
	}
}
