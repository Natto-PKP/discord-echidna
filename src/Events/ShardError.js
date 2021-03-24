module.exports = class ShardErrorEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client }) {
		client.on('shardError', (error, shardID) => listener({ client: this.client, error, shardID, Event: this }))
	}
}
