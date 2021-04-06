module.exports = class Util {
	static verifyDefault (target, source) {
		for (const [key, value] of Object.entries(source)) {
			if (Array.isArray(value)) {
				if (!target[key] || !Array.isArray(target[key])) target[key] = []
			} else if (typeof value == 'object') {
				if (!target[key] || Array.isArray(target[key]) || typeof target[key] != 'object') target[key] = {}
				target[key] = Util.verifyDefault(target[key], value)
			} else if (!target[key] || typeof value != typeof target[key]) target[key] = value
		}

		return target
	}
}
