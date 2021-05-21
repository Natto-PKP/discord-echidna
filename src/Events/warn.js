module.exports = class WarnEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('warn', (info) => listener({ client, info }))
	}
}
