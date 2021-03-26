const { existsSync, writeFileSync, unlinkSync } = require('fs')

module.exports = class DocumentManager {
	/**
	 * @param {Object} param0 
	 */
	constructor ({ path, data, base }) {
		this.content = data
		this.default = base
		this.path = path
	}

	save () {
		if (!existsSync(this.path)) throw Error('this file no longer exists')
		writeFileSync(this.path, JSON.stringify(this.content))
	}

	/**
	 * @returns 
	 */
	reset () {
		writeFileSync(this.path, JSON.stringify((this.content = this.default)))
		return this
	}

	delete () {
		if (existsSync(this.path)) unlinkSync(this.path)
	}
}
