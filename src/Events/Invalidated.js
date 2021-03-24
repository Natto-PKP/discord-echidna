module.exports = class InvalidatedEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client }) {
		client.on('invalidated', () => listener({ client: this.client, Event: this }))
	}
}
