module.exports = class DebugEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('debug', (info) => listener({ client, info }))
	}
}
