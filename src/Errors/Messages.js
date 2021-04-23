module.exports = {
	// Global
	ECHIDNA_INVALID_OPTION: (prop, type) => `The ${prop} must be ${type}`,
	ECHIDNA_INVALID_INDEX: (type) => `This ${type} index is invalid`,
	ECHIDNA_INVALID_SIZE: (type) => `The size added to the index of the ${type} exceeds the initial length of the ${type}. Or she less than 1 `,
	ECHIDNA_INVALID_LENGTH: (type, prop, length) => `${prop} ${type || ''} must be greater than ${length} in length`,
	ECHIDNA_INVALID_PERM: 'A permission is not valid Discord permission or must be in the form of a string',
	ECHIDNA_CONTAIN_SPACE: (prop) => `${prop} string must not contain space`,
	ECHIDNA_INVALID_PATH: (path) => `${path} path not exist`,
	ECHIDNA_INVALID_EXPORT: (path) => `${path} not contain module.exports`,
	ECHIDNA_DISCORD_PERMS: (target, perm) => `${target} has not ${perm} permission(s)`,

	ECHIDNA_SCMD_ERROR: (message) => message,

	// Missing
	ECHIDNA_TOKEN_MISSING: 'Request to use token, but token was unavailable to the client',
	ECHIDNA_EVENT_MISSING: (str) => `"${str}" event is not supported`,
	ECHIDNA_COLLECTION_MISSING: (str) => `${str} collection does not exist`,
	ECHIDNA_ARRAY_MISSING: (str) => `${str} is not a array`,
	ECHIDNA_CLIENT_MESSAGE_MISSING: 'This message is not a client user message',
	ECHIDNA_GUILD_MISSING: 'This guild id is not available from your client',

	// TAKEN
	ECHIDNA_COLLECTION_TAKEN: (str) => `${str} collection name is already taken`,
	ECHIDNA_NAME_TAKEN: (prop) => `${prop} name|aliases already taken`,

	// Database
	ECHIDNA_INVALID_DOCUMENT: 'Content of the document must be an object|array'
}
