const { existsSync, writeFileSync, lstatSync, mkdirSync, unlinkSync } = require('fs')
const Document = require('../Managers/Document.js')
const Models = require('../Managers/Models.js')

module.exports = class Documents {
	constructor () {
		this.path = './documents'
		if (!existsSync(this.path) || !lstatSync(this.path).isDirectory()) mkdirSync(this.path)

		this.models = new Models()
	}

	/**
	 * @param {String} ID 
	 * @param {String} name 
	 */
	delete (ID, name) {
		if (!ID || typeof ID != 'string') throw Error('ID must be a string')
		if (!name || typeof name != 'string') throw Error('name must be a string')
		const model = this.models.table.find((obj) => obj.name == name.replace(/\s+/g, '-'))
		if (!model) throw Error(`${name.replace(/\s+/g, '-')} model does not exist - use <Documents>.models.add() for add a model`)
		if (existsSync(`${this.path}/${model.name}`) && existsSync(`${this.path}/${model.name}/${ID}.json`)) unlinkSync(`${this.path}/${model.name}/${ID}.json`)
	}

	/**
	 * @param {String} ID 
	 * @param {String} name 
	 * @returns
	 */
	exist (ID, name) {
		if (!ID || typeof ID != 'string') throw Error('ID must be a string')
		if (!name || typeof name != 'string') throw Error('name must be a string')
		const model = this.models.table.find((obj) => obj.name == name.replace(/\s+/g, '-'))
		if (!model) throw Error(`${name.replace(/\s+/g, '-')} model does not exist - use <Documents>.models.add() for add a model`)
		return existsSync(`${this.path}/${model.name}`) && existsSync(`${this.path}/${model.name}/${ID}.json`)
	}

	/**
     * @param {String} ID 
     * @param {String} name 
     * @returns 
     */
	open (ID, name) {
		if (!ID || typeof ID != 'string') throw Error('ID must be a string')
		if (!name || typeof name != 'string') throw Error('name must be a string')
		const model = this.models.table.find((obj) => obj.name == name.replace(/\s+/g, '-'))
		if (!model) throw Error(`${name.replace(/\s+/g, '-')} model does not exist - use <Documents>.models.add() for add a model`)
		if (!existsSync(`${this.path}/${model.name}`) || !lstatSync(`${this.path}/${model.name}`).isDirectory()) mkdirSync(`${this.path}/${model.name}`)

		if (!existsSync(`${this.path}/${model.name}/${ID}.json`)) writeFileSync(`${this.path}/${model.name}/${ID}.json`, JSON.stringify(model.default(ID)))
		let data
		try {
			data = require(`../../../.${this.path}/${model.name}/${ID}.json`)
		} catch (err) {
			writeFileSync(`${this.path}/${model.name}/${ID}.json`, JSON.stringify(model.default(ID)))
			data = require(`../../../.${this.path}/${model.name}/${ID}.json`)
		}
		return new Document({ path: `${this.path}/${model.name}/${ID}.json`, data, base: model.default(ID) })
	}
}
