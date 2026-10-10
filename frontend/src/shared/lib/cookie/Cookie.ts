export function readCookie(name: string): string | null {
	if (typeof document === 'undefined') return null

	const prefix = `${name}=`

	const entry = document.cookie
		.split('; ')
		.find(cookie => cookie.startsWith(prefix))

	return entry ? decodeURIComponent(entry.slice(prefix.length)) : null
}

/**
 * Client-side cookie for the whole site; `maxAge` 0 removes it
 */
export function writeCookie(name: string, value: string, maxAge: number) {
	const secure = location.protocol === 'https:' ? '; secure' : ''

	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax${secure}`
}
