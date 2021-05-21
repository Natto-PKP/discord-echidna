module.exports = class ShardResumeEvent {
	/**
     * @param {Function} listener 
     * @param {Object} param1 
     */
	constructor (listener, { client }) {
		client.on('shardResume', (id, replayedEvents) => listener({ client, id, replayedEvents }))
	}
}
