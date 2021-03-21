module.exports = class ModelsManager {
	constructor () {
		this.table = []
	}

	/**
     * @param {String} name
     * @param {Object} base 
     */
	add (name, base) {
		if (!name || typeof name != 'string') throw Error('name must be a string')
		if (this.table.some((obj) => obj.name == name.replace(/\s+/g, '-'))) throw Error('this model name is already taken')
		if (!base || Array.isArray(base) || typeof base != 'object') throw Error('base must be a object{ }')
		this.table.push({ name: name.replace(/\s+/g, '-'), default: (ID) => Object.assign(base, { ID }) })
	}
}
