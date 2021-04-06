module.exports = {
	manager: class DebugEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('debug', () => listener({ client }))
		}
	},
	defaultOptions: {}
}
