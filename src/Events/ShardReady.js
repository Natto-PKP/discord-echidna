module.exports = class ShardReadyEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client, Documents }) {
		client.on('shardReady', (id, unavailableGuilds) => listener({ client: this.client, id, unavailableGuilds, Event: this, Documents }))
	}
}
