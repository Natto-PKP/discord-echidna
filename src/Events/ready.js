const Database = require('../Structures/Database')
const Collections = require('../Structures/Collections')

module.exports = class ReadyEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('ready', () => listener({ client, Database, Collections }))
	}
}
