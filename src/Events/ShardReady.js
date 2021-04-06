module.exports = {
	manager: class ShardReadyEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('shardReady', (id, unavailableGuilds) => listener({ client, id, unavailableGuilds }))
		}
	},
	defaultOptions: {}
}
