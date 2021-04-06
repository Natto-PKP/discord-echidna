// Heavily inspired by node's `discord.js` module

const kCode = Symbol('code')
const messages = require('./Messages')

function makeEchidnaError (Base) {
	return class EchidnaError extends Base {
		constructor (key, ...args) {
			super(message(key, args))
			this[kCode] = key
			if (Error.captureStackTrace) Error.captureStackTrace(this, EchidnaError)
		}

		get name () {
			return `${super.name} [${this[kCode]}]`
		}

		get code () {
			return this[kCode]
		}
	}
}

function message (key, args) {
	if (typeof key !== 'string') throw new Error('Error message key must be a string')
	if (!messages[key]) throw new Error(`An invalid error message key was used: ${key}.`)
	return typeof messages[key] == 'function' ? messages[key](...args) : messages[key]
}

module.exports = {
	Error: makeEchidnaError(Error),
	TypeError: makeEchidnaError(TypeError),
	RangeError: makeEchidnaError(RangeError)
}
