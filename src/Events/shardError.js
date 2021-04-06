module.exports = {
	manager: class ShardErrorEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('shardError', (error, id) => listener({ client, error, id }))
		}
	},
	defaultOptions: {}
}
