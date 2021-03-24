module.exports = class ErrorEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, options, { client }) {
		client.on('error', () => listener({ client: this.client, Event: this }))
	}
}
