module.exports = {
	manager: class ErrorEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('error', (error) => listener({ client, error }))
		}
	},
	defaultOptions: {}
}
