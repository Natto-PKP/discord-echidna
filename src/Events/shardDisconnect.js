module.exports = {
	manager: class ShardDisconnectEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('shardDisconnect', (event, id) => listener({ client, event, id }))
		}
	},
	defaultOptions: {}
}
