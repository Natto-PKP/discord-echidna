module.exports = class WarnEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client }) {
		client.on('warn', (info) => listener({ client: this.client, info, Event: this }))
	}
}
