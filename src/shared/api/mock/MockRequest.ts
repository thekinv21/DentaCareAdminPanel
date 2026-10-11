type TMockRequestOptions = {
	delay?: number
	/**
	 * Rejects with this message instead of resolving
	 */
	fail?: string
}

/**
 * Stand-in for a backend mutation until the API exists: resolves after a delay
 */
export function mockRequest<T = void>(
	value?: T,
	{ delay = 900, fail }: TMockRequestOptions = {},
): Promise<T> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (fail) reject(new Error(fail))
			else resolve(value as T)
		}, delay)
	})
}
