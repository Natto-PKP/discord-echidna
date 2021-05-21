const { TypeError, Error } = require('../Errors/EchidnaError')

module.exports = new class Collections {
	array = []

	/**
     * Add a new collection format for Database system
     * @param { string } collectionName 
     * @param { object | any[] } model 
	 * @example 
	 * Collections.add('user-exp', { level: 0, exp: 0 })
     */
	add (collectionName, model) {
		if (!collectionName || typeof collectionName !== 'string') throw new TypeError('ECHIDNA_INVALID_OPTION', 'collectionName', 'string')
		if (this.array.some(({ name }) => name === collectionName.replace(/\s+/g, '-'))) throw new Error('ECHIDNA_COLLECTION_TAKEN', collectionName.replace(/\s+/g, '-'))
		if (!model || typeof model !== 'object') throw new TypeError('ECHIDNA_INVALID_OPTION', 'model', 'object|array')
		this.array.push({ name: collectionName.replace(/\s+/g, '-'), model: Array.isArray(model) ? () => model : (ID) => Object.assign(model, { ID }) })
	}
}()
