module.exports = class ShardErrorEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('shardError', (error, id) => listener({ client, error, id }))
	}
}
