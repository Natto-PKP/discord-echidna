module.exports = {
	manager: class WarnEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('warn', (info) => listener({ client, info }))
		}
	},
	defaultOptions: {}
}
