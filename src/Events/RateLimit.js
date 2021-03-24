module.exports = class RateLimitEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client }) {
		client.on('rateLimit', (rateLimitInfo) => listener({ client: this.client, rateLimitInfo, Event: this }))
	}
}
