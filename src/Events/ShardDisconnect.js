module.exports = class ShardDisconnectEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client }) {
		client.on('shardDisconnect', (event, id) => listener({ client: this.client, event, id, Event: this }))
	}
}
