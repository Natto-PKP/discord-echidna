module.exports = {
	manager: class InvalidatedEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('invalidated', () => listener({ client }))
		}
	},
	defaultOptions: {}
}
