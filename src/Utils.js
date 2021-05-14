const { TypeError } = require('./Errors/EchidnaError')

module.exports = class Util {
	/**
	 * @param { string } value 
	 * @returns { string }
	 */
	static parseToRegexp (value) {
		if (typeof value != 'string') throw new TypeError('ECHIDNA_INVALID_ERROR', 'value', 'string')
		return value.replace(/\\|\/|\(\??(?![^|])|\)|\[|\[\]|\||\*|\+|\?/, '\\$&')
	}

	/**
	 * @param { object } target 
	 * @param { object } source 
	 * @returns { object }
	 */
	static checkTypings (target, source) {
		if ([target, source].some((e) => typeof e != 'object')) throw new TypeError('ECHIDNA_INVALID_OPTION', 'target|source', 'object')
		for (const [key, value] of Object.entries(source)) {
			if (Array.isArray(value) && !Array.isArray(target[key])) target[key] = []
			else if (typeof value == 'object') target[key] = Util.checkTypings(target[key] || {}, value)
			else if (typeof value != typeof target[key]) target[key] = value
		}
		return target
	}

	/**
	 * @param { object } target 
	 * @param { any } source 
	 * @returns { object }
	 */
	static assembly (target, source) {
		if (typeof target != 'object' && Array.isArray(target)) throw new TypeError('ECHIDNA_INVALID_OPTION', 'target', 'object')
		for (const [key, value] of Object.entries(source)) {
			if (Array.isArray(target[key])) target[key] = Array.isArray(value) ? [...target[key], ...value] : [...target[key], value]
			else if (typeof target == 'object' && Object.hasOwnProperty.call(target, key)) target[key] = Util.assembly(target[key] || {}, value)
			else target[key] = value
		}
		return target
	}
}
