import { readCookie, writeCookie } from '@/shared/lib/cookie'

export type TAuthTokens = {
	accessToken: string
	refreshToken: string
}

const ACCESS_TOKEN_COOKIE = 'denta-access-token'

const REFRESH_TOKEN_COOKIE = 'denta-refresh-token'

const ONE_DAY = 60 * 60 * 24

const ACCESS_TOKEN_MAX_AGE = ONE_DAY

const REFRESH_TOKEN_MAX_AGE = ONE_DAY * 30

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
