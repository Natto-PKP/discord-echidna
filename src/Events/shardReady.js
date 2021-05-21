module.exports = class ShardReadyEvent {
	/**
     * @param { function } listener 
     * @param { object } param1 
     */
	constructor (listener, { client }) {
		client.on('shardReady', (id, unavailableGuilds) => listener({ client, id, unavailableGuilds }))
	}
}
