const Database = require('../Structures/Database')
const Collections = require('../Structures/Collections')
const Commands = require('../Structures/Commands')

module.exports = {
	manager: class ReadyEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('ready', () => listener({ client, Database, Collections, Commands }))
		}
	},
	defaultOptions: {}
}
