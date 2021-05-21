module.exports = class ShardDisconnectEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('shardDisconnect', (event, id) => listener({ client, event, id }))
	}
}
