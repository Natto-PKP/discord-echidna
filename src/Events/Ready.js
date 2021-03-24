module.exports = class ReadyEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, options, { client, Documents }) {
		this.client = client
		client.on('ready', () => listener({ client: this.client, Event: this, Documents }))
	}
}
