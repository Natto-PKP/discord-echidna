const { existsSync, writeFileSync, unlinkSync } = require('fs')
const { TypeError, Error } = require('../Errors/EchidnaError')

module.exports = class Document {
    #options

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
	 * @param {Array<*>|Object} source Values to change
	 * @param {Object} param1
	 * @returns 
	 */
	update (source, { index, path } = {}) {
		if (!source || typeof source != 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', 'source', 'array|object')

		if (Array.isArray(this.content)) {
			if (typeof index == 'number') {
				if (0 > index || index >= this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
				index = parseInt(index)
				if (Array.isArray(this.content[index])) this.content[index] = Array.isArray(source) ? [...this.content[index], ...source]: [...this.content[index], source]
				else if (typeof this.content[index] == 'object') this.content[index] = !Array.isArray(source) ? Document.#update(this.content[index], source, { path }): source
				else this.content[index] = source
			} else this.content = Array.isArray(source) ? [...this.content, ...source]: [...this.content, source]
		} else if (typeof this.content == 'object') this.content = Document.#update(this.content, source, { index, path })
		
		return this
	}

	/**
	 * @private
	 * @static
	 * @param {*} target 
	 * @param {*} source 
	 * @param {*} param2
	 * @returns 
	 */
	static #update (target, source, { index, path } = {}) {
		if(path) {
			if (typeof path != 'string' || !path.length) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.path', 'string')
			path.split('.').reduce((acc, prop, i, arr) => {
				prop = prop.trim()
				if (arr.length - 1 == i) {
					if (Object.hasOwnProperty.call(acc, prop)) {
						if (Array.isArray(acc[prop])) {
							if (typeof index == 'number') {
								if (0 > index || index >= acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
								index = parseInt(index)
								if (Array.isArray(acc[prop][index])) return acc[prop][index] = [...acc[prop][index], ...(Array.isArray(source) ? source: [source])]
								else if (typeof acc[prop][index] == 'object') return acc[prop][index] = !Array.isArray(source) ? Document.#update(acc[prop][index], source): source
								else return acc[prop][index] = source
							} else return acc[prop] = [...acc[prop], ...(Array.isArray(source) ? source: [source])]
						} else if (typeof acc[prop] == 'object') return acc[prop] = Document.#update(acc[prop], source)
						else return acc[prop] = source
					} else return acc[prop] = source
				} else {
					if (Object.hasOwnProperty.call(acc, prop)) {
						if (typeof acc[prop] !== 'object') throw new Error('ECHIDNA_INVALID_OPTION', prop, 'object|array')
						else return acc[prop]
					} else return acc[prop] = {}
				}
				
			}, target)
		} else {
			for (const [key, value] of Object.entries(source)) {
				if (Array.isArray(value)) !Object.hasOwnProperty.call(target, key) || !Array.isArray(target[key]) ? (target[key] = value): (target[key] = [...target[key], ...value])
				else if (typeof value == 'object') target[key] = Document.#update(target[key] || (target[key] = {}), value)
				else target[key] = value
			}
		}

		return target
	}

    /**
     * Save update in this document
     */
	save () {
		if(!this.content || typeof this.content != 'object') throw new TypeError('ECHIDNA_INVALID_DOCUMENT')
		writeFileSync(this.#options.path, JSON.stringify(this.content))
	}

	/**
	 * @param {*} param0 
	 * @return
	 */
	remove ({ index, path, size = 1 } = {}) {
		if (Array.isArray(this.content)) {
			if (typeof index != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.index', 'number')
			if (0 > index || index >= this.content.length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
			index = parseInt(index)
			if (path) {
				if (typeof path != 'string' || !path.length) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.path', 'string')
				path.split('.').reduce((acc, prop, i, arr) => {
					prop = prop.trim()
					if (!Object.hasOwnProperty.call(acc, prop)) return 
					else if (arr.length - 1 == i) return delete acc[prop]
					else return acc[prop]
				}, this.content[index])
			} else {
				if (typeof size != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.size', 'number')
				size = parseInt(size)
				if (1 > size || index + size - 1 >= this.content.length) throw new Error('ECHIDNA_INVALID_SIZE', 'array')
				this.content.splice(index, size)
			}
		} else {
			if (!path || typeof path != 'string' || !path.length) throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.path', 'string')
			path.split('.').reduce((acc, prop, i, arr) => {
				prop = prop.trim()
				if (!Object.hasOwnProperty.call(acc, prop)) return 
				else if (arr.length - 1 == i) {
					if (typeof index == 'number') {
						if (!Array.isArray(acc[prop])) throw new Error('ECHIDNA_ARRAY_MISSING', `${prop} property`)
						if (0 > index || index >= acc[prop].length) throw new Error('ECHIDNA_INVALID_INDEX', 'array')
						if (typeof size != 'number') throw new TypeError('ECHIDNA_INVALID_OPTION', 'options.size', 'number')
						size = parseInt(size)
						if (1 > size || index + size - 1 >= this.content.length) throw new Error('ECHIDNA_INVALID_SIZE', 'array')
						acc[prop].splice(parseInt(index), size)
						return acc[prop]
					} else return delete acc[prop]
				} else return acc[prop]
			}, this.content)
		}

		return this
	}

    /**
     * Reset your this document with default value of this model
     * @returns 
     */
	reset () {
		writeFileSync(this.#options.path, JSON.stringify((this.content = this.collection.model(this.#options.ID))))
		return this
	}
}