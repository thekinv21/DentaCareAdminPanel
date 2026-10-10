export type TAuthTokens = {
	accessToken: string
	refreshToken: string
}

const ACCESS_TOKEN_COOKIE = 'denta-access-token'

const REFRESH_TOKEN_COOKIE = 'denta-refresh-token'

const ONE_DAY = 60 * 60 * 24

const ACCESS_TOKEN_MAX_AGE = ONE_DAY

const REFRESH_TOKEN_MAX_AGE = ONE_DAY * 30

function readCookie(name: string): string | null {
	if (typeof document === 'undefined') return null

	const prefix = `${name}=`

	const entry = document.cookie
		.split('; ')
		.find(cookie => cookie.startsWith(prefix))

	return entry ? decodeURIComponent(entry.slice(prefix.length)) : null
}

function writeCookie(name: string, value: string, maxAge: number) {
	const secure = location.protocol === 'https:' ? '; secure' : ''

	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax${secure}`
}

export function getAccessToken() {
	return readCookie(ACCESS_TOKEN_COOKIE)
}

export function getRefreshToken() {
	return readCookie(REFRESH_TOKEN_COOKIE)
}

export function saveTokens({ accessToken, refreshToken }: TAuthTokens) {
	writeCookie(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_MAX_AGE)

	writeCookie(REFRESH_TOKEN_COOKIE, refreshToken, REFRESH_TOKEN_MAX_AGE)
}

export function removeTokens() {
	writeCookie(ACCESS_TOKEN_COOKIE, '', 0)

	writeCookie(REFRESH_TOKEN_COOKIE, '', 0)
}
