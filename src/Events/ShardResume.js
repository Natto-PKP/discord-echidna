module.exports = class ShardResumeEvent {
	/**
     * @param {*} listener 
     * @param {*} param2 
     * @param {*} Documents 
     */
	constructor (listener, options, { client, Documents }) {
		client.on('shardResume', (id, replayedEvents) => listener({ client: this.client, id, replayedEvents, Event: this, Documents }))
	}
}
