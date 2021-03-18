module.exports = class ReadyEvent {
	/**
     * @param {Object} client 
     * @param {Function} listener 
     */
	constructor (client, listener) {
		this.client = client
		client.on('ready', () => listener({ Event: this, client: this.client }))
	}
}
