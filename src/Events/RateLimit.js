module.exports = {
	manager: class RateLimitEvent {
		/**
         * @param {Function} listener 
         * @param {Object} param1 
         */
		constructor (listener, { client }) {
			client.on('rateLimit', (info) => listener({ client, info }))
		}
	},
	defaultOptions: {}
}
