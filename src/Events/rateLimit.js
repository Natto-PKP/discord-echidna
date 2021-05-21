module.exports = class RateLimitEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('rateLimit', (info) => listener({ client, info }))
	}
}
