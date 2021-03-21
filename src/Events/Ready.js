module.exports = class ReadyEvent {
	/**
     * @param {Object} client 
     * @param {Function} listener 
     */
	constructor (client, listener, options, { Documents }) {
		this.client = client
		client.on('ready', () => listener({ client: this.client, Event: this, Documents }))
	}
}
