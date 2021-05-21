module.exports = class ErrorEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('error', (error) => listener({ client, error }))
	}
}
