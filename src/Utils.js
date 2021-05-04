const { TypeError } = require('./Errors/EchidnaError')

module.exports = class Util {
	static parseToRegexp (value) {
		if (typeof value != 'string') throw new TypeError('ECHIDNA_INVALID_ERROR', 'value', 'string')
		return value.replace(/\\|\/|\(\??(?![^|])|\)|\[|\[\]|\||\*|\+|\?/, '\\$&')
	}

	static checkTypings (target, source) {
		if ([target, source].some((e) => typeof e != 'object' || Array.isArray(e))) throw new TypeError('ECHIDNA_INVALID_OPTION', 'target|source', 'object')
		for (const [key, value] of Object.entries(source)) {
			if (Array.isArray(value) && !Array.isArray(target[key])) target[key] = []
			else if (typeof value == 'object') target[key] = checkTypings(target[key] || {}, value)
			else if (typeof value != typeof target[key]) target[key] = value
		}
		return target
	}
}
