const { existsSync, writeFileSync, unlinkSync } = require('fs')
const { TypeError, Error } = require('../Errors/EchidnaError')
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
		this.content = require('../../../.' + path)
		this.#options = { ID, path }
	}

	/**
     * Delete this document
     */
	delete () {
		if (existsSync(this.#options.path)) unlinkSync(this.#options.path)
	}

	/**
	 * Update current values and set new values
	 * @param { any } source 
	 * @param { object } param1 
	 * @param { number } [param1.index]
	 * @param { string } [param1.path]
	 * @example
	 * Document.update([1, 2, 3], { path: 'obj.arr' }) 
	 * @returns { Document }
	 */
	update (source, { index, path } = {}) {
		if (!source) throw new TypeError('ECHIDNA_INVALID_OPTION', 'source', 'any')

		if (Array.isArray(this.content)) {
			if (typeof index == 'number') {
				if (0 > index || index > this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
				index = parseInt(index)
				if (Array.isArray(this.content[index])) this.content[index] = Array.isArray(source) ? [...this.content[index], ...source] : [...this.content[index], source]
				else if (typeof path == 'string') path.split('.').reduce((acc, prop, i, arr) => (acc[prop] = i < arr.length - 1 ? (Object.hasOwnProperty.call(acc, prop) ? acc[prop] : {}) : _update(acc[prop], source)), this.content[index])
				else this.content[index] = _update(this.content[index], source)
			} else this.content = Array.isArray(source) ? [...this.content, ...source] : [...this.content, source]
		} else if (typeof this.content == 'object') {
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (i < arr.length - 1) return Object.hasOwnProperty.call(acc, prop) ? acc[prop] : (acc[prop] = {})
					if (Array.isArray(acc[prop]) && typeof index == 'number') {
						if (0 > index || index > acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
						return (acc[prop][parseInt(index)] = _update(acc[prop][parseInt(index)], source))
					} else return (acc[prop] = _update(acc[prop], source))
				}, this.content)
			} else this.content = _update(this.content, source)
		}

		return this
	}

	/**
     * Save update in this document
     */
	save () {
		if (!this.content || typeof this.content != 'object') throw new TypeError('ECHIDNA_INVALID_DOCUMENT')
		writeFileSync(this.#options.path, JSON.stringify(this.content))
	}

	/**
	 * Replace current values and set new values
	 * @param { any } source 
	 * @param { object } param1 
	 * @param { number } [param1.index]
	 * @param { string } [param1.path]
	 * @example
	 * Document.set('!', { path: 'prefix' })
	 * @returns { Document }
	 */
	set (source, { index, path } = {}) {
		if (!source) throw new TypeError('ECHIDNA_INVALID_OPTION', 'source', 'any')

		if (Array.isArray(this.content)) {
			if (typeof index == 'number') {
				if (0 > index || index > this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
				index = parseInt(index)
				if (Array.isArray(this.content[index]) || typeof this.content[index] != 'object') this.content[index] = source
				else if (typeof path == 'string') path.split('.').reduce((acc, prop, i, arr) => (acc[prop] = i < arr.length - 1 ? (Object.hasOwnProperty.call(acc, prop) ? acc[prop] : {}) : source), this.content[index])
				else this.content[index] = source
			} else this.content = Array.isArray(source) ? source : [source]
		} else if (typeof this.content == 'object') {
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (i < arr.length - 1) return Object.hasOwnProperty.call(acc, prop) ? acc[prop] : (acc[prop] = {})
					if (Array.isArray(acc[prop]) && typeof index == 'number') {
						if (0 > index || index > acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
						return (acc[prop][parseInt(index)] = source)
					} else return (acc[prop] = source)
				}, this.content)
			} else this.content = typeof source == 'object' && !Array.isArray(source) ? source : { key: source }
		}

		return this
	}

	/**
	 * Remove values
	 * @param { object } param0 
	 * @param { string } [param0.path]
	 * @param { number } [param0.index]
	 * @param { number } [param0.size]
	 * @example
	 * Document.remove({ path: 'obj.arr' })
	 * @return { Document }
	 */
	remove ({ path, index, size = 1 } = {}) {
		if (Array.isArray(this.content)) {
			if (typeof index != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'index', 'number')
			if (0 > index || index > this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
			index = parseInt(index)
			if (typeof path == 'string') {
				path.split('.').reduce((acc, prop, i, arr) => {
					if (!Object.hasOwnProperty.call(acc, prop)) throw new Error('ECHIDNA_INVALID_PATH', 'Object.' + prop)
					if (i < arr.length - 1) return acc[prop]
					delete acc[prop]
				}, this.content[index])
			} else this.content.splice(index, typeof size == 'number' ? parseInt(size) : 1)
		} else if (typeof this.content == 'object') {
			if (typeof path != 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'path', 'string')
			path.split('.').reduce((acc, prop, i, arr) => {
				if (!Object.hasOwnProperty.call(acc, prop)) throw new Error('ECHIDNA_INVALID_PATH', 'Object.' + prop)
				if (i < arr.length - 1) return acc[prop]
				if (Array.isArray(acc[prop]) && typeof index == 'number') {
					if (0 > index || index >= this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
					acc[prop].splice(parseInt(index), typeof size == 'number' ? parseInt(size) : 1)
					return acc[prop]
				} else delete acc[prop]
			}, this.content)
		}

		return this
	}

	/**
     * Reset your this document with default value of this model
     * @returns { Document }
     */
	reset () {
		writeFileSync(this.#options.path, JSON.stringify((this.content = this.collection.model(this.#options.ID))))
		return this
	}
}
