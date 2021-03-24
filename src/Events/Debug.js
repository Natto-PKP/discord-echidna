module.exports = class DebugEvent {
	/**
	 * @param {*} listener 
	 * @param {*} options 
	 * @param {*} param3 
	 */
	constructor (listener, options, { client }) {
		client.on('debug', () => listener({ client: this.client, Event: this }))
	}
}
