const { existsSync, writeFileSync, unlinkSync } = require('fs')

const { TypeError, Error } = require('../errors/EchidnaError')
const { assembly } = require('../Utils')

/**
 * @param { any } target 
 * @param { object | any[] } source 
 * @returns 
 */
const _update = (target, source) => {
	if (Array.isArray(target)) return Array.isArray(source) ? [...target, ...source] : [...target, source]
	else if (typeof source == 'object') return typeof target == 'object' ? assembly(target || {}, source) : source
	else return source
}

const timeouts = {}

module.exports = class Document {
	#options

	/**
	 * @param { object } param0 
	 * @param { string } [param1.ID]
	 * @param { string } [param1.path]
	 * @param { object } [param1.collection]
	 */
	constructor ({ ID, path, collection }) {
		this.collection = collection
		this.cache = require('../../../.' + path)
		this.#options = { ID, path }

		if (!timeouts[collection.name + ID]) {
			timeouts[collection.name + ID] = setTimeout(() => {
				delete require.cache[require.resolve('../../../.' + path)]
				delete timeouts[collection.name + ID]
			}, 6e5)
		} else timeouts[collection.name + ID].refresh()
	}

	/**
     * Delete this document
     */
	delete () {
		if (existsSync(this.#options.path)) {
			unlinkSync(this.#options.path)
			delete require.cache[require.resolve('../../../.' + this.#options.path)]
			delete timeouts[this.collection.name + this.#options.ID]
		}
	}

	/**
	 * Update current values and set new values
	 * @param { any } source 
	 * @param { object } param1 
	 * @param { number | function } [param1.index]
	 * @param { string } [param1.path]
	 * @example
	 * Document.update([1, 2, 3], { path: 'obj.arr' }) 
	 * @returns { Document }
	 */
	update (source, { index, path } = {}) {
		if (typeof source == 'undefined') throw new TypeError('ECHIDNA_INVALID_OPTION', 'source', 'any')

		if (Array.isArray(this.cache)) {
			if (['number', 'function'].includes(typeof index)) {
				index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
				if (0 > index || index > this.cache.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
				if (Array.isArray(this.cache[index])) this.cache[index] = Array.isArray(source) ? [...this.cache[index], ...source] : [...this.cache[index], source]
				else if (typeof path == 'string') path.split('.').reduce((acc, prop, i, arr) => (acc[prop] = i < arr.length - 1 ? (Object.hasOwnProperty.call(acc, prop) ? acc[prop] : {}) : _update(acc[prop], source)), this.cache[index])
				else this.cache[index] = _update(this.cache[index], source)
			} else this.cache = Array.isArray(source) ? [...this.cache, ...source] : [...this.cache, source]
		} else if (typeof this.cache == 'object') {
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (i < arr.length - 1) return Object.hasOwnProperty.call(acc, prop) ? acc[prop] : (acc[prop] = {})
					if (Array.isArray(acc[prop]) && ['number', 'function'].includes(typeof index)) {
						index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
						if (0 > index || index > acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
						return (acc[prop][index] = _update(acc[prop][index], source))
					} else return (acc[prop] = _update(acc[prop], source))
				}, this.cache)
			} else this.cache = _update(this.cache, source)
		}

		return this
	}

	/**
     * Save update in this document
     */
	save () {
		if (!this.cache || typeof this.cache != 'object') throw new TypeError('ECHIDNA_INVALID_DOCUMENT')
		writeFileSync(this.#options.path, JSON.stringify(this.cache))
	}

	/**
	 * Replace current values and set new values
	 * @param { any } source 
	 * @param { object } param1 
	 * @param { number | function } [param1.index]
	 * @param { string } [param1.path]
	 * @example
	 * Document.set('!', { path: 'prefix' })
	 * @returns { Document }
	 */
	set (source, { index, path } = {}) {
		if (!source) throw new TypeError('ECHIDNA_INVALID_OPTION', 'source', 'any')

		if (Array.isArray(this.cache)) {
			if (['number', 'function'].includes(typeof index)) {
				index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
				if (0 > index || index > this.cache.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
				if (Array.isArray(this.cache[index]) || typeof this.cache[index] != 'object') this.cache[index] = source
				else if (typeof path == 'string') path.split('.').reduce((acc, prop, i, arr) => (acc[prop] = i < arr.length - 1 ? (Object.hasOwnProperty.call(acc, prop) ? acc[prop] : {}) : source), this.cache[index])
				else this.cache[index] = source
			} else this.cache = Array.isArray(source) ? source : [source]
		} else if (typeof this.cache == 'object') {
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (i < arr.length - 1) return Object.hasOwnProperty.call(acc, prop) ? acc[prop] : (acc[prop] = {})
					if (Array.isArray(acc[prop]) && ['number', 'function'].includes(typeof index)) {
						index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
						if (0 > index || index > acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
						return (acc[prop][index] = source)
					} else return (acc[prop] = source)
				}, this.cache)
			} else this.cache = typeof source == 'object' && !Array.isArray(source) ? source : { key: source }
		}

		return this
	}

	/**
	 * Remove values
	 * @param { object } param0 
	 * @param { string } [param0.path]
	 * @param { number | function } [param0.index]
	 * @param { number } [param0.size]
	 * @example
	 * Document.remove({ path: 'obj.arr' })
	 * @return { Document }
	 */
	remove ({ path, index, size = 1 } = {}) {
		if (Array.isArray(this.cache)) {
			if (!['number', 'function'].includes(typeof index)) throw new TypeError('ECHIDNA_INVALID_OPTION', 'index', 'number|function')
			index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
			if (0 > index || index > this.cache.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (!Object.hasOwnProperty.call(acc, prop)) throw new Error('ECHIDNA_INVALID_PATH', 'Object.' + prop)
					if (i < arr.length - 1) return acc[prop]
					delete acc[prop]
				}, this.cache[index])
			} else this.cache.splice(index, typeof size == 'number' ? parseInt(size) : 1)
		} else if (typeof this.cache == 'object') {
			if (typeof path != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'path', 'string')
			path.split('.').reduce((acc, prop, i, arr) => {
				if (!Object.hasOwnProperty.call(acc, prop)) throw new Error('ECHIDNA_INVALID_PATH', 'Object.' + prop)
				if (i < arr.length - 1) return acc[prop]
				if (Array.isArray(acc[prop]) && ['number', 'function'].includes(typeof index)) {
					index = typeof index == 'function' ? this.cache.findIndex(index) : Math.floor(index)
					if (0 > index || index >= this.cache.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
					acc[prop].splice(index, typeof size == 'number' ? parseInt(size) : 1)
					return acc[prop]
				} else delete acc[prop]
			}, this.cache)
		}

		return this
	}

	/**
     * Reset your this document with default value of this model
     * @returns { Document }
     */
	reset () {
		this.cache = this.collection.model(this.#options.ID)
		return this
	}
}
