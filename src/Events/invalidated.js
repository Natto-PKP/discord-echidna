module.exports = class InvalidatedEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('invalidated', () => listener({ client }))
	}
}
