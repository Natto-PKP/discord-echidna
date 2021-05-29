const { existsSync, writeFileSync, lstatSync, mkdirSync, unlinkSync, readdirSync } = require('fs')
const { TypeError, Error } = require('../Errors/EchidnaError')
const Collections = require('./Collections')
const Document = require('../Managers/Document')
const path = './database'

module.exports = new class Database {
	/**
	 * Delete a document
     * @param { string } DocumentID 
     * @param { string } collectionName 
	 * @example 
	 * Database.delete('1234', 'user-exp')
     */
	delete (DocumentID, collectionName) {
		if (!DocumentID || typeof DocumentID !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'DocumentID', 'string')
		if (!collectionName || typeof collectionName !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'collectionName', 'string')
		const collection = Collections.array.find(({ name }) => name == collectionName.replace(/\s+/g, '-'))
		if (!collection) throw new Error('ECHIDNA_COLLECTION_MISSING', collectionName)
		if (existsSync(`${path}/${collection.name}`) && existsSync(`${path}/${collection.name}/${DocumentID}.json`)) unlinkSync(`${path}/${collection.name}/${DocumentID}.json`)
	}

	/**
	 * Check if document exist
     * @param { string } DocumentID 
     * @param { string } collectionName 
	 * @example 
	 * Database.exist('1234', 'user-exp')
     * @returns { boolean }
     */
	exist (DocumentID, collectionName) {
		if (!DocumentID || typeof DocumentID !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'DocumentID', 'string')
		if (!collectionName || typeof collectionName !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'collectionName', 'string')
		const collection = Collections.array.find(({ name }) => name == collectionName.replace(/\s+/g, '-'))
		if (!collection) throw new Error('ECHIDNA_COLLECTION_MISSING', collectionName)
		return existsSync(`${path}/${collection.name}`) && existsSync(`${path}/${collection.name}/${DocumentID}.json`)
	}

	/**
	 * Open a document
     * @param { string } DocumentID 
     * @param { string } collectionName 
	 * @example 
	 * Database.open('1234', 'user-exp')
     * @returns { Document }
     */
	open (DocumentID, collectionName) {
		if (typeof DocumentID !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'DocumentID', 'string')
		if (typeof collectionName !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'collectionName', 'string')
		if (!existsSync(path) || !lstatSync(path).isDirectory()) mkdirSync(path)
		const collection = Collections.array.find(({ name }) => name == collectionName.replace(/\s+/g, '-'))
		if (!collection) throw new Error('ECHIDNA_COLLECTION_MISSING', collectionName)
		if (!existsSync(`${path}/${collection.name}`) || !lstatSync(`${path}/${collection.name}`).isDirectory()) mkdirSync(`${path}/${collection.name}`)
		if (!existsSync(`${path}/${collection.name}/${DocumentID}.json`)) writeFileSync(`${path}/${collection.name}/${DocumentID}.json`, JSON.stringify(collection.model(DocumentID)))
		return new Document({ ID: DocumentID, path: `${path}/${collection.name}/${DocumentID}.json`, collection })
	}

	/** 
	 * Open all documents of a collection
	 * @param { string } collectionName 
	 * @example
	 * Database.openAll('user-exp')
	 * @returns 
	 */
	openAll (collectionName) {
		if (typeof collectionName !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'collectionName', 'string')
		const collection = Collections.array.find(({ name }) => name == collectionName.replace(/\s+/g, '-'))
		if (!collection) throw new Error('ECHIDNA_COLLECTION_MISSING', collectionName)
		if (!existsSync(path) || !lstatSync(path).isDirectory() || !existsSync(path + '/' + collectionName) || !lstatSync(path + '/' + collectionName).isDirectory()) return []
		return readdirSync(path + '/' + collectionName).map((file) => new Document({ ID: file.slice(0, file.length - 3), path: path + '/' + collectionName + '/' + file, collection }))
	}
}()
